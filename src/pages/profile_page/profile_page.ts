import Customer from "../../controller/customer";
import "./profile_page.scss";
// import "../../controller/events";
import Events from "../../controller/events";
import { Address } from "@commercetools/platform-sdk";
import { pagePaths } from "../../routes/routes";

class ProfilePage {
  customer: Customer;
  events: Events;
  constructor() {
    this.customer = new Customer();
    this.events = new Events();
  }
  async render(): Promise<HTMLElement> {
    const customerId: string = localStorage
      .getItem("id")
      ?.slice(1, -1) as string;
    const customerFromServer = await this.customer.getCustomerObject(
      customerId,
    );

    const mainWrapper: HTMLElement = document.createElement("div");

    mainWrapper.classList.add("profile");
    const caption: HTMLElement = document.createElement("h2");
    caption.classList.add("profile__caption");
    mainWrapper.innerHTML = "";
    caption.innerText = "User Profile page";

    const wrapperFirstName: HTMLElement = document.createElement("div");
    wrapperFirstName.classList.add("profile__wrapper-first-name");

    const titleFirstName: HTMLElement = document.createElement("h4");
    titleFirstName.classList.add("profile__title-first-name");
    titleFirstName.innerText = "First name:";

    const firstName: HTMLInputElement = document.createElement("input");
    firstName.classList.add("profile__first-name");
    firstName.value = customerFromServer.body.firstName as string;
    firstName.disabled = true;

    const firstNameEditError: HTMLElement = document.createElement("span");
    firstNameEditError.classList.add("profile__first-name-error");

    wrapperFirstName.append(titleFirstName, firstName, firstNameEditError);

    const wrapperLastName: HTMLElement = document.createElement("div");
    wrapperLastName.classList.add("profile__wrapper-last-name");

    const titleLastName: HTMLElement = document.createElement("h4");
    titleLastName.classList.add("profile__title-first-name");
    titleLastName.innerText = "Last name:";

    const lastName: HTMLInputElement = document.createElement("input");
    lastName.classList.add("profile__last-name");
    lastName.value = customerFromServer.body.lastName as string;
    lastName.disabled = true;

    const lastNameEditError: HTMLElement = document.createElement("span");
    lastNameEditError.classList.add("profile__last-name-error");

    wrapperLastName.append(titleLastName, lastName, lastNameEditError);

    const wrapperBirthDate: HTMLElement = document.createElement("div");
    wrapperBirthDate.classList.add("profile__wrapper-last-name");

    const titleBirthDate: HTMLElement = document.createElement("h4");
    titleBirthDate.classList.add("profile__title-birth-date");
    titleBirthDate.innerText = "Date of Birthday:";

    const birthDate: HTMLInputElement = document.createElement("input");
    birthDate.classList.add("profile__birth-date");
    birthDate.setAttribute("type", "date");
    birthDate.value = customerFromServer.body.dateOfBirth as string;
    birthDate.disabled = true;

    const birthDateEditError: HTMLElement = document.createElement("span");
    birthDateEditError.classList.add("profile__birth-date-error");

    wrapperBirthDate.append(titleBirthDate, birthDate, birthDateEditError);

    const wrapperEmail: HTMLElement = document.createElement("div");
    wrapperEmail.classList.add("profile__wrapper-email");

    const titleEmail: HTMLElement = document.createElement("h4");
    titleEmail.classList.add("profile__title-email");
    titleEmail.innerText = "E-mail:";

    const email: HTMLInputElement = document.createElement("input");
    email.classList.add("profile__email");
    email.value = customerFromServer.body.email;
    email.disabled = true;

    const emailEditError: HTMLElement = document.createElement("span");
    emailEditError.classList.add("profile__email-error");

    wrapperEmail.append(titleEmail, email, emailEditError);

    // change password
    const wrapperChangePassword: HTMLElement = document.createElement("div");
    wrapperChangePassword.classList.add("profile__wrapper-change-password");

    const titleChangePassword: HTMLElement = document.createElement("h4");
    titleChangePassword.classList.add("profile__title-change-password");
    titleChangePassword.innerText = "Change password:";

    const pendingPassword: HTMLInputElement = document.createElement("input");
    pendingPassword.classList.add("profile__pending-password");
    pendingPassword.placeholder = "pending password";

    const newPassword: HTMLInputElement = document.createElement("input");
    newPassword.classList.add("profile__new-password");
    newPassword.placeholder = "new password";

    const passwordEditError: HTMLElement = document.createElement("span");
    passwordEditError.classList.add("profile__password-error");

    const savePasswordButton: HTMLButtonElement =
      document.createElement("button");
    savePasswordButton.classList.add("profile__save-password-button");
    savePasswordButton.innerText = "Save new password";
    wrapperChangePassword.append(
      titleChangePassword,
      pendingPassword,
      newPassword,
      passwordEditError,
      savePasswordButton,
    );

    // change password end

    const wrapperAddresses: HTMLElement = document.createElement("div");
    wrapperAddresses.classList.add("profile__wrapper-addresses");

    customerFromServer.body.addresses.forEach((address) =>
      wrapperAddresses.append(
        this.createAddressCard(
          address,
          customerFromServer.body.billingAddressIds,
          customerFromServer.body.shippingAddressIds,
          customerFromServer.body.defaultBillingAddressId,
          customerFromServer.body.defaultShippingAddressId,
        ),
      ),
    );
    const wrapperEditSaveButtons: HTMLElement = document.createElement("div");
    wrapperEditSaveButtons.classList.add("profile__wrapper-edit-save");

    const editButton: HTMLButtonElement = document.createElement("button");
    editButton.classList.add("profile__edit-button");
    editButton.innerText = "Edit";

    const saveButton: HTMLButtonElement = document.createElement("button");
    saveButton.classList.add("profile__save-button");
    saveButton.innerText = "Save";

    const savedMessage: HTMLElement = document.createElement("div");
    savedMessage.classList.add("profile__data-profile-saved");
    savedMessage.innerText = "Personal data has been changed";

    wrapperEditSaveButtons.append(editButton, saveButton, savedMessage);

    mainWrapper.append(
      caption,
      wrapperFirstName,
      wrapperLastName,
      wrapperBirthDate,
      wrapperEmail,
      wrapperEditSaveButtons,
      wrapperChangePassword,
      wrapperAddresses,
    );
    const disabledInputs: HTMLInputElement[] = [
      firstName,
      lastName,
      birthDate,
      email,
    ];
    const fieldsWrappers: HTMLSpanElement[] = [
      firstNameEditError,
      lastNameEditError,
      birthDateEditError,
      emailEditError,
    ];

    this.clickButtonEdit(editButton, disabledInputs);
    this.clickButtonSave(
      saveButton,
      savedMessage,
      firstName,
      disabledInputs,
      customerId,
      customerFromServer.body.version,
      email,
      firstName,
      lastName,
      birthDate,
      fieldsWrappers,
    );

    this.events.inputFilling(firstName, firstNameEditError, "name");
    this.events.inputFilling(lastName, lastNameEditError, "surname");
    this.events.inputFilling(birthDate, birthDateEditError, "date");
    this.events.inputFilling(email, emailEditError, "email");
    this.events.inputFilling(newPassword, passwordEditError, "password");

    return mainWrapper;
  }

