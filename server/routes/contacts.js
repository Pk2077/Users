const express = require("express");
const router = express.Router();
const Contact = require("../models/contacts");

router.get("/", async (req, res) => {
  const contact = await Contact.find();
  if (!contact) return res.status(404).send("Not Found");
  res.send(contact);
});

router.get("/:id", async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) return res.status(404).send("Not Found");
  res.send(contact);
});

router.post("/", async (req, res) => {
  let contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
  });
  await contact.save();
  res.send(contact);
});

router.put("/:id", async (req, res) => {
  let contact = await Contact.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
    },
    { new: true }
  );
  if (!contact) return res.status(404).send("Not Found");
  res.send(contact);
});

router.delete("/:id", async (req, res) => {
  let contact = await Contact.findByIdAndRemove(req.params.id);
  if (!contact) return res.status(404).send("Not Found");

  res.send(contact);
});

module.exports = router;
