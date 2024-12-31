import { listContacts, getContactById, removeContact, addContact } from "./contacts.js";
import { Command } from "commander";

const parseArguments = () => {
    const program = new Command();
  
    program
      .option("-a, --action <type>", "choose action")
      .option("-i, --id <type>", "user id")
      .option("-n, --name <type>", "user name")
      .option("-e, --email <type>", "user email")
      .option("-p, --phone <type>", "user phone");
    
    program.parse(process.argv);
  
    const argv = program.opts();
  
    return argv;
};

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.table(listContacts());
      break;

    case "get":
      console.log(getContactById(id));
      break;

    case "add":
      addContact(name, email, phone);
      console.log("You've added new contact!");
      break;

    case "remove":
      removeContact(id);
      console.log(`You've removed contact - ${id}`);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

const main = () => {
    const argv = parseArguments();
  
    invokeAction(argv);
};

main();