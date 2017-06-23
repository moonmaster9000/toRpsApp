const React = require("react")
const ReactDOM = require("react-dom")
const ReactTestUtils = require("react-dom/test-utils")
const { Round } = require("rps")

class PlayForm extends React.Component {
    constructor(){
        super()

        this.state = {}
    }

    componentDidMount(){
        this.props.rps.history(this)
    }

    noRounds(){
        this.setState({ history: "NO ROUNDS"})
    }

    rounds(rs){
        this.setState({history: rs.map(r => `${r.p1Throw} ${r.p2Throw} ${r.result}`)})
    }

    handleClick(){
        this.props.rps.play(this.state.p1Throw, this.state.p2Throw, this)
    }

    invalid(){
        this.setState({message: "INVALID"})
    }

    tie(){
        this.setState({message: "TIE"})
    }

    p1Wins(){
        this.setState({message: "Player One Wins!"})
    }

    p2Wins(){
        this.setState({message: "Player Two Wins!"})
    }

    inputChanged(e){
        this.setState({[e.target.name]: e.target.value})
    }

    render(){
        return <div>
            {this.state.message}
            <input type="text" name="p1Throw" onChange={this.inputChanged.bind(this)}/>
            <input type="text" name="p2Throw" onChange={this.inputChanged.bind(this)}/>
            <button onClick={this.handleClick.bind(this)}>PLAY</button>

            {this.state.history}
        </div>
    }
}

describe("play form", function () {
    describe("when the rps module says that the round is invalid", function () {
        beforeEach(function () {
            mountApp({
                play(p1Throw, p2Throw, ui){
                    ui.invalid()
                }
            })
        })

        it("displays 'INVALID'", function () {
            expect(page()).not.toContain("INVALID")
            submitPlayForm()
            expect(page()).toContain("INVALID")
        })
    })

    describe("when the rps module says that the round is tie", function () {
        beforeEach(function () {
            mountApp({
                play(p1Throw, p2Throw, ui){
                    ui.tie()
                }
            })
        })

        it("displays 'TIE'", function () {
            expect(page()).not.toContain("TIE")
            submitPlayForm()
            expect(page()).toContain("TIE")
        })
    })

    describe("when the rps module says that p1 wins the round", function () {
        beforeEach(function () {
            mountApp({
                play(p1Throw, p2Throw, ui){
                    ui.p1Wins()
                }
            })
        })

        it("displays 'Player One Wins!'", function () {
            expect(page()).not.toContain("Player One Wins!")
            submitPlayForm()
            expect(page()).toContain("Player One Wins!")
        })
    })
    
    describe("when the rps module says that p2 wins the round", function () {
        beforeEach(function () {
            mountApp({
                play(p1Throw, p2Throw, ui){
                    ui.p2Wins()
                }
            })
        })

        it("displays 'Player Two Wins!'", function () {
            expect(page()).not.toContain("Player Two Wins!")
            submitPlayForm()
            expect(page()).toContain("Player Two Wins!")
        })
    })

    it("sends user input to the rps module", function () {
        let playSpy = jasmine.createSpy("playSpy")

        mountApp({
            play: playSpy
        })

        fillIn("p1Throw", "p1 Throw")
        fillIn("p2Throw", "p2 Throw")

        submitPlayForm()

        expect(playSpy).toHaveBeenCalledWith("p1 Throw", "p2 Throw", jasmine.any(Object))
    })

    describe("when the rps module says there are no rounds", function () {
        beforeEach(function () {
            mountApp({
                history: function(ui){
                    ui.noRounds()
                }
            })
        })

        it("displays NO ROUNDS", function () {
            expect(page()).toContain("NO ROUNDS")
        })
    })

    describe("when the rps module says there are rounds", function () {
        beforeEach(function () {
            mountApp({
                history: function(ui){
                    ui.rounds([
                        new Round("foo", "bar", "baz")
                    ])
                }
            })
        })

        it("displays the rounds", function () {
            expect(page()).toContain("foo", "bar", "baz")
        })
    })

    function fillIn(inputName, inputValue) {
        let input = document.querySelector(`input[name='${inputName}']`)
        input.value = inputValue
        ReactTestUtils.Simulate.change(input)
    }


    let domFixture

    function setupDOM() {
        domFixture = document.createElement("div")
        document.querySelector("body").appendChild(domFixture)
    }

    beforeEach(function () {
        setupDOM()
    })

    afterEach(function () {
        cleanupDOM()
    })

    function mountApp(rps) {
        rps.history = rps.history || function(){}
        ReactDOM.render(
            <PlayForm rps={rps}/>,
            domFixture
        )
    }

    function page() {
        return domFixture.innerText
    }

    function submitPlayForm() {
        document.querySelector("button").click()
    }

    function cleanupDOM() {
        domFixture.remove()
    }
})