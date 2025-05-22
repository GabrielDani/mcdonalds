"use client";

import { Product } from "@prisma/client";
import { createContext, useState } from "react";

export interface CartProduct extends Pick<Product, 'id' | 'name' | 'price_in_cents' | 'imageUrl'> {
    quantity: number;
}

export interface ICartContext {
    isOpen: boolean;
    products: CartProduct[];
    toggleCart: () => void;
    addProduct: (product: CartProduct) => void
}

export const CartContext = createContext<ICartContext>({
    isOpen: false,
    products: [],
    toggleCart: () => {},
    addProduct: () => {}
});

export const CartProvider = ({children}: {children: React.ReactNode}) => {
    const [products, setProducts] = useState<CartProduct[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const toggleCart = () => {
        setIsOpen(!isOpen);
    }

    const addProduct = (product: CartProduct) => {
        const productIsAlreadyOnTheCart = products.some((prevProduct) => prevProduct.id === product.id);
        if(!productIsAlreadyOnTheCart) return setProducts((prev) => [...prev, product]);
        
        setProducts((prevProducts) => {
            return prevProducts.map((prevProduct) => 
                prevProduct.id === product.id ? {...prevProduct, quantity: prevProduct.quantity + product.quantity} : prevProduct);
        });
    }

    return (
        <CartContext.Provider value={{isOpen, products, toggleCart, addProduct}}>{children}</CartContext.Provider>
    )
}


