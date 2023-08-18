import Customer from "./customer";

class Register {
  customer: Customer;
  constructor() {
    this.customer = new Customer();
  }
  registration(): void {
    const email: HTMLInputElement = document.querySelector(
      ".input-reg-email",
    ) as HTMLInputElement;
    const password: HTMLInputElement = document.querySelector(
      ".input-reg-password",
    ) as HTMLInputElement;
    const firstName: HTMLInputElement = document.querySelector(
      ".input-reg-first-name",
    ) as HTMLInputElement;
    const lastName: HTMLInputElement = document.querySelector(
      ".input-reg-last-name",
    ) as HTMLInputElement;
    const dateOfBirth: HTMLInputElement = document.querySelector(
      ".input-reg-date",
    ) as HTMLInputElement;

    const countryShopping: HTMLInputElement = document.querySelector(
      ".input-shipping-country",
    ) as HTMLInputElement;
    const cityShopping: HTMLInputElement = document.querySelector(
      ".input-shipping-city",
    ) as HTMLInputElement;
    const streetShopping: HTMLInputElement = document.querySelector(
      ".input-shipping-street",
    ) as HTMLInputElement;
    const postcodeShopping: HTMLInputElement = document.querySelector(
      ".input-shipping-postcode",
    ) as HTMLInputElement;

    const countryBilling: HTMLInputElement = document.querySelector(
      ".input-billing-country",
    ) as HTMLInputElement;
    const cityBilling: HTMLInputElement = document.querySelector(
      ".input-billing-city",
    ) as HTMLInputElement;
    const streetBilling: HTMLInputElement = document.querySelector(
      ".input-billing-street",
    ) as HTMLInputElement;
    const postcodeBilling: HTMLInputElement = document.querySelector(
      ".input-billing-postcode",
    ) as HTMLInputElement;

    const inputCheckboxBilling: HTMLInputElement = document.querySelector(
      ".checkbox-billing",
    ) as HTMLInputElement;

    const inputCheckboxShipping: HTMLInputElement = document.querySelector(
      ".checkbox-shipping",
    ) as HTMLInputElement;

    const valueEmail: string = email.value;
    const valuePassword: string = password.value;
    const valueFirstName: string = firstName.value;
    const valueLastName: string = lastName.value;
    const valueDateOfBirth: string = dateOfBirth.value;

    const keyShipping: string = "123456789";
    const valueCountryShipping =
      countryShopping.value === "Belarus" ? "BY" : "IT";

    const valueCityShipping: string = cityShopping.value;
    const valueStreetShipping: string = streetShopping.value;
    const valuePostcodeShipping: string = postcodeShopping.value;

    const keyBilling: string = "987654321";
    const valueCountryBilling: string =
      countryBilling.value === "Belarus" ? "BY" : "IT";
    const valueCityBilling: string = cityBilling.value;
    const valueStreetBilling: string = streetBilling.value;
    const valuePostcodeBilling: string = postcodeBilling.value;

    const checkedBilling: number | undefined = inputCheckboxBilling.checked
      ? 0
      : undefined;
    const checkedSipping: number | undefined = inputCheckboxShipping.checked
      ? 1
      : undefined;

    this.customer.getRegisterCustomer(
      valueEmail,
      valuePassword,
      valueFirstName,
      valueLastName,
      valueDateOfBirth,
      keyShipping,
      valueCountryShipping,
      valueCityShipping,
      valueStreetShipping,
      valuePostcodeShipping,
      keyBilling,
      valueCountryBilling,
      valueCityBilling,
      valueStreetBilling,
      valuePostcodeBilling,
      checkedBilling,
      checkedSipping,
    );
  }
}
export default Register;
