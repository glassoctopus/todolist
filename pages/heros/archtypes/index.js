import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../../utils/context/authContext';
import { getArchtypes } from '../../../utils/data/archtypeData';

function Hero() {
//   const [archtype, setArchtype] = useState([]);
//   const { user } = useAuth();

  //   useEffect(() => {
  //     if (user && user.uid) {
  //       getArchtype().then((data) => {
  //         setArchtype(data);
  //       });
  //     }
  //   }, [user]);

  return (
    <div className="hero-container">
      <div className="hero-content">
        <article className="Hero">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Archtype List</h2>
            <Link href="archtype/archtypes/new" passHref>
              <Button variant="primary">
                New Character Archtype
              </Button>
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}

export default Hero;
