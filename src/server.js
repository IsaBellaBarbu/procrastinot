import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import bcrypt from 'bcrypt';

const app = express();
const port = process.env.PORT || 1234;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./src/db.sqlite", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
    console.log('Database Connected');
});

// Registering route
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.run('INSERT INTO user (u_name, u_pw, u_streak) VALUES (?, ?, ?)', [username, hashedPassword, 0], (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        db.get('SELECT * FROM user WHERE u_name = ?', [username], async (err, user) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            const isPasswordValid = await bcrypt.compare(password, user.u_pw);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            // For now, we return the username
            res.status(200).json({ message: `User ${user.u_name} logged in successfully`, username: user.u_name });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// important for testing
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Route for allowing a user to follow another user
app.post('/follow', async (req, res) => {
    const { followerId, followedId } = req.body;
    try {
        db.run('INSERT INTO user_follow (fk_u_id, fk_followed_u_id) VALUES (?, ?)', [followerId, followedId], (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'User followed successfully' });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route for allowing a user to unfollow another user
app.delete('/unfollow', async (req, res) => {
    const { followerId, followedId } = req.body;
    try {
        db.run('DELETE FROM user_follow WHERE fk_u_id = ? AND fk_followed_u_id = ?', [followerId, followedId], (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: 'User unfollowed successfully' });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

