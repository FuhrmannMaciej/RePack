import { $systemMetricsCard } from "../selectors";


export const iterateThroughMetricsCards = (cardsValue: string[], cardsExplainer: string[]) => {
    for (let i = 0; i < cardsExplainer.length; i++) {
        
        cy.get($systemMetricsCard).eq(i).within(() => {
            cy.get('p').eq(0).should('have.text', cardsValue[i])
            cy.get('p').eq(1).should('have.text', cardsExplainer[i])
        })
    }
}