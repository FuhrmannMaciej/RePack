import { apiUrl, baseUrl, login, navigateToLoginPage, userMaciej } from "../support/commands/authenticate";
import { $loginForm, $loginFormInputField } from "../support/selectors";


describe('Login Page', () => {

    beforeEach(() => {
        navigateToLoginPage();
    })

    it('can login successfully and logout', () => {

        login(userMaciej.username, userMaciej.password);

       cy.url()
       .should('eq',`${baseUrl}/systems`);

       cy.contains('Sign out')
       .click();

       cy.url()
        .should('eq',`${baseUrl}/login`);
    });

    it('cannot login with incorrect credentials', () => {
        
        login('aaa', 'aaa')

        cy.contains('The username/password couple is invalid.').should('be.visible');

        cy.url()
        .should('eq',`${baseUrl}/login`);
    });

    // it('login using api', () => {
    //     cy.request({
    //         method : 'POST',
    //         url: `${apiUrl}/connect/token`,
    //         form: true,
    //         body: userMaciej})
    //     .then((response) => {
    //         expect(response.status).to.eq(200)
    //         cy.fixture('authorization').then((auth) => {
    //             auth.access_token = response.body.access_token
    //             auth.token_type = response.body.token_type
    //         })
    //     })
    //     cy.fixture('authorization').then((auth) => {
    //         cy.visit({
    //             url: `${baseUrl}/systems`,
    //             headers: {
    //                 'Authorization': `${auth.token_type} ${auth.access_token}`
    //             }})
    //         })

    //     cy.url()
    //     .should('eq',`${baseUrl}/systems`)
    // });
})