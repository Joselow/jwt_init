import 'dotenv/config'
import pg  from 'pg'

const { Pool } = pg

const connectionString = process.env.DATABASE_URL

export const db = new Pool({
  allowExitOnIdle: true,
  connectionString
})

try {
  const res = await db.query('select now()')
  console.log(res, 'contected');
  
} catch (error) {
  console.error(error);
}