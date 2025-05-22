import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

import { formatCurrency } from "@/helpers/format-currency";

interface ProductsProps {
    products: Product[]
}

const Products = ({products}: ProductsProps) => {
    const [error, setError] = useState<boolean>(false);
    const {slug} = useParams<{slug: string}>()
    return ( 
        <div className="space-y-3 px-5">
            {products.map((product) => (
                <Link 
                    key={product.id} 
                    href={`/${slug}/menu/${product.id}`} 
                    className="flex items-center justify-between gap-10 py-3 border-b">
                        {/* ESQUERDA */}
                        <div>
                            <h3 className="text-sm font-semibold">{product.name}</h3>
                            <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
                            <p className="pt-3 text-sm font-semibold">{formatCurrency(product.price_in_cents)}</p>
                        </div>

                        {/* DIREITA */}
                        <div className="relative min-h-[82px] min-w-[120px]">
                            <Image key={product.id} src={error? '/bigmac-fallback.png' : product.imageUrl} alt={product.name} fill className="object-contain rounded-lg mix-blend-mode-multiply" onError={() => setError(true)} />
                        </div>
                </Link>
            ))}
        </div>
     );
}
 
export default Products;