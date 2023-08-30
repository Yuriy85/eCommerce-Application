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

  // async getProductName(index: number): Promise<string> {
  //   const products = await this.getProduct();
  //   const name = products.body.results[index].name["en-US"];
  //   return name;
  // }

  // async getProductDescription(index: number) {
  //   const products = await this.getProduct();
  //   const description = products.body.results[index].description;
  //   if (description) return description["en-US"];
  // }

  // async getProductPrice(index: number) {
  //   const products = await this.getProduct();
  //   const euro = products.body.results[index].masterVariant.prices?.filter(
  //     (el) => el,
  //   )[0].value.currencyCode;
  //   const price = products.body.results[index].masterVariant.prices?.filter(
  //     (el) => el,
  //   )[0].value.centAmount;
  //   const count = products.body.results[index].masterVariant.key;
  //   if (price)
  //     return `${count?.slice(count.indexOf("_") + 1)} pcs - ${
  //       price / 100
  //     }.00 ${euro}`;
  // }

  // async getProductPriceVariant(index: number) {
  //   const products = await this.getProduct();
  //   const euro = products.body.results[index].masterVariant.prices?.filter(
  //     (el) => el,
  //   )[0].value.currencyCode;
  //   const price = products.body.results[index].variants[0].prices?.filter(
  //     (el) => el,
  //   )[0].value.centAmount;
  //   const count = products.body.results[index].variants[0].key;
  //   if (price)
  //     return `${count?.slice(count.indexOf("_") + 1)} pcs - ${
  //       price / 100
  //     }.00 ${euro}`;
  // }

  // async getProductPriceVariantTwo(index: number) {
  //   const products = await this.getProduct();
  //   const euro = products.body.results[index].masterVariant.prices?.filter(
  //     (el) => el,
  //   )[0].value.currencyCode;
  //   const price = products.body.results[index].variants[1].prices?.filter(
  //     (el) => el,
  //   )[0].value.centAmount;
  //   const count = products.body.results[index].variants[1].key;
  //   if (price)
  //     return `${count?.slice(count.indexOf("_") + 1)} pcs - ${
  //       price / 100
  //     }.00 ${euro}`;
  // }

  // async getProductImage(index: number) {
  //   const products = await this.getProduct();
  //   const image = products.body.results[index].masterVariant.images?.filter(
  //     (el) => el,
  //   )[index].url;
  //   return image;
  // }

  // async search() {
  //   const apiRoot: ByProjectKeyRequestBuilder =
  //     this.clients.getCredentialsFlowClient();
  //   const product = await apiRoot.productProjections().get().execute();
  // }
}

export default Products;
