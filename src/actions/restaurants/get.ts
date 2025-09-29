"use server";

import { db } from "@/lib/prisma";

export async function getRestaurants(): Promise<Restaurant[]> {
  return db.restaurant.findMany();
}

export function getRestaurantBySlug(slug: string): Promise<Restaurant | null>;
export function getRestaurantBySlug(
  slug: string,
  includeMenus: true,
): Promise<RestaurantWithMenus | null>;

export async function getRestaurantBySlug(
  slug: string,
  includeMenus?: true,
): Promise<Restaurant | RestaurantWithMenus | null> {
  if (includeMenus) {
    return db.restaurant.findUnique({
      where: { slug },
      include: { menuCategories: { include: { products: true } } },
    });
  }

  return db.restaurant.findUnique({ where: { slug } });
}
