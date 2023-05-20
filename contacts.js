const fs = require('fs');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

function listContacts() {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) throw err;
    const contacts = JSON.parse(data);
    console.table(contacts);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) throw err;
    const contacts = JSON.parse(data);
    const contact = contacts.find((c) => c.id === contactId);
    console.log(contact);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) throw err;
    const contacts = JSON.parse(data);
    const filteredContacts = contacts.filter((c) => c.id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(filteredContacts), (err) => {
      if (err) throw err;
      console.log(`Contact with id ${contactId} removed`);
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) throw err;
    const contacts = JSON.parse(data);
    const newContact = { id: contacts.length + 1, name, email, phone };
    const updatedContacts = [...contacts, newContact];
    fs.writeFile(contactsPath, JSON.stringify(updatedContacts), (err) => {
      if (err) throw err;
      console.log('New contact added');
    });
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
