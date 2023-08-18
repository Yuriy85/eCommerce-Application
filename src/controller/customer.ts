import Clients from "./client";

class Customer {
  clients: Clients;

  constructor() {
    this.clients = new Clients();
  }

  getRegisterCustomer(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    keyBilling: string,
    countryBilling: string,
    cityBilling: string,
    streetNameBilling: string,
    postalCodeBilling: string,
    keyShipping: string,
    countryShipping: string,
    cityShipping: string,
    streetShipping: string,
    postalCodeShipping: string,
    checkedBilling?: number[] | undefined,
    checkedSipping?: number[] | undefined,
    checkedBillingDefault?: number | undefined,
    checkedShippingDefault?: number | undefined,
  ) {
    const apiRoot = this.clients.getCredentialsFlowClient();
    const customer = apiRoot
      .customers()
      .post({
        body: {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          dateOfBirth: dateOfBirth,
          addresses: [
            {
              key: keyBilling,
              country: countryBilling,
              city: cityBilling,
              streetName: streetNameBilling,
              postalCode: postalCodeBilling,
            },
            {
              key: keyShipping,
              country: countryShipping,
              city: cityShipping,
              streetName: streetShipping,
              postalCode: postalCodeShipping,
            },
          ],
          billingAddresses: checkedBilling,
          shippingAddresses: checkedSipping,
          defaultBillingAddress: checkedBillingDefault,
          defaultShippingAddress: checkedShippingDefault,
        },
      })
      .execute();
    return customer;
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
