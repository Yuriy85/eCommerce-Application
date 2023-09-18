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
    return cart;
  }

  async getCartsOnId() {
    const id: string = localStorage.getItem("idCarts")?.slice(1, -1) as string;
    const apiRoot = this.clientsAnonymous.getAnonymousSessionFlowClient();
    const carts = await apiRoot.carts().withId({ ID: id }).get().execute();
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
    return product;
  }

  async removeProductOnCart(lineItemId: string) {
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
              action: "removeLineItem",
              lineItemId: lineItemId,
            },
          ],
        },
      })
      .execute();
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
    return cart;
  }
}
export default Carts;
