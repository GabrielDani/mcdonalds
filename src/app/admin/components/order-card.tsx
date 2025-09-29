"use client";

import { useState } from "react";

import { updateOrderStatus } from "@/actions/order/update";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderStatus } from "@/generated/prisma";
import { formatCurrency } from "@/helpers/format-currency";
import { cn } from "@/lib/utils";

type Props = {
  order: RestaurantWithOrders["orders"][number];
};

// Função que retorna a cor baseada no status
function getStatusColor(status: OrderStatus) {
  switch (status) {
    case OrderStatus.PENDING:
      return "bg-yellow-500";
    case OrderStatus.IN_PREPARATION:
      return "bg-blue-500";
    case OrderStatus.FINISHED:
      return "bg-green-600";
    default:
      return "bg-gray-400";
  }
}

// Função que retorna o próximo status no ciclo
function getNextStatus(status: OrderStatus): OrderStatus {
  switch (status) {
    case OrderStatus.PENDING:
      return OrderStatus.IN_PREPARATION;
    case OrderStatus.IN_PREPARATION:
      return OrderStatus.FINISHED;
    case OrderStatus.FINISHED:
      return OrderStatus.PENDING;
    default:
      return OrderStatus.PENDING;
  }
}

export const OrderCard = ({ order }: Props) => {
  const { id, total_in_cents: price, orderProducts } = order;

  // Estado local para simular atualização do status
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const nextStatus = getNextStatus(status);
  const buttonColor = getStatusColor(nextStatus);

  const handleUpdateStatus = async () => {
    const nextStatus = getNextStatus(status);
    setStatus(nextStatus);

    await updateOrderStatus(order.id, nextStatus);
  };

  return (
    <Card className="shadow-sm transition hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Pedido #{id}</CardTitle>
        <div
          className={cn(
            "rounded-lg px-2 py-1 text-xs font-semibold capitalize text-white",
            getStatusColor(status),
          )}
        >
          {status.replace("_", " ").toLowerCase()}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <ul className="space-y-1 text-sm text-foreground">
          {orderProducts.map(
            (op: RestaurantWithOrders["orderProducts"][number]) => (
              <li key={op.id} className="flex justify-between">
                <span>
                  {op.quantity}x {op.product.name}
                </span>
                <span>
                  {formatCurrency(op.product.price_in_cents * op.quantity)}
                </span>
              </li>
            ),
          )}
        </ul>

        <div className="flex items-center justify-between border-t pt-3">
          <span className="font-semibold">Total:</span>
          <span className="font-bold">{formatCurrency(price)}</span>
        </div>

        <div className="flex w-full justify-end pt-2">
          <Button
            size="sm"
            className={cn(buttonColor)}
            onClick={handleUpdateStatus}
          >
            {nextStatus === OrderStatus.IN_PREPARATION
              ? "Marcar como Preparando"
              : nextStatus === OrderStatus.FINISHED
                ? "Marcar como Finalizado"
                : "Reiniciar Pedido"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
