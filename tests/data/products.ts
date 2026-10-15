export interface Product {
    id: string;
    name: string;
    price: number;
}

/** Catalog entry from the demo store's seeded product list. */
export const brazilianSantos: Product = {
    id: '504',
    name: 'Brazilian Santos',
    price: 22.99,
};

/** Flat shipping fee charged on orders below the free-shipping threshold. */
export const SHIPPING_FEE = 5.99;
