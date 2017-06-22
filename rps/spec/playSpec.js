function RPS() {
    this.play = function (p1, p2, ui) {
        new PlayRequest(p1, p2, ui).execute()
    }
}

function PlayRequest(p1, p2, ui) {
    this.execute = function () {
        if (invalid(p1) || invalid(p2))
            ui.invalid()
        else if (tie())
            ui.tie()
        else if (p1BeatsP2())
            ui.p1Wins()
        else
            ui.p2Wins()
    }

    const validThrows = ["rock", "paper", "scissors"]

    function invalid(theThrow) {
        return !validThrows.includes(theThrow)
    }

    function tie() {
        return p1 === p2
    }

    function p1BeatsP2() {
        return p1 === "rock" && p2 === "scissors" ||
            p1 === "scissors" && p2 === "paper" ||
            p1 === "paper" && p2 === "rock"
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
            rps.play("rock", "scissors", ui)

            expect(ui.p1Wins).toHaveBeenCalled()
        })

        it("scissors v. paper", function () {
            rps.play("scissors", "paper", ui)

            expect(ui.p1Wins).toHaveBeenCalled()
        })

        it("paper v. rock", function () {
            rps.play("paper", "rock", ui)

            expect(ui.p1Wins).toHaveBeenCalled()
        })
    })


    describe("p2 win scenarios", function () {
        let ui

        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["p2Wins"])
        })

        it("scissors v. rock", function () {
            rps.play("scissors", "rock", ui)

            expect(ui.p2Wins).toHaveBeenCalled()
        })

        it("paper v. scissors", function () {
            rps.play("paper", "scissors", ui)

            expect(ui.p2Wins).toHaveBeenCalled()
        })

        it("rock v. paper", function () {
            rps.play("rock", "paper", ui)

            expect(ui.p2Wins).toHaveBeenCalled()
        })
    })

    describe("tie scenarios", function () {
        let ui

        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["tie"])
        })

        it("rock v. rock", function () {
            rps.play("rock", "rock", ui)

            expect(ui.tie).toHaveBeenCalled()
        })

        it("paper v. paper", function () {
            rps.play("paper", "paper", ui)

            expect(ui.tie).toHaveBeenCalled()
        })

        it("scissors v. scissors", function () {
            rps.play("scissors", "scissors", ui)

            expect(ui.tie).toHaveBeenCalled()
        })
    })

    describe("invalid", function () {
        let ui

        beforeEach(function () {
            ui = jasmine.createSpyObj("ui", ["invalid"])
        })

        it("rock v. invalid", function () {
            rps.play("rock", Math.random(), ui)

            expect(ui.invalid).toHaveBeenCalled()
        })

        it("invalid v. rock", function () {
            rps.play(Math.random(), "rock", ui)

            expect(ui.invalid).toHaveBeenCalled()
        })

        it("invalid v. invalid", function () {
            rps.play("sailboat", "sailboat", ui)

            expect(ui.invalid).toHaveBeenCalled()
        })
    })
})