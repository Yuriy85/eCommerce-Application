import Clients from "./client";
import ClientsAnonymous from "./clientAnonymous";

class Carts {
  clients: Clients;
  clientsAnonymous: ClientsAnonymous;

  constructor() {
    this.clients = new Clients();
    this.clientsAnonymous = new ClientsAnonymous();
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

  async createAnonymousCarts() {
    const apiRoot = this.clientsAnonymous.getAnonymousSessionFlowClient();
    const customer = await apiRoot
      .me()
      .carts()
      .post({ body: { currency: "EUR", country: "DE" } })
      .execute();
    localStorage.setItem("idCarts", JSON.stringify(customer.body.id));
    return customer;
  }

  async getCarts(email: string, login: string) {
    const id: string = localStorage.getItem("idCarts")?.slice(1, -1) as string;
    const apiRoot = this.clients.getPasswordFlowClient(email, login);
    const customer = await apiRoot
      .me()
      .carts()
      .withId({ ID: id })
      .get()
      .execute();
    return customer;
  }

  async addProductOnCart() {
    const id: string = localStorage.getItem("idCarts")?.slice(1, -1) as string;
    const version = 4;
    const apiRoot = this.clientsAnonymous.getAnonymousSessionFlowClient();
    const customer = await apiRoot
      .carts()
      .withId({ ID: id })
      .post({
        body: {
          version: version,
          actions: [
            {
              action: "addLineItem",
              sku: "Drink - M",
            },
          ],
        },
      })
      .execute();
    return customer;
  }

  async getAnonymousCarts() {
    const apiRoot = this.clientsAnonymous.getAnonymousSessionFlowClient();
    const customer = await apiRoot.me().carts().get().execute();
    return customer;
  }
}
export default Carts;
