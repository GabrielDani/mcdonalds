type Restaurant = import("@/generated/prisma").Restaurant;
type MenuCategory = import("@/generated/prisma").MenuCategory;
type Product = import("@/generated/prisma").Product;

type RestaurantWithMenus = Prisma.RestaurantGetPayload<{
  include: { menuCategories: { include: { products: true } } };
}>;

type RestaurantWithOrders = Prisma.RestaurantGetPayload<{
  include: {
    orders: {
      include: {
        orderProducts: {
          include: {
            product: true;
          };
        };
      };
    };
  };
}>;

type MenuWithProducts = Prisma.MenuCategoryGetPayload<{
  include: { products: true };
}>;
