import api from "./api";

export interface Product {
  _id: string;
  title: string;
  price: number;
  category: string;
}

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>("/products");
  return response.data;
};