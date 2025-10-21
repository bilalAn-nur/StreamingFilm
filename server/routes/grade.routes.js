import { Router } from "express";

const gradeRouter = Router();
gradeRouter.get("/", (req, res) => res.send({ title: "Fetch All Grades" }));

gradeRouter.get("/:id", (req, res) =>
  res.send({ title: "Fetch Grade Details ", id: req.params.id })
);
gradeRouter.post("/", (req, res) => res.send({ title: "Create New Grade" }));
gradeRouter.put("/:id", (req, res) =>
  res.send({ title: "Update Grade", id: req.params.id })
);
gradeRouter.delete("/:id", (req, res) =>
  res.send({ title: "Delete Grade", id: req.params.id })
);

export default gradeRouter;
