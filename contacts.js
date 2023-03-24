const fs = require("fs").promises;
const path = require("node:path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname + "/db/contacts.json");

async function listContacts() {
  try {
    const contacts = (await fs.readFile(contactsPath)).toString();
    const parseContacts = JSON.parse(contacts);
    return parseContacts;
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = (await fs.readFile(contactsPath)).toString();
    const parseContacts = JSON.parse(contacts);
    const contactById = parseContacts.find(
      (contact) => contact.id === contactId
    );
    return contactById;
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = (await fs.readFile(contactsPath)).toString();
    const parseContacts = JSON.parse(contacts);
    const newContacts = parseContacts.filter(
      (contact) => contact.id !== contactId
    );
    return newContacts;
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = (await fs.readFile(contactsPath)).toString();
    const parseContacts = JSON.parse(contacts);
    const newContact = { name, email, phone, id: v4() };
    parseContacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(parseContacts));
    return newContact;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
