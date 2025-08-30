class DashboardPage {
    navigateToDirectory() {
        cy.contains('Directory').click()
    }

    searchDirectory(name) {
        cy.get('input[placeholder="Type for hints..."]').type(name)
        cy.get('button[type="submit"]').click()
    }
}

export default new DashboardPage()
