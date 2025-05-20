import { Router } from "express";
import { getAllUsers } from "../components/users/getAllUsers";
import { createUser } from "../components/users/createUser";
import { verifyUser } from "../components/users/verifyUser";
import { logUser } from "../components/users/logUser";
import { updateUser } from "../components/users/updateUser";
import { deleteUser } from "../components/users/deleteUser";

const router = Router();

router.get('/data', getAllUsers);
router.post('/data', createUser);
router.post('/data', logUser);
router.get('/data/:username', verifyUser);
router.put('/data/:username', updateUser);
router.delete('/data/:username', deleteUser);

export default router;