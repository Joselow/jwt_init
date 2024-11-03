import { db } from "../database/database.js";

const create = async ({ email, password, username }) => {
  const query = {
    text: `INSERT INTO USERS(email, password, username) VALUES ($1, $2, $3)`,
    values: [email, password, username]
  }

  const result = await db.query(query)
  return result

}

const findByEmail = async (email) => {
  const query = {
    text: `SELECT * FROM USERS WHERE email = $1`,
    values: [email]
  }
  const { rows } = await db.query(query)
  return rows[0]
}

export {
  create, findByEmail
}
