import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext, CartProduct } from "../context/cart";

interface CartProductsItemProps {
    product: CartProduct;
}


const CartProductsItem = ({product}: CartProductsItemProps) => {
    const { increaseProductQuantity, decreaseProductQuantity, removeProduct } = useContext(CartContext);

    return (  
        <div className="flex items-center justify-between">

            {/* ESQUERDA */}
            <div className="flex items-center gap-3">
                {/* IMAGEM */}
                <div className="relative h-16 w-16 bg-gray-100 rounded-xl">
                    <Image src={product.imageUrl} alt={product.name} fill className="object-contain" />
                </div>

                {/* PRODUTO, PREÇO E QUANTIDADE */}
                <div className="space-y-1">
                    <p className="text-xs line-clamp-1">{product.name}</p>
                    <p className="text-sm font-semibold">{formatCurrency(product.price_in_cents)}</p>
                    
                    {/* QUANTIDADE */}
                    <div className="flex items-center gap-1 text-center">
                        <Button variant="outline" className="w-7 h-7 rounded-lg" onClick={() => decreaseProductQuantity(product.id)}>
                            <ChevronLeftIcon />
                        </Button>
                        <p className="text-xs w-7">{product.quantity}</p>
                        <Button variant="destructive" className="w-7 h-7 rounded-lg" onClick={() => increaseProductQuantity(product.id)}>
                            <ChevronRightIcon />
                        </Button>
                    </div>
                </div>
            </div>

            {/* DIREITA */}
            <Button variant="outline" className="h-6 w-6 rounded-lg" onClick={() => removeProduct(product.id)}>
                <TrashIcon />
            </Button>
        </div>
    );
}
 
export default CartProductsItem;