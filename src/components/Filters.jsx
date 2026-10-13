import { useStore } from '../context/StoreContext';
import { CATEGORIES, SELLER_TYPES } from '../data/products';
import Icon from './Icon';

const chip = (active) =>
  `shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-label-lg border transition ${
    active ? 'bg-primary-container text-white border-primary-container' : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant hover:bg-surface-container-low'
  }`;

export default function Filters() {
  const { filters, setFilter, resetFilters } = useStore();
  return (
    <section className="space-y-space-md">
      <div className="relative sm:hidden">
        <Icon name="search" className="absolute left-3 top-2.5 text-outline text-[20px]" />
        <input
          value={filters.query}
          onChange={(e) => setFilter({ query: e.target.value })}
          placeholder="Search textbooks, mini-fridges, matcha..."
          className="w-full pl-10 rounded-full bg-surface-container-lowest border-outline-variant focus:border-primary focus:ring-primary"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        <button className={chip(filters.sellerType === 'All')} onClick={() => setFilter({ sellerType: 'All' })}>
          <Icon name="grid_view" className="text-[16px]" />All Items
        </button>
        {Object.entries(SELLER_TYPES).map(([key, label]) => (
          <button key={key} className={chip(filters.sellerType === key)} onClick={() => setFilter({ sellerType: key })}>
            <Icon name={key === 'CampusBusiness' ? 'store' : 'recycling'} className="text-[16px]" />{label}
          </button>
        ))}
        <button className={chip(filters.freeOnly)} onClick={() => setFilter({ freeOnly: !filters.freeOnly })}>
          <Icon name="volunteer_activism" className="text-[16px]" />FreeCycle / $0
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {['All', ...CATEGORIES].map((c) => (
          <button key={c} className={chip(filters.category === c)} onClick={() => setFilter({ category: c })}>{c}</button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4 bg-surface-container-lowest rounded-xl p-space-md card-shadow">
        <label className="flex items-center gap-3 flex-1 min-w-[200px] text-label-lg">
          <span className="whitespace-nowrap">Max price: ${filters.maxPrice}</span>
          <input type="range" min="0" max="200" step="5" value={filters.maxPrice} onChange={(e) => setFilter({ maxPrice: Number(e.target.value) })} className="flex-1 accent-primary" />
        </label>
        <label className="flex items-center gap-2 text-label-lg">
          Sort
          <select value={filters.sort} onChange={(e) => setFilter({ sort: e.target.value })} className="rounded-lg border-outline-variant text-body-md py-1">
            <option value="newest">Newest</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </label>
        <button onClick={resetFilters} className="text-label-lg text-primary hover:underline">Reset</button>
      </div>
    </section>
  );
}
