import { useStore } from '../context/StoreContext';
import Icon from './Icon';

export default function CartDrawer() {
  const { cartItems, cartTotal, setQty, closeModal, checkout } = useStore();
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onClick={closeModal}>
      <aside role="dialog" aria-label="Cart" onClick={(e) => e.stopPropagation()} className="w-full max-w-sm bg-surface h-full flex flex-col">
        <header className="flex items-center justify-between p-space-md bg-surface-container-lowest shadow-sm">
          <h2 className="text-headline-md">Your cart</h2>
          <button aria-label="Close cart" onClick={closeModal}><Icon name="close" /></button>
        </header>
        <ul className="flex-1 overflow-y-auto p-space-md space-y-space-sm">
          {!cartItems.length && <li className="text-center text-on-surface-variant py-10">Your cart is empty.</li>}
          {cartItems.map(({ product: p, qty }) => (
            <li key={p.id} className="flex gap-3 bg-surface-container-lowest rounded-xl p-space-sm card-shadow">
              <img src={p.image} alt="" className="w-16 h-16 rounded-lg object-cover" />
              <div className="flex-1">
                <p className="text-label-lg line-clamp-2">{p.title}</p>
                <p className="text-primary text-label-lg">{p.price === 0 ? 'FREE' : `$${p.price * qty}`}</p>
                <div className="flex items-center gap-2 mt-1">
                  <button aria-label="Decrease" onClick={() => setQty(p.id, qty - 1)} className="w-6 h-6 rounded-full bg-surface-container-high">−</button>
                  <span className="text-label-lg">{qty}</span>
                  <button aria-label="Increase" onClick={() => setQty(p.id, qty + 1)} className="w-6 h-6 rounded-full bg-surface-container-high">+</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <footer className="p-space-md bg-surface-container-lowest space-y-2">
          <div className="flex justify-between text-headline-md"><span>Total</span><span>${cartTotal}</span></div>
          <button disabled={!cartItems.length} onClick={checkout} className="w-full py-3 rounded-xl bg-primary-container text-white text-label-lg disabled:opacity-40">
            Reserve &amp; arrange meetup
          </button>
        </footer>
      </aside>
    </div>
  );
}
