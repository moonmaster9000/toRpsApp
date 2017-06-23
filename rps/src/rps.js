function RPS() {
    this.playRound = function (p1Throw, p2Throw, ui, roundRepo) {
        new PlayRoundRequest(p1Throw, p2Throw, ui, roundRepo).execute()
    }

    this.history = function(ui, roundRepo){
        if (roundRepo.isEmpty()){
            ui.noRounds()
        } else {
            ui.rounds(roundRepo.getAll())
        }
    }
}

function Round(p1Throw, p2Throw, result){
    this.p1Throw = p1Throw
    this.p2Throw = p2Throw
    this.result = result
}



function PlayRoundRequest(p1Throw, p2Throw, ui, roundRepo) {
    this.execute = function () {
        if (throwInvalid(p1Throw) || throwInvalid(p2Throw))
            ui.invalid()
        else if (tie())
            ui.tie()
        else if (p1Wins()){
            roundRepo.save(new Round(p1Throw, p2Throw, "p1"))
            ui.p1Wins()
        }
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

module.exports = { RPS, Round }