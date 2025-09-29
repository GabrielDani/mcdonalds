import { RestaurantOrders } from "@/app/admin/components/restaurant-orders";
import { db } from "@/lib/prisma";

type Props = {
  searchParams: Promise<{ slug: string }>;
};

export default async function AdminPage({ searchParams }: Props) {
  const { slug } = await searchParams;
  if (!slug) <>Não contém slug</>;

  const restaurant: RestaurantWithOrders | null = await db.restaurant.findFirst(
    {
      where: { slug },
      include: {
        orders: {
          include: {
            orderProducts: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    },
  );

  if (!restaurant) return <>Restaurante não encontrado</>;

  return <RestaurantOrders restaurant={restaurant} />;
}
