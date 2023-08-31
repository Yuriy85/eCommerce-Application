import "./register_page.scss";
import Events from "../../controller/events";
import { pagePaths } from "../../routes/routes";

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
    caption.classList.add("register__caption");
    caption.innerText = "Registration page";

    const sectionBasic: HTMLElement = document.createElement("section");
    sectionBasic.classList.add("register__section-basic");

    const sectionAddress: HTMLElement = document.createElement("section");
    sectionAddress.classList.add("register__section-address");

    const registerBtn: HTMLButtonElement = document.createElement("button");
    registerBtn.classList.add("register__btn-register");
    registerBtn.textContent = "Registration";

    const registerError: HTMLElement = document.createElement("span");
    registerError.classList.add("register__error");

    const anchorToLogin: HTMLAnchorElement = document.createElement("a");
    anchorToLogin.href = pagePaths.loginPath;

    const choice: HTMLElement = document.createElement("span");
    choice.classList.add("register__choice");
    choice.innerText = "If you are already registered";

    const loginBtn: HTMLButtonElement = document.createElement("button");
    loginBtn.classList.add("register__btn-login");
    loginBtn.textContent = "Go to login";

    anchorToLogin.append(loginBtn);

    mainWrapper.append(
      caption,
      sectionBasic,
      sectionAddress,
      registerBtn,
      registerError,
      choice,
      anchorToLogin,
    );

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
    sectionAddressShipping.classList.add("register__section-basic-shipping");

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
    checkboxBilling.classList.add("register__checkbox-billing_default");
    checkboxBilling.setAttribute("id", "address-billing-default");
    checkboxBilling.setAttribute("type", "checkbox");

    const labelCheckbox: HTMLElement = document.createElement("label");
    labelCheckbox.classList.add("register__label-checkbox");
    labelCheckbox.setAttribute("for", "address-billing-default");
    labelCheckbox.textContent = "default";

    const wrapperUnitedCheckbox: HTMLDivElement = document.createElement("div");
    wrapperUnitedCheckbox.classList.add("register__united-wrapper-checkbox");

    const checkboxUnited: HTMLInputElement = document.createElement("input");
    checkboxUnited.classList.add("register__checkbox-united");
    checkboxUnited.setAttribute("id", "address-united");
    checkboxUnited.setAttribute("type", "checkbox");

    const labelUnited: HTMLElement = document.createElement("label");
    labelUnited.classList.add("register__label-united");
    labelUnited.setAttribute("for", "address-united");
    labelUnited.textContent = "use this address for both billing and shipping";
    wrapperUnitedCheckbox.append(checkboxUnited, labelUnited);

    wrapperBillingCheckbox.append(checkboxBilling, labelCheckbox);

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
      wrapperUnitedCheckbox,
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
    inputCheckboxShipping.classList.add("register__checkbox-shipping_default");
    inputCheckboxShipping.setAttribute("id", "address-shipping-default");
    inputCheckboxShipping.setAttribute("type", "checkbox");

    const labelShipping: HTMLElement = document.createElement("label");
    labelShipping.classList.add("register__label-checkbox");
    labelShipping.setAttribute("for", "address-shipping-default");
    labelShipping.textContent = "default";
    wrapperShippingCheckbox.append(inputCheckboxShipping, labelShipping);

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
    );
    this.events.clickCheckboxUnited(
      checkboxUnited,
      sectionAddressShipping,
      titleBilling,
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
