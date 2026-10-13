import { useStore } from '../context/StoreContext';
import Icon from './Icon';

const TABS = [
  { view: 'feed', icon: 'storefront', label: 'Feed' },
  { view: 'storefront', icon: 'store', label: 'Shops' },
  { view: 'post', icon: 'add_circle', label: 'Post' },
  { view: 'wishlist', icon: 'favorite', label: 'Saved' },
  { view: 'profile', icon: 'person', label: 'Profile' },
];

export default function BottomNav() {
  const { view, setView, openModal } = useStore();
  return (
    <nav className="fixed bottom-0 left-0 w-full z-30 flex justify-around items-center px-margin py-space-xs bg-surface-container-lowest border-t border-surface-container-high">
      {TABS.map((t) => {
        const active = view === t.view;
        return (
          <button
            key={t.view}
            onClick={() => (t.view === 'post' ? openModal('list') : setView(t.view))}
            className={`flex flex-col items-center py-1 px-3 rounded-xl ${active ? 'text-primary' : 'text-on-surface-variant'} ${t.view === 'post' ? 'text-primary-container' : ''}`}
          >
            <Icon name={t.icon} filled={active || t.view === 'post'} className={t.view === 'post' ? 'text-[32px]' : ''} />
            <span className="text-label-sm">{t.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
