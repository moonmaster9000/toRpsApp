const {RPS, Round} = require("../src/rps")
const FakeRoundRepo = require("./FakeRoundRepo")

describe("history", function () {
    let roundRepo, rps

    beforeEach(function () {
        roundRepo = new FakeRoundRepo()
        rps = new RPS(roundRepo)
    })

    describe("when no rounds have been played", function () {
        it("tells the ui noRounds", function () {
            let ui = jasmine.createSpyObj("ui", ["noRounds"])

            rps.history(ui)

            expect(ui.noRounds).toHaveBeenCalled()
        })
    })

    describe("when rounds have been played", function () {
        it("send the rounds to the UI", function () {
            let playRoundUI = { p1Wins(){}, p2Wins(){}, tie(){}, invalid(){} }
            let ui = jasmine.createSpyObj("ui", ["rounds"])


            rps.playRound("rock", "scissors", playRoundUI)
            rps.playRound("scissors", "rock", playRoundUI)
            rps.playRound("rock", "rock", playRoundUI)
            rps.playRound("rock", "sailboat", playRoundUI)

            rps.history(ui)

            expect(ui.rounds).toHaveBeenCalledWith([
                new Round("rock", "scissors", "p1"),
                new Round("scissors", "rock", "p2"),
                new Round("rock", "rock", "tie"),
                new Round("rock", "sailboat", "invalid")
            ])
        })
    })
})


