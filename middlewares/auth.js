// eslint-disable-next-line import/no-extraneous-dependencies
import { verify } from 'jsonwebtoken';

// eslint-disable-next-line import/prefer-default-export, consistent-return
export function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = verify(token, 'some-secret-key');
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  req.user = payload;
  next();
}
