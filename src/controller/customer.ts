import App from "../app";
import Clients from "./client";
import { pagePaths } from "../routes/routes";
import loginImg from "../assets/icons/login.svg";
import logoutImg from "../assets/icons/logout.svg";

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
      this.changeLoginIcon("in");
      App.mainData.loginStatus = true;
      location.href = pagePaths.mainPath;
      return customer;
    } catch (error) {
      const errorArea: HTMLSpanElement = document.querySelector(
        ".register__error",
      ) as HTMLSpanElement;
      errorArea.innerText = `You already registered! Notice: ${
        (error as Error).message
      }`;
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
      this.changeLoginIcon("in");
      App.mainData.loginStatus = true;
      location.href = pagePaths.mainPath;
      return customer;
    } catch (error) {
      const errorArea: HTMLSpanElement = document.querySelector(
        ".register__error",
      ) as HTMLSpanElement;
      errorArea.innerText = `You already registered! Notice: ${
        (error as Error).message
      }`;
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
      this.changeLoginIcon("in");
      App.mainData.loginStatus = true;
      location.href = pagePaths.mainPath;
      return customer;
    } catch (error) {
      const errorArea: HTMLSpanElement = document.querySelector(
        ".login__error",
      ) as HTMLSpanElement;
      errorArea.innerHTML = `You are not registered yet! Notice: ${
        (error as Error).message
      }`;
    }
  }

  changeLoginIcon(method?: "in") {
    const loginImage: HTMLImageElement = document.getElementById(
      "log-img",
    ) as HTMLImageElement;
    const loginTitle: HTMLSpanElement = document.getElementById(
      "log-title",
    ) as HTMLSpanElement;
    loginTitle.innerText = method ? "Logout" : "login";
    loginImage.src = method ? logoutImg : loginImg;
  }
}
export default Customer;
