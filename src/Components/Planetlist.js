import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlanetCard from './Planetcard';

const PlanetsList = () => {
  // State to store the planets data
  const [planets, setPlanets] = useState([]);
  // State to store the URL of the next page for pagination
  const [nextPage, setNextPage] = useState(null);

  // Effect to fetch planets data when the component mounts
  useEffect(() => {
    const fetchPlanets = async () => {
      // Fetch data from the SWAPI for the initial planets
      const response = await axios.get('https://swapi.dev/api/planets/?format=json');
      // Update the planets state with the fetched data
      setPlanets(response.data.results);
      // Update the next page URL for pagination
      setNextPage(response.data.next);
    };

    // Call the fetchPlanets function
    fetchPlanets();
  }, []);

  // Function to load the next page of planets
  const loadNextPage = async () => {
    if (nextPage) {
      // Fetch data for the next page using the next page URL
      const response = await axios.get(nextPage);
      // Update the planets state by concatenating the new results
      setPlanets(prevPlanets => [...prevPlanets, ...response.data.results]);
      // Update the next page URL for further pagination
      setNextPage(response.data.next);
    }
  };

  return (
    <div className="planets-list">
      {/* Map through planets and render PlanetCard component for each planet */}
      {planets.map(planet => (
        <PlanetCard key={planet.name} planet={planet} />
      ))}
      {/* Render a "Load More" button if there is a next page */}
      {nextPage && <button onClick={loadNextPage}>Load More</button>}
    </div>
  );
};

export default PlanetsList;
