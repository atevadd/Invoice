<template>
  <!-- back button -->
  <RouterLink to="/" class="back">
    <i class="ri-arrow-left-s-line"></i><span>Go back</span>
  </RouterLink>

  <!-- page header -->
  <header>
    <div class="status">
      <span class="status-text">Status</span>
      <AppStatus status="paid" />
    </div>

    <div class="actions">
      <AppButton class="edit" @click="modalStore.openModal">Edit</AppButton>
      <AppButton class="delete" @click="modalStore.openDeleteModal"
        >Delete</AppButton
      >
      <AppButton class="default">Mark as read</AppButton>
    </div>
  </header>

  <!-- Page content -->
  <section id="invoice" class="invoice">
    <div class="invoice-details">
      <div class="invoice-code">
        <span>#XM9141</span>
        <p>{{ invoiceDetails.projectDescription }}</p>
      </div>
      <div class="invoice-address">
        <p>{{ invoiceDetails.billFromAddress }}</p>
      </div>
      <div class="invoice-date">
        <p>Invoice date</p>
        <span>{{ invoiceDetails.invoiceDate }}</span>
      </div>
      <div class="invoice-reciever">
        <p>Bill To</p>
        <span>{{ invoiceDetails.billToName }}</span>
        <p>{{ invoiceDetails.billToAddress }}</p>
      </div>
      <div class="invoice-sender">
        <p>Sent To</p>
        <span>{{ invoiceDetails.billToName }}</span>
      </div>
      <div class="invoice-payment-date">
        <p>Payment date</p>
        <span>{{ invoiceDetails.paymentTerms }}</span>
      </div>
    </div>
    <div class="invoice-summary">
      <table>
        <tr>
          <th>Item name</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
        <tr v-for="(item, index) in invoiceDetails.itemList" :key="index">
          <td>{{ item.itemName }}</td>
          <td>{{ item.qty }}</td>
          <td>
            ${{ item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
          </td>
          <td>${{ total(item.qty, item.price) }}</td>
        </tr>
      </table>
      <footer>
        <h3>Amount Due</h3>
        <p class="total-amount">
          ${{ calculateTotalPrice(invoiceDetails.itemList) }}
        </p>
      </footer>
    </div>
  </section>

  <!-- New Invoice modal -->
  <AppModal modal-name="Edit Invoice" class="edit-modal">
    <form>
      <div class="bill-from">
        <h3>Bill From</h3>
        <AppInput type="text" id="b-st-addr" labelName="Street-Address" />
        <div class="group">
          <AppInput type="text" id="b-city" labelName="City" />
          <AppInput type="text" id="b-p-code" labelName="Post Code" />
          <AppDropdown
            type="text"
            id="b-p-country"
            labelName="Country"
            :list-items="countries" />
        </div>
      </div>
      <div class="bill-to">
        <h3>Bill To</h3>
        <AppInput type="text" id="b-client-name" labelName="Client's name" />
        <AppInput type="email" id="b-client-email" labelName="Client's email" />
        <AppInput type="text" id="b-client-addr" labelName="Street Address" />

        <div class="group">
          <AppInput type="text" id="b-client-city" labelName="City" />
          <AppInput type="text" id="b-client-code" labelName="Post code" />
          <AppDropdown
            type="text"
            id="b-client-country"
            labelName="Country"
            :list-items="countries" />
        </div>
      </div>
      <div class="invoice-det">
        <div class="group">
          <AppInput type="date" id="in-date" labelName="Invoice Date" />
          <AppDropdown
            type="text"
            id="in-terms"
            labelName="Payment Terms"
            :list-items="['5 days', '10 days']" />
        </div>
        <AppInput
          type="text"
          id="b-client-code"
          labelName="Project Description" />
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
          <tr>
            <td>
              <AppInput type="text" labelName="" />
            </td>
            <td>
              <AppInput type="tel" labelName="" />
            </td>
            <td>
              <AppInput type="tel" labelName="" />
            </td>
            <td>
              <p>1000</p>
            </td>
            <td>
              <i class="ri-delete-bin-5-fill"></i>
            </td>
          </tr>
        </table>

        <!-- Add item button -->
        <AppButton class="add-item"> Add New item</AppButton>
      </div>

      <footer>
        <div class="left">
          <!-- <AppButton class="edit" @click="modalStore.closeModal"
          >Discard</AppButton
        > -->
        </div>
        <div class="right">
          <AppButton class="edit">Cancel</AppButton>
          <AppButton class="btn" type="submit">Save changes</AppButton>
        </div>
      </footer>
    </form>
  </AppModal>

  <DeleteModal />
</template>

<script setup>
import AppStatus from "../components/AppStatus.vue";
import AppButton from "../components/AppButton.vue";
import InvoiceItem from "@/components/InvoiceItem.vue";
import AppFilter from "@/components/AppFilter.vue";
import AppModal from "../components/AppModal.vue";
import AppInput from "../components/AppInput.vue";
import AppDropdown from "../components/AppDropdown.vue";
import DeleteModal from "../components/DeleteModal.vue";
import { RouterLink } from "vue-router";
import { useModalStore } from "../stores/modal";
import { useInvoiceStore } from "../stores/invoice";
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import { countries } from "../assets/js/country";
import { calculateTotalPrice, total } from "../assets/js/helper";

const goBack = () => {
  history.back();
};

// page prop
const props = defineProps({
  invoiceDetails: String,
});

// Route object
const route = useRoute();

// The Stores
const modalStore = useModalStore();
const invoiceStore = useInvoiceStore();

const invoiceDetails = invoiceStore.getAllInvoice[route.params.id];
</script>

<style lang="scss" scoped>
.back {
  background-color: transparent;
  outline: none;
  border: none;
  display: flex;
  align-items: center;
  font-size: 0.89rem;
  cursor: pointer;
  vertical-align: middle;
  line-height: 1.6;

  i {
    display: inline-block;
    margin-right: 10px;
    color: var(--in-brand-color);
    font-weight: 800;
    font-size: 1.5rem;
  }
  span {
    vertical-align: middle;
    line-height: 1;
    // border: 1px solid;
    color: var(--color-text-heading);
  }
}
header {
  margin-top: 10px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-card-bg);
  box-shadow: 0 10px 10px rgba(72, 84, 159, 0.1);
  border-radius: 8px;
  padding: 20px 20px;

  .status {
    &-text {
      display: inline-block;
      margin-inline: 20px;
      color: var(--in-brand-color-accent);
    }
  }

  .actions {
    display: flex;

    .btn {
      margin-right: 10px;
    }
  }
}

// Page content styling
.invoice {
  width: 100%;
  margin-top: 30px;
  background-color: var(--color-card-bg);
  box-shadow: 0 10px 10px rgba(72, 84, 159, 0.1);
  padding: 45px 35px;
  border-radius: 8px;

  &-details {
    width: 100%;
    display: grid;
    grid-template-columns: minmax(0%, 25%) 25% 50%;
    column-gap: 30px;

    .invoice-address {
      grid-column: 2 / 4;
      text-align: right;
      display: flex;
      justify-content: flex-end;

      p {
        width: 15%;
      }
    }

    .invoice-reciever {
      p:last-child {
        width: 50%;
        // border: 1px solid red;
      }
    }

    .invoice-code {
      margin-bottom: 15px;
    }

    p {
      color: var(--in-brand-color-accent);
      font-size: 0.9rem;
    }
  }

  &-summary {
    width: 100%;
    margin-top: 20px;
    background-color: var(--color-background);

    border-radius: 8px 8px 0 0;

    table {
      width: 100%;
      text-align: left;
      padding: 15px;

      th,
      td {
        padding: 10px;
      }

      th {
        color: var(--in-brand-color-accent);
        font-weight: 400;
        font-size: 0.9rem;

        &:nth-child(2),
        &:nth-child(3) {
          text-align: center;
        }

        &:last-child {
          text-align: right;
        }
      }
      td {
        font-size: 0.95rem;

        &:last-child {
          text-align: right;
        }
        &:nth-child(2),
        &:nth-child(3) {
          text-align: center;
        }
      }
    }

    footer {
      background: var(--color-sidebar);
      border-radius: 0 0 8px 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 25px;
      color: #fff;

      h3 {
        font-size: 0.9rem;
      }
      p {
        font-size: 1.7rem;
      }
    }
  }
}

.edit-modal {
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
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 20px;
  }

  .invoice-det {
    margin-bottom: 30px;
    // border: 2px solid;
  }
  .item-list {
    position: relative;

    table {
      width: 100%;
      margin-top: 15px;
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

      td {
        padding-right: 5px;
        // border: 1px solid red;
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
</style>