  createAddressCard(
    address: Address,
    billingAddressIds?: string[],
    shippingAddressIds?: string[],
    defaultBillingAddressId?: string,
    defaultShippingAddressId?: string,
  ): HTMLElement {
    const wrapperBillingAddress: HTMLElement = document.createElement("div");
    wrapperBillingAddress.classList.add("profile__wrapper-billing-address");

    const titleBillingAddress: HTMLElement = document.createElement("h3");
    titleBillingAddress.classList.add("profile__title-billing-address");
    titleBillingAddress.innerText = "Address";

    const wrapperBillingCountry: HTMLElement = document.createElement("div");
    wrapperBillingCountry.classList.add("profile__wrapper-billing-country");

    const titleBillingCountry: HTMLElement = document.createElement("h4");
    titleBillingCountry.classList.add("profile__title-billing-country");
    titleBillingCountry.innerText = "Country:";

    const billingCountry: HTMLInputElement = document.createElement("input");
    billingCountry.classList.add("profile__billing-country");
    billingCountry.value = address.country === "IT" ? "Italy" : "Belarus";
    billingCountry.disabled = true;

    wrapperBillingCountry.append(titleBillingCountry, billingCountry);

    const wrapperBillingCity: HTMLElement = document.createElement("div");
    wrapperBillingCity.classList.add("profile__wrapper-billing-city");

    const titleBillingCity: HTMLElement = document.createElement("h4");
    titleBillingCity.classList.add("profile__title-billing-city");
    titleBillingCity.innerText = "City:";

    const billingCity: HTMLInputElement = document.createElement("input");
    billingCity.classList.add("profile__billing-city");
    billingCity.value = address.city as string;
    billingCity.disabled = true;

    wrapperBillingCity.append(titleBillingCity, billingCity);

    const wrapperBillingPostcode: HTMLElement = document.createElement("div");
    wrapperBillingPostcode.classList.add("profile__wrapper-billing-postcode");

    const titleBillingPostcode: HTMLElement = document.createElement("h4");
    titleBillingPostcode.classList.add("profile__title-billing-postcode");
    titleBillingPostcode.innerText = "Postcode:";

    const billingPostcode: HTMLInputElement = document.createElement("input");
    billingPostcode.classList.add("profile__billing-postcode");
    billingPostcode.value = address.postalCode as string;
    billingPostcode.disabled = true;

    wrapperBillingPostcode.append(titleBillingPostcode, billingPostcode);

    const wrapperBillingStreet: HTMLElement = document.createElement("div");
    wrapperBillingStreet.classList.add("profile__wrapper-billing-street");

    const titleBillingStreet: HTMLElement = document.createElement("h4");
    titleBillingStreet.classList.add("profile__title-billing-Street");
    titleBillingStreet.innerText = "Street:";

    const billingStreet: HTMLInputElement = document.createElement("input");
    billingStreet.classList.add("profile__billing-street");
    billingStreet.value = address.streetName as string;
    billingStreet.disabled = true;

    wrapperBillingStreet.append(titleBillingStreet, billingStreet);

    const wrapperBillingAddressType: HTMLElement =
      document.createElement("div");
    wrapperBillingAddressType.classList.add(
      "profile__wrapper-billing-address-type",
    );

    const titleBillingAddressType: HTMLElement = document.createElement("h4");
    titleBillingAddressType.classList.add(
      "profile__title-billing-address-type",
    );
    titleBillingAddressType.innerText = "Billing:";

    const labelBillingAddressType: HTMLInputElement =
      document.createElement("input");
    labelBillingAddressType.setAttribute("type", "checkbox");
    labelBillingAddressType.classList.add(
      "profile__label-billing-address-type",
    );

    labelBillingAddressType.disabled = true;

    wrapperBillingAddressType.append(
      titleBillingAddressType,
      labelBillingAddressType,
    );

    wrapperBillingStreet.append(titleBillingStreet, billingStreet);

    const wrapperShippingAddressType: HTMLElement =
      document.createElement("div");
    wrapperShippingAddressType.classList.add(
      "profile__wrapper-billing-address-type",
    );

    const titleShippingAddressType: HTMLElement = document.createElement("h4");
    titleShippingAddressType.classList.add(
      "profile__title-billing-address-type",
    );
    titleShippingAddressType.innerText = "Shipping:";

    const labelShippingAddressType: HTMLInputElement =
      document.createElement("input");
    labelShippingAddressType.setAttribute("type", "checkbox");
    labelShippingAddressType.classList.add(
      "profile__label-billing-address-type",
    );

    labelShippingAddressType.disabled = true;

    wrapperShippingAddressType.append(
      titleShippingAddressType,
      labelShippingAddressType,
    );

    const wrapperDefaultBillingAddress: HTMLElement =
      document.createElement("div");
    wrapperDefaultBillingAddress.classList.add(
      "profile__wrapper-default-billing-address",
    );

    const titleDefaultBillingAddress: HTMLElement =
      document.createElement("h4");
    titleDefaultBillingAddress.classList.add(
      "profile__title-default-billing-address",
    );
    titleDefaultBillingAddress.innerText = "Default:";

    const labelDefaultBillingAddress: HTMLInputElement =
      document.createElement("input");
    labelDefaultBillingAddress.setAttribute("type", "checkbox");
    labelDefaultBillingAddress.classList.add(
      "profile__label-default-billing-address",
    );

    labelDefaultBillingAddress.disabled = true;

    wrapperDefaultBillingAddress.append(
      titleDefaultBillingAddress,
      labelDefaultBillingAddress,
    );

    if (
      defaultBillingAddressId === address.id ||
      defaultShippingAddressId === address.id
    ) {
      labelDefaultBillingAddress.checked = true;
    }

    if (billingAddressIds?.includes(address.id as string)) {
      labelBillingAddressType.checked = true;
    }

    if (shippingAddressIds?.includes(address.id as string)) {
      labelShippingAddressType.checked = true;
    }

    wrapperBillingAddress.append(
      titleBillingAddress,
      wrapperBillingCountry,
      wrapperBillingCity,
      wrapperBillingPostcode,
      wrapperBillingStreet,
      wrapperBillingAddressType,
      wrapperShippingAddressType,
      wrapperDefaultBillingAddress,
    );

    return wrapperBillingAddress;
  }

