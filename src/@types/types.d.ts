type Restaurant = import("@/generated/prisma").Restaurant;
type MenuCategory = import("@/generated/prisma").MenuCategory;
type Product = import("@/generated/prisma").Product;

type RestaurantWithMenus = Prisma.RestaurantGetPayload<{
  include: { menuCategories: { include: { products: true } } };
}>;

type MenuWithProducts = Prisma.MenuCategoryGetPayload<{
  include: { products: true };
}>;
