"use client";

import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Product } from "@/generated/prisma";

interface ProductHeaderProps {
  product: Pick<Product, "name" | "imageUrl">;
}

export const ProductHeader = ({ product }: ProductHeaderProps) => {
  const router = useRouter();

  const handleBackClick = () => router.back();
  return (
    <div className="relative min-h-[300px] w-full">
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-4 z-50 rounded-full"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
      <div className="relative aspect-square w-full max-w-xs justify-self-center">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 100vw, 300px"
          priority
        />
      </div>
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-4 z-50 rounded-full"
      >
        <ScrollTextIcon />
      </Button>
    </div>
  );
};

export default ProductHeader;
