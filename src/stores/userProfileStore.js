import { observable } from "mobx";

class UserProfile {
    @observable profile = JSON.parse(localStorage.getItem('user_profile'));

}

const userProfile = new UserProfile();
export default userProfile;