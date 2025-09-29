"use client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext } from "../context/cart";
import CartSheet from "./cart-sheet";
import Products from "./products";

const RestaurantCategories = ({ restaurant }: RestaurantWithMenus) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuWithProducts>(
    restaurant.menuCategories[0],
  );

  const { total, totalQuantity, toggleCart } = useContext(CartContext);
  const {
    name,
    avatarImageUrl: avatar,
    description,
    menuCategories,
  } = restaurant;

  const handleCategoryClick = (category: MenuWithProducts) => {
    setSelectedCategory(category);
  };

  const getCategoryButtonVariant = (category: MenuWithProducts) => {
    return selectedCategory.id === category.id ? "default" : "secondary";
  };

  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl bg-background">
      {/* CABEÇALHO */}
      <div className="p-5">
        {/* LOGO E TÍTULO */}
        <div className="flex items-center gap-3">
          <Image src={avatar} alt={name} width={45} height={45} />
          <div>
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="text-xs opacity-55">{description}</p>
          </div>
        </div>
        {/* HORÁRIO */}
        <div className="mt-3 flex items-center gap-1 text-xs text-green-500">
          <ClockIcon size={12} />
          <p>Aberto!</p>
        </div>
      </div>

      {/* CATEGORIAS */}
      <ScrollArea className="w-full">
        <div className="flex w-max space-x-4 p-4 pt-0">
          {menuCategories.map((category: MenuCategory) => (
            <Button
              key={category.id}
              variant={getCategoryButtonVariant(category)}
              size="sm"
              className="rounded-full"
              onClick={() => handleCategoryClick(category)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* PRODUTOS */}
      <h3 className="font-semi-bold px-5 pt-2">{selectedCategory.name}</h3>
      <Products products={selectedCategory.products} />

      {/* TOTAL DOS PEDIDOS */}
      {totalQuantity > 0 && (
        <div className="fixed bottom-0 left-0 right-0 flex w-full items-center justify-between border-t bg-background px-5 py-3">
          {/* TOTAL */}
          <div>
            <p className="text-xs text-muted-foreground">Total dos pedidos</p>
            <p className="text-sm font-semibold">
              {formatCurrency(total)}
              <span className="text-xs font-normal text-muted-foreground">
                / {totalQuantity} {totalQuantity > 1 ? "itens" : "item"}
              </span>
            </p>
          </div>

          <Button onClick={toggleCart}>Ver sacola</Button>
          <CartSheet />
        </div>
      )}
    </div>
  );
};

export default RestaurantCategories;
