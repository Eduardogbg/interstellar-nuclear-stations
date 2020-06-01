import type { Exoplanet, AsyncCursorResolver } from '../../types';

import paginationFlatGenerator from '../../lib/pagination-flat-generator';


const suitablePlanets: AsyncCursorResolver<Exoplanet> = async (
  _source, { amount, cursor }, { dataSources }
) => {
  const generator = paginationFlatGenerator(
    dataSources.arcsecondAPI.getExoplanets,
    { batch: 5, cursor, pageSize: Math.min(5 * amount, 1000) }
  );
  let nextCursor = 1;

  // recursively iterate through yielded exoplanets until a suitable one is found
  const iterateSuitable = async () => {
    const { value: exoplanet } = await generator.next();
    
    if (!exoplanet) {
      nextCursor = null;
      return null;
    }
    ++nextCursor;

    return exoplanet.mass?.value >= 25
      ? exoplanet
      : await iterateSuitable();
  }

  /*
      Until it fills an array of the requested amount, iterates asynchronously through
    the yielded exoplanets.
  */
  const suitablePlanets: Exoplanet[] = await Promise.all(
    Array.from({ length: amount }, iterateSuitable)
  );
  // In case the source runs out of exoplanets before we fulfill the requested amount
  const suitableFound = suitablePlanets.filter(Boolean);

  return {
    count: suitableFound.length,
    cursor: nextCursor,
    results: suitableFound
  };
}


export default { Query: { suitablePlanets } };
