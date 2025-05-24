"use client";

import { OrderStatus, Prisma } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/helpers/format-currency";

interface OrderListProps {
  orders: Array<
    Prisma.OrderGetPayload<{
      include: {
        restaurant: {
          select: { name: true; avatarImageUrl: true; slug: true };
        };
        orderProducts: {
          include: {
            product: true;
          };
        };
      };
    }>
  >;
}

const getStatusLabel = (orderStatus: OrderStatus) => {
  if (orderStatus === OrderStatus.FINISHED) return "Finalizado";
  else if (orderStatus === OrderStatus.IN_PREPARATION) return "Em preparo";
  else if (orderStatus === OrderStatus.PENDING) return "Pendente";
  else return "";
};

const OrderList = ({ orders }: OrderListProps) => {
  const redirectToHomePage = () => redirect(`/`);

  return (
    <div className="space-y-6 p-6">
      {/* BOTÃO DE VOLTAR */}
      <Button
        variant="secondary"
        className="rounded-full"
        size="icon"
        onClick={redirectToHomePage}
      >
        <ChevronLeftIcon />
      </Button>

      {/* MEUS PEDIDOS TITLE */}
      <div className="flex items-center gap-3">
        <ScrollTextIcon />
        <h2 className="text-xl font-semibold">Meus Pedidos</h2>
      </div>

      {/* PEDIDOS */}
      {orders.map((order) => (
        // CARD
        <Card key={order.id}>
          <CardContent className="space-y-4 p-5">
            {/* STATUS */}
            <div
              className={`w-fit rounded-full px-2 py-1 text-xs font-semibold ${order.status === OrderStatus.FINISHED ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}`}
            >
              {getStatusLabel(order.status)}
            </div>
            {/* RESTAURANTE */}
            <div className="flex items-center gap-2">
              <div className="relative h-5 w-5">
                <Image
                  src={order.restaurant.avatarImageUrl}
                  alt={order.restaurant.name}
                  fill
                  className="rounded-lg"
                />
              </div>
              <p className="text-sm font-semibold">{order.restaurant.name}</p>
            </div>
            <Separator />

            {/* PEDIDO */}
            {order.orderProducts.map((orderProduct) => (
              // PRODUTO
              <div key={orderProduct.id} className="flex flex-col">
                <p className="text-sm font-semibold">
                  {orderProduct.product.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {orderProduct.quantity}x
                </p>
              </div>
            ))}
            <Separator />

            {/* TOTAL */}
            <p className="text-sm font-medium">
              {formatCurrency(order.total_in_cents)}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrderList;
