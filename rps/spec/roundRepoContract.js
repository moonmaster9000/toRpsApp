const { Round } = require("../src/rps")

module.exports = function roundRepoContract(roundRepoClass){
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
