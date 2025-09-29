import { notFound } from "next/navigation";

import { getRestaurantBySlug } from "@/actions/restaurants/get";
import { isConsumptionMethodValid } from "@/lib/utils";

import RestaurantCategories from "./components/categories";
import RestaurantHeader from "./components/header";

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
}

const RestaurantMenuPage = async ({
  params,
  searchParams,
}: RestaurantMenuPageProps) => {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;

  if (!isConsumptionMethodValid(consumptionMethod)) return notFound();
  const restaurant: RestaurantWithMenus | null = await getRestaurantBySlug(
    slug,
    true,
  );
  if (!restaurant) return notFound();

  return (
    <div>
      <RestaurantHeader restaurant={restaurant} />
      <RestaurantCategories restaurant={restaurant} />
    </div>
  );
};

export default RestaurantMenuPage;
