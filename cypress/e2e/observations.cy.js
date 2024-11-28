describe("Test Scenarios using valet API from the Bank of Canada", () =>{

    // I calculated average only for this as requested in the assessment
    it("Positive Case: Average rate for CAD to AUD in past recent 10 weeks", () => {
        // I created a command observationSeries (calling below) for code reusability as per the request.
        cy.observationsSeries('CAD', 'AUD', 10)
        .then(response => {
            expect(response.status).equal(200)
            expect(response.body).to.have.property('terms')
            expect(response.body).to.have.property('seriesDetail')
            expect(response.body).to.have.property('observations')
            var sum = 0
            var count = response.body.observations.length
            for (var i in response.body.observations) {
                expect(response.body.observations[i]).to.have.property('d')
                expect(response.body.observations[i]).to.have.property('FXCADAUD')
                expect(response.body.observations[i].FXCADAUD).to.have.property('v')
                sum += parseFloat(response.body.observations[i].FXCADAUD.v)
            }
            var avg = sum / count
            cy.task('log', '10-week average CAD -> AUD: ' + avg)
        })
    })

    it("Positive Case: CAD to IDR in past recent 4 weeks", () => {
        cy.observationsSeries('CAD', 'IDR', 4)
        .then(response => {
            expect(response.status).equal(200)
            expect(response.body).to.have.property('terms')
            expect(response.body).to.have.property('seriesDetail')
            expect(response.body).to.have.property('observations')
            for (var i in response.body.observations) {
                expect(response.body.observations[i]).to.have.property('d')
                expect(response.body.observations[i]).to.have.property('FXCADIDR')
                expect(response.body.observations[i].FXCADIDR).to.have.property('v')
            }
        })
    })

    it("Positive Case: Average rate for CAD to AUD in past recent 1000000000000000 weeks", () => {
        cy.observationsSeries('CAD', 'AUD', 1000000000000000)
        .then(response => {
            expect(response.status).equal(200)
            expect(response.body).to.have.property('terms')
            expect(response.body).to.have.property('seriesDetail')
            expect(response.body).to.have.property('observations')
            for (var i in response.body.observations) {
                expect(response.body.observations[i]).to.have.property('d')
                expect(response.body.observations[i]).to.have.property('FXCADAUD')
                expect(response.body.observations[i].FXCADAUD).to.have.property('v')
            }
        })
    })

    it("Negative case: Currency1 and Currency2 is missing", () => {
        cy.observationsSeries('', '', 10)
        .then(response => {
            expect(response.body.message).equal("Series FX not found.")
            expect(response.status).equal(404)
        })
    })

    it("Negative case: Currency1 is missing", () => {
        cy.observationsSeries('', 'AUD', 10)
        .then(response => {
            expect(response.body.message).equal("Series FXAUD not found.")
            expect(response.status).equal(404)
        })
    })

    it("Negative case: Currency2 is missing", () => {
        cy.observationsSeries('CAD', '', 10)
        .then(response => {
            expect(response.body.message).equal("Series FXCAD not found.")
            expect(response.status).equal(404)
        })
    })

    it("Negative case: Currency1 and Currency2 is missing and value for number of recent weeks is 0", () => {
        cy.observationsSeries('', '', 0)
        .then(response => {
            expect(response.body.message).equal("Bad recent observations request parameters, you cannot have a recent value less than one")
            expect(response.status).equal(400)
        })
    })

    it("Negative case: Valid currency1 and currency2 but value for number recent week is 0", () => {
        cy.observationsSeries('CAD', 'AUD', 0)
        .then(response => {
            expect(response.body.message).equal("Bad recent observations request parameters, you cannot have a recent value less than one")
            expect(response.status).equal(400)
        })
    })

    it("Negative case: Invalid currency1 and currency2", () => {
        cy.observationsSeries('XXX', 'XXX', 10)
        .then(response => {
            expect(response.body.message).equal("Series FXXXXXXX not found.")
            expect(response.status).equal(404)
        })
    })

    it("Negative case: Valid currency1 and currency2 but negative value for recent number of weeks", () => {
        cy.observationsSeries('CAD', 'AUD', -1)
        .then(response => {
            expect(response.body.message).equal("Bad recent observations request parameters, you cannot have a recent value less than one")
            expect(response.status).equal(400)
        })
    })

    it("Negative case: currency1 is same as currency2", () => {
        cy.observationsSeries('CAD', 'CAD', 10)
        .then(response => {
            expect(response.body.message).equal("Series FXCADCAD not found.")
            expect(response.status).equal(404)
        })
    })
})