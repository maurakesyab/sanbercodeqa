class ForgotPasswordPage {
    visit() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    }

    clickForgotPassword() {
        cy.contains('Forgot your password?').click()
    }

    enterUsername(username) {
        cy.get('input[name="username"]').type(username)
    }

    clickReset() {
        cy.get('button[type="submit"]').click()
    }
}

export default new ForgotPasswordPage()
