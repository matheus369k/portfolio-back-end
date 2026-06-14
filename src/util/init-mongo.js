import { env } from '@/env'

db.createUser({
  user: env.DATABASE_USERNAME,
  pwd: env.DATABASE_PASSWORD,
  roles: [{ role: "root", db: "admin" }],
});
