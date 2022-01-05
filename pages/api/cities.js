import base from '../../middleware/common';

const cities = [
  { id: 1, countryId: 1, name: 'Beijing' },
  { id: 2, countryId: 1, name: 'Shanghai' },
  { id: 3, countryId: 2, name: 'Osaka' },
  { id: 4, countryId: 2, name: 'Tokyo' },
  { id: 5, countryId: 3, name: 'London' },
  { id: 6, countryId: 3, name: 'Manchester' },
  { id: 7, countryId: 4, name: 'Marseille' },
  { id: 8, countryId: 4, name: 'Paris' },
  { id: 9, countryId: 5, name: 'Toronto' },
  { id: 10, countryId: 5, name: 'Vancouver' },
  { id: 11, countryId: 6, name: 'Los Angeles' },
  { id: 12, countryId: 6, name: 'New York' },
];

export default base().get((req, res) => {
  const { countryId } = req.query;
  const filteredCities = cities.filter((city) => city.countryId === +countryId);
  return res.status(200).json(filteredCities);
});
