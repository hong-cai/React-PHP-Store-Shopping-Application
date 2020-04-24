import React, { Component } from 'react';

export default class Default extends Component {
    render() {
        return (
            <div className="container" >
                <div className="row" >
                    <div className="col-10 mx-auto text-center text-title text-uppercase pt-5">
                        <h1>
                            the page is missing
                        </h1>
                        <h3>
                            the requested URL
                            <span className="text-warning" >
                                {this.props.location.pathname}
                            </span>{" "} is not found
                        </h3>
                    </div>
                </div>
            </div>
        )
    }
}
