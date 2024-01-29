import Clients from "./client";
import ClientsAnonymous from "./clientAnonymous";
import { pagePaths } from "../routes/routes";
import loginImg from "../assets/icons/login.svg";
import logoutImg from "../assets/icons/logout.svg";
import { CustomerUpdateAction } from "@commercetools/platform-sdk";

class Customer {
  clients: Clients;
  clientsAnonymous: ClientsAnonymous;

  constructor() {
    this.clients = new Clients();
    this.clientsAnonymous = new ClientsAnonymous();
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
    const errorArea: HTMLSpanElement = document.querySelector(
      ".register__error",
    ) as HTMLSpanElement;

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
      this.changeLoginProfileIcon("in");
      location.href = pagePaths.mainPath;
      errorArea.innerText = "";
      return customer;
    } catch (error) {
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
    const errorArea: HTMLSpanElement = document.querySelector(
      ".register__error",
    ) as HTMLSpanElement;

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
      this.changeLoginProfileIcon("in");
      location.href = pagePaths.mainPath;
      errorArea.innerText = "";
      return customer;
    } catch (error) {
      errorArea.innerText = `You already registered! Notice: ${
        (error as Error).message
      }`;
    }
  }
  async getLoginCustomer(email: string, login: string) {
    const errorArea: HTMLSpanElement = document.querySelector(
      ".login__error",
    ) as HTMLSpanElement;
    try {
      const apiRoot = this.clients.getPasswordFlowClient(email, login);
      const customer = await apiRoot
        .me()
        .login()
        .post({ body: { email: email, password: login } })
        .execute();
      localStorage.setItem("id", JSON.stringify(customer.body.customer.id));
      this.changeLoginProfileIcon("in");
      location.href = pagePaths.mainPath;
      errorArea.innerHTML = "";
      return customer;
    } catch (error) {
      errorArea.innerHTML = `You are not registered yet! Notice: ${
        (error as Error).message
      }`;
    }
  }

  changeLoginProfileIcon(method?: "in") {
    const profileButton: HTMLAnchorElement = document.querySelectorAll(
      ".header__button",
    )[1] as HTMLAnchorElement;
    const loginImage: HTMLImageElement = document.getElementById(
      "log-img",
    ) as HTMLImageElement;
    const loginTitle: HTMLSpanElement = document.getElementById(
      "log-title",
    ) as HTMLSpanElement;
    loginTitle.innerText = method ? "Logout" : "login";
    loginImage.src = method ? logoutImg : loginImg;
    profileButton.classList.remove("header__hide-element");
  }

  async getCustomerObject(id: string) {
    const apiRoot = this.clients.getCredentialsFlowClient();

    const customer = await apiRoot
      .customers()
      .withId({ ID: id })
      .get()
      .execute();

    return customer;
  }
  async updateCustomer(
    id: string,
    version: number,
    email: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
  ) {
    const apiRoot = this.clients.getCredentialsFlowClient();
    await apiRoot
      .customers()
      .withId({ ID: id })
      .post({
        body: {
          version: version,
          actions: [
            {
              action: "changeEmail",
              email: email,
            },
            {
              action: "setFirstName",
              firstName: firstName,
            },
            {
              action: "setLastName",
              lastName: lastName,
            },
            {
              action: "setDateOfBirth",
              dateOfBirth: dateOfBirth,
            },
          ],
        },
      })
      .execute();
  }

  async updateCustomerPassword(
    version: number,
    id: string,
    currentPassword: string,
    newPassword: string,
  ) {
    const apiRoot = this.clients.getCredentialsFlowClient();
    const costumer = await apiRoot
      .customers()
      .password()
      .post({
        body: {
          id: id,
          version: version,
          currentPassword: currentPassword,
          newPassword: newPassword,
        },
      })
      .execute();
    return costumer;
  }

  async removeAddress(version: number, customerId: string, addressId: string) {
    const apiRoot = this.clients.getCredentialsFlowClient();
    const customer = await apiRoot
      .customers()
      .withId({ ID: customerId })
      .post({
        body: {
          version: version,
          actions: [
            {
              action: "removeAddress",
              addressId: addressId,
            },
          ],
        },
      })
      .execute();
    return customer;
  }

  async changeAddress(
    version: number,
    customerId: string,
    addressId: string,
    streetName: string,
    postalCode: string,
    city: string,
    country: string,
    oldBilling?: boolean,
    oldShipping?: boolean,
    oldDefaultAddress?: boolean,
    billing?: boolean,
    shipping?: boolean,
    defaultAddress?: boolean,
  ) {
    const actionsArray: CustomerUpdateAction[] = [
      {
        action: "changeAddress",
        addressId: addressId,
        address: {
          streetName: streetName,
          postalCode: postalCode,
          city: city,
          country: country,
        },
      },
    ];
    if (billing) {
      if (!defaultAddress && oldDefaultAddress) {
        actionsArray.push({
          action: "removeBillingAddressId",
          addressId: addressId,
        });
      }
      actionsArray.push({
        action: "addBillingAddressId",
        addressId: addressId,
      });
      if (defaultAddress) {
        actionsArray.push({
          action: "setDefaultBillingAddress",
          addressId: addressId,
        });
      }
    } else if (oldBilling) {
      actionsArray.push({
        action: "removeBillingAddressId",
        addressId: addressId,
      });
    }
    if (shipping) {
      if (!defaultAddress && oldDefaultAddress) {
        actionsArray.push({
          action: "removeShippingAddressId",
          addressId: addressId,
        });
      }
      actionsArray.push({
        action: "addShippingAddressId",
        addressId: addressId,
      });
      if (defaultAddress) {
        actionsArray.push({
          action: "setDefaultShippingAddress",
          addressId: addressId,
        });
      }
    } else if (oldShipping) {
      actionsArray.push({
        action: "removeShippingAddressId",
        addressId: addressId,
      });
    }
    const apiRoot = this.clients.getCredentialsFlowClient();
    const customer = await apiRoot
      .customers()
      .withId({ ID: customerId })
      .post({
        body: {
          version: version,
          actions: actionsArray,
        },
      })
      .execute();
    return customer;
  }

  async addAddress(
    version: number,
    customerId: string,
    streetName: string,
    postalCode: string,
    city: string,
    country: string,
  ) {
    const apiRoot = this.clients.getCredentialsFlowClient();
    const customer = await apiRoot
      .customers()
      .withId({ ID: customerId })
      .post({
        body: {
          version: version,
          actions: [
            {
              action: "addAddress",
              address: {
                streetName: streetName,
                postalCode: postalCode,
                city: city,
                country: country,
              },
            },
          ],
        },
      })
      .execute();
    return customer;
  }

  async changeAddressAttributes(
    version: number,
    customerId: string,
    addressId: string,
    billing?: boolean,
    shipping?: boolean,
    defaultAddress?: boolean,
  ) {
    const actionsArray: CustomerUpdateAction[] = [];
    if (billing) {
      actionsArray.push({
        action: "addBillingAddressId",
        addressId: addressId,
      });
      if (defaultAddress) {
        actionsArray.push({
          action: "setDefaultBillingAddress",
          addressId: addressId,
        });
      }
    }
    if (shipping) {
      actionsArray.push({
        action: "addShippingAddressId",
        addressId: addressId,
      });
      if (defaultAddress) {
        actionsArray.push({
          action: "setDefaultShippingAddress",
          addressId: addressId,
        });
      }
    }
    const apiRoot = this.clients.getCredentialsFlowClient();
    const customer = await apiRoot
      .customers()
      .withId({ ID: customerId })
      .post({
        body: {
          version: version,
          actions: actionsArray,
        },
      })
      .execute();
    return customer;
  }

  async getAnonymousCustomer() {
    const apiRoot = this.clientsAnonymous.getAnonymousSessionFlowClient();
    const customer = await apiRoot.customers().get().execute();
    // localStorage.setItem("id", JSON.stringify(customer.body.customer.id));
    return customer;
  }
}
export default Customer;
