import { NextApiHandler } from 'next';
import { withIronSession } from 'next-iron-session';

export function withSession(handler: NextApiHandler) {
  return withIronSession(handler, {
    // password: process.env.SECRET_COOKIE_PASSWORD,
    password: '0.378618654946464646469874646464684877',
    cookieName: 'blog',
    cookieOptions: {
      // secure: process.env.NODE_ENV === 'production' ? true : false,
      secure: false,
    },
  });
}
