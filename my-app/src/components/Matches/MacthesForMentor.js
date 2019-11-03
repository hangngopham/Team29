import React, {Component} from "react";
import "../../App.css";
import axios from "axios";
import {connect} from 'react-redux';
import {hostedAddress} from "../../GlobalVar"
import cookie from "react-cookies";
import {Redirect} from "react-router";
import Dropdown from "react-dropdown";
import ExistingMenteeDisplay from "../Presentational/ExistingMenteeDisplay";

class MacthesForMentor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authFlag: false,
            menteeList: null,
            mentor_email: "",
            message: ""
        };
        this.messageChangeHandler = this.messageChangeHandler.bind(this);
    }

    componentWillMount() {
        let emailID = cookie.load('email');
        const data = {
            mentor_email: emailID
        };
        this.setState({
            authFlag: false,
            mentor_email: emailID
        });

        // this.setState({
        //     authFlag: true,
        //     //mentorList: response.mentorList
        //     mentorList: [{
        //         name: 'Adam',
        //         email: 'pe@gmail.com',
        //         pref: [{key: 'Age', value: '34'}, {key: 'Industry', value: 'Finance'}],
        //         profile: [{key: 'Age', value: '34'}, {key: 'Industry', value: 'Finance'}]
        //     }, {
        //         name: 'Ben',
        //         email: 'pp@gmail.com',
        //         pref: [{key: 'Gender', value: 'Male'}, {key: 'Interest', value: 'Soccer'}],
        //         profile: [{key: 'Age', value: '34'}, {key: 'Industry', value: 'Finance'}]
        //     }]
        // });

        var authorization = localStorage.getItem('bearer-token')
        console.log("authorization", authorization)
        axios.defaults.withCredentials = true;//very imp
        axios.post(hostedAddress + ":3001/getMatchesMR", data, {headers: {'Authorization': authorization}})
            .then(response => {
                console.log("Status Code : ", response);
                console.log(response.data[0].connect)
                if (response.status === 200 && response.data[0].connect) {
                    this.setState({
                        authFlag: true,
                        menteeList: response.data[0].connect
                    });
                    console.log(JSON.stringify(this.state.menteeList))
                } else if (response.status === 201 && response.data != "exists" && response.data != "error") {
                    console.log("new mentee created-");
                    console.log(cookie.load('cookie'));
                    this.setState({
                        authFlag: true
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
    }

    reportRequest = (email) => {
        var e = document.getElementById(email);
        e.style.display = 'block';
    };

    messageChangeHandler = e => {
        this.setState({
            message: e.target.value
        });
    };

    submitRequest = (email) => {
        const data = {
            sender_email: this.state.mentor_email,
            receiver_email: email,
            message: this.state.message,
            sender: 'Mentor',
            //sender_name: ,
            //receiver_name:
        };
        var authorization=localStorage.getItem('bearer-token')
        axios.defaults.withCredentials = true;//very imp
        axios.post(hostedAddress + ":3001/report", data, {headers:{'Authorization':authorization}})
            .then(response => {
                console.log("Status Code : ", response);
                if (response.status === 200 ) {
                    this.setState({
                        authFlag: true
                    });
                    alert('request sent!')
                    window.location.reload()
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
    };

    render() {
        return (
            <div
                className='dropdown-overlay default-pointer'>
                <ul>
                    {this.state.menteeList ? this.state.menteeList.map((item, key) => (
                        <ul
                            key={key}
                            role='presentation'>
                            <div style={{display: "flex"}}>
                                <div style={{display: "flex", "border-style": "solid", "margin": "30px", "padding": "30px", "width": "300px", "border-radius": "25px", "background-color": "#d5f4e6" }}>
                                    <ExistingMenteeDisplay item={item} />
                                    <button onClick={() => this.reportRequest(item.mentee_email)} className="btn btn-primary" style={{height: "20px", "margin-top": "auto", "margin-bottom": "auto", "margin-left": "50px"}}>
                                        Report
                                    </button>
                                </div>
                            </div>
                            <div style={{ display: 'none', "margin-top": "auto", "margin-bottom": "auto", "padding-left": "50px" }} id={item.mentee_email}>
                                <input
                                    ref={ref => (this.messageToMentor = ref)}
                                    type="text"
                                    className="form-control"
                                    name="reportOfMentee"
                                    placeholder="Type your report of your mentee"
                                    style={{ height: "200px", "margin-top": "auto", "margin-bottom": "auto", "width":"300px" }}
                                    onChange={this.messageChangeHandler}
                                />
                                <button onClick={() => this.submitRequest(item.mentee_email)} className="btn btn-primary" style={{height: "20px", "margin-left": "10px"}}>
                                    Send Report
                                </button>
                            </div>
                        </ul>
                    )) : 'No matches found'}
                </ul>
            </div>
        );
    }
}

export default (MacthesForMentor);