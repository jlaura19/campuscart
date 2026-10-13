import { useStore } from '../context/StoreContext';
import ProductGrid from './ProductGrid';
import Icon from './Icon';

export default function WishlistView() {
  const { products, wishlist, setView } = useStore();
  const saved = products.filter((p) => wishlist.includes(p.id));
  return (
    <section className="space-y-space-md">
      <h2 className="text-headline-lg">Saved items</h2>
      <ProductGrid products={saved} empty="Tap the heart on any listing to save it here." />
      {!saved.length && (
        <div className="text-center"><button onClick={() => setView('feed')} className="inline-flex items-center gap-1 text-primary text-label-lg"><Icon name="arrow_back" className="text-[18px]" />Browse the feed</button></div>
      )}
    </section>
  );
}
