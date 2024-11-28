
// This command is being used to get the response for the different currencies.
// It takes 2 different currency and the integer value for the recentweeks.
Cypress.Commands.add('observationsSeries', (currency1, currency2, recentWeeks) => {
    return cy.request({
        method: 'GET',
        url: 'https://www.bankofcanada.ca/valet/observations/FX' + currency1 + currency2 + '/json?recent_weeks=' + recentWeeks,
        failOnStatusCode: false,
    })
})