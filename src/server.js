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
            // Fetch friends
            db.all('SELECT u_name, u_streak FROM user JOIN user_follow ON user.u_id = user_follow.fk_followed_u_id WHERE user_follow.fk_u_id = ?', [user.u_id], (err, friends) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.status(200).json({
                    message: `User ${user.u_name} logged in successfully`,
                    username: user.u_name,
                    streak: user.u_streak,
                    userId: user.u_id,
                    friends
                });
            });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route to fetch or update streak count
app.route('/streak/:username')
    .get((req, res) => {
        const { username } = req.params;
        try {
            db.get('SELECT u_streak FROM user WHERE u_name = ?', [username], (err, row) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                if (!row) {
                    return res.status(404).json({ error: 'User not found' });
                }
                res.status(200).json({ streak: row.u_streak });
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    })
    .post((req, res) => {
        const { username } = req.params;
        const { streak } = req.body;
        try {
            db.run('UPDATE user SET u_streak = ? WHERE u_name = ?', [streak, username], function (err) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.status(200).json({ message: 'Streak updated successfully' });
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

// Save gratitude entry to the database
app.post('/saveGratitude', (req, res) => {
    const { content, userId, date } = req.body;
    const insertQuery = 'INSERT INTO grateful_entry (g_content, fk_user, g_date) VALUES (?, ?, ?)';
    db.run(insertQuery, [content, userId, date], function(err) {
        if (err) {
            console.error('Error inserting gratitude entry:', err);
            res.status(500).json({ error: 'Error inserting gratitude entry' });
        } else {
            res.status(200).json({ message: 'Gratitude entry saved successfully!' });
        }
    });
});

// Fetch grateful entries for a specific user
app.get('/gratefulEntries/:userId', (req, res) => {
    const userId = req.params.userId;
    const selectQuery = 'SELECT g_content, g_date FROM grateful_entry WHERE fk_user = ?';
    db.all(selectQuery, [userId], (err, rows) => {
        if (err) {
            console.error('Error fetching grateful entries:', err);
            res.status(500).json({ error: 'Error fetching grateful entries' });
        } else {
            res.status(200).json({ entries: rows });
        }
    });
});

// Route to search for users
app.get('/searchUsers', (req, res) => {
    const { query } = req.query;
    db.all('SELECT u_id, u_name, u_streak FROM user WHERE u_name LIKE ?', [`%${query}%`], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ users: rows });
    });
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

// Important for testing
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
