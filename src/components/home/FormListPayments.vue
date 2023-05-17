<template>
  <div class="q-pa-md" style="max-width: 400px; margin: auto;">
    <q-dialog v-model="showDialog" persistent>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center">
          <div class="text-h6">Pagos del prestamo</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-separator />
        <q-card-section class="row text-center q-pb-none">
          <div class="col text">
            <b>Monto prestado: </b>{{ formatMoney(lending.amount) }}
          </div>
          <div class="col text">
            <b>Monto a pagar: </b>{{ formatMoney(amountPay) }}
          </div>
          <q-space />
        </q-card-section>
        <q-card-section class="row text-center q-pb-none">
          <div class="col text">
            <b>Cantidad de cuotas: </b>
            {{ lending.amountFees }}
          </div>
          <div class="col text">
            <b>Valor cuota: </b>
            {{ formatMoney(valueFee) }}
          </div>
          <q-space />
        </q-card-section>
        <q-card-section class="row text-center">
          <div class="col text">
            <b>Cantidad abonada: </b>
            {{ formatMoney(paid) }}
          </div>
          <div class="col text">
            <b>Cantidad pendiente: </b>
            {{ formatMoney(pending) }}
          </div>
          <q-space />
        </q-card-section>
        <q-separator />
        <q-card-section style="max-height: 60vh" class="scroll">
          <table-payment :lending="lending" :list="list" @update="update"/>
        </q-card-section>
        <q-separator />
        <q-card-section class="row items-center">
          <q-btn v-if="paid >= amountPay" label="Cerrar prestamo y abrir nuevo" outline
            color="primary" class="col q-ml-sm" @click="closeAndOpenNew" :loading="isLoading"/>
          <q-btn v-if="paid >= amountPay" label="Cerrar prestamo" color="primary"
            class="col q-ml-sm" @click="closeLending()" :loading="isLoading"/>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import TablePayment from 'components/payment/TablePayment.vue';
import { formatCurrency } from '../../helpers/format';
import lendingTypes from '../../store/modules/lending/types';

export default {
  data() {
    return {
      isLoading: false,
      payments: [],
    };
  },
  mounted() {
    this.payments = this.lending.payments;
  },
  computed: {
    showDialog: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
    amountPay() {
      const { amount, percentage } = this.lending;
      return amount + ((amount * percentage) / 100);
    },
    valueFee() {
      const { amount, percentage, amountFees } = this.lending;
      return (amount + ((amount * percentage) / 100)) / amountFees;
    },
    paid() {
      let value = 0;
      if (this.payments && this.payments.length > 0) {
        value = this.payments.reduce((a, b) => (a + (b.amount ? parseInt(b.amount, 10) : 0)), 0);
      }
      return value;
    },
    pending() {
      return this.amountPay - this.paid;
    },
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    lending: {
      type: Object,
    },
    list: {
      type: Object,
    },
  },
  methods: {
    ...mapActions(lendingTypes.PATH, {
      updateLending: lendingTypes.actions.UPDATE_LENDING,
    }),
    formatMoney(value) {
      return formatCurrency(value);
    },
    update(payments) {
      this.payments = payments;
      this.$emit('update');
    },
    async closeLending() {
      this.isLoading = true;
      const { id } = this.lending;
      await this.updateLending({
        id,
        status: 'closed',
      });
      this.isLoading = false;
      this.showDialog = false;
      this.update();
    },
    async closeAndOpenNew() {
      this.isLoading = true;
      const { id } = this.lending;
      await this.updateLending({
        id,
        status: 'closed',
      });
      this.isLoading = false;
      this.update();
      const { nameDebtor, address, phone } = this.lending;
      const data = {
        nameDebtor,
        address,
        phone,
      };
      this.$emit('openNewLending', data);
    },
  },
  components: {
    TablePayment,
  },
};
</script>
