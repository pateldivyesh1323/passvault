import express from "express";
import { getLoggedinUID } from "../utils/helper";
import {
    createNewPassword,
    getAllPasswords,
    getOnePassword,
    updatePassword,
    deletePassword,
} from "../controllers/password";

const router = express.Router();

router.get("/", async (req, res) => {
    const uid = await getLoggedinUID(req.auth);
    try {
        const { status, data } = await getAllPasswords(uid);
        res.status(status).json(data);
    } catch (error) {
        res.status(500).send();
    }
});

router.get("/:id", async (req, res) => {
    const uid = await getLoggedinUID(req.auth);
    const { id } = req.params;
    try {
        const { status, data } = await getOnePassword(uid, id);
        res.status(status).json(data);
    } catch (error) {
        res.status(500).send();
    }
});

router.post("/", async (req, res) => {
    const uid = await getLoggedinUID(req.auth);
    const { name, password } = req.body;
    if (!name || !password) {
        res.status(401).json({ message: "Please provide all credentials" });
    }
    try {
        const { status, data } = await createNewPassword(uid, name, password);
        res.status(status).json(data);
    } catch (error) {
        res.status(500).json();
    }
});

router.put("/:id", async (req, res) => {
    try {
        const uid = await getLoggedinUID(req.auth);
        const { id } = req.params;
        const { name, password } = req.body;
        const { status, data } = await updatePassword(uid, id, name, password);
        res.status(status).json(data);
    } catch (error) {
        res.status(500).send();
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const uid = await getLoggedinUID(req.auth);
        const { id } = req.params;
        const { status, data } = await deletePassword(uid, id);
        res.status(status).json(data);
    } catch (error) {
        res.status(500).send();
    }
});

export default router;
