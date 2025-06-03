const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
// const Details = mongoose.model('Details');
const Details = require('../models/Details');
const requireAuth = require('../middlewares/requireAuth');
const Message = require('../models/Message');
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


router.post('/Details', requireAuth, async(req, res) => {
    try {
        const { expertise, courses, testimonials } = req.body;
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        if (!expertise || !Array.isArray(courses) || !courses.length || !Array.isArray(testimonials) || !testimonials.length) {
            return res.status(422).send({ error: 'Missing required fields' });
        }

        // ✅ Update if exists, insert if not
        const updated = await Details.findOneAndUpdate({ userId: req.user._id }, {
            userId: req.user._id,
            name: user.fullname,
            expertise,
            courses,
            testimonials
        }, { upsert: true, new: true, setDefaultsOnInsert: true });

        res.send({ message: 'Details saved successfully!', data: updated });
    } catch (err) {
        console.error('❌ Error saving details:', err);
        res.status(422).send({ error: 'Could not save counselor details' });
    }
});
router.get('/messages/conversations', requireAuth, async(req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(422).send({ error: 'Invalid user in request' });
        }

        const messages = await Message.find({
            $or: [
                { sender: req.user._id },
                { recipient: req.user._id }
            ]
        });

        const userIds = new Set();
        messages.forEach(msg => {
            if (msg.sender.toString() !== req.user._id.toString()) {
                userIds.add(msg.sender.toString());
            }
            if (msg.recipient.toString() !== req.user._id.toString()) {
                userIds.add(msg.recipient.toString());
            }
        });

        const users = await User.find({ _id: { $in: Array.from(userIds) } }).select('fullname _id');
        res.send(users);
    } catch (err) {
        console.error('❌ Failed to fetch conversation users:', err);
        res.status(500).send({ error: 'Server error' });
    }
});

router.get('/messages/:otherUserId', requireAuth, async(req, res) => {
    try {
        console.log(`Fetching messages between ${req.user._id} and ${req.params.otherUserId}`); // Debug log
        const messages = await Message.find({
            $or: [
                { sender: req.user._id, recipient: req.params.otherUserId },
                { sender: req.params.otherUserId, recipient: req.user._id }
            ]
        }).sort({ createdAt: 1 });

        console.log('Found messages:', messages); // Debug log
        res.send(messages);
    } catch (err) {
        console.error('Error fetching messages:', err);
        res.status(422).send({ error: err.message });
    }
});

router.post('/messages', requireAuth, async(req, res) => {
    const { recipient, text } = req.body;

    try {
        const message = new Message({
            sender: req.user._id,
            recipient,
            text
        });

        await message.save();
        res.send(message);
    } catch (err) {
        res.status(422).send({ error: err.message });
    }
});
router.get('/users/job-seekers', requireAuth, async(req, res) => {
    try {
        const seekers = await User.find({ role: 'Job Seeker' }).select('fullname email');
        res.send(seekers);
    } catch (err) {
        res.status(422).send({ error: err.message });
    }
});


// Get all counselors
router.get('/details/all-counselors', requireAuth, async(req, res) => {
    try {
        const counselors = await Details.find({});
        res.send(counselors);
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