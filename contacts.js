const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.resolve("./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf8")
    .then((data) => console.table(JSON.parse(data)))
    .catch((error) => console.log(error.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8")
    .then((data) => {
      const parsedData = JSON.parse(data);
      const contactById = parsedData.find(
        (contact) => contact.id === contactId
      );
      console.log(contactById);
    })
    .catch((error) => console.log(error.message));
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8")
    .then((data) => {
      const parsedData = JSON.parse(data);
      const newArray = parsedData.filter((contact) => contact.id !== contactId);
      console.table(newArray);
      return JSON.stringify(newArray);
    })
    .then((contactsArray) => fs.writeFile(contactsPath, contactsArray, "utf8"))
    .catch((error) => console.log(error.message));
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf8")
    .then((data) => {
      const contacts = JSON.parse(data);
      contacts.push({
        id: v4(),
        name,
        email,
        phone,
      });
      console.log(contacts);
      return fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
    })
    .catch((error) => console.log(error.message));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
