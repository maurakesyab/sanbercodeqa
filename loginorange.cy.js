describe('OrangeHRM - Test Fitur Login & Forgot Password', () => {
    const baseUrl = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    
    describe('Login Feature', () => {
      beforeEach(() => {
        cy.visit(baseUrl)
      })
  
      it('TC001 - Login menggunakan username & password valid (Positif case)', () => {
        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()
  
        cy.url().should('include', '/dashboard')
        cy.get('.oxd-topbar-header-breadcrumb h6')
          .should('contain', 'Dashboard')
      })
  
      it('TC002 - Login menggunakan username salah (Negatif case)', () => {
        cy.get('input[name="username"]').type('usernamesalah')
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()
  
        cy.get('.oxd-alert-content-text')
          .should('contain', 'Invalid credentials')
      })
  
      it('TC003 - Login menggunakan password salah (Negatif case)', () => {
        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('passwordsalah')
        cy.get('button[type="submit"]').click()
  
        cy.get('.oxd-alert-content-text')
          .should('contain', 'Invalid credentials')
      })
  
      it('TC004 - Login tanpa isi username & password (Negatif case)', () => {
        cy.get('button[type="submit"]').click()
  
        cy.get(':nth-child(2) > .oxd-input-group > .oxd-text')
          .should('contain', 'Required')
        cy.get(':nth-child(3) > .oxd-input-group > .oxd-text')
          .should('contain', 'Required')
      })
  
      it('TC005 - Login hanya isi username (Negatif case)', () => {
        cy.get('input[name="username"]').type('Admin')
        cy.get('button[type="submit"]').click()
  
        cy.get(':nth-child(3) > .oxd-input-group > .oxd-text')
          .should('contain', 'Required')
      })
  
      it('TC006 - Login hanya isi password (Negatif case)', () => {
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()
  
        cy.get(':nth-child(2) > .oxd-input-group > .oxd-text')
          .should('contain', 'Required')
      })
    })
  })
  
