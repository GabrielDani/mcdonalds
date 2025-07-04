"use server";

import { ConsumptionMethod } from "@prisma/client";
import { redirect } from "next/navigation";

import { db } from "@/lib/prisma";

import { removeCpfPontuation } from "../helpers/cpf";

interface CreateOrderProps {
  customerName: string;
  customerCpf: string;
  products: Array<{
    id: string;
    quantity: number;
  }>;
  consumptionMethod: ConsumptionMethod;
  slug: string;
}

export const createOrder = async (input: CreateOrderProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: { slug: input.slug },
  });
  if (!restaurant) throw new Error("Restaurante não encontrado");
  const productsWithPrices = await db.product.findMany({
    where: { id: { in: input.products.map((product) => product.id) } },
  });

  const productsWithPricesAndQuantities = input.products.map((product) => ({
    productId: product.id,
    quantity: product.quantity,
    price_in_cents: productsWithPrices.find(
      (productWithPrice) => productWithPrice.id === product.id,
    )!.price_in_cents,
  }));

  await db.order.create({
    data: {
      status: "PENDING",
      customerName: input.customerName,
      customerCpf: removeCpfPontuation(input.customerCpf),
      orderProducts: {
        createMany: {
          data: productsWithPricesAndQuantities,
        },
      },
      total_in_cents: productsWithPricesAndQuantities.reduce(
        (acc, product) => acc + product.price_in_cents * product.quantity,
        0,
      ),
      consumptionMethod: input.consumptionMethod,
      restaurantId: restaurant.id,
    },
  });

  redirect(
    `/${input.slug}/orders?cpf=${removeCpfPontuation(input.customerCpf)}`,
  );
};
