import { notFound } from "next/navigation";

import { RestaurantOrders } from "@/app/admin/components/restaurant-orders";
import { db } from "@/lib/prisma";

type Props = {
  searchParams: Promise<{ slug: string }>;
};

export default async function AdminPage({ searchParams }: Props) {
  const { slug } = await searchParams;
  if (!slug) return notFound();

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

  if (!restaurant) return notFound();

  return <RestaurantOrders restaurant={restaurant} />;
}
