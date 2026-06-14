const express =require('express');
const router=express.Router();
const todoController=require('../controller/todoController.js');
const auth=require('../middleware/auth.js');

router.get('/',auth,todoController.getAllTodos);
router.post('/',auth,todoController.createTodo);
router.put('/:id',auth,todoController.updateTodo);
router.delete('/:id',auth,todoController.deleteTodo);

// delete all todos for a user
router.delete('/delete/all',auth,todoController.deleteAllTodo);

module.exports=router;