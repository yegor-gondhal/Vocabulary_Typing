
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const json_path = path.join(__dirname, "./data.json");


app.get("/getdata", (req, res) => {
    const data = JSON.parse(fs.readFileSync(json_path, "utf-8"));
    res.json(data);
});

app.post("/savedata", (req, res) => {
    const newData = req.body;
    if (Object.keys(newData).length !== 0) {
        fs.writeFileSync(json_path, JSON.stringify(newData, null, 2));
        res.json({ success: true });
    }
});

app.listen(3001, () => {
    console.log("Server started on port 3001");
})