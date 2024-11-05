import { db } from "../database/database.js";

const create = async ({ email, password, username }) => {
  const query = {
    text: `INSERT INTO USERS(email, password, username) VALUES ($1, $2, $3) RETURNING uid, role_id`,
    values: [email, password, username],
  }

  const { rows } = await db.query(query)
  return rows[0]

}

const existsAccountByMail = async (email) => {
  const query = {
    text: `SELECT EXISTS(SELECT 1 FROM USERS WHERE email = $1) AS exists`,
    values: [email]
  }
  const { rows } = await db.query(query)
  
  return rows[0].exists
}


const getUserByEmail = async (email) => {
  const query = {
    text: `SELECT * FROM USERS WHERE email = $1`,
    values: [email]
  }
  const { rows } = await db.query(query)
  
  return rows[0]
}

const getUsers = async() => {
  const query = {
    text: `SELECT uid, email, username, role_id, created_at, updated_at FROM USERS`,
  }
  const { rows } = await db.query(query)
  return rows
}

export const userModel = {
  create, existsAccountByMail, getUserByEmail, getUsers
}