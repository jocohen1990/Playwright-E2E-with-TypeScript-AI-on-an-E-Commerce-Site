/** Envelope every Valentino's Magic Beans API response is wrapped in. */
export interface ApiResponse<T> {
    success: boolean;
    data: T;
}

export interface ApiProduct {
    id: string;
    name: string;
    price: number;
    stock: number;
    origin: string;
    roastLevel: string;
    description: string;
    image: string;
}

export interface CreateOrderRequest {
    customerDetails?: {
        firstName: string;
        lastName: string;
        email: string;
        address: string;
        city: string;
        zipCode: string;
        country: string;
    };
    items: { productId: string; quantity: number }[];
}

export interface CreateOrderResult {
    orderId: string;
    message: string;
}

export interface ErrorResult {
    message: string;
}
