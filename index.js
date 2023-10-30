const argv = require("yargs").argv;

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      try {
        const response = await listContacts();
        console.log("ListContacts:");
        console.table(response);
      } catch (erorr) {
        console.warn(erorr);
      }
      break;

    case "get":
      try {
        const contact = await getContactById(id);
        contact
          ? console.log(`Contact with id "${id}": `, contact)
          : console.log(`"Contact with id "${id}": not found"`);
      } catch (erorr) {
        console.warn(erorr);
      }
      break;

    case "add":
      try {
        const contact = await addContact(name, email, phone);
        console.log(`Result: `, contact);
      } catch (error) {
        console.warn(error);
      }
      break;

    case "remove":
      try {
        const response = await removeContact(id);
        response
          ? console.log(response)
          : console.log(`"Contact with id "${id}": not found"`);
      } catch (erorr) {
        console.warn(erorr);
      }

      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
