import express from "express";
import { AUTH, TASKS } from "./constants";
import { authController, taskController } from "./controllers";
import { ensureAuthorization } from "./middlewares";
import os from "os";

export const router = express.Router();

router.get("/", (req, res) => {
  return res.json({ host: os.hostname() });
});

// authentication routes
router.post(AUTH.CREATE_ACCOUNT, authController.createAccount);
router.post(AUTH.LOGIN, authController.login);
router.post(AUTH.DELETE_ACCOUNT, authController.deleteAccount);

router.get(
  AUTH.CHECK_AUTH,
  ensureAuthorization,
  authController.checkAuthentication
);

// tasks routes
router.get(TASKS.LIST_TASKS, ensureAuthorization, taskController.listTasks);
router.post(TASKS.CREATE_TASK, ensureAuthorization, taskController.createTask);
router.get(TASKS.GET_TASK, ensureAuthorization, taskController.getTask);
router.delete(
  TASKS.DELETE_TASK,
  ensureAuthorization,
  taskController.deleteTask
);
router.patch(TASKS.UPDATE_TASK, ensureAuthorization, taskController.updateTask);
