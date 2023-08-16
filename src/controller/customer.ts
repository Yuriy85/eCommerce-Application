import Clients from "./client";

class Customer {
  clients: Clients;

  constructor() {
    this.clients = new Clients();
  }

  getLoginCustomer(email: string, login: string) {
    const apiRoot = this.clients.getPasswordFlowClient(email, login);
    const customer = apiRoot
      .login()
      .post({ body: { email: email, password: login } })
      .execute();
    const id = customer.then((response) => response.body.customer.id);
    (async function () {
      localStorage.setItem("id", JSON.stringify(await id));
    })();
    return customer;
  }
}
export default Customer;
