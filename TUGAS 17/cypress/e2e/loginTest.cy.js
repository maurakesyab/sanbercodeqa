import loginPage from "../../support/pageObjects/loginPage.js";
import loginData from "../../fixtures/logindata.json";

describe('OrangeHRM - Login Feature with POM + Fixture', () => {

    beforeEach(() => {
        Cypress.on('uncaught:exception', () => false);
        loginPage.visit();
    });

    it('TC001 - Login with valid credentials', () => {
        loginPage.enterUsername(loginData.validUser.username);
        loginPage.enterPassword(loginData.validUser.password);
        loginPage.clickLogin();

        cy.url({timeout: 10000}).should('include', '/dashboard');
        cy.contains('Dashboard', {timeout: 10000}).should('be.visible');
    });

    it('TC002 - Login with invalid password', () => {
        loginPage.enterUsername(loginData.validUser.username);
        loginPage.enterPassword(loginData.invalidPassword.password);
        loginPage.clickLogin();

        loginPage.getErrorMessage().should('contain.text', 'Invalid credentials');
    });

    it('TC003 - Login with invalid username', () => {
        loginPage.enterUsername(loginData.invalidUsername.username);
        loginPage.enterPassword(loginData.validUser.password);
        loginPage.clickLogin();

        loginPage.getErrorMessage().should('contain.text', 'Invalid credentials');
    });

    it('TC004 - Login with blank username and password', () => {
        loginPage.clickLogin();
        loginPage.getRequiredMessage().should('contain.text', 'Required');
    });

    it('TC005 - Logout after successful login', () => {
        loginPage.enterUsername(loginData.validUser.username);
        loginPage.enterPassword(loginData.validUser.password);
        loginPage.clickLogin();

        cy.url().should('include', '/dashboard');
        cy.contains('Dashboard').should('be.visible');

        loginPage.logout();
        cy.url().should('include', '/auth/login');
        cy.get(loginPage.loginButton).should('be.visible');
    });
});
