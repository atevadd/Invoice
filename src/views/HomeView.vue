<script setup>
import AppButton from "../components/AppButton.vue";
import InvoiceItem from "@/components/InvoiceItem.vue";
import AppFilter from "@/components/AppFilter.vue";
import AppModal from "../components/AppModal.vue";
import AppInput from "../components/AppInput.vue";
import AppDropdown from "../components/AppDropdown.vue";
import { useModalStore } from "../stores/modal";
import { useInvoiceStore } from "../stores/invoice";
import { countries } from "../assets/js/country.js";
import { ref, computed } from "vue";
import { useToast } from "vue-toastification";

// Store Instances
const modalStore = useModalStore();
const invoiceStore = useInvoiceStore();

// Toast instance
const toast = useToast();

// ALl invoices from the store
let allInvoices = ref(invoiceStore.getAllInvoice);

// Add new invoice item
const addInvoice = () => {
  // Add new invoice item to the store
  invoiceStore.addNewInvoice(invoiceStore.getInvoice);

  // Clearing the invoice form
  invoiceStore.clearInvoice();

  // closing the modal
  modalStore.closeModal();

  // Showing the success message
  toast("Invoice added successfully", {
    position: "bottom-right",
    timeout: 4000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false,
  });
};

const addMetaData = () => {
  invoiceStore.invoice.itemList.push({
    name: "",
    quantity: "",
    price: "",
  });
};

const removeMetaData = (key) => {
  invoiceStore.invoice.itemList.splice(key, 1);
};

const totalPrice = (price, qty) => {
  return Number(price) * Number(qty);
};
</script>

<template>
  <header>
    <div class="heading-text">
      <h1 class="heading">Invoice</h1>
      <p class="subheading">
        There are a total of {{ allInvoices.length }} invoices
      </p>
    </div>
    <div class="heading-actions">
      <AppFilter />
      <AppButton @click="modalStore.openModal"
        ><i class="ri-add-line"></i> <span>New Invoice</span></AppButton
      >
    </div>
  </header>
  <!-- The invoice listing here -->
  <section class="invoice-list" v-if="allInvoices.length > 0">
    <InvoiceItem
      v-for="(item, index) in allInvoices"
      :id="index"
      :key="index"
      :itemid="index"
      code="#RT300"
      :date="item.invoiceDate"
      :client="item.billToName"
      :amount="totalPrice(item.itemList.price, item.itemList.qty)"
      :status="item.status" />
  </section>
  <section class="empty" v-else>
    <img src="@/assets/images/empty.png" alt="" />
    <h1>There is nothing here</h1>
    <p>
      Create an invoice by clicking the <br />
      New Invoice button and get started
    </p>
  </section>

  <!-- New Invoice modal -->
  <AppModal modal-name="New Invoice" class="new-modal">
    <form @submit.prevent="addInvoice">
      <div class="bill-from">
        <h3>Bill From</h3>
        <AppInput
          type="text"
          id="b-st-addr"
          labelName="Street-Address"
          v-model="invoiceStore.invoice.billFromAddress" />
        <div class="group">
          <AppInput
            type="text"
            id="b-city"
            labelName="City"
            v-model="invoiceStore.invoice.billFromCity" />
          <AppInput
            type="text"
            id="b-p-code"
            labelName="Post Code"
            v-model="invoiceStore.invoice.billFromCode" />
          <AppDropdown
            type="text"
            id="b-p-country"
            labelName="Country"
            :list-items="countries"
            v-model="invoiceStore.invoice.billFromCountry" />
        </div>
      </div>
      <div class="bill-to">
        <h3>Bill To</h3>
        <AppInput
          type="text"
          id="b-client-name"
          labelName="Client's name"
          v-model="invoiceStore.invoice.billToName" />
        <AppInput
          type="email"
          id="b-client-email"
          labelName="Client's email"
          v-model="invoiceStore.invoice.billToEmail" />
        <AppInput
          type="text"
          id="b-client-addr"
          labelName="Street Address"
          v-model="invoiceStore.invoice.billToAddress" />
        <div class="group">
          <AppInput
            type="text"
            id="b-client-city"
            labelName="City"
            v-model="invoiceStore.invoice.billToCity" />
          <AppInput
            type="text"
            id="b-client-code"
            labelName="Post code"
            v-model="invoiceStore.invoice.billToCode" />
          <AppDropdown
            type="text"
            id="b-client-country"
            labelName="Country"
            :list-items="countries"
            v-model="invoiceStore.invoice.billToCountry" />
        </div>
      </div>
      <div class="invoice-details">
        <div class="group">
          <AppInput
            type="date"
            id="in-date"
            labelName="Invoice Date"
            v-model="invoiceStore.invoice.invoiceDate" />
          <AppDropdown
            type="text"
            id="in-terms"
            labelName="Payment Terms"
            :list-items="['5 days', '10 days']"
            v-model="invoiceStore.invoice.paymentTerms" />
        </div>
        <AppInput
          type="text"
          id="b-client-code"
          labelName="Project Description"
          v-model="invoiceStore.invoice.projectDescription" />
      </div>

      <div class="item-list">
        <table>
          <thead>
            Item List
          </thead>
          <tr>
            <th>Item name</th>
            <th>Qty</th>
            <th>price</th>
            <th>Total</th>
            <th></th>
          </tr>
          <tr
            v-for="(items, index) in invoiceStore.invoice.itemList"
            :key="index">
            <td>
              <AppInput type="text" labelName="" v-model="items.itemName" />
            </td>
            <td>
              <AppInput type="number" labelName="" v-model="items.qty" />
            </td>
            <td>
              <AppInput type="number" labelName="" v-model="items.price" />
            </td>
            <td>
              <p v-if="items.qty == ''">{{ 0 }}</p>
              <p v-else>{{ items.price * items.qty || 0 }}</p>
            </td>
            <td>
              <i
                class="ri-delete-bin-5-fill"
                @click="removeMetaData(index)"></i>
            </td>
          </tr>
        </table>

        <!-- Add item button -->
        <AppButton class="add-item" @click="addMetaData">
          Add New item</AppButton
        >
      </div>

      <footer>
        <div class="left">
          <AppButton class="edit" @click="modalStore.closeModal"
            >Discard</AppButton
          >
        </div>
        <div class="right">
          <AppButton class="edit" id="draft-btn">Save as draft</AppButton>
          <AppButton class="" type="submit">Save & send</AppButton>
        </div>
      </footer>
    </form>
  </AppModal>
