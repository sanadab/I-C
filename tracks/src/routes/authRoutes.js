const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

const router = express.Router();

router.post("/signup", async(req, res) => {
    console.log("🛠️ Signup route hit");

    const { fullname, username, email, password, role } = req.body;

    try {
        const user = new User({ fullname, username, email, password, role });
        await user.save(); // Fails if Mongo not connected
        console.log("✅ User saved to DB");

        const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
        res.send({ token });
    } catch (err) {
        console.error("❌ Signup error:", err);
        res.status(422).send(err.message);
    }
});
router.post('/Details', async(req, res) => {
    const { name, expertise, course, testimonial } = req.body; // Match schema

    try {
        const user = new Details({ name, expertise, course, testimonial });
        await user.save();

        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY', { expiresIn: '1h' });
        res.send({ token });
    } catch (err) {
        res.status(422).send({ error: err.message });
    }
});

router.post('/signin', async(req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(422).send({ error: 'Must provide username and password' });
    }

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(422).send({ error: 'Invalid username or password' });
    }

    try {
        console.log("Attempting password comparison...");
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            console.log("Password mismatch.");
            return res.status(422).send({ error: 'Invalid username or password' });
        }

        console.log("Password matched, proceeding with login...");

        // If password matches, issue the token
        const role = user.role;
        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY', { expiresIn: '1h' });
        res.send({ token, role });

    } catch (err) {
        console.error("Error during password comparison:", err);
        return res.status(422).send({ error: 'Invalid username or password' });
    }
});

router.post('/resetpass', async(req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(422).send({ error: 'Must provide username and password' });
    }

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(422).send({ error: 'Invalid password or username' });
    }

    try {
        await user.ChangePassword(password, user);

        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
        res.send({ token });
    } catch (err) {
        return res.status(422).send({ error: 'Invalid password or email' });
    }
});
module.exports = router;