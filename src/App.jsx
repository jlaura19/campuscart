import { useStore } from './context/StoreContext';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import FeedView from './components/FeedView';
import SellerStorefront from './components/SellerStorefront';
import WishlistView from './components/WishlistView';
import ProfileView from './components/ProfileView';
import ListingModal from './components/ListingModal';
import CartDrawer from './components/CartDrawer';
import Toast from './components/Toast';

const VIEWS = {
  feed: FeedView,
  storefront: SellerStorefront,
  wishlist: WishlistView,
  profile: ProfileView,
};

export default function App() {
  const { view, modal } = useStore();
  const View = VIEWS[view] ?? FeedView;
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-margin pt-space-md">
        <View />
      </main>
      <BottomNav />
      {modal === 'list' && <ListingModal />}
      {modal === 'cart' && <CartDrawer />}
      <Toast />
    </>
  );
}
