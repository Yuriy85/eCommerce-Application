import "./register_page.scss";
import Events from "../../controller/events";

class RegisterPage {
  events: Events;
  constructor() {
    this.events = new Events();
  }
  render(): HTMLElement {
    const mainWrapper: HTMLElement = document.createElement("div");
    mainWrapper.classList.add("main__wrapper");
    mainWrapper.innerHTML = "";

    const caption: HTMLElement = document.createElement("h2");
    caption.classList.add("main__register-caption");
    caption.innerText = "Registration page";

    const sectionBasic: HTMLElement = document.createElement("section");
    sectionBasic.classList.add("section-basic");

    const sectionAddress: HTMLElement = document.createElement("section");
    sectionAddress.classList.add("section-address");

    const registerBtn: HTMLButtonElement = document.createElement("button");
    registerBtn.classList.add("btn-register");
    registerBtn.textContent = "Registration";

    mainWrapper.append(caption, sectionBasic, sectionAddress, registerBtn);

    const inputEmail: HTMLInputElement = document.createElement("input");
    inputEmail.classList.add("input-reg-email");
    inputEmail.placeholder = "email";

    const inputPassword: HTMLInputElement = document.createElement("input");
    inputPassword.classList.add("input-reg-password");
    inputPassword.placeholder = "password";

    const inputFirstName: HTMLInputElement = document.createElement("input");
    inputFirstName.classList.add("input-reg-first-name");
    inputFirstName.placeholder = "first name";

    const inputLastName: HTMLInputElement = document.createElement("input");
    inputLastName.classList.add("input-reg-last-name");
    inputLastName.placeholder = "last name";

    const inputDateOfBirth: HTMLInputElement = document.createElement("input");
    inputDateOfBirth.classList.add("input-reg-date");
    inputDateOfBirth.setAttribute("type", "date");

    sectionBasic.append(
      inputEmail,
      inputPassword,
      inputFirstName,
      inputLastName,
      inputDateOfBirth,
    );

    const sectionAddressBilling: HTMLElement = document.createElement("div");
    sectionAddressBilling.classList.add("section-basic__billing");

    const sectionAddressShipping: HTMLElement = document.createElement("div");
    sectionAddressShipping.classList.add("section-basic__shopping");

    sectionAddress.append(sectionAddressBilling, sectionAddressShipping);

    const titleBilling: HTMLElement = document.createElement("h5");
    titleBilling.classList.add("tittle__billing-address");
    titleBilling.innerText = "Billing address";

    const inputBillingCountry: HTMLSelectElement =
      document.createElement("select");
    inputBillingCountry.classList.add("input-billing-country");

    const optionBillingIt: HTMLOptionElement = document.createElement(
      "option",
    ) as HTMLOptionElement;
    optionBillingIt.textContent = "Italy";

    const optionBillingBy: HTMLOptionElement = document.createElement(
      "option",
    ) as HTMLOptionElement;
    optionBillingBy.textContent = "Belarus";

    inputBillingCountry.append(optionBillingBy, optionBillingIt);

    const inputBillingCity: HTMLInputElement = document.createElement("input");
    inputBillingCity.classList.add("input-billing-city");
    inputBillingCity.placeholder = "city";

    const inputBillingStreet: HTMLInputElement =
      document.createElement("input");
    inputBillingStreet.classList.add("input-billing-street");
    inputBillingStreet.placeholder = "street";

    const inputBillingPostcode: HTMLInputElement =
      document.createElement("input");
    inputBillingPostcode.classList.add("input-billing-postcode");
    inputBillingPostcode.placeholder = "postcode";

    const wrapperBillingCheckbox: HTMLDivElement =
      document.createElement("div");
    wrapperBillingCheckbox.classList.add("billing__wrapper-checkbox");

    const checkboxBilling: HTMLInputElement = document.createElement("input");
    checkboxBilling.classList.add("checkbox-billing_shipping");
    checkboxBilling.setAttribute("id", "address-billing");
    checkboxBilling.setAttribute("type", "checkbox");

    const labelCheckbox: HTMLElement = document.createElement("label");
    labelCheckbox.classList.add("label-checkbox");
    labelCheckbox.setAttribute("for", "address");
    labelCheckbox.textContent = "Shipping";
    wrapperBillingCheckbox.append(checkboxBilling, labelCheckbox);

    const wrapperBillingForDefaultBilling: HTMLDivElement =
      document.createElement("div");
    wrapperBillingForDefaultBilling.classList.add(
      "wrapper__billing-default-billing",
    );

    const radioBillingForDefaultBilling: HTMLInputElement =
      document.createElement("input");
    radioBillingForDefaultBilling.classList.add(
      "radio-billing_default-billing",
    );
    radioBillingForDefaultBilling.setAttribute("id", "billing_default-billing");
    radioBillingForDefaultBilling.setAttribute("type", "radio");
    radioBillingForDefaultBilling.setAttribute("name", "default-billing");

    const labelBillingForDefaultBilling: HTMLElement =
      document.createElement("label");
    labelBillingForDefaultBilling.classList.add(
      "label-shipping__default-billing",
    );
    labelBillingForDefaultBilling.setAttribute(
      "for",
      "billing_default-billing",
    );
    labelBillingForDefaultBilling.textContent = "Default billing";

    wrapperBillingForDefaultBilling.append(
      radioBillingForDefaultBilling,
      labelBillingForDefaultBilling,
    );

    const wrapperBillingForDefaultShipping: HTMLDivElement =
      document.createElement("div");
    wrapperBillingForDefaultShipping.classList.add(
      "wrapper__billing-default-shipping",
    );

    const radioBillingForDefaultShipping: HTMLInputElement =
      document.createElement("input");
    radioBillingForDefaultShipping.classList.add(
      "radio-billing_default-shipping",
    );
    radioBillingForDefaultShipping.setAttribute(
      "id",
      "billing_default-shipping",
    );
    radioBillingForDefaultShipping.setAttribute("type", "radio");
    radioBillingForDefaultShipping.setAttribute("name", "default-shipping");

    const labelBillingForDefaultShipping: HTMLElement =
      document.createElement("label");
    labelBillingForDefaultShipping.classList.add(
      "label-billing__default-shipping",
    );
    labelBillingForDefaultShipping.setAttribute(
      "for",
      "billing_default-shipping",
    );
    labelBillingForDefaultShipping.textContent = "Default shipping";

    wrapperBillingForDefaultShipping.append(
      radioBillingForDefaultShipping,
      labelBillingForDefaultShipping,
    );

    sectionAddressBilling.append(
      titleBilling,
      inputBillingCountry,
      inputBillingCity,
      inputBillingPostcode,
      inputBillingStreet,
      wrapperBillingCheckbox,
      wrapperBillingForDefaultBilling,
      wrapperBillingForDefaultShipping,
    );

    const titleShipping: HTMLElement = document.createElement("h5");
    titleShipping.classList.add("tittle__shipping-address");
    titleShipping.innerText = "Shipping address";

    const inputShippingCountry: HTMLSelectElement =
      document.createElement("select");
    inputShippingCountry.classList.add("input-shipping-country");

    const optionShippingIt: HTMLOptionElement = document.createElement(
      "option",
    ) as HTMLOptionElement;
    optionShippingIt.textContent = "Italy";

    const optionShippingBy: HTMLOptionElement = document.createElement(
      "option",
    ) as HTMLOptionElement;
    optionShippingBy.textContent = "Belarus";

    inputShippingCountry.append(optionShippingBy, optionShippingIt);

    const inputShippingCity: HTMLInputElement = document.createElement("input");
    inputShippingCity.classList.add("input-shipping-city");
    inputShippingCity.placeholder = "city";

    const inputShippingStreet: HTMLInputElement =
      document.createElement("input");
    inputShippingStreet.classList.add("input-shipping-street");
    inputShippingStreet.placeholder = "street";

    const inputShippingPostcode: HTMLInputElement =
      document.createElement("input");
    inputShippingPostcode.classList.add("input-shipping-postcode");
    inputShippingPostcode.placeholder = "postcode";

    const wrapperShippingCheckbox: HTMLDivElement =
      document.createElement("div");
    wrapperShippingCheckbox.classList.add("shipping__wrapper-checkbox");

    const inputCheckboxShipping: HTMLInputElement =
      document.createElement("input");
    inputCheckboxShipping.classList.add("checkbox-shipping_billing");
    inputCheckboxShipping.setAttribute("id", "address-shipping");
    inputCheckboxShipping.setAttribute("type", "checkbox");

    const labelShipping: HTMLElement = document.createElement("label");
    labelShipping.classList.add("label-checkbox");
    labelShipping.setAttribute("for", "address-shipping");
    labelShipping.textContent = "Billing";
    wrapperShippingCheckbox.append(inputCheckboxShipping, labelShipping);

    const wrapperShippingForDefaultBilling: HTMLDivElement =
      document.createElement("div");
    wrapperShippingForDefaultBilling.classList.add(
      "shipping__wrapper-default-billing",
    );

    const radioShippingForDefaultBilling: HTMLInputElement =
      document.createElement("input");
    radioShippingForDefaultBilling.classList.add(
      "radio-shipping_default-billing",
    );
    radioShippingForDefaultBilling.setAttribute(
      "id",
      "sipping_default-billing",
    );
    radioShippingForDefaultBilling.setAttribute("type", "radio");
    radioShippingForDefaultBilling.setAttribute("name", "default-billing");

    const labelShippingForDefaultBilling: HTMLElement =
      document.createElement("label");
    labelShippingForDefaultBilling.classList.add(
      "label-shipping__default-billing",
    );
    labelShippingForDefaultBilling.setAttribute(
      "for",
      "sipping_default-billing",
    );
    labelShippingForDefaultBilling.textContent = "Default-billing";

    wrapperShippingForDefaultBilling.append(
      radioShippingForDefaultBilling,
      labelShippingForDefaultBilling,
    );

    const wrapperShippingForDefaultShipping: HTMLDivElement =
      document.createElement("div");
    wrapperShippingForDefaultShipping.classList.add(
      "shipping-default-shipping",
    );

    const radioShippingForDefaultShipping: HTMLInputElement =
      document.createElement("input");
    radioShippingForDefaultShipping.classList.add(
      "radio-shipping_default-shipping",
    );
    radioShippingForDefaultShipping.setAttribute(
      "id",
      "shipping_default-shipping",
    );
    radioShippingForDefaultShipping.setAttribute("type", "radio");
    radioShippingForDefaultShipping.setAttribute("name", "default-shipping");

    const labelShippingForDefaultShipping: HTMLElement =
      document.createElement("label");
    labelShippingForDefaultShipping.classList.add(
      "label-shipping__default-shipping",
    );
    labelShippingForDefaultShipping.setAttribute(
      "for",
      "shipping_default-shipping",
    );
    labelShippingForDefaultShipping.textContent = "Default shipping";

    wrapperShippingForDefaultShipping.append(
      radioShippingForDefaultShipping,
      labelShippingForDefaultShipping,
    );

    sectionAddressShipping.append(
      titleShipping,
      inputShippingCountry,
      inputShippingCity,
      inputShippingPostcode,
      inputShippingStreet,
      wrapperShippingCheckbox,
      wrapperShippingForDefaultBilling,
      wrapperShippingForDefaultShipping,
    );
    this.events.clickButtonRegister(registerBtn);
    return mainWrapper;
  }
}

export default RegisterPage;
