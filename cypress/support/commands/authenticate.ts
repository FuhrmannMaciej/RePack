import { $loginForm, $loginFormInputField } from "../selectors"

export const userMaciej = {
    grant_type: "password",
    username: "maciej@gmail.com",
    password: "Maciej123#"
}

export const baseUrl = 'http://34.116.208.40'
export const apiUrl = 'http://34.118.89.132'

export const navigateToLoginPage = () => {
    cy.visit('/')
    cy.url().should('eq', `${baseUrl}/login`)
}

export const login = (username: string, password: string) => {

    cy.get($loginForm).within(() => {
        cy.get($loginFormInputField)
        .eq(0)
        .type(username)
        .should('have.value', username);

        cy.get($loginFormInputField)
        .eq(1)
        .type(password)
        .should('have.value', password);

        cy.contains('Sign in')
        .click();
    })
}

export const authenticateOAuth = () => {
    cy.request({
        method : 'POST',
        url: `${apiUrl}/connect/token`,
        form: true,
        body: {
            grant_type: 'client_credentials',
            client_id: Cypress.env('clientId'),
            client_secret: Cypress.env('clientSecret')
        }
    }).then((response) => {
        Cypress.env('accessToken', response.body.access_token)
    })
}