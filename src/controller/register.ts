import Customer from "./customer";
import Key from "../controller/key";

class Register {
  customer: Customer;
  key: Key;
  billing: number[] | undefined;
  shipping: number[] | undefined;
  constructor() {
    this.customer = new Customer();
    this.key = new Key();
    this.billing = undefined;
    this.shipping = undefined;
  }

  registration(): void {
    const email: HTMLInputElement = document.querySelector(
      ".register__input-reg-email",
    ) as HTMLInputElement;
    const password: HTMLInputElement = document.querySelector(
      ".register__input-reg-password",
    ) as HTMLInputElement;
    const firstName: HTMLInputElement = document.querySelector(
      ".register__input-reg-first-name",
    ) as HTMLInputElement;
    const lastName: HTMLInputElement = document.querySelector(
      ".register__input-reg-last-name",
    ) as HTMLInputElement;
    const dateOfBirth: HTMLInputElement = document.querySelector(
      ".register__input-reg-date",
    ) as HTMLInputElement;

    const countryShopping: HTMLInputElement = document.querySelector(
      ".register__input-shipping-country",
    ) as HTMLInputElement;
    const cityShopping: HTMLInputElement = document.querySelector(
      ".register__input-shipping-city",
    ) as HTMLInputElement;
    const streetShopping: HTMLInputElement = document.querySelector(
      ".register__input-shipping-street",
    ) as HTMLInputElement;
    const postcodeShopping: HTMLInputElement = document.querySelector(
      ".register__input-shipping-postcode",
    ) as HTMLInputElement;

    const countryBilling: HTMLInputElement = document.querySelector(
      ".register__input-billing-country",
    ) as HTMLInputElement;
    const cityBilling: HTMLInputElement = document.querySelector(
      ".register__input-billing-city",
    ) as HTMLInputElement;
    const streetBilling: HTMLInputElement = document.querySelector(
      ".register__input-billing-street",
    ) as HTMLInputElement;
    const postcodeBilling: HTMLInputElement = document.querySelector(
      ".register__input-billing-postcode",
    ) as HTMLInputElement;

    const defaultBilling: HTMLInputElement = document.querySelector(
      ".register__checkbox-billing_default",
    ) as HTMLInputElement;

    const defaultShipping: HTMLInputElement = document.querySelector(
      ".register__checkbox-shipping_default",
    ) as HTMLInputElement;

    const checkboxUnited: HTMLInputElement = document.querySelector(
      ".register__checkbox-united",
    ) as HTMLInputElement;

    const valueEmail: string = email.value;
    const valuePassword: string = password.value;
    const valueFirstName: string = firstName.value;
    const valueLastName: string = lastName.value;
    const valueDateOfBirth: string = dateOfBirth.value;

    const keyShipping: string = `${this.key.getKey()}`;
    const valueCountryShipping =
      countryShopping.value === "Belarus" ? "BY" : "IT";

    const valueCityShipping: string = cityShopping.value;
    const valueStreetShipping: string = streetShopping.value;
    const valuePostcodeShipping: string = postcodeShopping.value;

    const keyBilling: string = `${this.key.getKey()}`;
    const valueCountryBilling: string =
      countryBilling.value === "Belarus" ? "BY" : "IT";
    const valueCityBilling: string = cityBilling.value;
    const valueStreetBilling: string = streetBilling.value;
    const valuePostcodeBilling: string = postcodeBilling.value;

    if (checkboxUnited.checked) {
      const checkedDefaultBilling: number | undefined = defaultBilling.checked
        ? 0
        : undefined;
      const checkedDefaultShipping: number | undefined = defaultBilling.checked
        ? 0
        : undefined;
      this.customer.getRegisterCustomerForUnitedAddress(
        valueEmail,
        valuePassword,
        valueFirstName,
        valueLastName,
        valueDateOfBirth,
        keyBilling,
        valueCountryBilling,
        valueCityBilling,
        valueStreetBilling,
        valuePostcodeBilling,
        checkedDefaultBilling,
        checkedDefaultShipping,
      );
    } else {
      const checkedDefaultBilling: number | undefined = defaultBilling.checked
        ? 0
        : undefined;
      const checkedDefaultShipping: number | undefined = defaultShipping.checked
        ? 1
        : undefined;
      this.billing = [0];
      this.shipping = [1];
      this.customer.getRegisterCustomer(
        valueEmail,
        valuePassword,
        valueFirstName,
        valueLastName,
        valueDateOfBirth,
        keyBilling,
        valueCountryBilling,
        valueCityBilling,
        valueStreetBilling,
        valuePostcodeBilling,
        keyShipping,
        valueCountryShipping,
        valueCityShipping,
        valueStreetShipping,
        valuePostcodeShipping,
        checkedDefaultBilling,
        checkedDefaultShipping,
        this.billing,
        this.shipping,
      );
    }
  }
}
export default Register;
