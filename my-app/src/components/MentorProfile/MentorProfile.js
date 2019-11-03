import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from 'axios';
import {hostedAddress} from "../../GlobalVar"
let img_src=null;
//create the Landing Component
class MentorProfile extends Component {
    constructor(props){
        super(props);
        this.state={
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
            interest: "",
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
            employer: "",
            jobTitle: "",
            mentoringReason: "",
            mentoringExperience: "",
            educationLevel: ""
        };
    }
    componentWillMount=()=>
    {
        let emailid=cookie.load('email');
        let token=localStorage.getItem('bearer-token');
        console.log('dsg',token)
        let data={'email':emailid};
        img_src=hostedAddress+':3001/'+cookie.load('idGeneric')+'.jpg'
        console.log('ayaa1');
        axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
        axios.post(hostedAddress+':3001/getProfileMentor',data, {params:{},headers:{'Authorization':token, 'Accept':'application/json','Content-Type':'application/json'}})
            .then((response) => {
                console.log('getProfileMentee' + JSON.stringify(response));
                // console.log(response.data[0]);
                this.setState({
                    email:response.data[0].mentor_email,
                    firstName:response.data[0].mentor_firstName,
                    lastName:response.data[0].mentor_lastName,
                    phone:response.data[0].mentor_phone,
                    homeCity:response.data[0].mentor_homeCity,
                    workCity:response.data[0].mentor_workCity,
                    ethnicity:response.data[0].mentor_ethnicity,
                    profilePhoto:response.data[0].mentor_profilePhoto,
                    interest: response.data[0].mentor_interest,
                    age: response.data[0].mentor_age,
                    industry: response.data[0].mentor_industry,
                    personalities: response.data[0].mentor_personalities,
                    adviceCategory: response.data[0].mentor_adviceCategory,
                    skillSets: response.data[0].mentor_skillSets, // checkbox
                    media: response.data[0].mentor_media,
                    placeToMeet: response.data[0].mentor_placeToMeet,
                    communities: response.data[0].mentor_communities, // checkbox
                    expectations: response.data[0].mentor_expectations,
                    linkedinProfile: response.data[0].mentor_linkedinProfile,
                    address:response.data[0].mentor_addess,
                    employer: response.data[0].mentor_employer,
                    jobTitle: response.data[0].mentor_jobTitle,
                    mentoringReason: response.data[0].mentor_mentoringReason,
                    mentoringExperience: response.data[0].mentor_mentoringExperience,
                    educationLevel: response.data[0].mentor_educationLevel
                });
            })
            .catch(()=>{console.log("error")});
    };
    render(){
        let redirectVar = null;
        // if(cookie.load('cookie')!='mentee'){
        //     redirectVar = <Redirect to="/login"/>
        // }
        console.log('ayaa');
        let image=<img src={img_src} style={{borderRadius:'5%'}}width="180" height="230" alt='(Please Insert Your Profile Pic)'/>
        return(
            <div class='container'>
                {redirectVar}
                <h1 class='h1'>Your Profile</h1>
                <table class='table'>
                    {image}
                    <tbody>
                    <tr>
                        <td><b>First Name</b></td>
                        <td>{this.state.firstName}</td>
                    </tr>
                    <tr>
                        <td><b>Last Name</b></td>
                        <td>{this.state.lastName}</td>
                    </tr>
                    <tr>
                        <td><b>Email</b></td>
                        <td>{this.state.email}</td>
                    </tr>
                    <tr>
                        <td><b>Phone</b></td>
                        <td>{this.state.phone}</td>
                    </tr>
                    <tr>
                        <td><b>Home City</b></td>
                        <td>{this.state.homeCity}</td>
                    </tr>
                    <tr>
                        <td><b>Work City</b></td>
                        <td>{this.state.workCity}</td>
                    </tr>
                    <tr>
                        <td><b>Ethnicity</b></td>
                        <td>{this.state.ethnicity}</td>
                    </tr>
                    <tr>
                        <td><b>Interest</b></td>
                        <td>{this.state.interest}</td>
                    </tr>
                    <tr>
                        <td><b>Personalities</b></td>
                        <td>{this.state.personalities}</td>
                    </tr>
                    <tr>
                        <td><b>Advice Category</b></td>
                        <td>{this.state.adviceCategory}</td>
                    </tr>
                    <tr>
                        <td><b>Skill Sets</b></td>
                        <td>{this.state.skillSets}</td>
                    </tr>
                    <tr>
                        <td><b>Media</b></td>
                        <td>{this.state.media}</td>
                    </tr>
                    <tr>
                        <td><b>Place To Meet</b></td>
                        <td>{this.state.placeToMeet}</td>
                    </tr>
                    <tr>
                        <td><b>Communities</b></td>
                        <td>{this.state.communities}</td>
                    </tr>
                    <tr>
                        <td><b>LinkedIn Profile</b></td>
                        <td>{this.state.linkedinProfile}</td>
                    </tr>
                    <tr>
                        <td><b>Address</b></td>
                        <td>{this.state.address}</td>
                    </tr>
                    </tbody>
                </table>
                <div>
                    <a href='/update_mentor_profile' class="btn btn-primary" style={{background:  '#ED2E38',borderColor: '#ED2E38',color: 'white'}}>Update</a>
                </div>
            </div>
        )
    }
}
export default (MentorProfile);
