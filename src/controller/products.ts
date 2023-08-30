import { ByProjectKeyRequestBuilder } from "@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder";
import Clients from "./client";

class Products {
  clients: Clients;
  constructor() {
    this.clients = new Clients();
  }
  async getProduct() {
    const apiRoot: ByProjectKeyRequestBuilder =
      this.clients.getCredentialsFlowClient();
    const product = await apiRoot.productProjections().get().execute();
    return product;
  }

  async getProductFilter(value: string) {
    const apiRoot: ByProjectKeyRequestBuilder =
      this.clients.getCredentialsFlowClient();
    const product = await apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          filter: [`variants.attributes.lactose:"${value}"`],
        },
      })
      .execute();
    console.log(product);
    return product;
  }

  async getProductSort(value: string) {
    const apiRoot: ByProjectKeyRequestBuilder =
      this.clients.getCredentialsFlowClient();
    const productSort = await apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          sort: [`${value}`],
          limit: 25,
        },
      })
      .execute();
    return productSort;
  }
}

export default Products;
