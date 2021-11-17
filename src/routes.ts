import express from "express";
import { AUTH } from "./constants";
import { authController } from "./controllers";

export const router = express.Router();
router.post(AUTH.CREATE_ACCOUNT, authController.createAccount);
router.post(AUTH.LOGIN, authController.login);
router.delete(AUTH.DELETE_ACCOUNT, authController.deleteAccount);
