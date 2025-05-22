import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";

import { CartProduct } from "../context/cart";

interface CartProductsItemProps {
    product: CartProduct;
}


const CartProductsItem = ({product}: CartProductsItemProps) => {
    return (  
        <div className="flex items-center justify-between">

            {/* ESQUERDA */}
            <div className="flex items-center gap-3">
                {/* IMAGEM */}
                <div className="relative h-20 w-20">
                    <Image src={product.imageUrl} alt={product.name} fill className="object-contain bg-gray-100 rounded-xl" />
                </div>

                {/* PRODUTO, PREÇO E QUANTIDADE */}
                <div className="space-y-1">
                    <p className="text-xs max-w-[90%] truncate text-ellipsis">{product.name}</p>
                    <p className="text-sm font-semibold">{formatCurrency(product.price_in_cents)}</p>
                    
                    {/* QUANTIDADE */}
                    <div className="flex items-center gap-1 text-center">
                        <Button variant="outline" className="w-7 h-7 rounded-lg">
                            <ChevronLeftIcon />
                        </Button>
                        <p className="text-xs w-7">{product.quantity}</p>
                        <Button variant="destructive" className="w-7 h-7 rounded-lg">
                            <ChevronRightIcon />
                        </Button>
                    </div>
                </div>
            </div>

            {/* DIREITA */}
            <Button variant="outline" className="h-7 w-7 rounded-lg">
                <TrashIcon />
            </Button>
        </div>
    );
}
 
export default CartProductsItem;