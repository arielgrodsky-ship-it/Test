const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// מאפשר קריאת JSON מהבקשה
app.use(bodyParser.json());

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
app.listen(port, () => {
    console.log(`the server is running : http://localhost:${port}`);
});