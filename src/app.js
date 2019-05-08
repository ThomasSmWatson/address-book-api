const express = require("express")
const bodyParser = require("body-parser")
const uuid = require("uuid/v4")
const cors = require("cors")

const app = express()
app.use(bodyParser.json())
app.use(cors())

const contacts = []
app.get("/contact", (req, res) => {
  res.json({ contacts })
})

app.get("/contact/:id", (req, res) => {
  if (!id) return req.status(400).send("no Id has been provided")
  contacts.find(c => c.id === req.params.id)
  res.json({ contacts })
})

app.post("/contact", (req, res) => {
  const { name, phone, email } = req.body
  if (!name || !phone || !email)
    return res
      .status(400)
      .send("Must provide a name, phone and email")
      .end()
  const id = uuid()
  const contact = { id, name, phone, email }
  contacts.push(contact)
  res.status(200).send(contact)
})

app.listen(8080, () => console.log("listening on port 8080"))
