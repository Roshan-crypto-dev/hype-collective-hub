// Shared mock data used across pages.
import dunk from "@/assets/p-dunk.jpg";
import yeezy from "@/assets/p-yeezy.jpg";
import hoodie from "@/assets/p-hoodie.jpg";
import jordan4 from "@/assets/p-jordan4.jpg";
import offwhite from "@/assets/p-offwhite.jpg";
import gazelle from "@/assets/p-gazelle.jpg";
import chicago from "@/assets/p-chicago.jpg";

export const productImages = { dunk, yeezy, hoodie, jordan4, offwhite, gazelle, chicago };

export type LiveAuction = {
  id: string;
  name: string;
  brand: string;
  size: string;
  condition: string;
  bid: number;
  endsIn: string;
  watching: number;
  image: string;
  live?: boolean;
};

export const liveAuctions: LiveAuction[] = [
  { id: "dunk-panda", name: "Nike Dunk Low Panda", brand: "Nike", size: "US 9", condition: "DS", bid: 18500, endsIn: "00:42", watching: 21, image: dunk, live: true },
  { id: "yeezy-beluga", name: "Yeezy 350 V2 Beluga", brand: "Yeezy", size: "US 9.5", condition: "VNDS", bid: 25200, endsIn: "01:12", watching: 34, image: yeezy, live: true },
  { id: "supreme-hoodie", name: "Supreme Box Logo Hoodie", brand: "Supreme", size: "L", condition: "DS", bid: 31000, endsIn: "02:15", watching: 18, image: hoodie, live: true },
  { id: "jordan4-uni", name: "Air Jordan 4 University Blue", brand: "Jordan", size: "US 10", condition: "DS", bid: 28750, endsIn: "02:31", watching: 12, image: jordan4, live: true },
  { id: "offwhite-aj1", name: "Off-White Air Jordan 1", brand: "Nike", size: "US 9", condition: "DS", bid: 28000, endsIn: "03:33", watching: 16, image: offwhite, live: true },
  { id: "gazelle-pink", name: "Adidas Gazelle Bold Pink", brand: "Adidas", size: "UK 7", condition: "DS", bid: 9800, endsIn: "04:20", watching: 9, image: gazelle, live: true },
];

export type ShopItem = {
  id: string;
  name: string;
  condition: string;
  price: number;
  image: string;
  watching?: number;
  verified?: boolean;
  tag?: "hot" | "new" | "last-chance";
  lastSale?: number;
};

export const shopItems: ShopItem[] = [
  { id: "aj1-chicago", name: "Air Jordan 1 Retro High OG 'Chicago'", condition: "DS / Brand New", price: 28500, image: chicago, watching: 47, verified: true, tag: "hot", lastSale: 27200 },
  { id: "aj4-white", name: "Air Jordan 4 Retro 'White Cement'", condition: "DS / Brand New", price: 32900, image: jordan4, watching: 23, verified: true, tag: "new", lastSale: 33400 },
  { id: "aj11-bred", name: "Air Jordan 11 Retro 'Bred'", condition: "DS / Brand New", price: 31500, image: offwhite, verified: true, lastSale: 30900 },
  { id: "nb-990v6", name: "New Balance 990v6 Grey", condition: "DS / Brand New", price: 24999, image: dunk, verified: true, tag: "last-chance", lastSale: 24500 },
  { id: "yeezy-foam", name: "YEEZY Foam RNR 'Sand'", condition: "DS / Brand New", price: 12999, image: yeezy, verified: true, lastSale: 13200 },
  { id: "aj1-unc", name: "Air Jordan 1 Retro High OG 'UNC Toe'", condition: "DS / Brand New", price: 27900, image: chicago, verified: true, tag: "hot", lastSale: 27500 },
  { id: "fog-hoodie", name: "Fear of God Essentials Hoodie Black", condition: "DS / Brand New", price: 8499, image: hoodie, verified: true, lastSale: 8200 },
  { id: "bearbrick", name: "Bearbrick 100% & 400% Set", condition: "DS / Brand New", price: 14999, image: offwhite, watching: 12, verified: true, tag: "new", lastSale: 14400 },
];
