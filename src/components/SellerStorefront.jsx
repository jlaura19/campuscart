import { useState } from 'react';
import { useStore } from '../context/StoreContext';
import ProductGrid from './ProductGrid';
import Icon from './Icon';
import { SellerTypeBadge } from './Badges';

const TABS = ['Products', 'About', 'Reviews'];
const REVIEWS = [
  { who: 'Priya S.', text: 'Fast, friendly, and super safe pickup at the lobby.' },
  { who: 'Jordan B.', text: 'Exactly as described. Would buy again!' },
  { who: 'Chris W.', text: 'Great price for campus life.' },
];

export default function SellerStorefront() {
  const { sellers, sellerId, setView, products } = useStore();
  const [tab, setTab] = useState('Products');
  const [following, setFollowing] = useState(false);
  const seller = sellers[sellerId];
  const shops = Object.values(sellers).filter((s) => s.type === 'CampusBusiness');
  const items = products.filter((p) => p.sellerId === sellerId);

  return (
    <div className="space-y-space-lg">
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {shops.map((s) => (
          <button key={s.id} onClick={() => { setView('storefront', s.id); setTab('Products'); }}
            className={`shrink-0 px-3 py-1.5 rounded-full text-label-lg border ${s.id === sellerId ? 'bg-primary-container text-white border-primary-container' : 'border-outline-variant bg-surface-container-lowest'}`}>
            {s.name}
          </button>
        ))}
      </div>

      <div className="rounded-xl overflow-hidden bg-surface-container-lowest card-shadow">
        <img src={seller.cover} alt="" className="w-full h-40 sm:h-56 object-cover" />
        <div className="p-space-md space-y-2">
          <div className="flex justify-between items-start gap-2">
            <div>
              <h1 className="text-headline-lg flex items-center gap-1">{seller.name}<Icon name="verified" filled className="text-primary text-[20px]" /></h1>
              <p className="text-body-md text-on-surface-variant">By {seller.owner} · {seller.tagline}</p>
            </div>
            <button onClick={() => setFollowing((f) => !f)} className={`px-3 py-1.5 rounded-full text-label-lg ${following ? 'bg-surface-container-high text-primary' : 'bg-primary-container text-white'}`}>
              {following ? 'Following' : 'Follow'}
            </button>
          </div>
          <div className="flex items-center gap-4 text-label-md text-on-surface-variant flex-wrap">
            <SellerTypeBadge type={seller.type} />
            <span className="flex items-center gap-1"><Icon name="star" filled className="text-[16px] text-amber-500" />{seller.rating} ({seller.reviews})</span>
            <span>{seller.sold} sold</span>
            <span className="flex items-center gap-1"><Icon name="bolt" className="text-[16px]" />{seller.response}</span>
          </div>
        </div>
      </div>

      <div role="tablist" className="flex border-b border-surface-container-high">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}
            className={`flex-1 py-2 text-label-lg border-b-2 ${tab === t ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant'}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'Products' && <ProductGrid products={items} empty="No listings from this seller yet." />}
      {tab === 'About' && (
        <div className="bg-surface-container-lowest rounded-xl p-space-md card-shadow space-y-2">
          <p>{seller.about}</p>
          <p className="flex items-center gap-1 text-on-surface-variant"><Icon name="location_on" className="text-[18px]" />Campus pickup: {seller.pickup}</p>
        </div>
      )}
      {tab === 'Reviews' && (
        <ul className="space-y-space-sm">
          {REVIEWS.map((r) => (
            <li key={r.who} className="bg-surface-container-lowest rounded-xl p-space-md card-shadow">
              <p className="text-label-lg">{r.who}</p><p className="text-body-md text-on-surface-variant">{r.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
