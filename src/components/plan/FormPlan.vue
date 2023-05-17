<template>
  <div class="q-pa-md">
    <q-dialog v-model="showDialog" persistent>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Agregar nuevo plan</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-separator />
        <q-card-section style="max-height: 60vh" class="scroll">
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input outlined v-model="name" label="Nombre *" hint="Escriba el nombre"
              lazy-rules :rules="[val => val && val.length > 0 || 'Este campo es obligatorio']" />
            <q-input v-model="description" hint="Escriba la descripción" label="Descripción"
              outlined/>
            <q-input outlined v-model="price" label="Precio *" hint="Escriba precio" type="number"
              lazy-rules :rules="[val => val && val.length > 0 || 'Este campo es obligatorio']" />
            <q-input outlined v-model="priority" label="Prioridad *" hint="Escriba la prioridad"
              lazy-rules :rules="[val => val && val > 0 || 'Este campo es obligatorio']"
              type="number"/>
            <q-separator />
            <div class="row text-center">
              <q-btn label="cancelar" type="reset" color="primary" :disable="isLoading"
                outline class="col" v-close-popup/>
              <q-btn label="Aceptar" type="submit" color="primary" :loading="isLoading"
                class="col q-ml-sm" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import planTypes from '../../store/modules/plan/types';

export default {
  data() {
    return {
      isLoading: false,
      showModal: false,
      name: '',
      description: '',
      price: '',
      priority: '',
    };
  },
  computed: {
    ...mapState(planTypes.PATH, [
      'statusAddPlan',
    ]),
    showDialog: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    ...mapActions(planTypes.PATH, {
      fetchPlans: planTypes.actions.FETCH_PLANS,
      addPlan: planTypes.actions.ADD_PLAN,
    }),
    async onSubmit() {
      this.isLoading = true;
      await this.addPlan({
        name: this.name,
        description: this.description,
        price: this.price,
        priority: this.priority,
      });
      if (this.statusAddPlan.errors) {
        this.$q.notify({
          color: 'red-4',
          textColor: 'white',
          message: this.statusAddPlan.message,
        });
      } else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Plan agregado con éxito',
        });
        this.showDialog = false;
        await this.fetchPlans();
      }
      this.isLoading = false;
    },
  },
};
</script>
