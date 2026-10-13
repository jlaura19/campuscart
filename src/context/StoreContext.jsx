import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { INITIAL_PRODUCTS, SELLERS } from '../data/products';

const DEFAULT_FILTERS = { query: '', category: 'All', sellerType: 'All', maxPrice: 200, freeOnly: false, sort: 'newest' };

const initial = {
  products: INITIAL_PRODUCTS,
  filters: DEFAULT_FILTERS,
  cart: {},
  wishlist: [],
  view: 'feed',
  sellerId: 'matcha',
  modal: null,
  toast: null,
  orders: [],
  chats: {},
  activeChat: null,
  profileTab: 'Buying',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FILTER':
      return { ...state, filters: { ...state.filters, ...action.patch } };
    case 'RESET_FILTERS':
      return { ...state, filters: DEFAULT_FILTERS };
    case 'SET_VIEW':
      return { ...state, view: action.view, sellerId: action.sellerId ?? state.sellerId };
    case 'OPEN_MODAL':
      return { ...state, modal: action.modal };
    case 'ADD_TO_CART': {
      const qty = (state.cart[action.id] || 0) + 1;
      return { ...state, cart: { ...state.cart, [action.id]: qty } };
    }
    case 'SET_QTY': {
      const cart = { ...state.cart };
      if (action.qty <= 0) delete cart[action.id];
      else cart[action.id] = action.qty;
      return { ...state, cart };
    }
    case 'CHECKOUT': {
      const chats = { ...state.chats };
      const orders = [...state.orders];
      action.items.forEach(({ product, qty }, i) => {
        const seller = sellerNameOf(product);
        orders.push({ id: `o${action.at}-${i}`, productId: product.id, qty, seller, status: 'Reserved' });
        const text = `Hi! I'd like to reserve "${product.title}" (x${qty}). When can we meet?`;
        chats[seller] = [...(chats[seller] || []), { from: 'me', text }];
      });
      const first = action.items.length ? sellerNameOf(action.items[0].product) : state.activeChat;
      return { ...state, cart: {}, orders, chats, modal: null, view: 'profile', profileTab: 'Chats', activeChat: first };
    }
    case 'SEND_MESSAGE':
      return { ...state, chats: { ...state.chats, [action.seller]: [...(state.chats[action.seller] || []), { from: action.from, text: action.text }] } };
    case 'SET_PROFILE_TAB':
      return { ...state, profileTab: action.tab };
    case 'SET_ACTIVE_CHAT':
      return { ...state, activeChat: action.seller };    case 'TOGGLE_WISH':
      return {
        ...state,
        wishlist: state.wishlist.includes(action.id)
          ? state.wishlist.filter((i) => i !== action.id)
          : [...state.wishlist, action.id],
      };
    case 'ADD_PRODUCT':
      return { ...state, products: [action.product, ...state.products] };
    case 'TOAST':
      return { ...state, toast: action.message };
    default:
      return state;
  }
}

export const sellerNameOf = (p) => p.seller ?? SELLERS[p.sellerId]?.name ?? 'Seller';

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial);

  const toast = useCallback((message) => {
    dispatch({ type: 'TOAST', message });
    setTimeout(() => dispatch({ type: 'TOAST', message: null }), 2200);
  }, []);

  const visibleProducts = useMemo(() => {
    const { query, category, sellerType, maxPrice, freeOnly, sort } = state.filters;
    const q = query.trim().toLowerCase();
    const list = state.products.filter(
      (p) =>
        (category === 'All' || p.category === category) &&
        (sellerType === 'All' || p.sellerType === sellerType) &&
        p.price <= maxPrice &&
        (!freeOnly || p.price === 0) &&
        (!q || p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
    );
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    return list;
  }, [state.products, state.filters]);

  const cartItems = useMemo(
    () => Object.entries(state.cart).map(([id, qty]) => ({ product: state.products.find((p) => p.id === id), qty })).filter((i) => i.product),
    [state.cart, state.products]
  );
  const cartCount = cartItems.reduce((n, i) => n + i.qty, 0);
  const cartTotal = cartItems.reduce((n, i) => n + i.qty * i.product.price, 0);

  const actions = useMemo(
    () => ({
      setFilter: (patch) => dispatch({ type: 'SET_FILTER', patch }),
      resetFilters: () => dispatch({ type: 'RESET_FILTERS' }),
      setView: (view, sellerId) => dispatch({ type: 'SET_VIEW', view, sellerId }),
      openModal: (modal) => dispatch({ type: 'OPEN_MODAL', modal }),
      closeModal: () => dispatch({ type: 'OPEN_MODAL', modal: null }),
      addToCart: (p) => { dispatch({ type: 'ADD_TO_CART', id: p.id }); toast(`Added "${p.title}" to cart`); },
      setQty: (id, qty) => dispatch({ type: 'SET_QTY', id, qty }),
      setProfileTab: (tab) => dispatch({ type: 'SET_PROFILE_TAB', tab }),
      setActiveChat: (seller) => dispatch({ type: 'SET_ACTIVE_CHAT', seller }),
      openChat: (seller) => {
        dispatch({ type: 'SET_ACTIVE_CHAT', seller });
        dispatch({ type: 'SET_PROFILE_TAB', tab: 'Chats' });
        dispatch({ type: 'OPEN_MODAL', modal: null });
        dispatch({ type: 'SET_VIEW', view: 'profile' });
      },
      sendMessage: (seller, text) => {
        dispatch({ type: 'SEND_MESSAGE', seller, from: 'me', text });
        setTimeout(() => dispatch({ type: 'SEND_MESSAGE', seller, from: 'seller', text: "Sounds good! Let's meet at a Quad-Safe zone." }), 1200);
      },      toggleWish: (id) => dispatch({ type: 'TOGGLE_WISH', id }),
      addProduct: (p) => {
        dispatch({ type: 'ADD_PRODUCT', product: { ...p, id: `u${Date.now()}`, posted: 'Just now' } });
        toast('Your item is live!');
      },
      toast,
    }),
    [toast]
  );

  const checkout = () => {
    if (!cartItems.length) return;
    dispatch({ type: 'CHECKOUT', items: cartItems, at: Date.now() });
    toast('Reserved! Chat with your sellers to arrange a meetup.');
  };

  const value = { ...state, toastMessage: state.toast, visibleProducts, cartItems, cartCount, cartTotal, sellers: SELLERS, ...actions, checkout };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useStore = () => useContext(StoreContext);
