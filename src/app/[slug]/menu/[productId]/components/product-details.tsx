"use client";

import { ChefHatIcon, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Prisma } from "@/generated/prisma";
import { formatCurrency } from "@/helpers/format-currency";

import CartSheet from "../../components/cart-sheet";
import { CartContext } from "../../context/cart";
type ProductDetailsProps = {
  product: Prisma.ProductGetPayload<{
    include: { restaurant: { select: { name: true; avatarImageUrl: true } } };
  }>;
};
const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState<number>(1);

  const {
    name: productName,
    price_in_cents: price,
    description,
    ingredients,
    restaurant,
  } = product;
  const { name: restaurantName, avatarImageUrl: restaurantAvatar } = restaurant;

  const { toggleCart, addProduct } = useContext(CartContext);

  const handleDecreaseQuantiity = () => {
    setQuantity((prev) => {
      if (prev === 1) return 1;
      return prev - 1;
    });
  };

  const handleIncreaseQuantiity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    addProduct({ ...product, quantity });
    toggleCart();
  };

  return (
    <div className="relative z-50 mt-[-1.5rem] flex flex-auto flex-col overflow-hidden rounded-t-3xl p-5">
      {/* INFORMAÇÕES DO PRODUTO */}
      <div className="flex-auto overflow-hidden">
        {/* RESTAURANTE */}
        <div className="flex items-center gap-1.5">
          <Image
            src={restaurantAvatar}
            alt={restaurantName}
            width={16}
            height={16}
            priority
            className="rounded-full"
          />
          <h2 className="text-xs text-muted-foreground">{restaurantName}</h2>
        </div>

        {/* NOME DO PRODUTO */}
        <h2 className="text-xl font-semibold">{productName}</h2>

        {/* PREÇO E QUANTIDADE */}
        <div className="mt-3 flex items-center justify-between">
          <h3 className="text-xl font-semibold">{formatCurrency(price)}</h3>
          <div className="flex items-center gap-3 text-center">
            <Button
              variant="outline"
              className="h-8 w-8 rounded-xl"
              onClick={handleDecreaseQuantiity}
            >
              <ChevronLeft />
            </Button>
            <p className="w-4">{quantity}</p>
            <Button
              variant="destructive"
              className="h-8 w-8 rounded-xl"
              onClick={handleIncreaseQuantiity}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>

        <ScrollArea className="h-full">
          {/* SOBRE */}
          <div className="mt-6 space-y-3">
            <h4 className="font-semibold">Sobre</h4>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>

          {/* INGREDIENTES */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-1.5">
              <ChefHatIcon size={18} />
            </div>
            <h4 className="font-semibold">Ingredientes</h4>
            <ul>
              {ingredients.map((ingredient) => (
                <li key={ingredient} className="text-sm text-muted-foreground">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        </ScrollArea>
      </div>
      {/* ADICIONAR AO CARRINHO */}
      <Button className="mt-10 w-full rounded-full" onClick={handleAddToCart}>
        Adicionar à sacola
      </Button>
      <CartSheet />
    </div>
  );
};

export default ProductDetails;
