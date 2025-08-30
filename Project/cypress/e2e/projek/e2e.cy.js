import loginPage from '../../support/pageObjects/loginPageProject'
import dashboardPage from '../../support/pageObjects/dashboardPageProject'
import forgotPasswordPage from '../../support/pageObjects/forgotPasswordPageProject'
import loginData from '../../fixtures/loginDataProject.json'

describe('OrangeHRM - E2E Tests with POM + Intercept', () => {

  beforeEach(() => {
    loginPage.visit()
  })

  it('TC001 - Login with valid credentials', () => {
    cy.intercept('**/web/index.php/**').as('loginRequest')

    loginPage.enterUsername(loginData.validUser.username)
    loginPage.enterPassword(loginData.validUser.password)
    loginPage.clickLogin()

    cy.wait('@loginRequest').then((interception) => {
      expect([200, 302]).to.include(interception.response.statusCode)
    })

    cy.url().should('include', '/dashboard')
    cy.contains('Dashboard').should('be.visible')
  })

  it('TC002 - Login with invalid credentials', () => {
    cy.intercept('**/web/index.php/**').as('loginRequest')

    loginPage.enterUsername(loginData.invalidUser.username)
    loginPage.enterPassword(loginData.invalidUser.password)
    loginPage.clickLogin()

    cy.wait('@loginRequest')
    cy.contains('Invalid credentials').should('be.visible')
  })

  it('TC003 - Reset password', () => {
    forgotPasswordPage.visit()
    forgotPasswordPage.clickForgotPassword()
    forgotPasswordPage.enterUsername('Admin')
    forgotPasswordPage.clickReset()

    cy.contains('Reset Password link sent successfully').should('be.visible')
  })

  it('TC004 - Directory Menu', () => {
    loginPage.enterUsername(loginData.validUser.username)
    loginPage.enterPassword(loginData.validUser.password)
    loginPage.clickLogin()

    cy.intercept('GET', '**/api/v2/directory/**').as('directoryRequest')

    dashboardPage.navigateToDirectory()
    dashboardPage.searchDirectory('maura kesya budianti')

    cy.wait('@directoryRequest').its('response.statusCode').should('eq', 200)
  })
})
