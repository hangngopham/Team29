import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import HomeMentee from './Home/HomeMentee';
import HomeMentor from './Home/HomeMentor';
import Profile from './Profile/Profile';
import Landing from "./Landing/Landing";
import LandingImage from "./Landing/LandingImage";
import Preference from './Preference/Preference'
import MentorProfile from "./MentorProfile/MentorProfile";
import MenteeProfile from "./MenteeProfile/MenteeProfile";
import MacthesForMentor from "./Matches/MacthesForMentor";
import MacthesForMentee from "./Matches/MatchesForMentee";
import UpdateMenteeProfile from "./UpdateMenteeProfile/UpdateMenteeProfile";
import UpdateMentorProfile from "./UpdateMentorProfile/UpdateMentorProfile";
import Donation from "./Donation";

class Main extends Component {
    render(){
        return(
            <div>
                <Route path="/landing_image" component={LandingImage}/>
                <Route path="/login" component={Login}/>
                <Route path="/sendPref" component={Preference}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/home_mentee" component={HomeMentee}/>
                <Route path="/home_mentor" component={HomeMentor}/>
                <Route path="/mentor_matches" component={MacthesForMentor}/>
                <Route path="/mentee_matches" component={MacthesForMentee}/>
                <Route path="/donation" component={Donation}/>
                <Route path="/mentee_profile" component={MenteeProfile}/>
                <Route path="/update_mentee_profile" component={UpdateMenteeProfile}/>
                <Route path="/mentor_profile" component={MentorProfile}/>
                <Route path="/update_mentor_profile" component={UpdateMentorProfile}/>

            </div>
        )
    }
}
//self note --- Export The Main Component
export default Main;