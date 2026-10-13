import { useStore, sellerNameOf } from '../context/StoreContext';
import ProductGrid from './ProductGrid';
import ChatPanel from './ChatPanel';
import Icon from './Icon';
import { IMG } from '../data/images';

const TABS = ['Buying', 'Chats', 'My Listings', 'Account'];

export default function ProfileView() {
  const { products, orders, cartItems, cartTotal, chats, openModal, openChat, profileTab: tab, setProfileTab: setTab } = useStore();
  const mine = products.filter((p) => p.sellerId === 'me');
  const orderItems = orders.map((o) => ({ ...o, product: products.find((p) => p.id === o.productId) })).filter((o) => o.product);

  return (
    <div className="space-y-space-lg">
      <div className="flex items-center gap-4 bg-surface-container-lowest rounded-xl p-space-md card-shadow">
        <img src={IMG.avatar} alt="" className="w-16 h-16 rounded-full object-cover" />
        <div className="flex-1">
          <h1 className="text-headline-lg">Your Profile</h1>
          <p className="text-body-md text-on-surface-variant">Verified .edu · North Campus</p>
        </div>
        <button onClick={() => openModal('list')} className="px-3 py-1.5 rounded-full bg-primary-container text-white text-label-lg">List an item</button>
      </div>

      <div role="tablist" className="flex border-b border-surface-container-high overflow-x-auto no-scrollbar">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}
            className={`flex-1 whitespace-nowrap px-2 py-2 text-label-lg border-b-2 ${tab === t ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant'}`}>
            {t}{t === 'Chats' && Object.keys(chats).length > 0 ? ` (${Object.keys(chats).length})` : ''}
          </button>
        ))}
      </div>

      {tab === 'Buying' && (
        <div className="space-y-space-lg">
          <section className="space-y-space-sm">
            <h2 className="text-headline-md">In your cart</h2>
            {!cartItems.length && <p className="text-on-surface-variant">Your cart is empty.</p>}
            {cartItems.map(({ product: p, qty }) => (
              <Row key={p.id} product={p} right={`x${qty} · ${p.price === 0 ? 'FREE' : `$${p.price * qty}`}`} />
            ))}
            {cartItems.length > 0 && (
              <button onClick={() => openModal('cart')} className="px-4 py-2 rounded-xl bg-primary-container text-white text-label-lg">Review cart &amp; reserve (${cartTotal})</button>
            )}
          </section>
          <section className="space-y-space-sm">
            <h2 className="text-headline-md">Reserved items</h2>
            {!orderItems.length && <p className="text-on-surface-variant">Nothing reserved yet.</p>}
            {orderItems.map((o) => (
              <Row key={o.id} product={o.product} right={o.status}>
                <button onClick={() => openChat(o.seller)} className="flex items-center gap-1 text-primary text-label-lg"><Icon name="chat" className="text-[16px]" />Chat with {o.seller}</button>
              </Row>
            ))}
          </section>
        </div>
      )}
      {tab === 'Chats' && <ChatPanel />}
      {tab === 'My Listings' && <ProductGrid products={mine} empty="You haven't listed anything yet." />}
      {tab === 'Account' && <p className="text-on-surface-variant">Mock account settings — wire to a backend later.</p>}
    </div>
  );
}

function Row({ product: p, right, children }) {
  return (
    <div className="flex gap-3 items-center bg-surface-container-lowest rounded-xl p-space-sm card-shadow">
      <img src={p.image} alt="" className="w-14 h-14 rounded-lg object-cover" />
      <div className="flex-1 min-w-0">
        <p className="text-label-lg truncate">{p.title}</p>
        <p className="text-body-sm text-on-surface-variant">{sellerNameOf(p)}</p>
        {children}
      </div>
      <span className="text-label-lg text-primary">{right}</span>
    </div>
  );
}