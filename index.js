import express from "express"
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/hello', (req, res) => {
    res.send("hello world i am in that line")
})

app.get("/login", (req, res) => {
    res.send("<h1>i am login nows</h2>")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})