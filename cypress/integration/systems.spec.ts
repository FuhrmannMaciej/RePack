

import { cli } from "cypress";
import { apiUrl, authenticateOAuth, baseUrl, login, navigateToLoginPage, userMaciej } from "../support/commands/authenticate";
import { iterateThroughMetricsCards } from "../support/commands/systems";
import { $systemMetricsCard } from "../support/selectors";


describe('Systems Page', () => {

    beforeEach(() => {
        navigateToLoginPage();
        login(userMaciej.username, userMaciej.password)
    })


     it('check BESS metrics cards', () => {

        cy.url()
        .should('eq',`${baseUrl}/systems`);

        cy.get('[data-testid="MaciejBESSTest"]')
        .should('be.visible')
        .click();

        iterateThroughMetricsCards(
            [
                '200kW',
                'No value',
                '19A',
                '60°C',
                'No value',
                'No value'
            ],
            [
                'Power',
                'SOC',
                'Current',
                'Temperature',
                'Capacity',
                'Voltage'
            ]
        )
    });
})