import { Cart } from "@commercetools/platform-sdk";
import { ClientResponse } from "@commercetools/sdk-client-v2";
import Clients from "./client";
import ClientsAnonymous from "./clientAnonymous";

class Carts {
  clients: Clients;
  clientsAnonymous: ClientsAnonymous;

  constructor() {
    this.clients = new Clients();
    this.clientsAnonymous = new ClientsAnonymous();
  }

  async createAnonymousCarts() {
    const apiRoot = this.clientsAnonymous.getAnonymousSessionFlowClient();
    const cart = await apiRoot
      .me()
      .carts()
      .post({
        body: { currency: "EUR", country: "DE" },
      })
      .execute();
    localStorage.setItem("idCarts", JSON.stringify(cart.body.id));
    localStorage.setItem("objectCart", JSON.stringify(cart));
    return cart;
  }

  async getCartsOnId() {
    const id: string = localStorage.getItem("idCarts")?.slice(1, -1) as string;
    const apiRoot = this.clientsAnonymous.getAnonymousSessionFlowClient();
    const carts = await apiRoot.carts().withId({ ID: id }).get().execute();
    localStorage.setItem("objectCart", JSON.stringify(carts));
    return carts;
  }

  async getCart() {
    if (localStorage.getItem("idCarts")) {
      const cart = await this.getCartsOnId();
      return cart;
    } else {
      const cart = await this.createAnonymousCarts();
      return cart;
    }
  }

  async addProductOnCart(sku: string, version: number) {
    const id: string = localStorage.getItem("idCarts")?.slice(1, -1) as string;
    const apiRoot = this.clientsAnonymous.getAnonymousSessionFlowClient();
    const product = await apiRoot
      .carts()
      .withId({ ID: id })
      .post({
        body: {
          version: version,
          actions: [
            {
              action: "addLineItem",
              sku: sku,
            },
          ],
        },
      })
      .execute();
    localStorage.setItem("objectCart", JSON.stringify(product));
    return product;
  }

  async removeProductOnCart(lineItemId: string) {
    const cart: ClientResponse<Cart> = JSON.parse(
      localStorage.getItem("objectCart") as string,
    );
    const version = cart.body?.version || 0;
    const id: string = localStorage.getItem("idCarts")?.slice(1, -1) as string;
    const apiRoot = this.clientsAnonymous.getAnonymousSessionFlowClient();

    const product = await apiRoot
      .carts()
      .withId({ ID: id })
      .post({
        body: {
          version: version,
          actions: [
            {
              action: "removeLineItem",
              lineItemId: lineItemId,
            },
          ],
        },
      })
      .execute();

    localStorage.setItem("objectCart", JSON.stringify(product));

    if (product.body.discountCodes.length && !product.body.lineItems.length) {
      for (const discountCode of product.body.discountCodes) {
        const cart: ClientResponse<Cart> = JSON.parse(
          localStorage.getItem("objectCart") as string,
        );
        const version = cart.body?.version || 0;
        const product = await apiRoot
          .carts()
          .withId({ ID: id })
          .post({
            body: {
              version: version,
              actions: [
                {
                  action: "removeDiscountCode",
                  discountCode: {
                    typeId: "discount-code",
                    id: discountCode.discountCode.id,
                  },
                },
              ],
            },
          })
          .execute();
        localStorage.setItem("objectCart", JSON.stringify(product));
      }
    }

    return product;
  }

  async changeQtyProductOnCart(lineItemId: string, qty: string) {
    const cart = JSON.parse(localStorage.getItem("objectCart") as string);
    const version = cart.body.version;
    const id: string = localStorage.getItem("idCarts")?.slice(1, -1) as string;
    const apiRoot = this.clientsAnonymous.getAnonymousSessionFlowClient();
    const product = await apiRoot
      .carts()
      .withId({ ID: id })
      .post({
        body: {
          version: version,
          actions: [
            {
              action: "changeLineItemQuantity",
              lineItemId: lineItemId,
              quantity: +qty,
            },
          ],
        },
      })
      .execute();
    localStorage.setItem("objectCart", JSON.stringify(product));
    return product;
  }

  async createCustomerCarts(email: string, login: string) {
    const apiRoot = this.clients.getPasswordFlowClient(email, login);
    const customer = await apiRoot
      .me()
      .carts()
      .post({
        body: {
          customerEmail: email,
          currency: "${String.fromCharCode(8364)}",
        },
      })
      .execute();
    localStorage.setItem("idCarts", JSON.stringify(customer.body.id));
    localStorage.setItem("objectCart", JSON.stringify(customer));
    return customer;
  }

  async addPromoCode(promoCode: string) {
    const id: string = localStorage.getItem("idCarts")?.slice(1, -1) as string;
    const objectCart = JSON.parse(localStorage.getItem("objectCart") as string);
    const version = objectCart.body.version;
    const apiRoot = this.clientsAnonymous.getAnonymousSessionFlowClient();
    const cart = await apiRoot
      .carts()
      .withId({ ID: id })
      .post({
        body: {
          version: version,
          actions: [
            {
              action: "addDiscountCode",
              code: promoCode,
            },
          ],
        },
      })
      .execute();
    localStorage.setItem("objectCart", JSON.stringify(cart));
    return cart;
  }
}
export default Carts;
