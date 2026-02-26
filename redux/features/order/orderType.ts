export interface AddToCartRequest {
    type: string;
    name: string;
    quantity: number;
    price: number;
    total_price: number;
    shipping_method: string;
    shipping_price: number;
    meta: {
        test: {
            id: number;
            title: string;
            base_price: number;
        };
        addons: {
            id: number;
            name: string;
            price: number;
        }[];
    };
}


export interface CreateCartResponse {
    status: string;
    success: boolean;
    message: string;
    data: {
      id: number;
      user_id: number;
      type: string;
      name: string;
      quantity: number;
      price: number;
      total_price: number;
      shipping_method: string;
      shipping_price: number;
      shipping_address: string | null;
      created_at: string;
      updated_at: string;
      meta: {
        test: {
          id: number;
          title: string;
          base_price: number;
        };
        addons: {
          id: number;
          name: string;
          price: number;
        }[];
      };
    };
  }






  // {
  //   "shipping_method": "shipping_label",
  //   "shipping_address": "123 street, Utah 84620, USA",
  //   "shipping_price": 25
  // }

  export interface UpdateShippingDetailsRequest {
    shipping_method: string;
    shipping_address: string;
    shipping_price: number;
  }