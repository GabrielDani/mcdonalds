import { Restaurant } from "@prisma/client";
import Image from "next/image";

import { db } from "@/lib/prisma";

const HomePage = async () => {
  const restaurants: Restaurant[] = await db.restaurant.findMany();

  return (
    <main className="mx-auto max-w-5xl space-y-6 p-6">
      <h1 className="text-3xl font-bold text-yellow-600">Unidades McDonalds</h1>

      {restaurants.length === 0 && (
        <p className="text-gray-500">Nenhum restaurante encontrado.</p>
      )}

      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {restaurants.map((restaurant) => (
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
              <p className="mt-2 text-sm text-gray-500">
                Aberto das 10h às 23h
              </p>
            </div>
            <a
              href={`/${restaurant.slug}`}
              className="mt-auto inline-block rounded-lg bg-yellow-500 py-2 text-center font-medium text-white transition hover:bg-yellow-600"
            >
              Ver cardápio
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default HomePage;
