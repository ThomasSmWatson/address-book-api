const express = require("express")
const bodyParser = require("body-parser")
const uuid = require("uuid/v4")
const cors = require("cors")

const app = express()
app.use(bodyParser.json())
app.use(cors())

const contacts = [
  {
    id: "e769db64-f7bb-46f9-8355-deabb9190ab6",
    name: "Thomas Watson",
    email: "thomas.sm.watson@gmail.com",
    phone: "+44 7707932252"
  },
  {
    id: "614b6416-a90c-4d4b-ae20-ca8b431e67f9",
    name: "Bill Burr",
    email: "bill.burr@gmail.com",
    phone: "+60 7389228282"
  }
]
app.get("/contact", (req, res) => {
  const nameQ = req.query.name
  let mContacts
  if (nameQ)
    mContacts = contacts.filter(c =>
      c.name.toLowerCase().includes(nameQ.toLowerCase())
    )
  else mContacts = contacts
  res.json({ contacts: mContacts })
})

app.put("/contact/:id", (req, res) => {
  const id = req.params.id
  const { name, email, phone } = req.body
  if (!id) return res.status(400).send("no Id has been provided")
  if (!name || !email || !phone)
    res.status(400).send("You must provide a name, email and phone number")
  const contact = contacts.find(c => c.id === id)
  const contactIndex = contacts.findIndex(c => c.id === id)
  contacts[contactIndex] = { id, name, email, phone }
  if (!contact)
    return res.status(404).send(`no contact with id ${id} exists...`)
  res.json({ contact })
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
