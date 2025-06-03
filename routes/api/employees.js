const express=require('express');
const router=express.Router();
const { list, insert, update, remove, get}=require('../../controllers/employeesController');
const Roles_List=require("../../config/roles_list");
const verifyRoles=require("../../middleware/verifyRoles");

router.route('/')
    .get(list)
    .post(verifyRoles(Roles_List.Admin, Roles_List.Editor), insert)
    .put(verifyRoles(Roles_List.Admin, Roles_List.Editor), update)
    .delete(verifyRoles(Roles_List.Admin), remove)

router.route('/:id').get(get)

module.exports = router;
