import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import { db } from "../database/db";
// import { useToast } from "vue-toastification";

// // Toast instance
// const toast = useToast();

export const useInvoiceStore = defineStore({
  id: "invoice",
  state: () => ({
    invoice: {
      billFromAddress: "",
      billFromCity: "",
      billFromCode: "",
      billFromCountry: "",
      billToName: "",
      billToEmail: "",
      billToAddress: "",
      billToCity: "",
      billToCode: "",
      billToCountry: "",
      invoiceDate: "",
      paymentTerms: "",
      projectDescription: "",
      itemList: [
        {
          itemName: "",
          qty: "",
          price: "",
        },
      ],
      status: "paid",
    },
    selectedInvoice: {},
    allInvoice: ref([]),
  }),

  getters: {
    getAllInvoice(state) {
      return state.allInvoice;
    },
    getInvoice(state) {
      return state.invoice;
    },
  },
  actions: {
    async fetchInvoiceFromDatabase() {
      let allDatabaseInvoice = await db
        .table("invoice")
        .toArray()
        .then((result) => {
          this.allInvoice = result;
        });
    },
    async deleteInvoiceFromDatabase(id) {
      const deleted = await db.table("invoice").delete(id + 1);
    },
    updateInvoiceInDatabase(id, obj) {
      db.table("invoice")
        .update(id + 1, obj)
        .then((updated) => {
          if (updated) {
            // Showing the success message
            toast.success("Invoice updated", {
              position: "bottom-right",
              timeout: 3000,
              closeOnClick: false,
              pauseOnFocusLoss: true,
              pauseOnHover: true,
              draggable: true,
              draggablePercent: 0.6,
              showCloseButtonOnHover: false,
              hideProgressBar: true,
              closeButton: false,
              icon: true,
              rtl: false,
            });
          } else {
            // Showing the success message
            toast.error("Invoice could not be updated", {
              position: "bottom-right",
              timeout: 3000,
              closeOnClick: false,
              pauseOnFocusLoss: true,
              pauseOnHover: true,
              draggable: true,
              draggablePercent: 0.6,
              showCloseButtonOnHover: false,
              hideProgressBar: true,
              closeButton: false,
              icon: true,
              rtl: false,
            });
          }
        });
    },
    addNewInvoice(invoice) {
      this.allInvoice.push(invoice);
    },
    clearInvoice() {
      this.invoice = {
        billFromAddress: "",
        billFromCity: "",
        billFromCode: "",
        billFromCountry: "",
        billToName: "",
        billToEmail: "",
        billToAddress: "",
        billToCity: "",
        billToCode: "",
        billToCountry: "",
        invoiceDate: "",
        paymentTerms: "",
        projectDescription: "",
        itemList: [
          {
            itemName: "",
            qty: "",
            price: "",
          },
        ],
      };
    },
    editCurrentInvoice(id, obj) {
      this.allInvoice[id] = obj;
    },
    deleteCurrentInvoice(id) {
      this.allInvoice.splice(id, 1);
      this.deleteInvoiceFromDatabase(id);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useInvoiceStore, import.meta.hot));
}
