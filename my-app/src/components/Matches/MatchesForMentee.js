import React, {Component} from "react";
import "../../App.css";
import axios from "axios";
import {connect} from 'react-redux';
import {hostedAddress} from "../../GlobalVar"
import cookie from "react-cookies";
import {Redirect} from "react-router";
import Dropdown from "react-dropdown";
import ExistingMenteeDisplay from "../Presentational/ExistingMenteeDisplay";

class MacthesForMentee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authFlag: false,
            mentorList: null
        };
    }

    componentWillMount() {
        let emailID = cookie.load('email');
        const data = {
            mentee_email: emailID
        };
        this.setState({
            authFlag: false,
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
        axios.post(hostedAddress + ":3001/getMatchesME", data, {headers: {'Authorization': authorization}})
            .then(response => {
                console.log("Status Code : ", response);
                console.log(response.data[0].connect)
                if (response.status === 200 && response.data[0].connect) {
                    this.setState({
                        authFlag: true,
                        mentorList: response.data[0].connect
                    });
                    console.log(JSON.stringify(this.state.mentorList))
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

    render() {
        return (
            <div
                className='dropdown-overlay default-pointer'>
                <ul>
                    {this.state.mentorList ? this.state.mentorList.map((item, key) => (
                        <ul
                            key={key}
                            role='presentation'>
                            <div style={{display: "flex"}}>
                                <div style={{display: "flex", "border-style": "solid", "margin": "30px", "padding": "30px", "width": "300px", "border-radius": "25px", "background-color": "#d5f4e6" }}>
                                    <ExistingMenteeDisplay item={item} />
                                </div>
                            </div>
                        </ul>
                    )) : 'No matches found'}
                </ul>
            </div>
        );
    }
}

export default (MacthesForMentee);