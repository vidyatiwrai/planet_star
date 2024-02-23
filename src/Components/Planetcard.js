import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlanetCard = ({ planet }) => {
  // State to store the residents data
  const [residents, setResidents] = useState([]);

  // Effect to fetch residents data when planet.residents changes
  useEffect(() => {
    const fetchResidents = async () => {
      // Fetch data for each resident using axios and map
      const residentsData = await Promise.all(
        planet.residents.map(residentURL => axios.get(residentURL))
      );
      // Update the residents state with the fetched data
      setResidents(residentsData.map(res => res.data));
    };

    // Call the fetchResidents function
    fetchResidents();
  }, [planet.residents]);

  return (
    <div className="planet-card">
      {/* Display planet information */}
      <h2>{planet.name}</h2>
      <p>Climate: {planet.climate}</p>
      <p>Population: {planet.population}</p>
      <p>Terrain: {planet.terrain}</p>
      
      {/* Display residents information if available */}
      {residents.length > 0 && (
        <>
          <h3>Residents:</h3>
          <ul>
            {/* Map through residents and display their information */}
            {residents.map(resident => (
              <li key={resident.name}>
                {resident.name} - Height: {resident.height}, Mass: {resident.mass}, Gender: {resident.gender}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default PlanetCard;
