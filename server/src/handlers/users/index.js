const getAllUsers = require('../../controllers/users/getAllUsers');
const createUser = require('../../controllers/users/createUser');
const getUserById = require('../../controllers/users/getUserById');
const updateUserById = require('../../controllers/users/updateUserById');
const deleteUserById = require('../../controllers/users/deleteUserById');


const getAllUsersHandler = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

const createUserHandler = async (req, res) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getUserByIdHandler = async (req, res) => {
    try {
    const user = await getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found'});
      } else {
        res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const updateUserByIdHandler = async (req, res) => {
    try {
        const user = await updateUserById(req.params.id, req.body);
        if (!user) {
            return res.status(404).json({ error: 'User not found'});
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteUserByIdHandler = async (req, res) => {
    try {
        const user = await deleteUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found'});
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error'});
    }
}

module.exports = {
    getAllUsersHandler,
    createUserHandler,
    getUserByIdHandler,
    updateUserByIdHandler,
    deleteUserByIdHandler
}
