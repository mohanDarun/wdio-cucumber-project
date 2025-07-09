class loginPage {
    constructor(page) {this.page = page; }

    get usernameField () { return '#user-name'; }
    get passwordField () { return '#password' ; }
    get loginButton () { return '//input [@id="login-button"]' ; }
    get errorMessage () { return '.error-message-container' ; }
    get productContainer () { return '.inventory_item_name' ; }



    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async enterCredentials (username,password) {
        await this.page.fill(this.usernameField,username);
        await this.page.fill(this.passwordField,password);
    }

    async clickLogin () {
        await this.page.click(this.loginButton);
    }

    async getErrorMessage () {
        return this.page.textContent(this.errorMessage);

    }


}

module.exports = loginPage ;