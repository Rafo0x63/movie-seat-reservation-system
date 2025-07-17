import { Router } from "express";

const theaterRouter = Router();

theaterRouter.get("/", (req, res) => {
    res.send("GET all theaters");
});
theaterRouter.get("/:id", (req, res) => {
    res.send("GET theater by id");
});
theaterRouter.post("/", (req, res) => {
    res.send("CREATE new theater");
});
theaterRouter.put("/:id", (req, res) => {
    res.send("UPDATE theater by id");
});
theaterRouter.delete("/:id", (req, res) => {
    res.send("DELETE theater by id");
});
