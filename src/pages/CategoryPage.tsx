import { useParams } from "react-router-dom";
import { CATEGORIES, MOCK_PRODUCTS } from "../constants";
import { ProductCard } from "../components/ui/ProductCard";
import { Filter, ChevronDown } from "lucide-react";
import { Button } from "../components/ui/Button";

export function CategoryPage() {
  const { id } = useParams();
  const category = CATEGORIES.find(c => c.id === id);

  const filteredProducts = MOCK_PRODUCTS.filter(p => p.category === id);

  if (!category) return <div>Category not found</div>;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative h-48 overflow-hidden rounded-[40px] bg-blue-600 p-8 md:h-64 md:p-12">
        <div className="relative z-10 flex h-full flex-col justify-end">
          <h1 className="text-4xl font-black text-white md:text-6xl uppercase">{category.name}</h1>
          <p className="mt-2 text-sm font-bold text-blue-100 uppercase tracking-widest">
            Home / {category.name}
          </p>
        </div>
        <div className="absolute top-0 right-0 p-12 text-white/10">
          <category.icon size={200} />
        </div>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        {/* Filters - Sidebar Desktop */}
        <aside className="hidden h-fit w-64 flex-shrink-0 space-y-8 rounded-[32px] border bg-white p-8 md:block">
          <div>
            <h3 className="mb-4 text-xs font-black uppercase tracking-widest text-neutral-900 border-b pb-2">Filter By</h3>
            <div className="space-y-6">
              <div>
                <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-neutral-400">Price Range</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-neutral-600">
                    <input type="checkbox" className="h-4 w-4 rounded border-neutral-300 text-blue-600" />
                    Under ₹10,000
                  </label>
                  <label className="flex items-center gap-2 text-sm font-bold text-neutral-600">
                    <input type="checkbox" className="h-4 w-4 rounded border-neutral-300 text-blue-600" />
                    ₹10,000 - ₹50,000
                  </label>
                  <label className="flex items-center gap-2 text-sm font-bold text-neutral-600">
                    <input type="checkbox" className="h-4 w-4 rounded border-neutral-300 text-blue-600" />
                    Over ₹50,000
                  </label>
                </div>
              </div>
              <div>
                <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-neutral-400">Ratings</p>
                <div className="space-y-2">
                  {[4, 3, 2].map(r => (
                    <label key={r} className="flex items-center gap-2 text-sm font-bold text-neutral-600">
                      <input type="checkbox" className="h-4 w-4 rounded border-neutral-300 text-blue-600" />
                      {r}+ Stars
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Button className="w-full">Apply Filters</Button>
        </aside>

        {/* Content */}
        <div className="flex-1 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border bg-white p-4">
            <p className="text-sm font-bold text-neutral-500">Showing {filteredProducts.length} items</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-10 text-xs">
                Sort: Featured <ChevronDown size={14} className="ml-2" />
              </Button>
              <Button variant="outline" size="sm" className="h-10 text-xs md:hidden">
                <Filter size={14} className="mr-2" /> Filters
              </Button>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map(p => (
              <ProductCard key={p.id} product={p as any} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
