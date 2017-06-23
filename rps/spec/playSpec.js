function RPS() {
    this.playRound = function (p1Throw, p2Throw, ui) {
        new PlayRoundRequest(p1Throw, p2Throw, ui).execute()
    }
}

function PlayRoundRequest(p1Throw, p2Throw, ui) {
    this.execute = function () {
        if (throwInvalid(p1Throw) || throwInvalid(p2Throw))
            ui.invalid()
        else if (tie())
            ui.tie()
        else if (p1Wins())
            ui.p1Wins()
        else
            ui.p2Wins()
    }

    const validThrows = ["rock", "paper", "scissors"]

    function throwInvalid(theThrow) {
        return !validThrows.includes(theThrow)
    }

    function tie() {
        return p1Throw === p2Throw
    }

    function p1Wins() {
        return p1Throw === "rock" && p2Throw === "scissors" ||
            p1Throw === "scissors" && p2Throw === "paper" ||
            p1Throw === "paper" && p2Throw === "rock"
    }
}

describe("play", function () {
    let rps

    beforeEach(function () {
        rps = new RPS()
    })

    describe("p1 win scenarios", function () {
        let ui

        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["p1Wins"])
        })

        it("rock v. scissors", function () {
            rps.playRound("rock", "scissors", ui)

            expect(ui.p1Wins).toHaveBeenCalled()
        })

        it("scissors v. paper", function () {
            rps.playRound("scissors", "paper", ui)

            expect(ui.p1Wins).toHaveBeenCalled()
        })

        it("paper v. rock", function () {
            rps.playRound("paper", "rock", ui)

            expect(ui.p1Wins).toHaveBeenCalled()
        })
    })


    describe("p2 win scenarios", function () {
        let ui

        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["p2Wins"])
        })

        it("scissors v. rock", function () {
            rps.playRound("scissors", "rock", ui)

            expect(ui.p2Wins).toHaveBeenCalled()
        })

        it("paper v. scissors", function () {
            rps.playRound("paper", "scissors", ui)

            expect(ui.p2Wins).toHaveBeenCalled()
        })

        it("rock v. paper", function () {
            rps.playRound("rock", "paper", ui)

            expect(ui.p2Wins).toHaveBeenCalled()
        })
    })

    describe("tie scenarios", function () {
        let ui

        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["tie"])
        })

        it("rock v. rock", function () {
            rps.playRound("rock", "rock", ui)

            expect(ui.tie).toHaveBeenCalled()
        })

        it("paper v. paper", function () {
            rps.playRound("paper", "paper", ui)

            expect(ui.tie).toHaveBeenCalled()
        })

        it("scissors v. scissors", function () {
            rps.playRound("scissors", "scissors", ui)

            expect(ui.tie).toHaveBeenCalled()
        })
    })

    describe("invalid", function () {
        let ui

        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["invalid"])
        })

        it("rock v. invalid", function () {
            rps.playRound("rock", Math.random(), ui)

            expect(ui.invalid).toHaveBeenCalled()
        })

        it("invalid v. rock", function () {
            rps.playRound(Math.random(), "rock", ui)

            expect(ui.invalid).toHaveBeenCalled()
        })

        it("invalid v. invalid", function () {
            rps.playRound("sailboat", "sailboat", ui)

            expect(ui.invalid).toHaveBeenCalled()
        })
    })
})