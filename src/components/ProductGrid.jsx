import ProductCard from './ProductCard';

export default function ProductGrid({ products, empty = 'Nothing here yet.' }) {
  if (!products.length) {
    return <p className="text-center text-on-surface-variant py-10">{empty}</p>;
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-gutter">
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
