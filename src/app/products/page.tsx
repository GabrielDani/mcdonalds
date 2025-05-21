import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ProductsPage = () => {
  return (
    <div className="p-5 border border-red-500 rounded-xl text-center">
      <h1 className="text-red-500">ProductsPage</h1>
      <Button>Button</Button>
      <Input placeholder="Bora fechar esse projeto!" />
    </div>
  );
};

export default ProductsPage;
