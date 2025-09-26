"use server";

import { db } from "@/lib/prisma";

export async function getRestaurants(): Promise<Restaurant[]> {
  return db.restaurant.findMany();
}

export async function getRestaurantBySlug(
  slug: string,
): Promise<Restaurant | null> {
  return db.restaurant.findUnique({ where: { slug } });
}
