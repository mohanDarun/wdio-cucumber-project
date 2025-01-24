class CheckoutPage {
  get checkoutButton() {
    return $('[data-test="checkout"]');
  }
  get firstNameField() {
    return $('[data-test="firstName"]');
  }
  get lastNameField() {
    return $('[data-test="lastName"]');
  }
  get postalCodeField() {
    return $('[data-test="postalCode"]');
  }
  get continueButton() {
    return $('[data-test="continue"]');
  }
  get finishButton() {
    return $('[data-test="finish"]');
  }
  get confirmationMessage() {
    return $('.complete-header');
  }

  async fillCheckoutDetails(firstName, lastName, postalCode) {
    await this.firstNameField.setValue(firstName);
    await this.lastNameField.setValue(lastName);
    await this.postalCodeField.setValue(postalCode);
    await this.continueButton.click();
  }

  async completeOrder() {
    await this.finishButton.click();
  }
}

export default new CheckoutPage();
