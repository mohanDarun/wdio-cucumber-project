
Feature: Sauce Demo E2E Testing

  Scenario: Login with valid credentials
    Given I am on the Sauce Demo login page
    When I enter valid credentials
    And I click the login button
    Then I should see the inventory page

  Scenario: Login with invalid credentials
    Given I am on the Sauce Demo login page
    When I enter invalid credentials
    And I click the login button
    Then I should see an error message


  Scenario: Sort Products by Price (Low to High)
    Given I am logged in to the inventory page
    When I sort products by "Price (low to high)"
    Then the products should be sorted by price in ascending order

 
  Scenario: Add Products to the Cart
    Given I am logged in to the inventory page
    When I add the "Sauce Labs Backpack" to the cart
    And I add the "Sauce Labs Bike Light" to the cart
    Then the cart icon displays 2 items

  Scenario: Remove Product from the Cart
    Given I am logged in to the inventory page
    And I have items in my cart
    When I remove the "Sauce Labs Bike Light" from the cart
    Then the cart icon should show 1 item


  Scenario: Checkout Process - Valid Details
    Given I am logged in to the inventory page
    When I proceed to the checkout page
    And I fill in my details with valid information
    And I complete the order
    Then I should see the order confirmation message

  # Scenario: Checkout Process - Invalid Details
  #   Given I am logged in to the inventory page
  #   And I have items in my cart
  #   When I proceed to the checkout page
  #   And I fill in my details with invalid information
  #   Then I should see an error message on the checkout page

  # Scenario: Logout
  #   Given I am logged in to the inventory page
  #   When I click the logout button
  #   Then I should be redirected to the login page

  # Scenario: Unauthorized Access to Inventory Page
  #   Given I am not logged in
  #   When I navigate to the inventory page
  #   Then I should be redirected to the login page