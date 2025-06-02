const express=require('express');
const router=express.Router();
const { list, insert, update, remove, get}=require('../../controllers/employeesController')

router.route('/')
    .get(list)
    .post(insert)
    .put(update)
    .delete(remove)

router.route('/:id').get(get)

module.exports = router;
