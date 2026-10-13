import { useStore } from '../context/StoreContext';
import Filters from './Filters';
import ProductGrid from './ProductGrid';
import Icon from './Icon';

export default function FeedView() {
  const { visibleProducts, openModal, resetFilters } = useStore();
  return (
    <div className="space-y-space-xl">
      <Filters />
      <section className="flex items-center gap-2 rounded-xl bg-secondary-fixed text-on-secondary-fixed p-space-md">
        <Icon name="security" />
        <p className="text-label-lg">Quad-Safe Meetups Only — every buyer and seller is a verified .edu student.</p>
      </section>
      <section className="space-y-space-md">
        <div className="flex justify-between items-center">
          <h2 className="text-headline-lg-mobile">{visibleProducts.length} listing{visibleProducts.length === 1 ? '' : 's'}</h2>
          <button onClick={() => openModal('list')} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary-container text-white text-label-lg">
            <Icon name="add" className="text-[18px]" />Post Item
          </button>
        </div>
        <ProductGrid products={visibleProducts} empty="No items match your filters." />
        {!visibleProducts.length && <div className="text-center"><button onClick={resetFilters} className="text-primary text-label-lg">Clear filters</button></div>}
      </section>
    </div>
  );
}
