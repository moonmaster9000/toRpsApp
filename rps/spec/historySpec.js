const {RPS, Round} = require("../src/rps")


describe("history", function () {
    describe("when no rounds have been played", function () {
        it("tells the ui noRounds", function () {
            let ui = jasmine.createSpyObj("ui", ["noRounds"])

            let rps = new RPS()

            rps.history(ui)

            expect(ui.noRounds).toHaveBeenCalled()
        })
    })

    fdescribe("when rounds have been played", function () {
        it("send the rounds to the UI", function () {
            let rps = new RPS()
            let playRoundUI = { p1Wins(){} }
            let ui = jasmine.createSpyObj("ui", ["rounds"])

            let roundRepo = {
                isEmpty(){},
                getAll(){},
                save(){}
            }

            new RPS().playRound("rock", "scissors", playRoundUI, roundRepo)

            rps.history(ui, roundRepo)

            expect(ui.rounds).toHaveBeenCalledWith([
                new Round("rock", "scissors", "p1")
            ])
        })

    })
})