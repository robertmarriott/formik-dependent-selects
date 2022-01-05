import base from '../../middleware/common';

const regions = [
  { id: 1, name: 'Asia' },
  { id: 2, name: 'Europe' },
  { id: 3, name: 'North America' },
];

export default base().get((req, res) => {
  return res.status(200).json(regions);
});
