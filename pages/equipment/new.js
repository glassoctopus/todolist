import React from 'react';
import EquipmentForm from '../../components/equipment/forms/EquipmentForm';
import { useAuth } from '../../utils/context/authContext';

const NewEquipmentType = () => {
  const { user } = useAuth();
  return (
    <div className="general-container">
      <div className="general-content">
        <h2>Create a new Equipment Archtype</h2>
        <EquipmentForm user={user} />
      </div>
    </div>
  );
};

export default NewEquipmentType;
