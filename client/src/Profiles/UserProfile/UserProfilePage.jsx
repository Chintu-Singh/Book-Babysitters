import React, { useState, useEffect } from 'react';
import '../AllProfiles/profiles.css';
import defaultAvatar from '../../Images/defaultUser.png';
import Calendar from '../AllProfiles/Calendar';
import ProfileImg from '../AllProfiles/ProfileImg';
import ProfileName from '../AllProfiles/ProfileName';
import ProfileButtons from '../AllProfiles/ProfileButtons';
import Payment from './Payment';
import About from '../AllProfiles/About';
import BabyCard from './BabyCard';

const UserProfilePage = ({ match }) => {
  const { id } = match.params;
  const [userProfile, setUserProfile] = useState({
    owner: false,
    ownedPets: [],
    description: '',
    name: ''
  });

  useEffect(() => {
    fetch(`/users/${id}`)
      .then((res) => res.json())
      .then((user) => {
        setUserProfile(user);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div id="profile-container">
      <div id="topleft">
        <ProfileImg
          imgURL={userProfile.avatar || defaultAvatar}
          heartRole="user"
          id={userProfile._id}
          role={userProfile.owner ? 'Baby owner' : 'Baby sitter'}
        />
        <ProfileName
          name={userProfile.name}
          role={userProfile.owner ? 'Baby owner' : 'Baby sitter'}
        />
        <ProfileButtons
          role="user"
          userID={userProfile._id}
          name={userProfile.name}
          email={userProfile.email}
        />
        {!userProfile.owner && (
          <div id="payment">
            <Payment />
          </div>
        )}
      </div>
      <div id="right">
        <About profileUser="Me" description={userProfile.description} />
        <div id="right-flex">
          {userProfile.owner &&
            userProfile.ownedPets.map((id) => {
              return <BabyCard key={id} petID={id} />;
            })}
        </div>
      </div>
      <Calendar id={id} />
    </div>
  );
};
export default UserProfilePage;
