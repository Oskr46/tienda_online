import { Router } from "express";
import { createComment } from "../components/commentary/createComment";
import { getAllComments } from "../components/commentary/getAllComments";
import { deleteCommentary } from "../components/commentary/deleteComment";

const router = Router();

router.get('/', getAllComments);
router.post('/', createComment);
router.delete('/:id', deleteCommentary);

export default router;