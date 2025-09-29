"use server";

import { OrderStatus } from "@prisma/client";

import { db } from "@/lib/prisma";

export async function updateOrderStatus(orderId: number, status: OrderStatus) {
  await db.order.update({
    where: { id: orderId },
    data: { status },
  });
}
