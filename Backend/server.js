const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Read Users Function
const readUsers = () => {
    const data = fs.readFileSync('users.json', 'utf-8');
    return JSON.parse(data);
};

// Write Users Function
const writeUsers = (data) => {
    fs.writeFileSync('users.json', JSON.stringify(data, null, 2));
};

// Signup Route
app.post('/signup', async(req, res) => {
    const { email, password, roles } = req.body;

    const users = readUsers();

    if (users.find(user => user.email === email)) {
        return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Ensure roles are saved as an array, even if it's just one role
    const rolesArray = Array.isArray(roles) ? roles : [roles];

    users.push({ email, password: hashedPassword, roles: rolesArray });

    writeUsers(users);

    res.status(201).json({ message: "User registered successfully!" });
});



// Login Route
app.post('/login', async(req, res) => {
    const { email, password } = req.body;

    const users = readUsers();

    const user = users.find(user => user.email === email);

    if (!user) {
        return res.status(400).json({ message: "User not found!" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        return res.status(400).json({ message: "Invalid password!" });
    }

    // Return the user's role upon successful login
    res.status(200).json({ message: "Login successful!", role: user.roles[0] });
});



// Server Listener
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});