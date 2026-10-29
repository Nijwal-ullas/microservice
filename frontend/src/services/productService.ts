import api from "./api";

export interface CreateProductData {
  title: string;
  price: number;
  category: string;
}

export interface Product {
  _id: string;
  title: string;
  price: number;
  category: string;
  sellerId: string;
}

export const createProduct = async (
  data: CreateProductData,
): Promise<Product> => {
  const response = await api.post("/products", data);
  return response.data.product;
};

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get("/products");
  return response.data;
};
