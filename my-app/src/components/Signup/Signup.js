import React, {Component} from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import {Redirect} from "react-router";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import {connect} from 'react-redux';
import {signup} from "../../redux-files/action";
import {hostedAddress} from "../../GlobalVar"

let redirectVar = null;

const options = ["Mentee", "Mentor"];

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            authFlag: false,
            userOptions: ""
        };
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.roleChangeHandler = this.roleChangeHandler.bind(this);
        this.submitSignup = this.submitSignup.bind(this);
    }

    componentWillMount() {
        this.setState({
            authFlag: false
        });
    }

    usernameChangeHandler = e => {
        this.setState({
            email: e.target.value
        });
    };
    roleChangeHandler = value => {
        this.setState({
            userOptions: value
        });
        this.userOptions.value = {value};
    };

    passwordChangeHandler = e => {
        this.setState({
            password: e.target.value
        });
    };
    submitSignup = e => {
        var headers = new Headers();
        e.preventDefault();

        const data = {
            email: this.state.email,
            password: this.state.password,
            userOptions: this.state.userOptions,
            firstName: this.firstName.value,
            lastName: this.lastName.value
        };
        console.log('data.lastName ' + data.lastName);
        console.log('data.firstName ' + data.firstName);

        axios.defaults.withCredentials = true;//very imp
        axios.post(hostedAddress + ":3001/signup", data)
            .then(response => {
                console.log("Status Code : ", response);
                if (response.status === 200 && response.data != "exists" && response.data != "error") {
                    console.log("new account created-");
                    console.log(cookie.load('new1'));
                    localStorage.setItem('bearer-token', response.headers.authorization)
                    this.setState({
                        authFlag: true
                    });
                } else if (response.status === 201 && response.data != "exists" && response.data != "error") {
                    console.log("new restaurant created-");
                    console.log(cookie.load('cookie'));
                    this.setState({
                        authFlag: true
                    });
                } else if (response.data == "exists") {
                    alert("There's already an account associated with this email-id :(");
                    this.setState({
                        authFlag: false
                    });
                } else {
                    alert("Invalid");
                }
            })
            .catch(response => {
                    alert("Invalid");
                    this.setState({
                        authFlag: false
                    });
                }
            )
        // this.props.signup(data);
        // For Redux just uncomment this line, comment the above lines and the rest is as it is.
        // Refer the bhagwan chart for understanding the flow.

    };

    render() {
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/signup"/>
        } else if (cookie.load('cookie') == 'mentor') {
            redirectVar = <Redirect to="/home_mentor"/>
        } else if (cookie.load('cookie') == 'mentee') {
            redirectVar = <Redirect to="/home_mentee"/>
        }
        return (
            <div>
                {redirectVar}
                <div class="container">
                    <div class="login-form">
                        <form onSubmit={this.submitSignup}>
                            <div class="main-div">
                                <div class="panel">
                                    <h2>Sign up for Year Up 3M program</h2>
                                </div>
                                <div class="form-group">
                                    <input
                                        ref={ref => (this.firstName = ref)}
                                        //   onChange={this.usernameChangeHandler}
                                        type="text"
                                        class="form-control"
                                        name="firstName"
                                        placeholder="First Name"
                                        required
                                    />
                                </div>

                                <div class="form-group">
                                    <input
                                        ref={ref => (this.lastName = ref)}
                                        //   onChange={this.usernameChangeHandler}
                                        type="text"
                                        class="form-control"
                                        name="lastName"
                                        placeholder="Last Name"
                                        required
                                    />
                                </div>

                                <div class="form-group">
                                    <input
                                        onChange={this.usernameChangeHandler}
                                        type="email"
                                        class="form-control"
                                        name="email"
                                        placeholder="Email"
                                        required
                                    />
                                </div>
                                <div class="form-group">
                                    <input
                                        onChange={this.passwordChangeHandler}
                                        type="password"
                                        class="form-control"
                                        name="password"
                                        placeholder="Password"
                                        required
                                    />
                                </div>
                                <div class="form-group">
                                    <Dropdown
                                        ref={ref => (this.userOptions = ref)}
                                        options={options}
                                        onChange={this.roleChangeHandler}
                                        value={this.state.userOptions}
                                        placeholder="I'm a.."
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        ref={ref => (this.submit = ref)}
                                        //   onChange={this.usernameChangeHandler}
                                        type="submit"
                                        class="btn btn-primary"
                                        value="Next"
                                    />
                                    {/* <button onClick={this.submitLogin} class="btn btn-primary">
                  Sign Up
                </button> */}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default (Signup);