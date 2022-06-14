import { defineStore } from "pinia";
import { ref } from "vue";

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
      console.log("Invoice has been updated");
    },
    deleteCurrentInvoice(id) {
      this.allInvoice.splice(id, 1);
      console.log("Invoice has been deleted");
    },
  },
});
