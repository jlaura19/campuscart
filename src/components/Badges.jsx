import { SELLER_TYPES } from '../data/products';

const STYLES = {
  CampusBusiness: 'bg-primary-fixed text-primary',
  SecondHand: 'bg-secondary-container text-on-secondary-container',
};

export function SellerTypeBadge({ type }) {
  return <span className={`px-2 py-0.5 rounded-full text-label-sm ${STYLES[type]}`}>{SELLER_TYPES[type]}</span>;
}

export function ConditionBadge({ condition }) {
  return <span className="px-2 py-0.5 rounded-full text-label-sm bg-surface-container-high text-on-surface-variant">{condition}</span>;
}
