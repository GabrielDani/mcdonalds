import { db } from "@/lib/prisma";

import { isValidCpf, removeCpfPontuation } from "../menu/helpers/cpf";
import CpfForm from "./components/cpf-form";
import OrderList from "./components/order-list";

interface OrdersPageProps {
  searchParams: Promise<{ cpf: string }>;
}

const OrdersPage = async ({ searchParams }: OrdersPageProps) => {
  const { cpf } = await searchParams;
  if (!cpf) return <CpfForm />;
  if (!isValidCpf(cpf)) return <CpfForm />;

  const orders = await db.order.findMany({
    where: { customerCpf: removeCpfPontuation(cpf) },
    include: {
      restaurant: { select: { name: true, avatarImageUrl: true } },
      orderProducts: { include: { product: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return <OrderList orders={orders} />;
};

export default OrdersPage;
