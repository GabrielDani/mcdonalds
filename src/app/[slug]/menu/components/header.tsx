"use client";

import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Restaurant } from "@/generated/prisma";

interface RestaurantHeaderProps {
  restaurant: Pick<Restaurant, "name" | "coverImageUrl">;
}

const RestaurantHeader = ({ restaurant }: RestaurantHeaderProps) => {
  const [error, setError] = useState(false);
  const router = useRouter();

  const { name, coverImageUrl: image } = restaurant;

  const handleBackClick = () => router.back();

  return (
    <div className="relative h-[250px] w-full md:h-[500px] lg:h-[700px]">
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-4 z-50 rounded-full"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
      <Image
        src={error ? "/mcdonalds-banner-fallback.png" : image}
        alt={name}
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
        onError={() => setError(true)}
      />

      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-4 z-50 rounded-full"
        asChild
      >
        <Link href={`orders`}>
          <ScrollTextIcon />
        </Link>
      </Button>
    </div>
  );
};

export default RestaurantHeader;
