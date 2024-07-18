import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import EquipmentCard from '../../components/equipment/cards/EqupimentCard';
import { getEquipments } from '../../utils/data/equipmentData';
import { useAuth } from '../../utils/context/authContext';

function Equipment() {
  const [equipments, setequipments] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getEquipments().then((data) => setequipments(data));
  }, [user]);

  return (
    <article className="equipment" style={{ maxHeight: '900px', overflowY: 'auto' }}>
      <h1>equipments</h1>
      <Button
        onClick={() => {
          router.push('/equipments/new');
        }}
      >
        Register New equipment
      </Button>
      {equipments.map((equipment) => (
        <section key={`equipment--${equipment.id}`} className="equipment">
          <EquipmentCard
            name={equipment.equipment_name}
            category={equipment.equipment_category}
            subCategory={equipment.equipment_sub_category}
            model={equipment.equipment_model}
            type={equipment.equipment_type}
            scale={equipment.equipment_scale}
            cost={equipment.equipment_cost}
            availability={equipment.equipment_availability}
            skill={equipment.equipment_skill}
            damage={equipment.equipment_damage}
            ammo={equipment.equipment_ammo}
            charges={equipment.equipment_charges}
            uses={equipment.equipment_uses}
            description={equipment.equipment_description}
            useNotes={equipment.equipment_use_notes}
            source={equipment.source}
          />
        </section>
      ))}
    </article>
  );
}

export default Equipment;
