import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ProductsPage = () => {
  return (
    <div className="rounded-xl border border-red-500 p-5">
      <h1 className="p-2 text-red-500">ProductsPage</h1>
      <Button>Button</Button>
      <Input placeholder="Bora fechar esse projeto!" />
    </div>
  );
};

export default ProductsPage;
