import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Checkbox from '../Checkbox/Checkbox';

const hostedAddress="http://10.225.73.79";

let redirectVar = null;
const cityOptions = ["Alexandria, VA", "Arlington, VA", "Atlanta, GA", "Baltimore, MD", "Boston, MA", "Charlotte, NC", "Chicago, IL", "Concord, CA", "Dallas, TX", "Jacksonville, FL", "Jersey City, NJ", "Los Angeles, CA", "Menlo Park, CA", "Miami, FL", "New York, NY", "Philadelphia, PA", "Phoenix, AZ", "Providence, RI", "San Francisco, CA", "San Jose, CA", "Seattle, WA", "Tampa Bay, FL", "Wilmington, DE", "Woodbridge, VA"];
const ethnicityOptions = ["White", "Asian", "Black"];
const genderOptions = ["Male", "Female"];
const industryOptions = ["Agriculture, Forestry, Fishing and Hunting", "Arts, Entertainment, and Recreation", "Broadcasting", "College, University, and Adult Education", "Computer and Electronics Manufacturing", "Construction", "Finance and Insurance", "Government and Public Administration", "Health Care and Social Assistance", "Homemaker", "Hotel and Food Services", "Information Services and Data Processing", "Legal Services", "Military", "Mining", "Other Education Industry", "Other Information Industry", "Other Manufacturing", "Primary/Secondary (K-12) Education", "Publishing", "Real Estate, Rental and Leasing", "Religious", "Retail", "Scientific or Technical Services", "Software", "Telecommunications", "Transportation and Warehousing", "Utilities", "Wholesale", "Other Industry"]
const personalitiesOptions = ["Extrovert", "Introvert"];
const adviceCategoryOptions = ["Life", "Career", "Professional/Technical Skills", "Leadership"];
const mediaOptions = ["Newspaper", "YearUp website", "YearUp employee", "YearUp mentees"];
const placeToMeetOptions = ["Diablo Valley College, Pleasant Hill", "San Francisco Campus, San Francisco", "Silicon Valley, San Jose"];
const skillSetsCheckboxes = [
    {
        name: "Public Speaking",
        key: "checkBox1",
        label: "Check Box 1"
    },
    {
        name: "Leadership Skills",
        key: "checkBox2",
        label: "Check Box 2"
    },
    {
        name: "Communication Skills",
        key: "checkbox3",
        label: "Check Box 3"
    },
    {
        name: "Problem Solving Skill",
        key: "checkBox4",
        label: "Check Box 4"
    },
    {
        name: "Time Management Skill",
        key: "checkBox5",
        label: "Check Box 5"
    }
];

const communitiesCheckboxes = [
    {
        name: "Chamber of Commerce",
        key: "commCheckBox1",
        label: ""
    },
    {
        name: "Lions Club",
        key: "commCheckBox2",
        label: ""
    },
    {
        name: "LGBTQ+",
        key: "commCheckBox3",
        label: ""
    }
];

class UpdateMenteeProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
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
            profilePhoto: "",
            age: "",
            interest: "", // comma-separated
            gender: "", // dropdown
            industry: "", // dropdown
            personalities: "", // dropdown
            adviceCategory: "",
            skillSets: new Map(), // dropdown
            media: "", // dropdown
            placeToMeet: "",
            communities: new Map(),
            expectations: "",
            linkedinProfile: "",
            phone: ""
        };
        this.userOptionChangeHandler = this.userOptionChangeHandler.bind(this);
        this.homeCityChangeHandler = this.homeCityChangeHandler.bind(this);
        this.workCityChangeHandler = this.workCityChangeHandler.bind(this);
        this.ethnicityChangeHandler = this.ethnicityChangeHandler.bind(this);
        this.genderChangeHandler = this.genderChangeHandler.bind(this);
        this.industryChangeHandler = this.industryChangeHandler.bind(this);
        this.personalitiesChangeHandler = this.personalitiesChangeHandler.bind(this);
        this.skillSetsChangeHandler = this.skillSetsChangeHandler.bind(this);
        this.communitiesChangeHandler = this.communitiesChangeHandler.bind(this);
        this.mediaChangeHandler = this.mediaChangeHandler.bind(this);
        this.adviceCategoryChangeHandler = this.adviceCategoryChangeHandler.bind(this);
        this.placeToMeetChangeHandler = this.placeToMeetChangeHandler.bind(this);
        this.xah_map_to_obj = this.xah_map_to_obj.bind(this);
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
    skillSetsChangeHandler = (e) =>  {
        console.log('skillSetsChangeHandler');
        const item = e.target.name;
        const isChecked = e.target.checked;
        this.setState(prevState => ({ skillSets: this.state.skillSets.set(item, isChecked) }));
    };

    communitiesChangeHandler = (e) => {
        console.log('communitiesChangeHandler');
        const item = e.target.name;
        const isChecked = e.target.checked;
        this.setState(prevState => ({ communities: this.state.communities.set(item, isChecked) }));
    };

    mediaChangeHandler = val => {
        this.setState({ media: val });
        this.media.value = { val };
    };
    adviceCategoryChangeHandler = val => {
        this.setState({ adviceCategory: val });
        this.adviceCategory.value = { val };
    };
    placeToMeetChangeHandler = val => {
        this.setState({ placeToMeet: val });
        this.placeToMeet.value = { val };
    };

    xah_map_to_obj = ( aMap => {
        const obj = {};
        aMap.forEach ((v,k) => { obj[k] = v });
        return obj;
    });

    handleSubmit = e => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        let emailID = cookie.load('email');
        let skillSetsObj = this.xah_map_to_obj(this.state.skillSets);
        let communitiesObj = this.xah_map_to_obj(this.state.communities);

        console.log(JSON.stringify(skillSetsObj));
        console.log(JSON.stringify(communitiesObj));

        const data = {
            email: emailID,
            firstName: (this.firstName && this.firstName.value),
            lastName: (this.lastName && this.lastName.value),
            phone: (this.phone && this.phone.value),
            username: this.state.username,
            password: this.state.password,
            userOption: this.state.userOption,
            homeCity: this.state.homeCity,
            workCity: this.state.workCity,
            ethnicity: this.state.ethnicity,
            address: this.address.value,
            profilePhoto: "",
            age: this.age.value,
            interest: (this.interest.value && this.interest.value.toLowerCase()),
            gender: this.state.gender,
            industry: this.state.industry,
            personalities: this.state.personalities,
            adviceCategory: this.state.adviceCategory,
            skillSets: skillSetsObj, // checkbox
            media: this.state.media,
            placeToMeet: this.state.placeToMeet,
            communities: communitiesObj, // checkbox
            expectations: this.expectations.value,
            linkedinProfile: this.linkedinProfile.value
        };
        console.log('data.linkedinProfile ');
        axios.defaults.withCredentials = true;//very imp
        // Customer = Mentor
        // Restaurant = Mentee
        console.log('skillSets  =  ' + JSON.stringify(data.skillSets));
        console.log(this.state.skillSets.get('Problem Solving Skill'))
        axios.post(hostedAddress+":3001/updateProfileMentee", data)
            .then(response => {
                console.log("Status Code : ", response);
                if (response.data === "Mentor" && response.data!="error") {
                    console.log("welcome mentor-");
                    console.log(cookie.load('cookie'));
                    localStorage.setItem('bearer-token',response.headers.authorization)
                    this.setState({
                        authFlag: true
                    });
                } else if (response.data === "Mentee" && response.data!="error") {
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
                                    <b>Home City</b>
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
                                    <b>Work City:</b>
                                    <Dropdown
                                        ref={ref => (this.workCity = ref)}
                                        options={cityOptions}
                                        onChange={this.workCityChangeHandler}
                                        value={this.state.workCity}
                                        placeholder="Select Work City"
                                    />
                                </div>
                                <div className="form-group">
                                    <b>Ethnicity:</b>
                                    <Dropdown
                                        ref={ref => (this.ethnicity = ref)}
                                        options={ethnicityOptions}
                                        onChange={this.ethnicityChangeHandler}
                                        value={this.state.ethnicity}
                                        placeholder="Select Ethnicity"
                                    />
                                </div>
                                <div className="form-group">
                                    <b>Address:</b>
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
                                    <b>Age:</b>
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
                                    <b>Interest</b>
                                    <input
                                        ref={ref => (this.interest = ref)}
                                        type="text"
                                        className="form-control"
                                        name="interest"
                                        placeholder="Interest (Please input in a comma separated format)"
                                    />
                                </div>
                                <div className="form-group">
                                    <b>Gender:</b>
                                    <Dropdown
                                        ref={ref => (this.gender = ref)}
                                        options={genderOptions}
                                        onChange={this.genderChangeHandler}
                                        value={this.state.gender}
                                        placeholder="Select Gender"
                                    />
                                </div>
                                <div className="form-group">
                                    <b>Industry:</b>
                                    <Dropdown
                                        ref={ref => (this.industry = ref)}
                                        options={industryOptions}
                                        onChange={this.industryChangeHandler}
                                        value={this.state.industry}
                                        placeholder="Select Industry"
                                    />
                                </div>
                                <div className="form-group">
                                    <b>Personalities:</b>
                                    <Dropdown
                                        ref={ref => (this.personalities = ref)}
                                        options={personalitiesOptions}
                                        onChange={this.personalitiesChangeHandler}
                                        value={this.state.personalities}
                                        placeholder="Select Personalities"
                                    />
                                </div>
                                <div className="form-group">
                                    <b>Advice Category:</b>
                                    <Dropdown
                                        ref={ref => (this.adviceCategory = ref)}
                                        options={adviceCategoryOptions}
                                        onChange={this.adviceCategoryChangeHandler}
                                        value={this.state.adviceCategory}
                                        placeholder="Select Advice Category"
                                    />
                                </div>
                                <div className="form-group">
                                    <b>Media:</b>
                                    <Dropdown
                                        ref={ref => (this.media = ref)}
                                        options={mediaOptions}
                                        onChange={this.mediaChangeHandler}
                                        value={this.state.media}
                                        placeholder="How do you know about the program?"
                                    />
                                </div>

                                <div className="form-group">
                                    <p>What hard skills and soft skills would you like to share with your mentee/mentor? (Check all skills that apply)</p>
                                    <React.Fragment>
                                        {
                                            skillSetsCheckboxes.map(item => (
                                                <label key={item.key}>
                                                    <Checkbox name={item.name} checked={this.state.skillSets.get(item.name)} onChange={this.skillSetsChangeHandler} /><span>{item.name}</span><br></br>
                                                </label>
                                            ))
                                        }
                                    </React.Fragment>
                                </div>


                                <div className="form-group">
                                    <b>Favorite campus to meet</b>
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

                                <div className="form-group">
                                    <input
                                        ref={ref => (this.phone = ref)}
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        placeholder="Phone Number"
                                        required
                                    />
                                </div>

                                <div className="form-group" id="communities">
                                    <p>Are there communities/groups that you  are a part of or are passionate about that you want your mentee/mentor to know?</p>
                                    <p>Choose all that apply</p>
                                    <React.Fragment>
                                        {
                                            communitiesCheckboxes.map(item => (
                                                <label key={item.key}>
                                                    <Checkbox name={item.name} checked={this.state.communities.get(item.name)} onChange={this.communitiesChangeHandler} /><span>{item.name}</span><br></br>
                                                </label>
                                            ))
                                        }
                                    </React.Fragment>
                                </div>

                                <div className="form-group">
                                </div>
                                <div>
                                    <input
                                        ref={ref => (this.submit = ref)}
                                        //   onChange={this.usernameChangeHandler}
                                        type="submit"
                                        class="btn btn-primary"
                                        value="Next"
                                        onClick={this.handleSubmit}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default UpdateMenteeProfile;