</template>

<style lang="scss" scoped>
header {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
}

.heading-text h1 {
  line-height: 1;
  font-size: 2.1rem;
  font-weight: 500;
  color: var(--color-text-heading);
}
.heading-text p {
  font-size: 0.9rem;
  color: var(--color-text-subheading);
}

.heading-actions {
  position: relative;
  display: flex;
  align-items: center;
}

.invoice-list {
  width: 100%;
  position: relative;
}

.empty {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 150px;

  h1 {
    font-weight: 400;
    font-size: 1.9rem;
    margin-bottom: 10px;
  }
  p {
    color: var(--in-brand-color-accent);
    text-align: center;
  }
}

.new-modal {
  h3 {
    color: var(--in-brand-color-accent);
    font-weight: 500;
    margin-top: 25px;
    margin-bottom: 15px;
  }

  .input-box {
    margin-bottom: 20px;

    label {
      color: var(--in-brand-color-accent);
    }
  }
  .group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 20px;
  }
  .invoice-details {
    margin-bottom: 30px;
    // border: 2px solid;
  }
  .item-list {
    position: relative;

    table {
      width: 100%;

      gap: 15px;
      // border: 1px solid red;

      thead {
        color: var(--color-text-heading);
        font-weight: 400;
        font-size: 1.3rem;
        margin-bottom: 20px;
      }
      tr,
      th,
      td {
        text-align: left;
      }
      th {
        font-weight: 400;
        color: var(--in-brand-color-accent);
        text-transform: capitalize;
      }
      tr {
        animation: reveal 0.5s ease;
      }

      td {
        padding-right: 5px;
        margin-right: 5px;
        vertical-align: middle;

        &:nth-child(2) {
          width: 12%;
        }
        &:nth-child(3) {
          width: 20%;
        }

        i {
          display: block;
          font-size: 1.4rem;
          color: var(--in-text-dark-2);
          cursor: pointer;
          text-align: center;
        }
      }
    }

    .add-item {
      width: 100%;
      border-radius: 24px;
      background-color: darken($color: #f9fafe, $amount: 2%);
      color: #7e88c3;
      margin-bottom: 45px;
    }
  }

  footer {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .right {
      display: flex;
      align-items: center;

      button {
        &:nth-child(1) {
          margin-right: 10px;
        }
      }

      #draft-btn {
        background-color: #373b53;
        color: #fff;

        &:hover {
          background-color: lighten($color: #373b53, $amount: 5%);
        }
      }
    }
  }
}

@keyframes reveal {
  0% {
    opacity: 0;
    // transform: translateY(10px);
  }
  100% {
    opacity: 1;
    // transform: translateY(0px);
  }
}
</style>
