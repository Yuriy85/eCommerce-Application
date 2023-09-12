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
      .post({ body: { currency: "EUR", country: "DE" } })
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
    const cart = await this.getCart();
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

  async createCustomerCarts(email: string, login: string) {
    const apiRoot = this.clients.getPasswordFlowClient(email, login);
    const customer = await apiRoot
      .me()
      .carts()
      .post({ body: { customerEmail: email, currency: "EUR" } })
      .execute();
    localStorage.setItem("idCarts", JSON.stringify(customer.body.id));
    return customer;
  }
}
export default Carts;
