import React, { useState, useEffect } from 'react';
import '../AllProfiles/profiles.css';
import defaultPet from '../../Images/defaultPet.png';
import Calendar from '../AllProfiles/Calendar';
import ProfileImg from '../AllProfiles/ProfileImg';
import ProfileName from '../AllProfiles/ProfileName';
import ProfileButtons from '../AllProfiles/ProfileButtons';
import About from '../AllProfiles/About';
import PetInfo from './PetInfo';

const PetProfilePage = ({ match }) => {
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
          <PetInfo title="Links" links={pet.links} />
          <PetInfo title="Feeding Instructions" instructions={pet.feeding} />
          <PetInfo title="Cleaning Instructions" instructions={pet.cleaning} />
          <PetInfo title="Exercise Instructions" instructions={pet.exercise} />
          <PetInfo title="Medical Instructions" instructions={pet.medical} />
          <PetInfo
            title="Additional Instructions"
            instructions={pet.additional}
          />
          <PetInfo
            title="Emergency Instructions"
            instructions={pet.emergency}
          />
        </div>
      </div>
      <Calendar id={id} ownerID={pet.owner} />
    </div>
  );
};
export default PetProfilePage;
