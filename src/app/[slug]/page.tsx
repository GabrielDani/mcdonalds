import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getRestaurantBySlug } from "@/actions/restaurants/get";

import ConsumptionMethodOption from "./components/consumption-method-option";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const { slug } = await params;
  const restaurant: Restaurant | null = await getRestaurantBySlug(slug);
  if (!restaurant) return notFound();

  const { name, avatarImageUrl: avatar } = restaurant;

  return (
    <div className="flex h-full flex-col items-center justify-around gap-5 px-6 py-10">
      {/* LOGO E TÍTULO */}
      <div className="flex flex-col items-center gap-2">
        <Image src={avatar} alt={name} width={82} height={82} priority />
        <h2 className="font-semibold">{name}</h2>
      </div>

      <div className="flex flex-col gap-1 text-center">
        <Link
          href={`/admin?slug=${slug}`}
          className="text-xs text-muted-foreground hover:underline"
        >
          Ver todos os pedidos
        </Link>
        <p className="text-xs text-muted-foreground">
          Esta página é apenas para testes: qualquer usuário pode visualizar e
          alterar o status dos pedidos.
        </p>
      </div>

      {/* BEM-VINDO */}
      <div className="space-y-2 text-center">
        <h3 className="text-semibold text-2xl">Seja bem-vindo!</h3>
        <p className="opacity-55">
          Escolha como prefere aproveitar sua refeição. Estamos aqui para
          oferecer praticidade e sabor em cada detalhe!
        </p>
      </div>

      {/* OPÇÕES DE ENTREGA E RETIRADA */}
      <div className="grid grid-cols-2 gap-4">
        <ConsumptionMethodOption
          slug={slug}
          imageUrl="/dine_in.png"
          imageAlt="Para comer aqui"
          buttonText="Para comer aqui"
          option="DINE_IN"
        />
        <ConsumptionMethodOption
          slug={slug}
          imageUrl="/takeaway.png"
          imageAlt="Para retirar"
          buttonText="Para retirar"
          option="TAKEAWAY"
        />
      </div>
    </div>
  );
}
