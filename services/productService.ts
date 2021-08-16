import { Product, TopLevelCategory, TopPageEntity } from "../generated/types";
import { initializeApollo } from "../lib/apolloClient";
import { FIND_PRODUCTS_BY_TEXT, FIND_TOP_PAGES_BY_CATEGORY, GET_PRODUCT, GET_PRODUCTS } from "./queries";

export class ProductService {
  public async getProduct(id: number): Promise<Product | null> {
    const apolloClient = initializeApollo();

    const response = await apolloClient
      .query<{ product: Product }>({
        query: GET_PRODUCT,
        variables: {
          id
        },
      })
      .catch((err) => {
        throw err;
      });
      
    if (response && response.data && response.data.product)
      return response.data.product;

    return null;
  }

  public async findProductsByText(query: string): Promise<Product[] | null> {
    const apolloClient = initializeApollo();

    const response = await apolloClient
      .query<{ findProductsByText: Product[] }>({
        query: FIND_PRODUCTS_BY_TEXT,
        variables: {
          query
        },
      })
      .catch((err) => {
        throw err;
      });
      
    if (response && response.data && response.data.findProductsByText)
      return response.data.findProductsByText;

    return null;
  }

  public async getProducts(): Promise<Product[]> {
    const apolloClient = initializeApollo();

    const response = await apolloClient
      .query<{ products: Product[] }>({
        query: GET_PRODUCTS,
        variables: {
          findAllProductDto: {}
        },
      })
      .catch((err) => {
        throw err;
      });
      
    if (response && response.data && response.data.products)
      return response.data.products;

    return [];
  }
}

export default new ProductService();
