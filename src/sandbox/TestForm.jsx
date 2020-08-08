import React, { Component } from 'react';

class TestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            redirectToReferrer: false
        };
        this.login = this.login.bind(this);
        this.loginTest = this.loginTest.bind(this);
        this.postTest = this.postTest.bind(this);
        this.onChange = this.onChange.bind(this);
        this.PostData = this.PostData.bind(this);
        this.sendHttpRequest = this.sendHttpRequest.bind(this);
    }

    login() {
        // console.log(this.state);
        // debugger;
        //NEED VALIDATION
        if (this.state.email && this.state.password) {
            console.log(this.state);
            this.PostData('login', this.state).then((result) => {
                let responseJson = result;
                if (responseJson.userData) {
                    sessionStorage.setItem('userData', JSON.stringify(responseJson));
                    this.setState({ redirectToReferrer: true });
                }
                else
                    console.log(result.error);
            });
        }
    }



    loginTest() {
        /*****************Without Wrapping In a Funciton******************/
        // fetch('https://reqres.in/api/users')
        // .then(response => {
        //     console.log(response);
        //     return response.json();
        // })
        //     .then(responseData => {
        //         console.log(responseData);
        //     })

        /*****************Wrapping In a Funciton******************/
        this.sendHttpRequest('GET', 'https://reqres.in/api/users?page=2')
            .then(responseData => {
                console.log(responseData);
            })
    }


    postTest() {
        fetch('http://localhost/reactBegin/store-sample/api/index.php?tp=login',
            {
                method: 'POST',
                body: JSON.stringify({
                    email: '32802446@qq.com',
                    password: '7736'
                }),
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }
        ).then(responseData => {
            // if (response.status >= 400) {
            //     return response.json().then(errResData => {
            //         const error = new Error('something wrong');
            //         error.data = errResData;
            //         throw error;
            //     })
            // }
            console.log('response:: ', responseData);
            return responseData.json();
        }).then(json => console.log(json));
        // debugger;










        // this.sendHttpRequest('POST', 'https://reqres.in/api/login', {
        //     "email": "eve.holt@reqres.in",
        //     "password": "cityslicka"
        // })
        //     .then(responseData => {
        //         console.log("responseData", responseData);
        //         // debugger;
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     })

    }


    onChange(element) {
        // console.log(element.target.value);
        this.setState({
            [element.target.name]: element.target.value
        });
    }


    sendHttpRequest(method, url, data) {
        return fetch(url,
            {
                method: method,
                body: JSON.stringify(data),
                header: data ? { 'Content-Type': 'application/json' } : {}
            }
        )
            .then(responseData => {
                // if (response.status >= 400) {
                //     return response.json().then(errResData => {
                //         const error = new Error('something wrong');
                //         error.data = errResData;
                //         throw error;
                //     })
                // }
                console.log('response', responseData);
                // return responseData.json();
            });
    }

    PostData(type, userData) {
        let BaseURL = 'http://localhost/reactBegin/store-sample/api/index.php';
        console.log('type', type, 'userData', userData);
        // debugger;
        // return new Promise((resolve, reject) => {
        // let promise = fetch(BaseURL)
        fetch(BaseURL + '?tp=' + type,
            {
                method: 'POST',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            .then((response) => response.json()
                .then((responseJson) => {
                    // resolve(responseJson);
                    console.log(responseJson);
                }))
            .catch((error) => {
                // reject(error);
                console.error(error);
            });
        // });
    }

    render() {
        return (
            <div>
                <h4>Login</h4>
                <input type="text" name="email" placeholder="Username" onChange={this.onChange} />
                <input type="text" name="password" placeholder="Password" onChange={this.onChange} />
                <input type="submit" onClick={this.postTest} />
            </div>
        )
    }
}

export default TestForm