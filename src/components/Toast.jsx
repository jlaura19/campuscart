import { useStore } from '../context/StoreContext';

export default function Toast() {
  const { toastMessage: message } = useStore();
  if (!message) return null;
  return (
    <div role="status" className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[60] px-4 py-2 rounded-full bg-inverse-surface text-inverse-on-surface text-label-lg elevated-shadow">
      {message}
    </div>
  );
}
