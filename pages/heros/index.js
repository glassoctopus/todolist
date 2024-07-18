// import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
// import { useAuth } from '../../utils/context/authContext';
// import { getHeros } from '../../utils/data/heroData';

function Hero() {
//   const [heros, setHeros] = useState([]);
//   const { user } = useAuth();

  //   useEffect(() => {
  //     if (user && user.uid) {
  //       getHeros().then((data) => {
  //         setHeros(data);
  //       });
  //     }
  //   }, [user]);

  return (
    <div className="hero-container">
      <div className="hero-content">
        <article className="Hero">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Hero List</h2>
            <Link href="/heros/new" passHref>
              <Button variant="primary">
                New Hero
              </Button>
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}

export default Hero;
