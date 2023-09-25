import {
  CategoryPagedQueryResponse,
  ClientResponse,
  Product,
  ProductData,
} from "@commercetools/platform-sdk";
import { ByProjectKeyRequestBuilder } from "@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder";
// import {
//   ClientResponse,
//   Product,
// } from "@commercetools/platform-sdk/dist/declarations/src/index";
import Clients from "./client";
import { paramQueryArgs } from "../core/types/types";

class Products {
  clients: Clients;
  constructor() {
    this.clients = new Clients();
  }
  async getProducts(queryArgs: paramQueryArgs) {
    const apiRoot: ByProjectKeyRequestBuilder =
      this.clients.getCredentialsFlowClient();
    const product = await apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: queryArgs,
      })
      .execute();
    const totalCard = String(product.body.total);
    localStorage.setItem("totalCard", totalCard);
    return product;
  }

  async getProductByID(id: string): Promise<ProductData> {
    const apiRoot: ByProjectKeyRequestBuilder =
      this.clients.getCredentialsFlowClient();
    const product: ClientResponse<Product> = await apiRoot
      .products()
      .withId({ ID: id })
      .get()
      .execute();
    return product.body.masterData.current;
  }

  async getCategoriesId(index: number): Promise<string> {
    const apiRoot: ByProjectKeyRequestBuilder =
      this.clients.getCredentialsFlowClient();
    const categories: ClientResponse<CategoryPagedQueryResponse> = await apiRoot
      .categories()
      .get()
      .execute();
    const id: string = categories.body.results[index].id;
    return id;
  }
}

export default Products;
