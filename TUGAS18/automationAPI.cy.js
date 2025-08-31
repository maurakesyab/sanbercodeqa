describe('API Automation Testing with Reqres.in', () => {
  
    // 1. GET List Users
    it('GET - List Users', () => {
        cy.request({
          method: 'GET',
          url: 'https://reqres.in/api/users?page=2',
          failOnStatusCode: false
        }).then((response) => {
          expect([200, 401]).to.include(response.status);
      
          if (response.status === 200) {
            expect(response.body.data).to.have.length.greaterThan(0);
          } else {
            cy.log('Unauthorized / Missing API key:', JSON.stringify(response.body));
          }
        });
      });
  
    // 2. GET Single User
    it('GET - Single User', () => {
        cy.request({
          method: 'GET',
          url: 'https://reqres.in/api/users/2',
          failOnStatusCode: false
        }).then((response) => {
          expect([200, 401]).to.include(response.status);

          if (response.status === 200) {
            expect(response.body.data).to.have.property('id', 2);
          } else {
            cy.log('Unauthorized / Missing API key:', JSON.stringify(response.body));
          }
        });
      });
  
    // 3. POST Create User
   it('POST - Create User', () => {
  cy.request({
    method: 'POST',
    url: 'https://reqres.in/api/users',
    body: {
      name: 'maura',
      job: 'QA Engineer'
    },
    failOnStatusCode: false
  }).then((response) => {
    if (response.status === 201) {
      expect(response.body).to.have.property('name', 'maura');
      expect(response.body).to.have.property('job', 'QA Engineer');
      expect(response.body).to.have.property('id');
    } else if (response.status === 401) {
      expect(response.body).to.have.property('error', 'Missing API key');
      cy.log('API membutuhkan API key di environment ini');
    } else {
      throw new Error(`Unexpected status: {response.status}`);
    }
  });
});
  
    // 4. PUT Update User
    it('PUT - Update User', () => {
      cy.request({
        method: 'PUT',
        url: 'https://reqres.in/api/users/2',
        failOnStatusCode: false,
        body: {
          name: 'maura updated',
          job: 'Senior QA'
        }
      }).then((response) => {
        expect([200, 401]).to.include(response.status);
        if (response.status === 200) {
          expect(response.body).to.have.property('name', 'maura updated');
        } else {
          cy.log('Server responded with:', response.body.error);
        }
      });
    });
  
    // 5. PATCH Update User
    it('PATCH - Update User', () => {
      cy.request({
        method: 'PATCH',
        url: 'https://reqres.in/api/users/2',
        failOnStatusCode: false,
        body: {
          job: 'Lead QA'
        }
      }).then((response) => {
        expect([200, 401]).to.include(response.status);
        if (response.status === 200) {
          expect(response.body).to.have.property('job', 'Lead QA');
        } else {
          cy.log('Server responded with:', response.body.error);
        }
      });
    });
  
    // 6. DELETE User
    it('DELETE - Delete User', () => {
      cy.request({
        method: 'DELETE',
        url: 'https://reqres.in/api/users/2',
        failOnStatusCode: false
      }).then((response) => {
        expect([204, 401]).to.include(response.status);
      });
    });
  
    // 7. POST - Register Successful
    it('POST - Register Successful', () => {
        cy.request({
          method: 'POST',
          url: 'https://reqres.in/api/register',
          body: {
            email: 'eve.holt@reqres.in',
            password: 'pistol'
          },
          failOnStatusCode: false
        }).then((response) => {
          if (response.status === 200) {
            expect(response.body).to.have.property('token');
          } else if (response.status === 401) {
            expect(response.body).to.have.property('error', 'Missing API key');
            cy.log('Register butuh API key di environment ini');
          } else {
            throw new Error(`Unexpected status: ${response.status}`);
          }
        });
      });
    
    });
