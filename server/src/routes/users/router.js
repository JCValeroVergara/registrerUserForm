const router = require('express').Router();

const { getAllUsersHandler, createUserHandler, getUserByIdHandler, updateUserByIdHandler, deleteUserByIdHandler } = require('../../handlers/users/index');


//Routes
router.get('/', getAllUsersHandler);
router.get('/:id', getUserByIdHandler);
router.post('/', createUserHandler);
router.put('/:id', updateUserByIdHandler);
router.delete('/:id', deleteUserByIdHandler);

module.exports = router;
