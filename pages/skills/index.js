import React, { useState, useEffect } from 'react';
import SkillCard from '../../components/character/cards/SkillCard';
import { getSkills } from '../../utils/data/skillData';
import SearchTextField from '../../components/Searchbar';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [selectedAttribute, setSelectedAttribute] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const fetchedSkills = await getSkills();
        setSkills(fetchedSkills);
      } catch (err) {
        console.error(err);
        setError('Failed to load skills');
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const handleFilterChange = (attribute) => {
    setSelectedAttribute(attribute);
  };

  const handleSearch = (term) => {
    // console.log('Search term:', term); // Debugging line
    setSearchTerm(term);
  };

  const filteredSkills = skills
    .filter((skill) => selectedAttribute === 'All' || skill.attribute === selectedAttribute)
    .filter((skill) => skill.skill_name.toLowerCase().includes(searchTerm.toLowerCase()));

  //   console.log('Filtered skills:', filteredSkills); // Debugging line

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div
      className="container"
      style={{
        height: '90vh',
        overflowY: 'auto',
        borderRadius: '8px',
        boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.8)',
        padding: '13px',
        margin: '13px',
      }}
    >
      <header className="header">
        <h1>Attributes and Skills</h1>
      </header>
      <main className="main-content" style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        <div className="col-md-8" style={{ flex: '1 1 auto' }}>
          <section className="section">
            <h2>Using Attributes and Skills</h2>
            <p>
              Using attributes and skills is very easy if you can remember one simple concept. It&apos;s called the <strong>&quot;Star Wars Rule of Thumb.&quot;</strong>
            </p>
            <p>
              Pick a difficulty number. If the character&apos;s skill roll is equal or higher, she succeeds.
            </p>
            <p>
              When you want your character to do something, the game master picks a difficulty number. (All the lists and explanations in this chapter tell him how to figure out what the difficulty number should be.) If you roll equal to or higher than the difficulty number, your character succeeded at what she was trying to do.
            </p>
            <p>
              Now you know the one major rule you need to play this game.
            </p>
          </section>
          <section className="section">
            <h2>Skill Descriptions</h2>
            <p>
              <strong>Time Taken:</strong> This is generally how long it takes to do something with the skill. Many skills (especially combat skills) can be used in one round. More complex skills, like computer programming/repair, may take a round ... or minutes, hours or even days to do something. These are general guidelines; the game master can always customize the time taken depending upon the situation.
            </p>
            <p>
              <strong>Specializations:</strong> Characters may choose a specialization for a skill. The kinds of specializations are explained, and several examples are provided in italics. The skill description tells you what the skill covers and gives a few sample difficulties and modifiers.
            </p>
          </section>
          <div className="row">
            <div className="col">
              <section className="section">
                <h2>Skill Categories</h2>
                <ul
                  className="filter-buttons"
                  style={{
                    display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px',
                  }}
                >
                  <li>
                    <button type="button" onClick={() => handleFilterChange('Dexterity')}>Dexterity Skills</button>
                    <button type="button" onClick={() => handleFilterChange('Knowledge')}>Knowledge Skills</button>
                  </li>
                  <li>
                    <button type="button" onClick={() => handleFilterChange('Mechanical')}>Mechanical Skills</button>
                    <button type="button" onClick={() => handleFilterChange('Perception')}>Perception Skills</button>
                  </li>
                  <li>
                    <button type="button" onClick={() => handleFilterChange('Strength')}>Strength Skills</button>
                    <button type="button" onClick={() => handleFilterChange('Technical')}>Technical Skills</button>
                    <button type="button" onClick={() => handleFilterChange('All')}>Show All</button>
                  </li>
                </ul>
              </section>
            </div>
            <div className="col">
              <SearchTextField placeholder="Search by name..." onSubmit={handleSearch} />
            </div>
          </div>

        </div>
        <div
          className="col-md-4"
          style={{
            flex: '0 0 446px',
            maxHeight: '739px',
            border: '1px solid #ddd',
            padding: '1px',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h2 style={{ margin: '0 0 10px 0' }}>Skills</h2>
          <div
            style={{
              flex: '1', // Takes up remaining space
              overflowY: 'auto',
              overflowX: 'hidden', // Prevent horizontal scrolling
              boxSizing: 'border-box', // Include padding and border in the element's total width and height
            }}
          >
            {filteredSkills.length > 0 ? (
              filteredSkills.map((skill) => (
                <SkillCard
                  key={skill.id}
                  id={skill.id}
                  attribute={skill.attribute}
                  skillName={skill.skill_name}
                  timeTaken={skill.time_taken}
                  isAReaction={skill.is_a_reaction}
                  forceSkill={skill.force_skill}
                  specializations={skill.specializations}
                  modifiers={skill.modifiers}
                  skillUseNotes={skill.skill_use_notes}
                  skillGameNotes={skill.skill_game_notes}
                  skillCode={skill.skill_code}
                />
              ))
            ) : (
              <p>No skills available for the selected category.</p>
            )}
          </div>
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2024 The Game. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Skills;
