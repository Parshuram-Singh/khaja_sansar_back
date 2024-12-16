import express from "express";
const app = express();
const port = 8000;

app.get("/", (req,res) => {
    res.status(200).json({
        type: "Success"
    })
})


app.listen(port, () => {
    console.log(`Server is running on ${port} port`); 
});