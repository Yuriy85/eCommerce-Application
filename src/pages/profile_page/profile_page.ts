import Customer from "../../controller/customer";
import "./profile_page.scss";
import Events from "../../controller/events";
import { Address } from "@commercetools/platform-sdk";
import { pagePaths } from "../../routes/routes";
import Checks from "../../controller/checks";

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

    customerFromServer.body.addresses.forEach((address) => {
      const addressCard = this.createAddressCard(
        address,
        customerFromServer.body.billingAddressIds,
        customerFromServer.body.shippingAddressIds,
        customerFromServer.body.defaultBillingAddressId,
        customerFromServer.body.defaultShippingAddressId,
      );
      wrapperAddresses.append(addressCard);
      this.clickAddress(
        customerFromServer.body.version,
        customerId,
        addressCard,
      );
    });
    const wrapperEditSaveButtons: HTMLElement = document.createElement("div");
    wrapperEditSaveButtons.classList.add("profile__wrapper-edit-save");

    const editButton: HTMLButtonElement = document.createElement("button");
    editButton.classList.add("profile__edit-button");
    editButton.innerText = "Edit";

    const saveButton: HTMLButtonElement = document.createElement("button");
    saveButton.classList.add("profile__save-button");
    saveButton.innerText = "Save";

    const profileModal: HTMLElement = document.createElement("div");
    profileModal.classList.add("profile__modal");

    const emptyCard: HTMLElement = this.createAddressCard();
    profileModal.append(emptyCard);

    const addButton: HTMLButtonElement = document.createElement("button");
    addButton.classList.add("profile__add-button");
    addButton.innerText = "Add new address";

    const savedMessage: HTMLElement = document.createElement("div");
    savedMessage.classList.add("profile__data-profile-saved");
    savedMessage.innerText = "Personal data has been saved";

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
      addButton,
      profileModal,
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
    this.clickButtonChangePassword(
      customerFromServer.body.version,
      customerId,
      savePasswordButton,
      savedMessage,
      passwordEditError,
      pendingPassword,
      newPassword,
    );
    this.clickButtonAddAddress(addButton, profileModal);
    this.clickAddAddress(
      emptyCard,
      customerFromServer.body.version,
      customerId,
    );

    this.events.inputFilling(firstName, firstNameEditError, "name");
    this.events.inputFilling(lastName, lastNameEditError, "surname");
    this.events.inputFilling(birthDate, birthDateEditError, "date");
    this.events.inputFilling(email, emailEditError, "email");
    this.events.inputFilling(newPassword, passwordEditError, "password");

    return mainWrapper;
  }

  createAddressCard(
    address?: Address,
    billingAddressIds?: string[],
    shippingAddressIds?: string[],
    defaultBillingAddressId?: string,
    defaultShippingAddressId?: string,
  ): HTMLElement {
    const wrapperBillingAddress: HTMLElement = document.createElement("div");
    wrapperBillingAddress.classList.add("profile__wrapper-billing-address");
    wrapperBillingAddress.id = address?.id ? address.id : "new_address";

    const titleBillingAddress: HTMLElement = document.createElement("h3");
    titleBillingAddress.classList.add("profile__title-billing-address");
    titleBillingAddress.innerText = address ? "Address" : "New address";

    const wrapperBillingCountry: HTMLElement = document.createElement("div");
    wrapperBillingCountry.classList.add("profile__wrapper-billing-country");

    const titleBillingCountry: HTMLElement = document.createElement("h4");
    titleBillingCountry.classList.add("profile__title-billing-country");
    titleBillingCountry.innerText = "Country:";

    const billingCountry: HTMLSelectElement = document.createElement("select");
    billingCountry.classList.add("profile__billing-country");

    const optionBillingIt: HTMLOptionElement = document.createElement(
      "option",
    ) as HTMLOptionElement;
    optionBillingIt.textContent = "Italy";

    const optionBillingBy: HTMLOptionElement = document.createElement(
      "option",
    ) as HTMLOptionElement;
    optionBillingBy.textContent = "Belarus";

    billingCountry.append(optionBillingBy, optionBillingIt);

    billingCountry.selectedIndex = address?.country === "IT" ? 1 : 0;
    billingCountry.disabled = address ? true : false;

    wrapperBillingCountry.append(titleBillingCountry, billingCountry);

    const wrapperBillingCity: HTMLElement = document.createElement("div");
    wrapperBillingCity.classList.add("profile__wrapper-billing-city");

    const titleBillingCity: HTMLElement = document.createElement("h4");
    titleBillingCity.classList.add("profile__title-billing-city");
    titleBillingCity.innerText = "City:";

    const billingCity: HTMLInputElement = document.createElement("input");
    billingCity.classList.add("profile__billing-city");
    billingCity.value = address ? (address.city as string) : "Minsk";
    billingCity.disabled = address ? true : false;

    const billingCityError: HTMLElement = document.createElement("span");
    billingCityError.classList.add("profile__billing-city-error");

    wrapperBillingCity.append(titleBillingCity, billingCity, billingCityError);

    const wrapperBillingPostcode: HTMLElement = document.createElement("div");
    wrapperBillingPostcode.classList.add("profile__wrapper-billing-postcode");

    const titleBillingPostcode: HTMLElement = document.createElement("h4");
    titleBillingPostcode.classList.add("profile__title-billing-postcode");
    titleBillingPostcode.innerText = "Postcode:";

    const billingPostcode: HTMLInputElement = document.createElement("input");
    billingPostcode.classList.add("profile__billing-postcode");
    billingPostcode.value = address ? (address.postalCode as string) : "220100";
    billingPostcode.disabled = address ? true : false;

    const billingPostcodeError: HTMLElement = document.createElement("span");
    billingPostcodeError.classList.add("profile__billing-postcode-error");

    wrapperBillingPostcode.append(
      titleBillingPostcode,
      billingPostcode,
      billingPostcodeError,
    );

    const wrapperBillingStreet: HTMLElement = document.createElement("div");
    wrapperBillingStreet.classList.add("profile__wrapper-billing-street");

    const titleBillingStreet: HTMLElement = document.createElement("h4");
    titleBillingStreet.classList.add("profile__title-billing-Street");
    titleBillingStreet.innerText = "Street:";

    const billingStreet: HTMLInputElement = document.createElement("input");
    billingStreet.classList.add("profile__billing-street");
    billingStreet.value = address
      ? (address.streetName as string)
      : "Bangalor plosad'";
    billingStreet.disabled = address ? true : false;

    const billingStreetError: HTMLElement = document.createElement("span");
    billingStreetError.classList.add("profile__billing-street-error");

    wrapperBillingStreet.append(
      titleBillingStreet,
      billingStreet,
      billingStreetError,
    );

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

    labelBillingAddressType.disabled = address ? true : false;

    wrapperBillingAddressType.append(
      titleBillingAddressType,
      labelBillingAddressType,
    );

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

    labelShippingAddressType.disabled = address ? true : false;

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

    labelDefaultBillingAddress.disabled = address ? true : false;

    wrapperDefaultBillingAddress.append(
      titleDefaultBillingAddress,
      labelDefaultBillingAddress,
    );

    if (
      defaultBillingAddressId === address?.id ||
      defaultShippingAddressId === address?.id
    ) {
      labelDefaultBillingAddress.checked = true;
    }

    if (!address || billingAddressIds?.includes(address?.id as string)) {
      labelBillingAddressType.checked = true;
    }

    if (!address || shippingAddressIds?.includes(address?.id as string)) {
      labelShippingAddressType.checked = true;
    }

    const editAddressButton: HTMLButtonElement =
      document.createElement("button");
    editAddressButton.classList.add("profile__edit-address-button");
    editAddressButton.innerText = address ? "Edit" : "Add";

    const saveAddressButton: HTMLButtonElement =
      document.createElement("button");
    saveAddressButton.classList.add("profile__save-address-button");
    saveAddressButton.innerText = "Save";
    if (!address) {
      saveAddressButton.style.display = "none";
    }

    const deleteAddressButton: HTMLButtonElement =
      document.createElement("button");
    deleteAddressButton.classList.add("profile__del-address-button");
    deleteAddressButton.innerText = address ? "Delete" : "Cancel";

    wrapperBillingAddress.append(
      titleBillingAddress,
      wrapperBillingCountry,
      wrapperBillingCity,
      wrapperBillingPostcode,
      wrapperBillingStreet,
      wrapperBillingAddressType,
      wrapperShippingAddressType,
      wrapperDefaultBillingAddress,
      editAddressButton,
      saveAddressButton,
      deleteAddressButton,
    );

    this.events.inputFilling(billingCity, billingCityError, "billingCity");
    this.events.inputFilling(
      billingPostcode,
      billingPostcodeError,
      "billingCode",
    );
    this.events.inputFilling(
      billingStreet,
      billingStreetError,
      "billingStreet",
    );
    this.events.selectCountry(
      billingCountry,
      billingPostcode,
      "billing",
      billingPostcodeError,
      "Enter post code!",
    );

    if (!address) {
      deleteAddressButton.addEventListener("click", () => {
        document
          .querySelector(".profile__modal")
          ?.classList.remove("profile__show-modal");
      });
    }

    return wrapperBillingAddress;
  }

  clickAddAddress(card: HTMLElement, version: number, customerId: string) {
    card.addEventListener("click", async (event) => {
      const country: string =
        (card.childNodes[1].childNodes[1] as HTMLSelectElement).value ===
        "Belarus"
          ? "BY"
          : "IT";
      const cityInput: HTMLInputElement = card.childNodes[2]
        .childNodes[1] as HTMLInputElement;
      const postcodeInput: HTMLInputElement = card.childNodes[3]
        .childNodes[1] as HTMLInputElement;
      const streetInput: HTMLInputElement = card.childNodes[4]
        .childNodes[1] as HTMLInputElement;
      const billingInput: HTMLInputElement = card.childNodes[5]
        .childNodes[1] as HTMLInputElement;
      const shippingInput: HTMLInputElement = card.childNodes[6]
        .childNodes[1] as HTMLInputElement;
      const defaultInput: HTMLInputElement = card.childNodes[7]
        .childNodes[1] as HTMLInputElement;
      const errorsAreas: HTMLSpanElement[] = [
        card.childNodes[2].childNodes[2] as HTMLSpanElement,
        card.childNodes[3].childNodes[2] as HTMLSpanElement,
        card.childNodes[4].childNodes[2] as HTMLSpanElement,
      ];

      if (
        (event.target as HTMLButtonElement).innerText === "Add" &&
        !errorsAreas.some((errorsArea) => errorsArea.innerText)
      ) {
        try {
          const costumer = await this.customer.addAddress(
            version,
            customerId,
            streetInput.value,
            postcodeInput.value,
            cityInput.value,
            country,
          );
          const lastAddress = costumer.body.addresses.length - 1;
          try {
            await this.customer.changeAddressAttributes(
              costumer.body.version,
              customerId,
              costumer.body.addresses[lastAddress].id as string,
              billingInput.checked,
              shippingInput.checked,
              defaultInput.checked,
            );
            (card.firstChild as HTMLElement).innerText =
              "New address has been added!";
            setTimeout(() => {
              window.location.href = pagePaths.profilePath;
            }, 1500);
          } catch (error) {
            error as Error;
          }
        } catch (error) {
          error as Error;
        }
      }
    });
  }

  clickButtonEdit(button: HTMLButtonElement, fieldsArray: HTMLInputElement[]) {
    button.addEventListener("click", () => {
      fieldsArray.forEach((field) => {
        if (field.disabled === true) {
          field.disabled = false;
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
        });
        message.style.scale = "1";
        setTimeout(() => {
          message.style.scale = "0";
          window.location.href = pagePaths.profilePath;
        }, 2000);
      }
    });
  }

  clickButtonChangePassword(
    version: number,
    customerId: string,
    button: HTMLButtonElement,
    message: HTMLElement,
    errorArea: HTMLElement,
    currentPassword: HTMLInputElement,
    newPassword: HTMLInputElement,
  ) {
    button.addEventListener("click", async () => {
      if (!errorArea.innerText) {
        try {
          await this.customer.updateCustomerPassword(
            version,
            customerId,
            currentPassword.value,
            newPassword.value,
          );
          message.style.scale = "1";
          setTimeout(() => {
            message.style.scale = "0";
            window.location.href = pagePaths.profilePath;
          }, 1500);
        } catch (error) {
          errorArea.innerText = (error as Error).message;
          currentPassword.value = "";
          newPassword.value = "";
        }
      }
    });
  }

  clickButtonAddAddress(button: HTMLButtonElement, profileModal: HTMLElement) {
    button.addEventListener("click", () => {
      profileModal.classList.add("profile__show-modal");
    });
  }

  clickAddress(version: number, customerId: string, card: HTMLElement) {
    let billingInputValue: boolean = false;
    let shippingInputValue: boolean = false;
    let defaultInputValue: boolean = false;

    card.addEventListener("click", async (event) => {
      const country: string =
        (card.childNodes[1].childNodes[1] as HTMLSelectElement).value ===
        "Belarus"
          ? "BY"
          : "IT";
      const cityInput: HTMLInputElement = card.childNodes[2]
        .childNodes[1] as HTMLInputElement;
      const postcodeInput: HTMLInputElement = card.childNodes[3]
        .childNodes[1] as HTMLInputElement;
      const streetInput: HTMLInputElement = card.childNodes[4]
        .childNodes[1] as HTMLInputElement;
      const billingInput: HTMLInputElement = card.childNodes[5]
        .childNodes[1] as HTMLInputElement;
      const shippingInput: HTMLInputElement = card.childNodes[6]
        .childNodes[1] as HTMLInputElement;
      const defaultInput: HTMLInputElement = card.childNodes[7]
        .childNodes[1] as HTMLInputElement;
      const errorsAreas: HTMLSpanElement[] = [
        card.childNodes[2].childNodes[2] as HTMLSpanElement,
        card.childNodes[3].childNodes[2] as HTMLSpanElement,
        card.childNodes[4].childNodes[2] as HTMLSpanElement,
      ];

      if ((event.target as HTMLButtonElement).innerText === "Delete") {
        try {
          await this.customer.removeAddress(version, customerId, card.id);
          window.location.href = pagePaths.profilePath;
        } catch (error) {
          error as Error;
        }
      }
      if ((event.target as HTMLButtonElement).innerText === "Edit") {
        Checks.billingCheckCountry = country === "BY" ? "Belarus" : "Italy";
        billingInputValue = (
          card.childNodes[5].childNodes[1] as HTMLInputElement
        ).checked;
        shippingInputValue = (
          card.childNodes[6].childNodes[1] as HTMLInputElement
        ).checked;
        defaultInputValue = (
          card.childNodes[7].childNodes[1] as HTMLInputElement
        ).checked;
        card.childNodes.forEach((child) =>
          child.childNodes.forEach((child) => {
            (child as HTMLButtonElement).disabled = false;
          }),
        );
      }
      if (
        !errorsAreas.some((errorsArea) => errorsArea.innerText) &&
        (event.target as HTMLButtonElement).innerText === "Save" &&
        !cityInput.disabled
      ) {
        try {
          await this.customer.changeAddress(
            version,
            customerId,
            card.id,
            streetInput.value,
            postcodeInput.value,
            cityInput.value,
            country,
            billingInputValue,
            shippingInputValue,
            defaultInputValue,
            billingInput.checked,
            shippingInput.checked,
            defaultInput.checked,
          );
          (card.firstChild as HTMLElement).innerText =
            "Address has been saved!";
          setTimeout(() => {
            window.location.href = pagePaths.profilePath;
          }, 1500);
        } catch (error) {
          error as Error;
        }
      }
    });
  }
}

export default ProfilePage;
