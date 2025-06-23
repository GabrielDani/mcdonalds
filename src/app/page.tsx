import { Restaurant } from "@prisma/client";

import { RestaurantCard } from "@/components/ui/restaurant-card";
import { db } from "@/lib/prisma";

const HomePage = async () => {
  const restaurants: Restaurant[] = await db.restaurant.findMany();

  return (
    <main className="mx-auto max-w-5xl space-y-6 p-6">
      <section className="mb-6 flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-4 sm:text-left">
        <h1 className="text-3xl font-bold text-yellow-600">
          Unidades McDonalds
        </h1>
        <p className="text-sm text-gray-700">
          (<span className="font-semibold">{restaurants.length}</span>{" "}
          {restaurants.length > 1 ? "restaurantes" : "restaurante"})
        </p>
      </section>

      {restaurants.length === 0 && (
        <p className="text-gray-500">Nenhum restaurante encontrado.</p>
      )}

      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {restaurants.map((restaurant, index) => (
          <RestaurantCard key={index} restaurant={restaurant} />
        ))}
      </ul>
    </main>
  );
};

export default HomePage;
