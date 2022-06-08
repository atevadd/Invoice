import Dexie from "dexie";

// Creating the database
export const db = new Dexie("invoice");

// Creating the table or objectStore
db.version(1).stores({
  invoice:
    "++id, billFromAddress, billFromCity, billFromCode, billFromCountry, billToName, billToEmail, billToAddress, billToCity, billToCode, billToCountry, invoiceDate, paymentTerms, projectDescription, itemList",
});
