class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            input: '',
            prevInput: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.resetInput = this.resetInput.bind(this);
        this.clearInputs = this.clearInputs.bind(this);
    }

    resetInput(updatedInput) {
        var update = this.state.prevInput + updatedInput; 
        this.setState({ prevInput: update });
        this.setState({ input: "" }); 
    }

    clearInputs() {
        this.setState({ prevInput: "" });
        this.setState({ input: "" });
    }

    handleChange(value) {
        var updatedInput = this.state.input;
        if (updatedInput.indexOf("Error") != -1) {
            updatedInput = "";
        }
        if (value === "Clear") {
            if (this.state.input === "" && this.state.prevInput !== "") {
                updatedInput = this.state.prevInput.substring(0, this.state.prevInput.length - 3);
                updatedInput = updatedInput.substring(0, updatedInput.lastIndexOf(" ")+1);
                this.setState({ prevInput: updatedInput });
            } else {
                this.setState({ input: "" });
            }
        } else if (value === "Clear All") {
            this.clearInputs();
        } else if (value === "DEL") {
            updatedInput = updatedInput.substring(0, updatedInput.length - 1);
            this.setState({ input: updatedInput });
        } else if (value === "+" || value === "-" || value === "÷" || value === "×") {
            updatedInput += " " + value + " ";
            this.resetInput(updatedInput);
        } else if (value === "=") {
            updatedInput = this.state.prevInput + this.state.input;
            var calculation = new Object();
            calculation.equation = updatedInput;
            $.ajax({
                url: "/api/calc",
                dataType: 'json',
                type: 'POST',
                data: calculation,
                success: function (data) {
                    this.setState({ input: data.result });
                    this.setState({ prevInput: "" });
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error("api/calculate", status, err.toString());
                }.bind(this)
            });
        } else {
            updatedInput += value;
            this.setState({ input: updatedInput });
        }

    }

    render() {
        return (
           <div className="calculator">
                <CalcDisplay current_value={this.state.input} value={this.state.prevInput}/>
                <div className="keypad">
                    <CalcButton value="Clear" onButtonClick={this.handleChange} />
                    <CalcButton value="Clear All" onButtonClick={this.handleChange} />
                    <CalcButton value="DEL" onButtonClick={this.handleChange} />
                    
                    <CalcButton value="C" onButtonClick={this.handleChange} />
                    <CalcButton value="D" onButtonClick={this.handleChange} />
                    <CalcButton value="M" onButtonClick={this.handleChange} />

                    <CalcButton value="X" onButtonClick={this.handleChange} />
                    <CalcButton value="L" onButtonClick={this.handleChange} />
                    <CalcButton value="÷" onButtonClick={this.handleChange} />
                    
                    <CalcButton value="I" onButtonClick={this.handleChange} />
                    <CalcButton value="V" onButtonClick={this.handleChange} />
                    <CalcButton value="×" onButtonClick={this.handleChange} />

                    <CalcButton value="-" onButtonClick={this.handleChange} />
                    <CalcButton value="+" onButtonClick={this.handleChange} />
                    <CalcButton value="=" onButtonClick={this.handleChange} />
                    
                </div>
            </div>
        );
    }
}

