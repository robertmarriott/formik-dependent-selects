import nc from 'next-connect';

export default function base() {
  return nc({
    onError: (err, req, res, next) => {
      res.status(500).end('Oops! Something went wrong');
    },
    onNoMatch: (req, res, next) => {
      const { method } = req;
      res.status(405).end(`Method ${method} not allowed`);
    },
  });
}
