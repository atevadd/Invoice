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
import {
  calculateTotalPrice,
  addMetaData,
  removeMetaData,
} from "../assets/js/helper";
import { db } from "../database/db";

// Store Instances
const modalStore = useModalStore();
const invoiceStore = useInvoiceStore();

// Toast instance
const toast = useToast();

// ALl invoices from the store
// let allInvoices = ref(invoiceStore.getAllInvoice);

const allInvoices = computed(() => {
  return ref(invoiceStore.getAllInvoice);
});

// Add invoice to database
async function addInvoiceToDatabase() {
  try {
    const id = await db
      .table("invoice")
      .add(JSON.parse(JSON.stringify(invoiceStore.getInvoice)))
      .then(() => {
        // Showing the success message
        toast.success("Invoice added successfully", {
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
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    // Showing the success message
    toast.error("operation not successful", {
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
}

// Add new invoice item
const addInvoice = () => {
  // Add new invoice item to the store
  invoiceStore.addNewInvoice(invoiceStore.getInvoice);

  addInvoiceToDatabase();

  // Clearing the invoice form
  invoiceStore.clearInvoice();

  // closing the modal
  modalStore.closeModal();
};
</script>

<template>
  <header>
    <div class="heading-text">
      <h1 class="heading">Invoice</h1>
      <p class="subheading" v-if="invoiceStore.getAllInvoice.length > 1">
        <!-- <span class="hide">There is a total of </span> -->
        <span>{{ invoiceStore.getAllInvoice.length }} invoices</span>
      </p>
      <p class="subheading" v-else-if="invoiceStore.getAllInvoice.length == 1">
        <!-- <span class="hide">There is a total of </span> -->
        <span>{{ invoiceStore.getAllInvoice.length }} invoice</span>
      </p>
      <p class="subheading" v-else-if="invoiceStore.getAllInvoice.length == 0">
        <span>No invoice</span>
      </p>
    </div>
    <div class="heading-actions">
      <AppFilter />
      <AppButton @click="modalStore.openModal" class="new-btn"
        ><i class="ri-add-line"></i>
        <span>New <span class="inner">Invoice</span></span></AppButton
      >
    </div>
  </header>
  <!-- The invoice listing here -->
  <section class="invoice-list" v-if="invoiceStore.getAllInvoice.length > 0">
    <InvoiceItem
      v-for="(item, index) in invoiceStore.getAllInvoice"
      :id="index"
      :key="index"
      :itemid="index"
      code="#RT"
      :date="item.invoiceDate"
      :client="item.billToName"
      :amount="calculateTotalPrice(item.itemList)"
      status="paid" />
  </section>
  <section class="empty" v-else>
    <img src="@/assets/images/empty.png" alt="empty state illustration" />
    <h1>There is nothing here</h1>
    <p>
      Create an invoice by clicking the <br />
      New Invoice button and get started
    </p>
  </section>

  <!-- New Invoice modal -->
  <AppModal modal-name="New Invoice" class="new-modal">
    <form @submit.prevent="addInvoice">
      <span class="close-btn" @click="modalStore.closeModal"
        ><i class="ri-close-line"></i
      ></span>
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
            class="date"
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
                @click="
                  removeMetaData(index, invoiceStore.invoice.itemList)
                "></i>
            </td>
          </tr>
        </table>

        <!-- Add item button -->
        <AppButton
          class="add-item"
          @click="addMetaData(invoiceStore.invoice.itemList)">
          Add New item</AppButton
        >
      </div>

      <footer>
        <div class="left">
          <AppButton
            class="edit"
            @click="[modalStore.closeModal(), invoiceStore.clearInvoice()]"
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
@import "@/assets/scss/_mixins.scss";

header {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;

  @include mobile {
    margin-bottom: 40px;
  }
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

.hide {
  @include mobile {
    display: none;
  }
}

.heading-actions {
  position: relative;
  display: flex;
  align-items: center;
}

.inner {
  @include mobile {
    display: none;
  }
}

.invoice-list {
  width: 100%;
  position: relative;
  overflow-y: auto;
  height: 80vh;

  // Customising the scrollbar for chrome and other webkit browsers
  &::-webkit-scrollbar {
    width: 0.5vw;
    cursor: pointer;
    display: none;
  }

  &::-webkit-scrollbar-track {
    background-color: #fff;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--in-text-dark-2);
    border-radius: 20px;
  }
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
  .close-btn {
    position: absolute;
    top: 18px;
    right: 18px;
    display: none;

    i {
      font-size: 1.8rem;
    }

    @include mobile {
      display: inline-block;
    }
  }
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

    @include mobile {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    }

    .date {
      @include mobile {
        grid-column: 1 / span 2;
      }
    }

    .input-box:last-child {
      grid-column: 1 / span 2;
    }
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
