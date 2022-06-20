import Dexie from "dexie";

// Creating the database
export const db = new Dexie("Invoices");

// Creating the table or objectStore
export const dbInitialisation = () => {
  try {
    db.version(1).stores({
      invoice: "++id, status",
    });
  } catch {
    db.open();
  }
};
