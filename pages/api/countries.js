import base from '../../middleware/common';

const countries = [
  { id: 1, regionId: 1, name: 'China' },
  { id: 2, regionId: 1, name: 'Japan' },
  { id: 3, regionId: 2, name: 'England' },
  { id: 4, regionId: 2, name: 'France' },
  { id: 5, regionId: 3, name: 'Canada' },
  { id: 6, regionId: 3, name: 'United States' },
];

export default base().get((req, res) => {
  const { regionId } = req.query;
  const filteredCountries = countries.filter(
    (country) => country.regionId === +regionId
  );
  return res.status(200).json(filteredCountries);
});
