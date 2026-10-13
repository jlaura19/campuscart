import { IMG } from './images';

export const CATEGORIES = ['Textbooks', 'Dorm', 'Electronics', 'Food & Drink', 'Crafts', 'Services'];
export const SELLER_TYPES = { SecondHand: '#SecondHand', CampusBusiness: '#CampusBusiness' };
export const CONDITIONS = ['Brand New', 'Like New', 'Second-Hand', 'Well Used'];

export const SELLERS = {
  matcha: {
    id: 'matcha', name: 'Midnight Matcha & Bakes', owner: 'Maya Lin', tagline: 'Design \u201925',
    type: 'CampusBusiness', rating: 4.9, reviews: 84, sold: 142, response: '<15m',
    pickup: 'Baker Hall lobby', cover: IMG.storeHero,
    about: 'Late-night matcha treats and bakes made in a dorm kitchen. Order by 8pm for same-night campus pickup.',
  },
  clay: {
    id: 'clay', name: 'Clay & Kiln Studio', owner: 'Devon M.', tagline: 'BFA \u201924',
    type: 'CampusBusiness', rating: 4.8, reviews: 91, sold: 63, response: '<1h',
    pickup: 'Art Building steps', cover: IMG.clay,
    about: 'Hand-thrown mugs and bowls, glazed in the campus studio.',
  },
  screens: {
    id: 'screens', name: 'QuadScreen Lab', owner: 'Alex T.', tagline: 'CompEng \u201926',
    type: 'CampusBusiness', rating: 4.9, reviews: 34, sold: 51, response: '<30m',
    pickup: 'Library atrium', cover: IMG.screens,
    about: 'Fast phone and laptop screen repairs between classes.',
  },
  me: {
    id: 'me', name: 'My Campus Shop', owner: 'You', tagline: 'Verified .edu',
    type: 'SecondHand', rating: 5.0, reviews: 0, sold: 0, response: '<1h',
    pickup: 'Quad-safe meetup zones', cover: IMG.lamp,
    about: 'Items you have listed on CampusCart.',
  },
  peer: {
    id: 'peer', name: 'Campus Peers', owner: 'Verified students', tagline: '.edu',
    type: 'SecondHand', rating: 4.7, reviews: 210, sold: 0, response: '<1h',
    pickup: 'Quad-safe meetup zones', cover: IMG.textbook,
    about: 'Pre-loved finds from verified .edu students.',
  },
};

export const INITIAL_PRODUCTS = [
  { id: 'p1', title: 'Late Night Matcha Cookies (6)', price: 9, category: 'Food & Drink', sellerType: 'CampusBusiness', condition: 'Brand New', sellerId: 'matcha', location: 'Baker Hall', posted: '2h ago', image: IMG.matcha },
  { id: 'p2', title: 'Sea Salt Matcha Blondies (Box of 4)', price: 12, category: 'Food & Drink', sellerType: 'CampusBusiness', condition: 'Brand New', sellerId: 'matcha', location: 'Baker Hall', posted: '3h ago', image: IMG.blondies },
  { id: 'p3', title: 'Dorm Desk Vinyl Sticker Sheet', price: 5, category: 'Crafts', sellerType: 'CampusBusiness', condition: 'Brand New', sellerId: 'matcha', location: 'Baker Hall', posted: '1d ago', image: IMG.stickers },
  { id: 'p4', title: 'Cold Whisk Matcha Kit', price: 22, category: 'Food & Drink', sellerType: 'CampusBusiness', condition: 'Brand New', sellerId: 'matcha', location: 'Baker Hall', posted: '1d ago', image: IMG.kit },
  { id: 'p5', title: 'Custom Birthday Bento Cake', price: 28, category: 'Food & Drink', sellerType: 'CampusBusiness', condition: 'Brand New', sellerId: 'matcha', location: 'Baker Hall', posted: '2d ago', image: IMG.cake },
  { id: 'p6', title: 'Handmade Ceramic Mug', price: 18, category: 'Crafts', sellerType: 'CampusBusiness', condition: 'Brand New', sellerId: 'clay', location: 'Art Building', posted: '5h ago', image: IMG.clay },
  { id: 'p7', title: 'Phone Screen Repair (any model)', price: 25, category: 'Services', sellerType: 'CampusBusiness', condition: 'Brand New', sellerId: 'screens', location: 'Library', posted: '6h ago', image: IMG.screens },
  { id: 'p8', title: 'Orgo Chem 8th Ed + Solutions', price: 32, retail: 180, category: 'Textbooks', sellerType: 'SecondHand', condition: 'Like New', sellerId: 'peer', seller: 'Mia', location: 'Maple Hall 3F', posted: '10m ago', image: IMG.textbook },
  { id: 'p9', title: 'Galanz Mini Fridge 2.5 Cu', price: 45, retail: 149, category: 'Dorm', sellerType: 'SecondHand', condition: 'Second-Hand', sellerId: 'peer', seller: 'Liam', location: 'Baker West', posted: '1h ago', image: IMG.fridge },
  { id: 'p10', title: 'IKEA Task Lamp + Bulbs', price: 0, category: 'Dorm', sellerType: 'SecondHand', condition: 'Well Used', sellerId: 'peer', seller: 'Rosa', location: 'Oak Hall 2B', posted: 'Must take by Fri', image: IMG.lamp, urgent: true },
  { id: 'p11', title: 'TI-84 Plus CE Color Graphing', price: 60, retail: 130, category: 'Electronics', sellerType: 'SecondHand', condition: 'Like New', sellerId: 'peer', seller: 'Kai', location: 'Siebel Center', posted: '3h ago', image: IMG.calculator },
];

