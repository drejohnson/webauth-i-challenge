import db from '../database/db-config.js';

const findUser = () => {
  return db('user').select('id', 'username')
}

const findById = id => {
  return db('users')
    .select('id', 'username')
    .where({ id })
    .first()
}

const findBy = filter => {
  return db('users')
    .select('id', 'username', 'password')
    .where(filter)
}

const add = async user => {
  const ids = await db('users').insert(user)
  const [id] = ids
  return findById(id)
}

export default { findUser, findById, findBy, add }