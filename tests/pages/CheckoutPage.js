class CheckoutPage {
    constructor(page) {
        this.page = page;
    }

    get checkoutButton() {
        return '[data-test="checkout"]';
    }

    get firstNameField() {
        return '[data-test="firstName"]';
    }

    get lastNameField() {
        return '[data-test="lastName"]';
    }

    get zipCodeField() {
        return '[data-test="postalCode"]';
    }

    get continueButton() {
        return '[data-test="continue"]';
    }

    get finishButton() {
        return '[data-test="finish"]';
    }

    get confirmationMessage() {
        return '.complete-header';
    }

    async startCheckout() {
        await this.page.click(this.checkoutButton);
    }

    async fillCheckoutForm({ firstName, lastName, zipCode }) {
        await this.page.fill(this.firstNameField, firstName);
        await this.page.fill(this.lastNameField, lastName);
        await this.page.fill(this.zipCodeField, zipCode);
        await this.page.click(this.continueButton);
    }

    async completeOrder() {
        await this.page.click(this.finishButton);
    }

    async getConfirmationMessage() {
        return await this.page.textContent(this.confirmationMessage);
    }
}

module.exports = CheckoutPage;
