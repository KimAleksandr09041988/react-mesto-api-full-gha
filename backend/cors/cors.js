// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'http://kimbekend.nomoredomains.monster',
  'https://kimbekend.nomoredomains.monster',
  'https://kimfrontend.nomoredomains.monster',
  'http://kimfrontend.nomoredomains.monster',
  'https://localhost:3000',
  'http://localhost:3000',
];

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};
