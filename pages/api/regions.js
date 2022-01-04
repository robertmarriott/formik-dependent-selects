const regions = [
  { id: 1, name: 'Asia' },
  { id: 2, name: 'Europe' },
  { id: 3, name: 'North America' },
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json(regions);
  }
  return res.status(405).end();
}
