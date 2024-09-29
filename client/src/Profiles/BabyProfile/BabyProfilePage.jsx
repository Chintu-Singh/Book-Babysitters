import React, { useState, useEffect } from 'react';
import '../AllProfiles/profiles.css';
import defaultPet from '../../Images/defaultPet.png';
import Calendar from '../AllProfiles/Calendar';
import ProfileImg from '../AllProfiles/ProfileImg';
import ProfileName from '../AllProfiles/ProfileName';
import ProfileButtons from '../AllProfiles/ProfileButtons';
import About from '../AllProfiles/About';
import BabyInfo from './BabyInfo';

const BabyProfilePage = ({ match }) => {
  const { id } = match.params;
  const [pet, setPet] = useState({ owner: '', links: [] });

  useEffect(() => {
    fetch(`/pets/${id}`)
      .then((res) => res.json())
      .then((pet) => {
        setPet(pet);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div id="profile-container">
      <div id="topleft">
        <ProfileImg imgURL={pet.avatar || defaultPet} id={id} heartRole="pet" />
        <ProfileName name={pet.name} role={pet.type} id={id} />
        <ProfileButtons ownerID={pet.owner} owner={pet.owner} pet={pet} />
      </div>
      <div id="right">
        <div id="right-flex">
          <About profileUser="The Child" description={pet.description} />
          <BabyInfo title="Links" links={pet.links} />
          <BabyInfo title="Feeding Instructions" instructions={pet.feeding} />
          <BabyInfo title="Cleaning Instructions" instructions={pet.cleaning} />
          <BabyInfo title="Exercise Instructions" instructions={pet.exercise} />
          <BabyInfo title="Medical Instructions" instructions={pet.medical} />
          <BabyInfo
            title="Additional Instructions"
            instructions={pet.additional}
          />
          <BabyInfo
            title="Emergency Instructions"
            instructions={pet.emergency}
          />
        </div>
      </div>
      <Calendar id={id} ownerID={pet.owner} />
    </div>
  );
};
export default BabyProfilePage;
