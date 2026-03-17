const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const bcrypt = require('bcrypt'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.json()); 
app.use(cors()); 

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// --- FAKE DATABASE FOR USERS ---
const usersDB = [];

// ==========================================
//          BASIC SERVER CHECK ROUTE
// ==========================================
app.get('/', (req, res) => {
    res.send("Freddy's Home Backend Server is LIVE and ready!");
});

// ==========================================
//          SIGN UP ROUTE 
// ==========================================
app.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) return res.status(400).send("Missing information!");
        if (password.length < 6) return res.status(400).send("Password must be at least 6 characters.");
        
        const userAlreadyExists = usersDB.find(user => user.email === email);
        if (userAlreadyExists) return res.status(400).send("That email is already registered!");

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        usersDB.push({ name, email, password: hashedPassword });
        console.log("New user registered! Total users:", usersDB.length);

        res.status(200).send("Sign up successful!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// ==========================================
//          LOG IN ROUTE 
// ==========================================
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).send("Please provide email and password.");

        const user = usersDB.find(user => user.email === email);
        if (!user) return res.status(400).send("User not found. Please sign up!");

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).send("Incorrect password!");

        res.status(200).send("Login successful!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// ==========================================
//          CONTACT FORM ROUTES 
// ==========================================
app.get("/get", (req, res) => {
    console.log("GET request data:", req.query);
    res.send("GET request התקבל!");
});

app.post("/post", (req, res) => {
    console.log("POST request data:", req.body);
    res.send("POST request התקבל!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});