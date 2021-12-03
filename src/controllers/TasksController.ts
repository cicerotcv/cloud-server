import { Request, Response } from "express";
import { Task } from "../models/Task";

class TaskController {
  async listTasks(req: Request, res: Response) {
    try {
      const { _id: userId } = req;
      const tasks = await Task.find({ user: userId });
      return res.json(tasks);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }

  async createTask(req: Request, res: Response) {
    try {
      const { _id: userId } = req;
      const { content } = req.body;

      const task = await Task.create({ user: userId, content });

      return res.json(task);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }

  async getTask(req: Request, res: Response) {
    try {
      const { _id: userId } = req;
      const { taskId } = req.params;

      const task = await Task.findOne({ user: userId, _id: taskId });

      if (!task) {
        return res.status(400).json({ error: `Task ${taskId} not found` });
      }

      return res.json(task);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const { _id: userId } = req;
      const { taskId } = req.params;
      const { content } = req.body;

      const task = await Task.findOneAndUpdate(
        { user: userId, _id: taskId },
        { content: content },
        { new: true }
      );

      return res.json({ updatedTask: task });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const { _id: userId } = req;
      const { taskId } = req.params;

      const task = await Task.findOneAndDelete({ user: userId, _id: taskId });

      if (!task) {
        return res.status(400).json({ error: `Task ${taskId} not found` });
      }

      return res.json({ taskDeleted: task });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
}

export const taskController = new TaskController();
