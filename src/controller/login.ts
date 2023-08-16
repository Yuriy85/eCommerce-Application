import Customer from "./customer";

class Login {
  customer: Customer;
  constructor() {
    this.customer = new Customer();
  }
  login() {
    const inputEmail: HTMLInputElement = document.querySelector(
      ".input-log-email",
    ) as HTMLInputElement;
    const inputPassword: HTMLInputElement = document.querySelector(
      ".input-log-password",
    ) as HTMLInputElement;
    const valueEmail: string = inputEmail.value;
    const valuePassword: string = inputPassword.value;
    this.customer.getLoginCustomer(valueEmail, valuePassword);
  }
}
export default Login;
