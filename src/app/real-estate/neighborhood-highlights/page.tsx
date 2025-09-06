import React from 'react';
import '../../style/neighborhood-highlights.css';

const neighborhoods = [
  {
    name: 'Kuje',
    perks: ['Affordable plots', 'Rapid development', 'Peaceful suburban vibe'],
  },
  {
    name: 'Jikwoyi',
    perks: ['Close to city center', 'Growing infrastructure', 'Budget-friendly homes'],
  },
  {
    name: 'Gwarinpa',
    perks: ['Well-planned layout', 'Top amenities', 'Family-friendly'],
  },
  {
    name: 'Lokogoma',
    perks: ['Modern estates', 'Good road network', 'Popular with young professionals'],
  },
  {
    name: 'Maitama',
    perks: ['Luxury living', 'Diplomatic zone', 'High security'],
  },
  {
    name: 'Lugbe',
    perks: ['Affordable housing', 'Proximity to airport', 'Fast-growing'],
  },
];

export default function NeighborhoodHighlights() {
  return (
    <section className="neighborhoods">
      <h2>Neighborhood Highlights</h2>
      <div className="area-list">
        {neighborhoods.map((area, index) => (
          <div key={index} className="area-card">
            <h3>{area.name}</h3>
            <ul>
              {area.perks.map((perk, i) => (
                <li key={i}>🏡 {perk}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
