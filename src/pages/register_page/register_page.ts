import "./register_page.scss";

class RegisterPage {
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

    const btn: HTMLButtonElement = document.createElement("button");
    btn.classList.add("btn-register");
    btn.textContent = "Registration";

    mainWrapper.append(caption, sectionBasic, sectionAddress, btn);

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
    inputCheckboxShipping.classList.add("checkbox-shipping");
    inputCheckboxShipping.setAttribute("id", "address-shipping");
    inputCheckboxShipping.setAttribute("type", "checkbox");

    const labelShipping: HTMLElement = document.createElement("label");
    labelShipping.classList.add("label-checkbox");
    labelShipping.setAttribute("for", "address-shipping");
    labelShipping.textContent = "Make this address as the default";

    wrapperShippingCheckbox.append(inputCheckboxShipping, labelShipping);

    sectionAddressShipping.append(
      titleShipping,
      inputShippingCountry,
      inputShippingCity,
      inputShippingPostcode,
      inputShippingStreet,
      wrapperShippingCheckbox,
    );

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

    const inputCheckboxBilling: HTMLInputElement =
      document.createElement("input");
    inputCheckboxBilling.classList.add("checkbox-billing");
    inputCheckboxBilling.setAttribute("id", "address-billing");
    inputCheckboxBilling.setAttribute("type", "checkbox");

    const labelCheckbox: HTMLElement = document.createElement("label");
    labelCheckbox.classList.add("label-checkbox");
    labelCheckbox.setAttribute("for", "address");
    labelCheckbox.textContent = "Make this address as the default";

    wrapperBillingCheckbox.append(inputCheckboxBilling, labelCheckbox);

    sectionAddressBilling.append(
      titleBilling,
      inputBillingCountry,
      inputBillingCity,
      inputBillingPostcode,
      inputBillingStreet,
      wrapperBillingCheckbox,
    );

    return mainWrapper;
  }
}

export default RegisterPage;
