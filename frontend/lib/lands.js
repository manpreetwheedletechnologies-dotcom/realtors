import landsData from '../data/lands.json';

/**
 * Returns the full JSON block for a given slug (e.g. "residential-land"),
 * or undefined if that slug hasn't been added to data/lands.json yet.
 */
export function getLandBySlug(slug) {
  return landsData[slug];
}

/**
 * Returns every slug currently defined in data/lands.json — used by
 * getStaticPaths so every land type in the JSON automatically gets its
 * own page with zero extra code.
 */
export function getAllLandSlugs() {
  return Object.keys(landsData);
}