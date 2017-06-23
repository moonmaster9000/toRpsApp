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

            let roundRepo = new FakeRoundRepo()

            new RPS().playRound("rock", "scissors", playRoundUI, roundRepo)

            rps.history(ui, roundRepo)

            expect(ui.rounds).toHaveBeenCalledWith([
                new Round("rock", "scissors", "p1")
            ])
        })
    })
})

function FakeRoundRepo(){
    let rounds = []

    this.isEmpty = function(){
        return rounds.length === 0
    }

    this.save = function(r){
        rounds.push(r)
    }

    this.getAll = function(){
        return rounds
    }
}

function roundRepoContract(roundRepoClass){
    describe("round repo", function () {
        let roundRepo

        beforeEach(function () {
            roundRepo = new roundRepoClass()
        })

        describe("when rounds have been saved", function () {
            it("returns the saved rounds", function () {
                let round1 = new Round(Math.random())
                let round2 = new Round(Math.random())

                roundRepo.save(round1)
                roundRepo.save(round2)

                expect(roundRepo.getAll()).toContain(round1, round2)
            })

            it("is not empty", function () {
                roundRepo.save(new Round())

                expect(roundRepo.isEmpty()).toBe(false)
            })
        })

        describe("when no rounds have been saved", function () {
            it("is empty", function () {
                expect(roundRepo.isEmpty()).toBe(true)
            })
        })

    })
}


roundRepoContract(FakeRoundRepo)