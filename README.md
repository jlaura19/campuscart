# CampusCart

Vite + React + Tailwind (v3) mock campus marketplace, built from the Stitch prototype.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
```

Structure: `src/context/StoreContext.jsx` (filters, cart, wishlist, listings), `src/data/` (mock data), `src/components/` (Navbar, BottomNav, Filters, ProductCard, ListingModal, CartDrawer, SellerStorefront, ProfileView, WishlistView). Design tokens live in `tailwind.config.js`. State is in-memory only.
