import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import EquipmentCard from '../../components/equipment/cards/EqupimentCard';
import SearchTextField from '../../components/Searchbar';
import { getEquipments } from '../../utils/data/equipmentData';
import { useAuth } from '../../utils/context/authContext';

const Equipment = () => {
  const [equipments, setEquipments] = useState([]);
  const [filteredEquipment, setFilteredEquipments] = useState([]);
  const [filterBy, setFilterBy] = useState('name');
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getEquipments().then((data) => {
      setEquipments(data);
      setFilteredEquipments(data);
    });
  }, [user]);

  const handleFilterSubmit = (searchTerm) => {
    if (searchTerm === '') {
      setFilteredEquipments(equipments);
    } else {
      const filtered = equipments.filter((equipment) => {
        switch (filterBy) {
          case 'name':
            return equipment.equipment_name?.toLowerCase().includes(searchTerm.toLowerCase());
          case 'category':
            return equipment.equipment_category?.toLowerCase().includes(searchTerm.toLowerCase());
          case 'subCategory':
            return equipment.equipment_sub_category?.toLowerCase().includes(searchTerm.toLowerCase());
          case 'skill':
            return equipment.equipment_skill?.toLowerCase().includes(searchTerm.toLowerCase());
          default:
            return false;
        }
      });
      setFilteredEquipments(filtered);
    }
  };

  const handleFilterChange = (e) => {
    setFilterBy(e.target.value);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <select onChange={handleFilterChange} value={filterBy} style={{ marginRight: '8px' }}>
          <option value="name">Name</option>
          <option value="category">Category</option>
          <option value="subCategory">Sub Category</option>
          <option value="skill">Skill</option>
        </select>
        <SearchTextField onSubmit={handleFilterSubmit} />
      </div>
      <article className="equipment" style={{ maxHeight: '900px', overflowY: 'auto' }}>
        <h1>equipments</h1>
        <Button
          onClick={() => {
            router.push('/equipment/new');
          }}
        >
          Register New equipment
        </Button>
        {filteredEquipment.map((equipment) => (
          <section key={`equipment--${equipment.id}`} className="equipment">
            <EquipmentCard
              id={equipment.id}
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
    </div>
  );
};

export default Equipment;
