import React,{Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from 'axios';
import {hostedAddress} from "../../GlobalVar"

var isUpdated=false;
//create the Landing Component
class UpdateProfileMentee extends Component {
    constructor(props){
        super(props);
        this.state={
            email:"",
            firstName:"",
            lastName: "",
            homeCity: "", // dropdown
            workCity: "", // dropdown,
            ethnicity: "", // dropdown
            address: "",
            hobbies: "",
            phone:"",
            age: "",
            interest: "",
            gender: "", // dropdown
            industry: "", // dropdown
            personalities: "", // option Introvert/Extrovert
            adviceCategory: "",
            skillSets: "",
            media: "", // dropdown
            placeToMeet: "",
            communities: "",
            linkedProfile: "",
            profilePhoto: null, // img

        };
        let emailid=cookie.load('email');
        let data={'email':emailid};
        this.updateProfile = this.updateProfile.bind(this);
        let token=localStorage.getItem('bearer-token');
        axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
        axios.post(hostedAddress+':3001/getProfileMentee',data, {params:{},headers:{'Authorization':token, 'Accept':'application/json','Content-Type':'application/json'}})
            .then((response) => {
                this.setState({});
            });
    }


    updateProfile=()=>
    {

        let oldEmail=this.state.email;
        let newFirstName=(this.firstName.value=='')?this.state.firstName:this.firstName.value;
        let newLastName=(this.lastName.value=='')?this.state.lastName:this.lastName.value;
        let newEmail=(this.email.value=='')?this.state.email:this.email.value;
        let newPhone=(this.phone.value=='')?this.state.phone:this.phone.value;
        let newHomeCity=(this.homeCity.value=='')?this.state.homeCity:this.homeCity.value;
        let newWorkCity=(this.workCity.value=='')?this.state.workCity:this.workCity.value;
        let newEthnicity=(this.ethnicity.value=='')?this.state.ethnicity:this.ethnicity.value;
        let newAddress=(this.address.value=='')?this.state.address:this.address.value;
        let newHobbies=(this.hobbies.value=='')?this.state.hobbies:this.hobbies.value;
        let newAge=(this.age.value=='')?this.state.age:this.age.value;
        let newInterest=(this.interest.value=='')?this.state.interest:this.interest.value;
        let newGender=(this.gender.value=='')?this.state.gender:this.gender.value;
        let newIndustry=(this.industry.value=='')?this.state.industry:this.industry.value;
        let newPersonalities=(this.personalities.value=='')?this.state.personalities:this.personalities.value;
        let newAdviceCategory=(this.adviceCategory.value=='')?this.state.adviceCategory:this.adviceCategory.value;
        let newSkillSets=(this.skillSets.value=='')?this.state.skillSets:this.skillSets.value;
        let newMedia=(this.media.value=='')?this.state.media:this.media.value;
        let newPlaceToMeet=(this.placeToMeet.value=='')?this.state.placeToMeet:this.placeToMeet.value;
        let newCommunities=(this.communities.value=='')?this.state.communities:this.communities.value;
        let newLinkedProfile=(this.linkedProfile.value=='')?this.state.linkedProfile:this.linkedProfile.value;
        let newProfilePhoto=null;
        const data = {
            oldEmail: oldEmail,
            firstName: newFirstName,
            lastName: newLastName,
            email: newEmail,
            phone: newPhone,
            homeCity: newHomeCity,
            workCity: newWorkCity,
            ethnicity: newEthnicity,
            address:newAddress,
            hobbies: newHobbies,
            age: newAge,
            interest: newInterest,
            gender: newGender,
            industry: newIndustry,
            personalities: newPersonalities,
            adviceCategory: newAdviceCategory,
            skillSets: newSkillSets,
            media: newMedia,
            placeToMeet: newPlaceToMeet,
            communities: newCommunities,
            linkedProfile: newLinkedProfile,
            profilePhoto: newProfilePhoto
        };
        isUpdated=true;
        let token=localStorage.getItem('bearer-token');
        axios.defaults.withCredentials = true;
        axios.post(hostedAddress+":3001/updateProfileMentee", data, {params:{},headers:{'Authorization':token, 'Accept':'application/json','Content-Type':'application/json'}})
            .then(response => {
                console.log("Status Code : ", response);
                if (response.data === 'Mentor' && response.data!="exists" && response.data!="error") {
                    console.log("updated mentor-");
                    console.log(cookie.load('cookie'));
                } else if (response.data === 'Mentee' && response.data!="exists" && response.data!="error") {
                    console.log("updated mentee-");
                    console.log(cookie.load('cookie'));
                }
                else if(response.data=="exists")
                {
                    alert("There's already an account associated with this email-id :(");
                }
                else if(response.data=="error")
                {
                    alert("Invalid credentials");
                }
                isUpdated=true;
                console.log('isupd',isUpdated)
                this.setState({});
            })
            .catch (response => {
                    console.log ("Invalid");
                }

            )
        isUpdated=true;

        // this.props.updateCust(data);
        // The above statement is for redux, do the needful like login and signup
    }
    onImageChangeHandler=event=>{
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
    }
    onClickHandler = () => {
        const data = new FormData();
        data.append('postImage', this.state.selectedFile);
        let token=localStorage.getItem('bearer-token');
        axios.defaults.withCredentials = true;
        axios.post(hostedAddress+":3001/imageUpload", data,{params:{},headers:{'Authorization':token, 'Accept':'application/json','Content-Type':'application/json'}})
            .then(res => { // then print response status
                console.log(res.statusText);
                window.location.reload()
            })
    };
    render(){
        let redirectVar = null;
        if(isUpdated){
            isUpdated=false;
            redirectVar = <Redirect to="/mentee_profile"/>
        }
        else
        {
            redirectVar=null
        }
        if(cookie.load('cookie')!='mentee')
        {redirectVar = <Redirect to="/login"/>}
        let img_src=hostedAddress+':3001/'+cookie.load('idGeneric')+'.jpg'
        return(
            <div class='container'>
                {redirectVar}
                <h1 class='h1'>Update Mentee Profile</h1>
                <div>
                    <table class='table'>
                        <br/><img src={img_src} style={{borderRadius:'5%'}}width="180" height="230" alt='(Please Insert Your Profile Pic)'/><br/>
                        <tbody>
                        <tr>
                            <td><b>Image</b></td>
                            <td>
                                <input
                                    ref={ref => (this.image = ref)}
                                    type="file"
                                    name="postImage"
                                    id='postImage'
                                    onChange={this.onImageChangeHandler}
                                    placeholder={this.state.image}
                                />
                                <button type="button" class="btn btn-success" onClick={this.onClickHandler}>Upload</button>
                            </td>
                        </tr>
                        <tr>
                            <td><b>Name</b></td>
                            <td><input
                                ref={ref => (this.name = ref)}
                                type="text"
                                name="name"
                                //   value={this.state.name}
                                placeholder={this.state.name}
                            /></td>
                        </tr>
                        <tr>
                            <td><b>Email</b></td>
                            <td><input
                                ref={ref => (this.email = ref)}
                                type="email"
                                name="email"
                                //   value={this.state.email}
                                placeholder={this.state.email}
                            /></td>
                        </tr>
                        <tr>
                            <td><b>Phone</b></td>
                            <td><input
                                ref={ref => (this.phone = ref)}
                                type="text"
                                name="phone"
                                //   value={this.state.phone}
                                placeholder={this.state.phone}
                            /></td>
                        </tr>
                        <tr>
                            <td><b>Zipcode</b></td>
                            <td><input
                                ref={ref => (this.zip = ref)}
                                type="text"
                                name="zip"
                                //   value={this.state.phone}
                                placeholder={this.state.zip}
                            /></td>
                        </tr>
                        <tr>
                            <td><b>Address</b></td>
                            <td><textarea
                                ref={ref => (this.address = ref)}
                                type="text-area"
                                name="address"
                                //   value={this.state.phone}
                                placeholder={this.state.address}
                            /></td>
                        </tr>
                        </tbody>
                    </table>
                    <div >
                        <input
                            ref={ref => (this.update = ref)}
                            //   onChange={this.usernameChangeHandler}
                            type="button"
                            class="btn btn-primary"
                            value="Update"
                            onClick={this.updateProfile}
                            style={{background:'#ED2E38',borderRadius:'10px', borderColor: '#ED2E38',color: 'white'}}
                        /></div>
                </div>
            </div>
        )
    }
}
export default (UpdateProfileMentee);
