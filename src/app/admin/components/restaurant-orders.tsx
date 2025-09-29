import { OrderCard } from "@/app/admin/components/order-card";

type Props = {
  restaurant: RestaurantWithOrders;
};

export const RestaurantOrders = ({ restaurant }: Props) => {
  const { name, orders } = restaurant;

  return (
    <main className="mx-auto flex max-w-7xl flex-col space-y-8 p-6">
      {/* Header */}
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold text-foreground">{name} - Pedidos</h1>
        <span className="text-sm text-muted-foreground">
          {orders.length} {orders.length === 1 ? "pedido" : "pedidos"}
        </span>
      </header>

      {/* Orders Grid */}
      {orders.length > 0 ? (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {orders.map((order: RestaurantWithOrders["orders"][number]) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </section>
      ) : (
        <p className="mt-8 text-center text-muted-foreground">
          Nenhum pedido ainda.
        </p>
      )}
    </main>
  );
};
