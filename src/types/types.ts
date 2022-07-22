export interface UserType {
  id?: number;
  userName?: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface UserUpdatedType {
  id?: number;
  userName?: string;
  firstName?: string;
  lastName?: string;
}

export interface ProductType {
  id?: number;
  name: string;
  price: number;
  category: string;
}

export interface ProductUpdatedType {
  id?: number;
  name?: string;
  price?: number;
  category?: string;
}

export interface ProductsOrderType {
  product_id: number;
  order_id: number;
  quantity: number;
}

export interface ProductNumberType extends ProductType {
  quantity?: number;
}

export interface OrderType {
  id?: number;
  user_id: number;
  status: string;
  products: ProductsOrderType[];
}

export interface OrderProductsType {
  id?: number;
  user_id: number;
  status: string;
  products: ProductNumberType[];
}
