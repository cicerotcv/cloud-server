import express from "express";
import { AUTH } from "./constants";
import { authController } from "./controllers";
import os from 'os'

export const router = express.Router();

router.get("/", (req, res) => {
  return res.json({ host: os.hostname() });
});


router.post(AUTH.CREATE_ACCOUNT, authController.createAccount);
router.post(AUTH.LOGIN, authController.login);
router.delete(AUTH.DELETE_ACCOUNT, authController.deleteAccount);