  clickButtonEdit(button: HTMLButtonElement, fieldsArray: HTMLInputElement[]) {
    button.addEventListener("click", () => {
      fieldsArray.forEach((field) => {
        if (field.disabled === true) {
          field.disabled = false;
          field.style.opacity = "1";
        }
      });
    });
  }

  clickButtonSave(
    button: HTMLButtonElement,
    message: HTMLElement,
    field: HTMLInputElement,
    fieldsArray: HTMLInputElement[],
    customerId: string,
    version: number,
    email: HTMLInputElement,
    firstName: HTMLInputElement,
    lastName: HTMLInputElement,
    dateOfBirth: HTMLInputElement,
    fieldsWrappers: HTMLSpanElement[],
  ) {
    button.addEventListener("click", () => {
      let isError = false;
      fieldsWrappers.forEach((span) => {
        if (span.innerText) {
          isError = true;
        }
      });
      if (field.disabled === false && !isError) {
        this.customer.updateCustomer(
          customerId,
          version,
          email.value,
          firstName.value,
          lastName.value,
          dateOfBirth.value,
        );
        fieldsArray.forEach((field) => {
          field.disabled = true;
          field.style.opacity = ".6";
        });
        message.style.scale = "1";
        setTimeout(() => {
          message.style.scale = "0";
          window.location.href = pagePaths.profilePath;
        }, 2000);
      }
    });
  }
}

export default ProfilePage;
