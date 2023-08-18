import "./register_page.scss";
import Events from "../../controller/events";

class RegisterPage {
  events: Events;
  constructor() {
    this.events = new Events();
  }
  render(): HTMLElement {
    const mainWrapper: HTMLElement = document.createElement("div");
    mainWrapper.classList.add("register");
    mainWrapper.innerHTML = "";

    const caption: HTMLElement = document.createElement("h2");
    caption.classList.add("register__register-caption");
    caption.innerText = "Registration page";

    const sectionBasic: HTMLElement = document.createElement("section");
    sectionBasic.classList.add("register__section-basic");

    const sectionAddress: HTMLElement = document.createElement("section");
    sectionAddress.classList.add("register__section-address");

    const registerBtn: HTMLButtonElement = document.createElement("button");
    registerBtn.classList.add("register__btn-register");
    registerBtn.textContent = "Registration";

    mainWrapper.append(caption, sectionBasic, sectionAddress, registerBtn);

    const inputEmail: HTMLInputElement = document.createElement("input");
    inputEmail.classList.add("register__input-reg-email");
    inputEmail.placeholder = "email";

    const emailErrorArea: HTMLElement = document.createElement("span");
    emailErrorArea.classList.add("register__email-error");

    const inputPassword: HTMLInputElement = document.createElement("input");
    inputPassword.classList.add("register__input-reg-password");
    inputPassword.placeholder = "password";

    const passwordErrorArea: HTMLElement = document.createElement("span");
    passwordErrorArea.classList.add("register__password-error");

    const inputFirstName: HTMLInputElement = document.createElement("input");
    inputFirstName.classList.add("register__input-reg-first-name");
    inputFirstName.placeholder = "first name";

    const firstNameErrorArea: HTMLElement = document.createElement("span");
    firstNameErrorArea.classList.add("register__name-error");

    const inputLastName: HTMLInputElement = document.createElement("input");
    inputLastName.classList.add("register__input-reg-last-name");
    inputLastName.placeholder = "last name";

    const lastNameErrorArea: HTMLElement = document.createElement("span");
    lastNameErrorArea.classList.add("register__surname-error");

    const inputDateOfBirth: HTMLInputElement = document.createElement("input");
    inputDateOfBirth.classList.add("register__input-reg-date");
    inputDateOfBirth.setAttribute("type", "date");

    const dateErrorArea: HTMLElement = document.createElement("span");
    dateErrorArea.classList.add("register__date-error");

    sectionBasic.append(
      inputEmail,
      emailErrorArea,
      inputPassword,
      passwordErrorArea,
      inputFirstName,
      firstNameErrorArea,
      inputLastName,
      lastNameErrorArea,
      inputDateOfBirth,
      dateErrorArea,
    );

    const sectionAddressBilling: HTMLElement = document.createElement("div");
    sectionAddressBilling.classList.add("register__section-basic-billing");

    const sectionAddressShipping: HTMLElement = document.createElement("div");
    sectionAddressShipping.classList.add("register__section-basic-shopping");

    sectionAddress.append(sectionAddressBilling, sectionAddressShipping);

    const titleBilling: HTMLElement = document.createElement("h5");
    titleBilling.classList.add("register__tittle-billing-address");
    titleBilling.innerText = "Billing address";

    const inputBillingCountry: HTMLSelectElement =
      document.createElement("select");
    inputBillingCountry.classList.add("register__input-billing-country");

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
    inputBillingCity.classList.add("register__input-billing-city");
    inputBillingCity.placeholder = "city";

    const billingCityErrorArea: HTMLElement = document.createElement("span");
    billingCityErrorArea.classList.add("register__billing-city-error");

    const inputBillingStreet: HTMLInputElement =
      document.createElement("input");
    inputBillingStreet.classList.add("register__input-billing-street");
    inputBillingStreet.placeholder = "street";

    const billingStreetErrorArea: HTMLElement = document.createElement("span");
    billingStreetErrorArea.classList.add("register__billing-street-error");

    const inputBillingPostcode: HTMLInputElement =
      document.createElement("input");
    inputBillingPostcode.classList.add("register__input-billing-postcode");
    inputBillingPostcode.placeholder = "postcode";

    const billingCodeErrorArea: HTMLElement = document.createElement("span");
    billingCodeErrorArea.classList.add("register__billing-code-error");

    const wrapperBillingCheckbox: HTMLDivElement =
      document.createElement("div");
    wrapperBillingCheckbox.classList.add("register__billing-wrapper-checkbox");

    const checkboxBilling: HTMLInputElement = document.createElement("input");
    checkboxBilling.classList.add("register__checkbox-billing_shipping");
    checkboxBilling.setAttribute("id", "address-billing");
    checkboxBilling.setAttribute("type", "checkbox");

    const labelCheckbox: HTMLElement = document.createElement("label");
    labelCheckbox.classList.add("register__label-checkbox");
    labelCheckbox.setAttribute("for", "address");
    labelCheckbox.textContent = "Shipping";
    wrapperBillingCheckbox.append(checkboxBilling, labelCheckbox);

    const wrapperBillingForDefaultBilling: HTMLDivElement =
      document.createElement("div");
    wrapperBillingForDefaultBilling.classList.add(
      "register__wrapper-billing-default-billing",
    );

    const radioBillingForDefaultBilling: HTMLInputElement =
      document.createElement("input");
    radioBillingForDefaultBilling.classList.add(
      "register__radio-billing_default-billing",
    );
    radioBillingForDefaultBilling.setAttribute("id", "billing_default-billing");
    radioBillingForDefaultBilling.setAttribute("type", "radio");
    radioBillingForDefaultBilling.setAttribute("name", "default-billing");

    const labelBillingForDefaultBilling: HTMLElement =
      document.createElement("label");
    labelBillingForDefaultBilling.classList.add(
      "register__label-shipping-default-billing",
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
      "register__wrapper-billing-default-shipping",
    );

    const radioBillingForDefaultShipping: HTMLInputElement =
      document.createElement("input");
    radioBillingForDefaultShipping.classList.add(
      "register__radio-billing_default-shipping",
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
      "register__label-billing-default-shipping",
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
      billingCityErrorArea,
      inputBillingPostcode,
      billingCodeErrorArea,
      inputBillingStreet,
      billingStreetErrorArea,
      wrapperBillingCheckbox,
      wrapperBillingForDefaultBilling,
      wrapperBillingForDefaultShipping,
    );

    const titleShipping: HTMLElement = document.createElement("h5");
    titleShipping.classList.add("register__tittle-shipping-address");
    titleShipping.innerText = "Shipping address";

    const inputShippingCountry: HTMLSelectElement =
      document.createElement("select");
    inputShippingCountry.classList.add("register__input-shipping-country");

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
    inputShippingCity.classList.add("register__input-shipping-city");
    inputShippingCity.placeholder = "city";

    const shippingCityErrorArea: HTMLElement = document.createElement("span");
    shippingCityErrorArea.classList.add("register__shipping-city-error");

    const inputShippingStreet: HTMLInputElement =
      document.createElement("input");
    inputShippingStreet.classList.add("register__input-shipping-street");
    inputShippingStreet.placeholder = "street";

    const shippingStreetErrorArea: HTMLElement = document.createElement("span");
    shippingStreetErrorArea.classList.add("register__shipping-street-error");

    const inputShippingPostcode: HTMLInputElement =
      document.createElement("input");
    inputShippingPostcode.classList.add("register__input-shipping-postcode");
    inputShippingPostcode.placeholder = "postcode";

    const shippingCodeErrorArea: HTMLElement = document.createElement("span");
    shippingCodeErrorArea.classList.add("register__shipping-code-error");

    const wrapperShippingCheckbox: HTMLDivElement =
      document.createElement("div");
    wrapperShippingCheckbox.classList.add(
      "register__shipping-wrapper-checkbox",
    );

    const inputCheckboxShipping: HTMLInputElement =
      document.createElement("input");
    inputCheckboxShipping.classList.add("register__checkbox-shipping_billing");
    inputCheckboxShipping.setAttribute("id", "address-shipping");
    inputCheckboxShipping.setAttribute("type", "checkbox");

    const labelShipping: HTMLElement = document.createElement("label");
    labelShipping.classList.add("register__label-checkbox");
    labelShipping.setAttribute("for", "address-shipping");
    labelShipping.textContent = "Billing";
    wrapperShippingCheckbox.append(inputCheckboxShipping, labelShipping);

    const wrapperShippingForDefaultBilling: HTMLDivElement =
      document.createElement("div");
    wrapperShippingForDefaultBilling.classList.add(
      "register__shipping-wrapper-default-billing",
    );

    const radioShippingForDefaultBilling: HTMLInputElement =
      document.createElement("input");
    radioShippingForDefaultBilling.classList.add(
      "register__radio-shipping_default-billing",
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
      "register__label-shipping-default-billing",
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
      "register__shipping-default-shipping",
    );

    const radioShippingForDefaultShipping: HTMLInputElement =
      document.createElement("input");
    radioShippingForDefaultShipping.classList.add(
      "register__radio-shipping_default-shipping",
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
      "register__label-shipping-default-shipping",
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
      shippingCityErrorArea,
      inputShippingPostcode,
      shippingCodeErrorArea,
      inputShippingStreet,
      shippingStreetErrorArea,
      wrapperShippingCheckbox,
      wrapperShippingForDefaultBilling,
      wrapperShippingForDefaultShipping,
    );
    this.events.clickButtonRegister(registerBtn);
    this.events.inputFilling(inputEmail, emailErrorArea, "email");
    this.events.inputFilling(inputPassword, passwordErrorArea, "password");
    this.events.inputFilling(inputFirstName, firstNameErrorArea, "name");
    this.events.inputFilling(inputLastName, lastNameErrorArea, "surname");
    this.events.inputFilling(
      inputBillingCity,
      billingCityErrorArea,
      "billingCity",
    );
    this.events.inputFilling(
      inputShippingCity,
      shippingCityErrorArea,
      "shippingCity",
    );
    this.events.inputFilling(inputDateOfBirth, dateErrorArea, "date");
    this.events.inputFilling(
      inputBillingStreet,
      billingStreetErrorArea,
      "billingStreet",
    );
    this.events.inputFilling(
      inputShippingStreet,
      shippingStreetErrorArea,
      "shippingStreet",
    );
    this.events.inputFilling(
      inputBillingPostcode,
      billingCodeErrorArea,
      "billingCode",
    );
    this.events.inputFilling(
      inputShippingPostcode,
      shippingCodeErrorArea,
      "shippingCode",
    );
    this.events.selectCountry(
      inputBillingCountry,
      inputBillingPostcode,
      "billing",
    );
    this.events.selectCountry(
      inputShippingCountry,
      inputShippingPostcode,
      "shipping",
    );
    return mainWrapper;
  }
}

export default RegisterPage;
