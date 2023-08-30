import {
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

  // async getCustomerObject() {
  //   const customerId: string = localStorage.getItem("id") as string;

  //   const apiRoot = this.clients.getCredentialsFlowClient();

  //   const customer = await apiRoot
  //     .customers()
  //     .withId({ ID: "907b157d-48f4-487f-b31d-176ec4da6a35" })
  //     .get()
  //     .execute();

  //   const customer_1 = await apiRoot
  //     .customers()
  //     .withId({ ID: `${customerId}` })
  //     .get()
  //     .execute();
  // }

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
