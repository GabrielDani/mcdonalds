import Image from "next/image";

import { Restaurant } from "@/generated/prisma";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  return (
    <li
      key={restaurant.id}
      className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow"
    >
      <Image
        src={restaurant.coverImageUrl}
        alt={restaurant.name}
        width={600}
        height={200}
        className="h-40 w-full rounded-xl object-cover"
      />
      <div>
        <h2 className="text-xl font-semibold">{restaurant.name}</h2>
        <p className="text-sm text-gray-600">
          {restaurant.description || "Restaurante da rede McDonald's"}
        </p>
        <p className="mt-2 text-sm text-gray-500">Aberto das 10h às 23h</p>
      </div>
      <a
        href={`/${restaurant.slug}`}
        className="mt-auto inline-block rounded-lg bg-yellow-500 py-2 text-center font-medium text-white transition hover:bg-yellow-600"
      >
        Ver cardápio
      </a>
    </li>
  );
};
