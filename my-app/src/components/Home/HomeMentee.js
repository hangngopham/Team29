import React, {Component} from "react";
import "../../App.css";
import axios from "axios";
import {connect} from 'react-redux';
import {hostedAddress} from "../../GlobalVar"
import cookie from "react-cookies";
import {Redirect} from "react-router";
import Dropdown from "react-dropdown";
import MentorDisplay from "../Presentational/MentorDisplay";

class Preference extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authFlag: false,
            mentorList: null
        };
        this.submitRequest = this.submitRequest.bind(this);
        this.writeRequest = this.writeRequest.bind(this);
    }

    componentWillMount() {
        this.setState({
            authFlag: false
        });
        let emailID = cookie.load('email');
        const data = {
            email: emailID
        };

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

        var authorization=localStorage.getItem('bearer-token')
        console.log("authorization",authorization)
        axios.defaults.withCredentials = true;//very imp
        axios.post(hostedAddress + ":3001/getMentors", data, {headers:{'Authorization':authorization}})
            .then(response => {
                console.log("Status Code : ", response);
                if (response.status === 200 && response.mentorList) {
                    this.setState({
                        authFlag: true,
                        mentorList: response.mentorList
                        //mentorList: [{name:'Adam', age:'3'}, {name:'Ben', age:'34'}, {name:'Sean', age:'37'}]
                    });
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

    submitRequest = e => {
        alert('HELLOCJWNSEJN')
    };

    writeRequest = (name) => {
        console.log("name is ", name)
        var e = document.getElementById(name);
        e.style.display = 'block';
    };

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
                            <div style={{display: "flex", "border-style": "solid", "margin": "30px", "padding": "30px", "width": "300px" }}>
                                <MentorDisplay item={item} />
                                <button onClick={() => this.writeRequest(item.name)} className="btn btn-primary" style={{height: "20px", "margin-top": "auto", "margin-bottom": "auto", "margin-left": "50px"}}>
                                    Request
                                </button>
                            </div>
                            <div style={{ display: 'none', "margin-top": "auto", "margin-bottom": "auto", "padding-left": "50px" }} id={item.name}>
                                <input
                                    ref={ref => (this.messageToMentor = ref)}
                                    onChange={this.ageUpperChangeHandler}
                                    type="text"
                                    className="form-control"
                                    name="messageToMentor"
                                    placeholder="Type your message to your mentor"
                                    style={{ height: "200px", "margin-top": "auto", "margin-bottom": "auto", "width":"300px" }}
                                />
                                <button onClick={this.submitRequest} className="btn btn-primary" style={{height: "20px", "margin-left": "10px"}}>
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