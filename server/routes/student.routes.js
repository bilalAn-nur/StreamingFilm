import { Router } from "express";

const studentRouter = Router();

studentRouter.get("/", (req, res) => res.send({ title: "Fetch All Students" }));
studentRouter.get("/:id", (req, res) =>
  res.send({ title: "Fetch Student Details ", id: req.params.id })
);
studentRouter.post("/", (req, res) =>
  res.send({ title: "Create New Student" })
);
studentRouter.put("/:id", (req, res) =>
  res.send({ title: "Update Student", id: req.params.id })
);
studentRouter.delete("/:id", (req, res) =>
  res.send({ title: "Delete Student", id: req.params.id })
);

export default studentRouter;
