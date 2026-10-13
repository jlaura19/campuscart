import { useStore } from '../context/StoreContext';
import Icon from './Icon';
import { SellerTypeBadge, ConditionBadge } from './Badges';

export default function ProductCard({ product: p }) {
  const { wishlist, toggleWish, addToCart, sellers, setView } = useStore();
  const saved = wishlist.includes(p.id);
  const seller = sellers[p.sellerId];
  return (
    <article className="bg-surface-container-lowest rounded-xl overflow-hidden card-shadow flex flex-col">
      <div className="relative aspect-square bg-surface-container">
        <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover" />
        <button
          aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={() => toggleWish(p.id)}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center active:scale-90"
        >
          <Icon name="favorite" filled={saved} className={`text-[18px] ${saved ? 'text-tertiary-container' : 'text-on-surface-variant'}`} />
        </button>
        <div className="absolute bottom-2 left-2"><SellerTypeBadge type={p.sellerType} /></div>
      </div>
      <div className="p-space-md flex flex-col gap-1 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-headline-md text-primary">{p.price === 0 ? 'FREE' : `$${p.price}`}</span>
          {p.retail && <span className="text-body-sm text-outline line-through">${p.retail}</span>}
        </div>
        <h3 className="text-label-lg line-clamp-2">{p.title}</h3>
        <div className="flex items-center gap-1 flex-wrap"><ConditionBadge condition={p.condition} />{p.urgent && <span className="text-label-sm text-tertiary-container">Urgent</span>}</div>
        <button
          onClick={() => seller && setView('storefront', p.sellerId)}
          className="flex items-center text-body-sm text-on-surface-variant hover:text-primary text-left"
        >
          <Icon name="shield" className="text-[14px] mr-1" />
          {p.seller ?? seller?.name} · {p.location} · {p.posted}
        </button>
        <button onClick={() => addToCart(p)} className="mt-auto pt-1">
          <span className="block w-full py-2 rounded-xl bg-primary-container text-white text-label-lg text-center hover:bg-primary active:scale-95 transition">
            Add to cart
          </span>
        </button>
      </div>
    </article>
  );
}
