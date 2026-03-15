const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

// מאפשר קריאת JSON מהבקשה
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors()); // This unlocks the door for Netlify!
// מאפשר CORS כדי שה-FE יוכל לשלוח בקשות
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});
// נקודת קצה ל-GET
app.get("/get", (req, res) => {
    console.log("GET request data:", req.query);
    res.send("GET request התקבל!");
});

// נקודת קצה ל-POST
app.post("/post", (req, res) => {
    console.log("POST request data:", req.body);
    res.send("POST request התקבל!");
});
// הפעלת השרת
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});