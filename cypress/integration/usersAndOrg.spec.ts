import {
  navigateToLoginPage,
  login,
  userMaciej,
  apiUrl,
  authenticateOAuth,
} from "../support/commands/authenticate";

describe("Users and Org Api", () => {
  beforeEach(() => {
    navigateToLoginPage();
    authenticateOAuth();
    //login(userMaciej.username, userMaciej.password);
  });

  it("can create org and user and delete them", () => {
    let orgId = "";
    let orgName = "AutomationOrg";
    let userEmail = "automation@o2.com";

    cy.request({
      method: "POST",
      url: `${apiUrl}/api/v1/organizations`,
      body: {
        name: orgName,
      },
      headers: {
        Authorization: `Bearer ${Cypress.env('accessToken')}`
    }
    }).then((response) => {
      expect(response.status).to.eq(201); // documentation says 200
      expect(response.body).not.empty;
      orgId = response.body.name;
    });

    cy.request({
      method: "GET",
      url: `${apiUrl}/api/v1/organizations/${orgId}`,
      headers: {
        Authorization: `Bearer ${Cypress.env('accessToken')}` 
    }
    }).then((response) => {
      cy.log(response.body)
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('organizationId', orgId) //expected [ Array(9) ] to have property organizationId, to check
      expect(response.body).to.have.property('name', orgName)
    });

    cy.request({
      method: "POST",
      url: `${apiUrl}/api/v1/users`,
      body: {
        email: userEmail,
        password: "Automation123#",
        organizationId: `${orgId}`,
      },
      headers: {
        Authorization: `Bearer ${Cypress.env('accessToken')}`
    }
    }).then((response) => {
      expect(response.status).to.eq(201); // documentation says 200
    });

    cy.request({
      method: "GET",
      url: `${apiUrl}/api/v1/users/${userEmail}`,
      headers: {
        Authorization: `Bearer ${Cypress.env('accessToken')}` 
    }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('organization', '') // shouldn't be empty
    });

    cy.request({
        method: "DELETE",
        url: `${apiUrl}/api/v1/users`,
        body: {
            email: userEmail
        },
        headers: {
          Authorization: `Bearer ${Cypress.env('accessToken')}` 
      }
      }).then((response) => {
        expect(response.status).to.eq(204); // documentation say 200
      });

      cy.request({
        method: "DELETE",
        url: `${apiUrl}/api/v1/organizations/${orgId}`,
        headers: {
          Authorization: `Bearer ${Cypress.env('accessToken')}` 
      }
      }).then((response) => {
        expect(response.status).to.eq(204); // documentation say 200
      });
  });
});
