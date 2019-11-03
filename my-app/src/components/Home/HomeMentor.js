import React, {Component} from "react";
import "../../App.css";
import axios from "axios";
import {connect} from 'react-redux';
import {hostedAddress} from "../../GlobalVar"
import cookie from "react-cookies";
import {Redirect} from "react-router";
import Dropdown from "react-dropdown";
import MenteeWaitlistDisplay from "../Presentational/MenteeWaitlistDisplay";

class Preference extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authFlag: false,
            menteeList: null,
            appointment: "NA",
            mentor_email: ""
        };
        this.arrangeMeetup = this.arrangeMeetup.bind(this);
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
        axios.post(hostedAddress + ":3001/getConnectRequest", data, {headers: {'Authorization': authorization}})
            .then(response => {
                console.log("Status Code : ", response);
                console.log(response.data[0].connect)
                if (response.status === 200 && response.data[0].connect) {
                    this.setState({
                        authFlag: true,
                        menteeList: response.data[0].connect
                        //mentorList: [{name:'Adam', age:'3'}, {name:'Ben', age:'34'}, {name:'Sean', age:'37'}]
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

    arrangeMeetup = (email) => {
        var e = document.getElementById(email);
        e.style.display = 'block';
    };

    submitRequest = (connectId, response) => {
        const data = {
            mentor_email: this.state.mentor_email,
            appointment: this.state.appointment,
            connectStatus: response,
            connectId: connectId
        };
        console.log('data is ', JSON.stringify(data))
        var authorization=localStorage.getItem('bearer-token')
        axios.defaults.withCredentials = true;//very imp
        axios.post(hostedAddress + ":3001/setConnectRequest", data, {headers:{'Authorization':authorization}})
            .then(response => {
                console.log("Status Code : ", response);
                if (response.status === 200 ) {
                    this.setState({
                        authFlag: true
                    });
                    alert('request sent!')
                } else {
                    alert("Invalid");
                }
                window.location.reload()
            })
            .catch(response => {
                    alert("Invalid");
                    this.setState({
                        authFlag: false
                    });
                }
            )

    };

    messageChangeHandler = e => {
        this.setState({
            appointment: e.target.value
        });
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
                                    <MenteeWaitlistDisplay item={item} />
                                    <button onClick={() => this.arrangeMeetup(item.mentee_email)} className="btn btn-primary" style={{height: "20px", "margin-top": "auto", "margin-bottom": "auto", "margin-left": "50px"}}>
                                        Accept
                                    </button>
                                    <button onClick={() => this.submitRequest(item.connectId, 'Reject')} className="btn btn-primary" style={{height: "20px", "margin-top": "auto", "margin-bottom": "auto", "margin-left": "50px"}}>
                                        Decline
                                    </button>
                                </div>
                                <div style={{ display: 'none', "margin-top": "auto", "margin-bottom": "auto", "padding-left": "50px" }} id={item.mentee_email}>
                                    <input
                                        ref={ref => (this.messageToMentee = ref)}
                                        type="text"
                                        className="form-control"
                                        name="messageToMentee"
                                        placeholder="Schedule a meetup with your mentee"
                                        style={{ height: "200px", "margin-top": "auto", "margin-bottom": "auto", "width":"300px" }}
                                        onChange={this.messageChangeHandler}
                                    />
                                    <button onClick={() => this.submitRequest(item.connectId,'Accept')} className="btn btn-primary" style={{height: "20px", "margin-left": "10px"}}>
                                        Send
                                    </button>
                                </div>
                            </div>
                        </ul>
                    )) : 'No matches found'}
                </ul>
            </div>
        );
    }
}

export default (Preference);