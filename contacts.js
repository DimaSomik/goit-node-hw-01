import fs from 'node:fs';
import * as path from 'path';

// Path for database with the list of contacts
const contactsPath = path.join("./", "db", "contacts.json");

// Returns list of all the contacts
export function listContacts() {
    return JSON.parse(fs.readFileSync(contactsPath, {encoding: "utf-8"}));
};
 
// Returns only one contact, which id matches the given id
export function getContactById(contactId) {
    const contacts = listContacts();
    return contacts.find((contact) => contact.id === contactId);
};

// Removes one contact with the given id and writes new list into json db file
export function removeContact(contactId) {
    const contacts = listContacts();
    const newContactList = contacts.filter((contact) => contact.id !== contactId);
    fs.writeFileSync(contactsPath, JSON.stringify(newContactList, null, 2));
};

// Creates new contact with given credentials and adds this contact to the list
export function addContact(name, email, phone) {
    const contacts = listContacts();
    const newContact = {id: crypto.randomUUID(),
                        name: name,
                        email: email,
                        phone: phone};
    contacts.push(newContact);
    fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));
};