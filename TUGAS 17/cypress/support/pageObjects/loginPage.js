class LoginPage {
    usernameField = 'input[name="username"]'
    passwordField = 'input[name="password"]'
    loginButton = 'button[type="submit"]'
    errorMessage = '.oxd-alert-content-text'
    requiredMessage = '.oxd-input-field-error-message'
    profileMenu = '.oxd-userdropdown-tab'
    logoutButton = 'a[href="/web/index.php/auth/logout"]'

    visit() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    }

    enterUsername(username) {
        cy.get(this.usernameField).clear().type(username)
    }

    enterPassword(password) {
        cy.get(this.passwordField).clear().type(password)
    }

    clickLogin() {
        cy.get(this.loginButton).click()
    }

    getErrorMessage() {
        return cy.get(this.errorMessage)
    }

    getRequiredMessage() {
        return cy.get(this.requiredMessage)
    }

    logout() {
        cy.get(this.profileMenu).click()
        cy.get(this.logoutButton).click()
    }
}

export default new LoginPage()
