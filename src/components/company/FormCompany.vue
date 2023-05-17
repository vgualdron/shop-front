<template>
  <div class="q-pa-md">
    <q-dialog v-model="showDialog" persistent>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Agregar nuevo Comercio</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-separator />
        <q-card-section style="max-height: 60vh" class="scroll">
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input outlined v-model="name" label="Nombre *" lazy-rules
              :rules="[val => val && val.length > 0 || 'Obligatorio']" />
            <q-input outlined v-model="description" label="Eslogan"/>
            <q-input outlined v-model="address" label="Dirección *" lazy-rules
              :rules="[val => val && val.length > 0 || 'Obligatorio']" />
            <q-input outlined v-model="email" label="Correo *" lazy-rules type="email"
              :rules="[val => val && val.length > 0 || 'Obligatorio']" />
            <q-input outlined v-model="phone" label="Teléfono" />
            <q-input outlined v-model="whatsapp" label="WhatsApp" />
            <q-input outlined v-model="linkweb" label="Link Web" />
            <q-input outlined v-model="facebook" label="Facebook" />
            <q-input outlined v-model="instagram" label="Instagram" />
            <q-input outlined v-model="latitude" label="Latitud" />
            <q-input outlined v-model="longitude" label="Longitud" />
            <q-input outlined v-model="schedule" label="Horario" />
            <q-input outlined v-model="payments" label="Metodos de pago" />
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
import companyTypes from '../../store/modules/company/types';

export default {
  data() {
    return {
      isLoading: false,
      showModal: false,
      name: '',
      description: '',
      address: '',
      email: '',
      phone: '',
      whatsapp: '',
      linkweb: '',
      facebook: '',
      instagram: '',
      latitude: '',
      longitude: '',
      schedule: '',
      payments: '',
      category_id: '1',
      city_id: '1',
    };
  },
  computed: {
    ...mapState(companyTypes.PATH, [
      'statusAddCompany',
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
    ...mapActions(companyTypes.PATH, {
      fetchCompanies: companyTypes.actions.FETCH_COMPANIES,
      addCompany: companyTypes.actions.ADD_COMPANY,
    }),
    async onSubmit() {
      this.isLoading = true;
      await this.addCompany({
        name: this.name,
        description: this.description,
        address: this.address,
        email: this.email,
        phone: this.phone,
        whatsapp: this.whatsapp,
        linkweb: this.linkweb,
        facebook: this.facebook,
        instagram: this.instagram,
        latitude: this.latitude,
        longitude: this.longitude,
        schedule: this.schedule,
        payments: this.payments,
        category_id: this.category_id,
        city_id: this.city_id,
      });
      if (this.statusAddCompany.errors) {
        this.$q.notify({
          color: 'red-4',
          textColor: 'white',
          message: this.statusAddCompany.message,
        });
      } else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Comercio agregado con éxito',
        });
        this.showDialog = false;
        await this.fetchCompanies();
      }
      this.isLoading = false;
    },
  },
};
</script>
