import { SHA3 } from 'sha3'


export const sessionOptions = {
  password: process.env.SESSION_PASSWORD,
  cookieName: "session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production"
  }
}


export async function hashPassword(string) {
  return new SHA3(256).update(string).digest('hex')
}