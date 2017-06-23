function RPS(roundRepo) {
    this.playRound = function (p1Throw, p2Throw, ui) {
        new PlayRoundRequest(p1Throw, p2Throw, ui, roundRepo).execute()
    }

    this.history = function(ui){
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
            handleInvalid()
        else if (tie())
            handleTie()
        else if (p1Wins())
            handleP1Wins()
        else
            handleP2Wins()
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

    function save(result) {
        roundRepo.save(new Round(p1Throw, p2Throw, result))
    }

    function handleInvalid() {
        save("invalid")
        ui.invalid()
    }

    function handleTie() {
        save("tie")
        ui.tie()
    }

    function handleP1Wins() {
        save("p1")
        ui.p1Wins()
    }

    function handleP2Wins() {
        save("p2")
        ui.p2Wins()
    }
}

module.exports = { RPS, Round }