import { RestaurantCard } from "@/components/ui/restaurant-card";
import { db } from "@/lib/prisma";

export default async function HomePage() {
  const restaurants: Restaurant[] = await db.restaurant.findMany();

  return (
    <main className="mx-auto max-w-5xl space-y-8 p-6">
      {/* Header da página */}
      <section className="flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
        <h1 className="text-3xl font-bold text-primary">Unidades McDonalds</h1>
        <p className="text-sm text-muted-foreground">
          (
          <span className="font-semibold text-foreground">
            {restaurants.length}
          </span>{" "}
          {restaurants.length > 1 ? "restaurantes" : "restaurante"})
        </p>
      </section>

      {/* Mensagem quando não há restaurantes */}
      {restaurants.length === 0 && (
        <p className="text-center text-muted-foreground">
          Nenhum restaurante encontrado.
        </p>
      )}

      {/* Lista de restaurantes */}
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {restaurants.map((restaurant, index) => (
          <RestaurantCard key={index} restaurant={restaurant} />
        ))}
      </ul>
    </main>
  );
}
