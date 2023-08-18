import Customer from "./customer";

class Register {
  customer: Customer;
  checkedBillingDefault: number | undefined;
  checkedShippingDefault: number | undefined;
  constructor() {
    this.customer = new Customer();
    this.checkedBillingDefault = undefined;
    this.checkedShippingDefault = undefined;
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

    const checkboxBilling: HTMLInputElement = document.querySelector(
      ".register__checkbox-billing_shipping",
    ) as HTMLInputElement;

    const checkboxShipping: HTMLInputElement = document.querySelector(
      ".register__checkbox-shipping_billing",
    ) as HTMLInputElement;

    const radioBillingForDefaultBilling: HTMLInputElement =
      document.querySelector(
        ".register__radio-billing_default-billing",
      ) as HTMLInputElement;

    const radioBillingForDefaultShipping: HTMLInputElement =
      document.querySelector(
        ".register__radio-billing_default-shipping",
      ) as HTMLInputElement;

    const radioShippingForDefaultBilling: HTMLInputElement =
      document.querySelector(
        ".register__radio-shipping_default-billing",
      ) as HTMLInputElement;

    const radioShippingForDefaultShipping: HTMLInputElement =
      document.querySelector(
        ".register__radio-shipping_default-shipping",
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

    const checkedShipping: number[] | undefined = checkboxBilling.checked
      ? [0, 1]
      : [1];
    const checkedBilling: number[] | undefined = checkboxShipping.checked
      ? [0, 1]
      : [0];

    if (
      !radioBillingForDefaultBilling.checked &&
      !radioBillingForDefaultShipping.checked &&
      !radioShippingForDefaultBilling.checked &&
      !radioShippingForDefaultShipping.checked
    ) {
      this.checkedBillingDefault = undefined;
      this.checkedShippingDefault = undefined;
    }

    if (
      radioBillingForDefaultBilling.checked &&
      radioBillingForDefaultShipping.checked
    ) {
      this.checkedBillingDefault = 0;
      this.checkedShippingDefault = 0;
    }

    if (
      radioBillingForDefaultBilling.checked &&
      !radioBillingForDefaultShipping.checked &&
      radioShippingForDefaultShipping.checked
    ) {
      this.checkedBillingDefault = 0;
      this.checkedShippingDefault = 1;
    }

    if (
      radioBillingForDefaultBilling.checked &&
      !radioBillingForDefaultShipping.checked &&
      !radioShippingForDefaultShipping.checked
    ) {
      this.checkedBillingDefault = 0;
      this.checkedShippingDefault = undefined;
    }

    if (
      radioShippingForDefaultBilling.checked &&
      radioShippingForDefaultShipping.checked
    ) {
      this.checkedBillingDefault = 1;
      this.checkedShippingDefault = 1;
    }

    if (
      radioShippingForDefaultBilling.checked &&
      !radioShippingForDefaultShipping.checked &&
      radioBillingForDefaultShipping.checked
    ) {
      this.checkedBillingDefault = 1;
      this.checkedShippingDefault = 0;
    }

    if (
      radioShippingForDefaultBilling.checked &&
      !radioShippingForDefaultShipping.checked &&
      !radioBillingForDefaultShipping.checked
    ) {
      this.checkedBillingDefault = 1;
      this.checkedShippingDefault = undefined;
    }

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
      checkedShipping,
      this.checkedBillingDefault,
      this.checkedShippingDefault,
    );
  }
}
export default Register;
