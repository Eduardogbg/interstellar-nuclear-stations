import type { Exoplanet, AsyncCursorResolver } from '../../types';

import paginationFlatGenerator from '../../lib/pagination-flat-generator';

const suitablePlanets: AsyncCursorResolver<Exoplanet> = async (
  _source, { amount, cursor }, { dataSources }
) => {
  const planetStream = paginationFlatGenerator(
    dataSources.arcsecondAPI.getExoplanets,
    // e se não tiver nenhum planeta com +25 de massa nessas requests?
    { batch: 5, cursor, pageSize: Math.min(5 * amount, 1000) }
  );

  let planets: Exoplanet[] = [];
  let nextCursor = 1;
  for await (const planet of planetStream) {
    if (planets.length === amount) break;
    if (!planet) { nextCursor = null; break };
    nextCursor++;
    
    if (planet.mass?.value >= 25) 
      planets.push(planet)
  }

  return {
    count: planets.length,
    cursor: nextCursor,
    results: planets
  };
}


export default { Query: { suitablePlanets } };
