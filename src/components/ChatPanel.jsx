import { useState } from 'react';
import { useStore, sellerNameOf } from '../context/StoreContext';
import Icon from './Icon';

export default function ChatPanel() {
  const { chats, activeChat, setActiveChat, sendMessage, orders, products } = useStore();
  const [text, setText] = useState('');
  const sellers = Object.keys(chats);

  if (!sellers.length) {
    return <p className="text-center text-on-surface-variant py-10">No conversations yet. Reserve items from your cart to start chatting with sellers.</p>;
  }
  const current = sellers.includes(activeChat) ? activeChat : sellers[0];
  const messages = chats[current];
  const items = orders.filter((o) => o.seller === current).map((o) => products.find((p) => p.id === o.productId)).filter(Boolean);

  const send = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    sendMessage(current, text.trim());
    setText('');
  };

  return (
    <div className="grid md:grid-cols-[220px_1fr] gap-space-md">
      <ul className="flex md:flex-col gap-2 overflow-x-auto no-scrollbar">
        {sellers.map((s) => (
          <li key={s} className="shrink-0">
            <button onClick={() => setActiveChat(s)} className={`w-full text-left px-3 py-2 rounded-xl border text-label-lg ${s === current ? 'bg-primary-container text-white border-primary-container' : 'bg-surface-container-lowest border-outline-variant'}`}>
              {s}
              <span className="block text-body-sm opacity-80 truncate">{chats[s].at(-1)?.text}</span>
            </button>
          </li>
        ))}
      </ul>
      <section className="bg-surface-container-lowest rounded-xl card-shadow flex flex-col h-[28rem]">
        <header className="p-space-md border-b border-surface-container-high">
          <h3 className="text-headline-md">{current}</h3>
          <p className="text-body-sm text-on-surface-variant flex items-center gap-1"><Icon name="security" className="text-[14px]" />Quad-Safe meetups only{items.length ? ` · ${items.map((p) => p.title).join(', ')}` : ''}</p>
        </header>
        <div className="flex-1 overflow-y-auto p-space-md space-y-2">
          {messages.map((m, i) => (
            <div key={i} className={`max-w-[80%] px-3 py-2 rounded-2xl text-body-md ${m.from === 'me' ? 'ml-auto bg-primary-container text-white' : 'bg-surface-container text-on-surface'}`}>{m.text}</div>
          ))}
        </div>
        <form onSubmit={send} className="flex gap-2 p-space-sm border-t border-surface-container-high">
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Message seller..." className="flex-1 rounded-full border-outline-variant focus:border-primary focus:ring-primary" />
          <button type="submit" aria-label="Send" className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center"><Icon name="send" className="text-[18px]" /></button>
        </form>
      </section>
    </div>
  );
}