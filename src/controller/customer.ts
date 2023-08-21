import Clients from "./client";

class Customer {
  clients: Clients;

  constructor() {
    this.clients = new Clients();
  }

  async getRegisterCustomer(
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
    checkedBillingDefault?: number | undefined,
    checkedShippingDefault?: number | undefined,
    checkedBilling?: number[] | undefined,
    checkedSipping?: number[] | undefined,
  ) {
    const apiRoot = this.clients.getCredentialsFlowClient();
    try {
      const customer = await apiRoot
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
      localStorage.setItem("id", JSON.stringify(customer.body.customer.id));
      return customer;
    } catch (error) {
      console.log(`Error: ${(error as Error).message}`);
    }
  }

  async getRegisterCustomerForUnitedAddress(
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
    checkedBillingDefault?: number | undefined,
    checkedShippingDefault?: number | undefined,
  ) {
    const apiRoot = this.clients.getCredentialsFlowClient();
    try {
      const customer = await apiRoot
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
            ],
            billingAddresses: [0],
            shippingAddresses: [0],
            defaultBillingAddress: checkedBillingDefault,
            defaultShippingAddress: checkedShippingDefault,
          },
        })
        .execute();
      localStorage.setItem("id", JSON.stringify(customer.body.customer.id));
      return customer;
    } catch (error) {
      console.log(`Error: ${(error as Error).message}`);
    }
  }
  async getLoginCustomer(email: string, login: string) {
    try {
      const apiRoot = this.clients.getPasswordFlowClient(email, login);
      const customer = await apiRoot
        .login()
        .post({ body: { email: email, password: login } })
        .execute();
      localStorage.setItem("id", JSON.stringify(customer.body.customer.id));
      return customer;
    } catch (error) {
      console.log(`Error: ${(error as Error).message}`);
    }
  }
}
export default Customer;
