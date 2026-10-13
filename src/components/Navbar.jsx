import { useStore } from '../context/StoreContext';
import Icon from './Icon';
import { IMG } from '../data/images';

export default function Navbar() {
  const { cartCount, wishlist, openModal, setView, filters, setFilter, view } = useStore();
  return (
    <header className="sticky top-0 z-40 bg-surface-container-lowest shadow-sm">
      <div className="flex justify-between items-center w-full px-margin py-space-sm max-w-5xl mx-auto gap-3">
        <button onClick={() => setView('feed')} className="flex items-center space-x-2 text-left">
          <div className="w-9 h-9 rounded-xl bg-primary-container text-white flex items-center justify-center shadow-sm">
            <Icon name="local_mall" className="text-[20px]" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-headline-lg-mobile text-primary tracking-tight">CampusCart</span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-label-sm bg-primary-fixed text-primary">
                <Icon name="verified_user" className="text-[13px] mr-0.5" />.edu
              </span>
            </div>
            <span className="flex items-center text-label-sm text-on-surface-variant">
              <Icon name="near_me" className="text-[13px] mr-1 text-primary-container" />North Campus • Oak Hall
            </span>
          </div>
        </button>

        <div className="hidden sm:flex flex-1 max-w-md relative">
          <Icon name="search" className="absolute left-3 top-2.5 text-outline text-[20px]" />
          <input
            value={filters.query}
            onChange={(e) => { setFilter({ query: e.target.value }); if (view !== 'feed') setView('feed'); }}
            placeholder="Search textbooks, mini-fridges, matcha..."
            className="w-full pl-10 rounded-full bg-surface-container-low border-transparent focus:border-primary focus:ring-primary text-body-md"
          />
        </div>

        <div className="flex items-center space-x-2">
          <button aria-label="Wishlist" onClick={() => setView('wishlist')} className="relative w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center hover:bg-surface-container active:scale-95">
            <Icon name="favorite" filled={wishlist.length > 0} className="text-[20px] text-tertiary-container" />
            {wishlist.length > 0 && <Badge n={wishlist.length} />}
          </button>
          <button aria-label="Cart" onClick={() => openModal('cart')} className="relative w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center hover:bg-surface-container active:scale-95">
            <Icon name="shopping_cart" className="text-[20px]" />
            {cartCount > 0 && <Badge n={cartCount} />}
          </button>
          <button aria-label="Profile" onClick={() => setView('profile')} className="w-9 h-9 rounded-full overflow-hidden border border-surface-container-highest active:scale-95">
            <img className="w-full h-full object-cover" src={IMG.avatar} alt="Your profile" />
          </button>
        </div>
      </div>
    </header>
  );
}

function Badge({ n }) {
  return (
    <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
      {n}
    </span>
  );
}
