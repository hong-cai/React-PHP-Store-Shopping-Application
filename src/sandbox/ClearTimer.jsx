import React, { Component } from 'react'

class ClearTimer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: 0
        }

    }

    componentWillUnmount() {
        console.log('here i am logging');
        clearInterval(this.interval)
    }

    componentDidMount() {
        console.log('am I before or after?');
        this.interval = setInterval(() => {
            this.setState((prevState) => (
                { timer: prevState.timer + 1 }
            ))
        }, 1000);
    }

    stopTimer = () => {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div>
                Class Timer-{this.state.timer}
                <input type="button" value="clear interval" onClick={this.stopTimer} />
            </div>

        )
    }
}

export default ClearTimer