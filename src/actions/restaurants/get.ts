"use server";

import { db } from "@/lib/prisma";

export default function getRestaurants(): Promise<Restaurant[]> {
  return db.restaurant.findMany();
}
