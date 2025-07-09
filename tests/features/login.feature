Feature: Login Functionality

  Scenario: Successful Login
    Given I open the SauceDemo login page
    When I enter valid credentials
    And I click the login button
    Then I should see the inventory page
  Scenario: Login with invalid credentials
    Given I open the SauceDemo login page
    When I enter invalid credentials
    And I click the login button
    Then I should see an error message "Epic sadface: Username and password do not match any user in this service"
  Scenario: Login with empty fields
    Given I open the SauceDemo login page
    When I leave the username and password fields empty
    And I click the login button
    Then I should see an error message "Epic sadface: Username is required"

  Scenario: Inventory page should list all products after login
    Given I open the SauceDemo login page
    When I enter valid credentials
    And I click the login button
    Then I should see the inventory page
    And I should see a list of products

  Scenario: Sort Products by Price (Low to High)
    Given I am logged in to the inventory page
    When I sort products by "Price (low to high)"
    Then the first product should have the lowest price
    And the last product should have the highest price

Scenario: Add Multiple Products to Cart
  Given I am logged in to the inventory page
  When I add the "Sauce Labs Backpack" to the cart
  And I add the "Sauce Labs Bike Light" to the cart
  Then the cart icon should display "2"
  And both items should appear in the shopping cart

Scenario: Remove Product from Cart
  Given I am logged in to the inventory page
  # When I add the "Sauce Labs Bolt T-Shirt" to the cart
  # And I add the "Sauce Labs Bike Light" to the cart
  And I go to the cart
  And I remove the "Sauce Labs Bike Light" from the cart
  Then the cart icon should display "1"
  And only "Sauce Labs Backpack" should remain in the cart

Scenario: Complete Checkout with Valid Information
  Given I have "Sauce Labs Backpack" in my cart
  When I proceed to checkout with:
    | First Name | Last Name | ZIP Code |
    | John       | Doe       | 90210    |
  And I complete the order
  Then I should see the confirmation message "Thank you for your order!"
