class LoginPage {
  get usernameField() {
    return $('#user-name');
  }
  get passwordField() {
    return $('#password');
  }
  get loginButton() {
    return $('//input[@id="login-button"]');
  }
  get errorMessage() {
    return $('[data-test="error"]');
  }

  async open() {
    await browser.url('https://www.saucedemo.com/');
  }

  async login(username, password) {
    await this.usernameField.setValue(username);
    await this.passwordField.setValue(password);
    // await this.loginButton.click();
  }

  async getErrorMessage() {
    return this.errorMessage.getText();
  }
}

export default new LoginPage();
