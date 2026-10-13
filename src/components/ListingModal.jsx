import { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES, CONDITIONS, SELLER_TYPES } from '../data/products';
import { IMG } from '../data/images';
import Icon from './Icon';

const EMPTY = { title: '', price: '', category: CATEGORIES[0], condition: 'Second-Hand', sellerType: 'SecondHand', location: '', image: '' };

export default function ListingModal() {
  const { closeModal, addProduct, setView } = useStore();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.title.trim()) errs.title = 'Add a title';
    if (form.price === '' || Number(form.price) < 0) errs.price = 'Enter a price (0 for free)';
    if (!form.location.trim()) errs.location = 'Add a meetup location';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    addProduct({
      title: form.title.trim(),
      price: Number(form.price),
      category: form.category,
      condition: form.condition,
      sellerType: form.sellerType,
      sellerId: 'me',
      seller: 'You',
      location: form.location.trim(),
      image: form.image.trim() || IMG.lamp,
    });
    closeModal();
    setView('feed');
  };

  const field = 'w-full rounded-xl border-outline-variant focus:border-primary focus:ring-primary';
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40" onClick={closeModal}>
      <form role="dialog" aria-label="List an item" onSubmit={submit} onClick={(e) => e.stopPropagation()} className="w-full max-w-md max-h-[92vh] overflow-y-auto bg-surface rounded-t-2xl sm:rounded-2xl p-space-md space-y-space-lg">
        <header className="flex items-center justify-between">
          <h2 className="text-headline-lg">List an item</h2>
          <button type="button" aria-label="Close" onClick={closeModal}><Icon name="close" /></button>
        </header>

        <label className="block space-y-1">
          <span className="text-label-lg">Title</span>
          <input className={field} value={form.title} onChange={(e) => set({ title: e.target.value })} placeholder="e.g. Calculus textbook" />
          {errors.title && <span className="text-error text-body-sm">{errors.title}</span>}
        </label>

        <fieldset className="space-y-1">
          <legend className="text-label-lg">I am selling as</legend>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(SELLER_TYPES).map(([key, label]) => (
              <button type="button" key={key} aria-pressed={form.sellerType === key} onClick={() => set({ sellerType: key })}
                className={`py-2 rounded-xl border text-label-lg ${form.sellerType === key ? 'bg-primary-container text-white border-primary-container' : 'border-outline-variant bg-surface-container-lowest'}`}>
                {label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="space-y-1">
          <legend className="text-label-lg">Condition</legend>
          <div className="flex flex-wrap gap-2">
            {CONDITIONS.map((c) => (
              <button type="button" key={c} aria-pressed={form.condition === c} onClick={() => set({ condition: c })}
                className={`px-3 py-1.5 rounded-full text-label-lg border ${form.condition === c ? 'bg-secondary-container text-on-secondary-container border-secondary' : 'border-outline-variant bg-surface-container-lowest'}`}>
                {c}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="grid grid-cols-2 gap-3">
          <label className="block space-y-1">
            <span className="text-label-lg">Price ($)</span>
            <input type="number" min="0" className={field} value={form.price} onChange={(e) => set({ price: e.target.value })} />
            {errors.price && <span className="text-error text-body-sm">{errors.price}</span>}
          </label>
          <label className="block space-y-1">
            <span className="text-label-lg">Category</span>
            <select className={field} value={form.category} onChange={(e) => set({ category: e.target.value })}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
        </div>

        <label className="block space-y-1">
          <span className="text-label-lg">Meetup location</span>
          <input className={field} value={form.location} onChange={(e) => set({ location: e.target.value })} placeholder="e.g. Library atrium" />
          {errors.location && <span className="text-error text-body-sm">{errors.location}</span>}
        </label>

        <label className="block space-y-1">
          <span className="text-label-lg">Photo URL (optional)</span>
          <input className={field} value={form.image} onChange={(e) => set({ image: e.target.value })} placeholder="https://..." />
        </label>

        <button type="submit" className="w-full py-3 rounded-xl bg-primary-container text-white text-label-lg">Post listing</button>
      </form>
    </div>
  );
}
