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

module.exports = { RPS }