import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { connect } from 'react-redux';
import { login } from "../../redux-files/action";
import { setTimeout } from "timers";


const hostedAddress = "http://localhost";

let redirectVar = null;

const cityOptions = ["Alexandria, VA", "Arlington, VA", "Atlanta, GA", "Baltimore, MD", "Boston, MA", "Charlotte, NC", "Chicago, IL", "Concord, CA", "Dallas, TX", "Jacksonville, FL", "Jersey City, NJ", "Los Angeles, CA", "Menlo Park, CA", "Miami, FL", "New York, NY", "Philadelphia, PA", "Phoenix, AZ", "Providence, RI", "San Francisco, CA", "San Jose, CA", "Seattle, WA", "Tampa Bay, FL", "Wilmington, DE", "Woodbridge, VA"];
const ethnicityOptions = ["White", "Asian", "Black"];
const genderOptions = ["Male", "Female"];
const industryOptions = ["Agriculture, Forestry, Fishing and Hunting", "Arts, Entertainment, and Recreation", "Broadcasting", "College, University, and Adult Education", "Computer and Electronics Manufacturing", "Construction", "Finance and Insurance", "Government and Public Administration", "Health Care and Social Assistance", "Homemaker", "Hotel and Food Services", "Information Services and Data Processing", "Legal Services", "Military", "Mining", "Other Education Industry", "Other Information Industry", "Other Manufacturing", "Primary/Secondary (K-12) Education", "Publishing", "Real Estate, Rental and Leasing", "Religious", "Retail", "Scientific or Technical Services", "Software", "Telecommunications", "Transportation and Warehousing", "Utilities", "Wholesale", "Other Industry"]
const personalitiesOptions = ["Extrovert", "Introvert"];
const adviceCategoryOptions = ["Life", "Career", "Professional/Technical Skills", "Leadership"];
const mediaOptions = ["Newspaper", "YearUp website", "YearUp employee", "YearUp mentees"];
const placeToMeetOptions = ["Diablo Valley College, Pleasant Hill", "San Francisco Campus, San Francisco", "Silicon Valley, San Jose"];


class MenteeProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            authFlag: false,
            userOption: "",
            firstName: "",
            lastName: "",
            homeCity: "", // dropdown
            workCity: "", // dropdown
            ethnicity: "", // dropdown
            address: "",
            hobbies: "",
            profilePhoto: "",
            age: "",
            interest: "",
            gender: "", // dropdown
            industry: "", // dropdown
            personalities: "", // dropdown
            adviceCategory: "",
            skillSets: "", // dropdown
            media: "", // dropdown
            growthArea: "", // dropdown
            placeToMeet: "",
            communities: "",
            expectations: "",
            linkedinProfile: ""
        };
        this.userOptionChangeHandler = this.userOptionChangeHandler.bind(this);
        this.homeCityChangeHandler = this.homeCityChangeHandler.bind(this);
        this.workCityChangeHandler = this.workCityChangeHandler.bind(this);
        this.ethnicityChangeHandler = this.ethnicityChangeHandler.bind(this);
        this.genderChangeHandler = this.genderChangeHandler.bind(this);
        this.industryChangeHandler = this.industryChangeHandler.bind(this);
        this.personalitiesChangeHandler = this.personalitiesChangeHandler.bind(this);
        this.skillSetsChangeHandler = this.skillSetsChangeHandler.bind(this);
        this.mediaChangeHandler = this.mediaChangeHandler.bind(this);
        this.growthAreaChangeHandler = this.growthAreaChangeHandler.bind(this);
        this.adviceCategoryChangeHandler = this.adviceCategoryChangeHandler.bind(this);
        this.placeToMeetChangeHandler = this.placeToMeetChangeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    userOptionChangeHandler = value => {
        this.setState({ userOption: value });
        this.userOption.value = { value };
    };

    homeCityChangeHandler = val => {
        this.setState({ homeCity: val });
        this.homeCity.value = { val };
    };

    workCityChangeHandler = val => {
        this.setState({ workCity: val });
        this.workCity.value = { val };
    };

    ethnicityChangeHandler = val => {
        this.setState({ ethnicity: val });
        this.ethnicity.value = { val };
    };

    genderChangeHandler = val => {
        this.setState({ gender: val });
        this.gender.value = { val };
    };

    industryChangeHandler = val => {
        this.setState({ industry: val });
        this.industry.value = { val };
    };

    personalitiesChangeHandler = val => {
        this.setState({ personalities: val });
        this.personalities.value = { val };
    };

    skillSetsChangeHandler = val => {
        this.setState({ skillSets: val });
        this.skillSets.value = { val };
    };

    mediaChangeHandler = val => {
        this.setState({ skillSets: val });
        this.skillSets.value = { val };
    };

    adviceCategoryChangeHandler = val => {
        this.setState({ adviceCategory: val });
        this.adviceCategory.value = { val };
    };

    placeToMeetChangeHandler = val => {
        this.setState({ placeToMeet: val });
        this.placeToMeet.value = { val };
    };

    growthAreaChangeHandler= val => {
        this.setState({ skillSets: val });
        this.skillSets.value = { val };
    };

    handleSubmit = e => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username: this.state.username,
            password: this.state.password,
            userOption: this.state.userOption,
            firstName: this.firstName.value,
            lastName: this.lastName.value,
            homeCity: this.state.homeCity,
            workCity: this.state.workCity,
            ethnicity: this.state.ethnicity,
            address: this.address.value,
            hobbies: this.hobbies.value,
            profilePhoto: "",
            age: this.age.value,
            interest: this.interest.value,
            gender: this.state.gender,
            industry: this.state.industry,
            personalities: this.state.personalities,
            adviceCategory: this.state.adviceCategory,
            skillSets: this.state.skillSets, // checkbox
            media: this.state.media,
            placeToMeet: this.state.placeToMeet,
            communities: "", // checkbox
            expectations: this.expectations.value,
            linkedinProfile: this.linkedinProfile.value
        };
        console.log('data.lastName ' + data.lastName);
        console.log('data.firstName ' + data.firstName);

        axios.defaults.withCredentials = true;//very imp
        // Customer = Mentor
        // Restaurant = Mentee

        axios.post(hostedAddress+":3000/profile", data)
            .then(response => {
                console.log("Status Code : ", response);
                if (response.status === 200 && response.data!="error") {
                    console.log("welcome mentor-");
                    console.log(cookie.load('cookie'));
                    localStorage.setItem('bearer-token',response.headers.authorization)
                    this.setState({
                        authFlag: true
                    });
                } else if (response.status === 201 && response.data!="error") {
                    console.log("welcome mentee");
                    console.log(cookie.load('cookie'));
                    localStorage.setItem('bearer-token',response.headers.authorization)
                    this.setState({
                        authFlag: true
                    });
                }
                else if(response.data=="error")
                {
                    alert("Invalid credentials");
                    this.setState({
                        authFlag: false
                    });
                }
            })
            .catch (response => {
                    alert("Invalid");
                    this.setState({
                        authFlag: false
                    });
                }
            )
        // this.props.login(data);
        // For Redux just uncomment this line, comment the above lines and the rest is as it is.
        // Refer the bhagwan chart for understanding the flow.

    };
    render() {
        // if(!cookie.load('cookie')){
        //     redirectVar = <Redirect to= "/login"/>
        // }
        // if(cookie.load('cookie')=='mentee')
        // {
        //     redirectVar = <Redirect to= "/home_mentee"/>
        // }
        // else if(cookie.load('cookie')=='restaurant')
        // {
        //     redirectVar = <Redirect to= "/home_rest"/>
        // }
        return (
            <div>
                {redirectVar}
                <div class="container">
                    <div class="login-form">
                        <form onSubmit={this.submitLogin}>
                            <div class="main-div">
                                <div class="panel">
                                    <h2 >Year Up Profile</h2>
                                </div>

                                <div className="form-group">
                                    <Dropdown
                                        ref={ref => (this.homeCity = ref)}
                                        options={cityOptions}
                                        onChange={this.homeCityChangeHandler}
                                        value={this.state.homeCity}
                                        placeholder="Select Home City"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <Dropdown
                                        ref={ref => (this.workCity = ref)}
                                        options={cityOptions}
                                        onChange={this.workCityChangeHandler}
                                        value={this.state.workCity}
                                        placeholder="Select Work City"
                                    />
                                </div>

                                <div className="form-group">
                                    <Dropdown
                                        ref={ref => (this.ethnicity = ref)}
                                        options={ethnicityOptions}
                                        onChange={this.ethnicityChangeHandler}
                                        value={this.state.ethnicity}
                                        placeholder="Select Ethnicity"
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        ref={ref => (this.address = ref)}
                                        //   onChange={this.usernameChangeHandler}
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        placeholder="Address"
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        ref={ref => (this.hobbies = ref)}
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        placeholder="Hobbies"
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        ref={ref => (this.age = ref)}
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        placeholder="Age"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <Dropdown
                                        ref={ref => (this.gender = ref)}
                                        options={genderOptions}
                                        onChange={this.genderChangeHandler}
                                        value={this.state.gender}
                                        placeholder="Select Gender"
                                    />
                                </div>

                                <div className="form-group">
                                    <Dropdown
                                        ref={ref => (this.industry = ref)}
                                        options={industryOptions}
                                        onChange={this.industryChangeHandler}
                                        value={this.state.industry}
                                        placeholder="Select Industry"
                                    />
                                </div>

                                <div className="form-group">
                                    <Dropdown
                                        ref={ref => (this.personalities = ref)}
                                        options={personalitiesOptions}
                                        onChange={this.personalitiesChangeHandler}
                                        value={this.state.personalities}
                                        placeholder="Select Personalities"
                                    />
                                </div>

                                <div className="form-group">
                                    <Dropdown
                                        ref={ref => (this.adviceCategory = ref)}
                                        options={adviceCategoryOptions}
                                        onChange={this.adviceCategoryChangeHandler}
                                        value={this.state.adviceCategory}
                                        placeholder="Select Advice Category"
                                    />
                                </div>


                                <div className="form-group">
                                    <Dropdown
                                        ref={ref => (this.media = ref)}
                                        options={mediaOptions}
                                        onChange={this.mediaChangeHandler}
                                        value={this.state.media}
                                        placeholder="How do you know about the program?"
                                    />
                                </div>

                                <div className="form-group">
                                    <Dropdown
                                        ref={ref => (this.placeToMeet = ref)}
                                        options={placeToMeetOptions}
                                        onChange={this.placeToMeetChangeHandler}
                                        value={this.state.placeToMeet}
                                        placeholder="What is your favorite campus (keep in mind that mentees may intern in areas outside of the campus city)?"
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        ref={ref => (this.expectations = ref)}
                                        //   onChange={this.usernameChangeHandler}
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        placeholder="What would you want your mentor/mentee to know about you before you meet?"
                                        required
                                    />
                                </div>


                                <div className="form-group">
                                    <input
                                        ref={ref => (this.linkedinProfile = ref)}
                                        //   onChange={this.usernameChangeHandler}
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        placeholder="Do you have a LinkedIn profile link that you can share with us?"
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
                  Login
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

export default MenteeProfile;
