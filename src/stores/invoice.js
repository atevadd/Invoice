import { defineStore } from "pinia";
// import { ref } from "vue";
import { shallowRef } from "vue";

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
    },
    selectedInvoice: {},
    allInvoice: shallowRef([]),
  }),

  actions: {
    addNewInvoice() {
      this.allInvoice.push(this.invoice);
      console.log("added invoice");
    },
  },
});
