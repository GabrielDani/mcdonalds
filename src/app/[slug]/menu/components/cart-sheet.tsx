import { useContext } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import { CartContext } from "../context/cart";
import CartProductsItem from "./cart-products-item";

const CartSheet = () => {
    const { isOpen, toggleCart, products } = useContext(CartContext);

    return ( 
        <Sheet open={isOpen} onOpenChange={toggleCart}>
            <SheetContent className="w-[80%]">
                <SheetHeader>
                <SheetTitle className="text-left">Sacola</SheetTitle>
                </SheetHeader>
                <div className="py-5">
                    {products.map((product) => <CartProductsItem key={product.id} product={product} />)}
                </div>
            </SheetContent>
        </Sheet>
);
}
 
export default CartSheet;