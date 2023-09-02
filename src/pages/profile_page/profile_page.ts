import Customer from "../../controller/customer";
import "./profile_page.scss";

class ProfilePage {
  customer: Customer;
  constructor() {
    this.customer = new Customer();
  }
  async render(): Promise<HTMLElement> {
    const customer = await this.customer.getCustomerObject(
      localStorage.getItem("id")?.slice(1, -1) as string,
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
    firstName.value = customer.body.firstName as string;
    firstName.disabled = true;

    wrapperFirstName.append(titleFirstName, firstName);

    const wrapperLastName: HTMLElement = document.createElement("div");
    wrapperLastName.classList.add("profile__wrapper-last-name");

    const titleLastName: HTMLElement = document.createElement("h4");
    titleLastName.classList.add("profile__title-first-name");
    titleLastName.innerText = "Last name:";

    const lastName: HTMLInputElement = document.createElement("input");
    lastName.classList.add("profile__last-name");
    lastName.value = customer.body.lastName as string;
    lastName.disabled = true;

    wrapperLastName.append(titleLastName, lastName);

    const wrapperBirthDate: HTMLElement = document.createElement("div");
    wrapperBirthDate.classList.add("profile__wrapper-last-name");

    const titleBirthDate: HTMLElement = document.createElement("h4");
    titleBirthDate.classList.add("profile__title-birth-date");
    titleBirthDate.innerText = "Date of Birthday:";

    const birthDate: HTMLInputElement = document.createElement("input");
    birthDate.classList.add("profile__birth-date");
    birthDate.value = customer.body.dateOfBirth as string;
    birthDate.disabled = true;

    wrapperBirthDate.append(titleBirthDate, birthDate);

    const wrapperEmail: HTMLElement = document.createElement("div");
    wrapperEmail.classList.add("profile__wrapper-email");

    const titleEmail: HTMLElement = document.createElement("h4");
    titleEmail.classList.add("profile__title-email");
    titleEmail.innerText = "E-mail:";

    const email: HTMLInputElement = document.createElement("input");
    email.classList.add("profile__email");
    email.value = customer.body.email;
    email.disabled = true;

    wrapperEmail.append(titleEmail, email);

    const wrapperAddresses: HTMLElement = document.createElement("div");
    wrapperAddresses.classList.add("profile__wrapper-addresses");

    // Billing addresses

    const wrapperBillingAddress: HTMLElement = document.createElement("div");
    wrapperBillingAddress.classList.add("profile__wrapper-billing-address");

    const titleBillingAddress: HTMLElement = document.createElement("h3");
    titleBillingAddress.classList.add("profile__title-billing-address");
    titleBillingAddress.innerText = "Billing address";

    const wrapperBillingCountry: HTMLElement = document.createElement("div");
    wrapperBillingCountry.classList.add("profile__wrapper-billing-country");

    const titleBillingCountry: HTMLElement = document.createElement("h4");
    titleBillingCountry.classList.add("profile__title-billing-country");
    titleBillingCountry.innerText = "Country:";

    const billingCountry: HTMLInputElement = document.createElement("input");
    billingCountry.classList.add("profile__billing-country");
    billingCountry.value = customer.body.addresses[0].country;
    billingCountry.disabled = true;

    wrapperBillingCountry.append(titleBillingCountry, billingCountry);

    const wrapperBillingCity: HTMLElement = document.createElement("div");
    wrapperBillingCity.classList.add("profile__wrapper-billing-city");

    const titleBillingCity: HTMLElement = document.createElement("h4");
    titleBillingCity.classList.add("profile__title-billing-city");
    titleBillingCity.innerText = "City:";

    const billingCity: HTMLInputElement = document.createElement("input");
    billingCity.classList.add("profile__billing-city");
    billingCity.value = customer.body.addresses[0].city as string;
    billingCity.disabled = true;

    wrapperBillingCity.append(titleBillingCity, billingCity);

    const wrapperBillingPostcode: HTMLElement = document.createElement("div");
    wrapperBillingPostcode.classList.add("profile__wrapper-billing-postcode");

    const titleBillingPostcode: HTMLElement = document.createElement("h4");
    titleBillingPostcode.classList.add("profile__title-billing-postcode");
    titleBillingPostcode.innerText = "Postcode:";

    const billingPostcode: HTMLInputElement = document.createElement("input");
    billingPostcode.classList.add("profile__billing-postcode");
    billingPostcode.value = customer.body.addresses[0].postalCode as string;
    billingPostcode.disabled = true;

    wrapperBillingPostcode.append(titleBillingPostcode, billingPostcode);

    const wrapperBillingStreet: HTMLElement = document.createElement("div");
    wrapperBillingStreet.classList.add("profile__wrapper-billing-street");

    const titleBillingStreet: HTMLElement = document.createElement("h4");
    titleBillingStreet.classList.add("profile__title-billing-Street");
    titleBillingStreet.innerText = "Street:";

    const billingStreet: HTMLInputElement = document.createElement("input");
    billingStreet.classList.add("profile__billing-street");
    billingStreet.value = customer.body.addresses[0].streetName as string;
    billingStreet.disabled = true;

    wrapperBillingStreet.append(titleBillingStreet, billingStreet);

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
    labelDefaultBillingAddress.checked = true;
    labelDefaultBillingAddress.disabled = true;

    wrapperDefaultBillingAddress.append(
      titleDefaultBillingAddress,
      labelDefaultBillingAddress,
    );

    wrapperBillingAddress.append(
      titleBillingAddress,
      wrapperBillingCountry,
      wrapperBillingCity,
      wrapperBillingPostcode,
      wrapperBillingStreet,
      wrapperDefaultBillingAddress,
    );

    // Shipping address

    const wrapperShippingAddress: HTMLElement = document.createElement("div");
    wrapperShippingAddress.classList.add("profile__wrapper-shipping-address");

    const titleShippingAddress: HTMLElement = document.createElement("h3");
    titleShippingAddress.classList.add("profile__title-shipping-address");
    titleShippingAddress.innerText = "Shipping address";

    const wrapperShippingCountry: HTMLElement = document.createElement("div");
    wrapperShippingCountry.classList.add("profile__wrapper-shipping-country");

    const titleShippingCountry: HTMLElement = document.createElement("h4");
    titleShippingCountry.classList.add("profile__title-shipping-country");
    titleShippingCountry.innerText = "Country:";

    const shippingCountry: HTMLInputElement = document.createElement("input");
    shippingCountry.classList.add("profile__shipping-country");
    shippingCountry.value =
      customer.body.addresses.length > 1
        ? customer.body.addresses[1].country
        : customer.body.addresses[0].country;
    shippingCountry.disabled = true;

    wrapperShippingCountry.append(titleShippingCountry, shippingCountry);

    const wrapperShippingCity: HTMLElement = document.createElement("div");
    wrapperShippingCity.classList.add("profile__wrapper-shipping-city");

    const titleShippingCity: HTMLElement = document.createElement("h4");
    titleShippingCity.classList.add("profile__title-shipping-city");
    titleShippingCity.innerText = "City:";

    const shippingCity: HTMLInputElement = document.createElement("input");
    shippingCity.classList.add("profile__shipping-city");
    shippingCity.value = (
      customer.body.addresses.length > 1
        ? customer.body.addresses[1].city
        : customer.body.addresses[0].city
    ) as string;
    shippingCity.disabled = true;

    wrapperShippingCity.append(titleShippingCity, shippingCity);

    const wrapperShippingPostcode: HTMLElement = document.createElement("div");
    wrapperShippingPostcode.classList.add("profile__wrapper-shipping-postcode");

    const titleShippingPostcode: HTMLElement = document.createElement("h4");
    titleShippingPostcode.classList.add("profile__title-shipping-postcode");
    titleShippingPostcode.innerText = "Postcode:";

    const shippingPostcode: HTMLInputElement = document.createElement("input");
    shippingPostcode.classList.add("profile__shipping-postcode");
    shippingPostcode.value = (
      customer.body.addresses.length > 1
        ? customer.body.addresses[1].postalCode
        : customer.body.addresses[0].postalCode
    ) as string;
    shippingPostcode.disabled = true;

    wrapperShippingPostcode.append(titleShippingPostcode, shippingPostcode);

    const wrapperShippingStreet: HTMLElement = document.createElement("div");
    wrapperShippingStreet.classList.add("profile__wrapper-shipping-street");

    const titleShippingStreet: HTMLElement = document.createElement("h4");
    titleShippingStreet.classList.add("profile__title-shipping-Street");
    titleShippingStreet.innerText = "Street:";

    const shippingStreet: HTMLInputElement = document.createElement("input");
    shippingStreet.classList.add("profile__shipping-street");
    shippingStreet.value = (
      customer.body.addresses.length > 1
        ? customer.body.addresses[1].streetName
        : customer.body.addresses[0].streetName
    ) as string;
    shippingStreet.disabled = true;

    wrapperShippingStreet.append(titleShippingStreet, shippingStreet);

    const wrapperDefaultShippingAddress: HTMLElement =
      document.createElement("div");
    wrapperDefaultShippingAddress.classList.add(
      "profile__wrapper-default-shipping-address",
    );

    const titleDefaultShippingAddress: HTMLElement =
      document.createElement("h4");
    titleDefaultShippingAddress.classList.add(
      "profile__title-default-shipping-address",
    );
    titleDefaultShippingAddress.innerText = "Default:";

    const labelDefaultShippingAddress: HTMLInputElement =
      document.createElement("input");
    labelDefaultShippingAddress.setAttribute("type", "checkbox");
    labelDefaultShippingAddress.classList.add(
      "profile__label-default-shipping-address",
    );
    labelDefaultShippingAddress.checked = true;
    labelDefaultShippingAddress.disabled = true;

    wrapperDefaultShippingAddress.append(
      titleDefaultShippingAddress,
      labelDefaultShippingAddress,
    );

    wrapperShippingAddress.append(
      titleShippingAddress,
      wrapperShippingCountry,
      wrapperShippingCity,
      wrapperShippingPostcode,
      wrapperShippingStreet,
      wrapperDefaultShippingAddress,
    );

    wrapperAddresses.append(wrapperBillingAddress, wrapperShippingAddress);

    mainWrapper.append(
      caption,
      wrapperFirstName,
      wrapperLastName,
      wrapperBirthDate,
      wrapperEmail,
      wrapperAddresses,
    );

    return mainWrapper;
  }
}

export default ProfilePage;
