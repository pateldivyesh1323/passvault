import express from 'express'
import { getLoggedinUID } from '../utils/helper';
import { createNewPassword, getAllPasswords } from '../controllers/password';

const router = express.Router()

router.get('/', async (req, res) => {
    const uid = getLoggedinUID(req.auth);
    try {
        const { status, data } = await getAllPasswords(uid);
        res.status(status).json(data);
    } catch (error) {
        res.status(500).json();
    }
})

router.post('/', async (req, res) => {
    const uid = getLoggedinUID(req.auth);
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
})

export default router;