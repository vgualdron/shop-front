<template>
  <div class="q-pa-md">
    <q-dialog v-model="showDialog" persistent>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center">
          <div class="text-h6">Cambiar contraseña</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-separator />
        <q-card-section style="max-height: 60vh" class="scroll">
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input outlined v-model="password" label="Nueva contraseña *"
              hint="Escriba la nueva contraseña" type="text" lazy-rules
              :rules="[val => val && val.length > 0 || 'Este campo es obligatorio']" />
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
import userTypes from '../../store/modules/user/types';

export default {
  data() {
    return {
      isLoading: false,
      showModal: false,
      password: '',
    };
  },
  computed: {
    ...mapState(userTypes.PATH, [
      'statusChangePasswordUser',
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
    ...mapActions(userTypes.PATH, {
      changePasswordUser: userTypes.actions.CHANGE_PASSWORD_USER,
    }),
    async onSubmit() {
      this.isLoading = true;
      await this.changePasswordUser({
        password: this.password,
      });
      if (this.statusChangePasswordUser.errors) {
        this.$q.notify({
          color: 'red-4',
          textColor: 'white',
          message: this.statusChangePasswordUser.message,
        });
      } else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Contraseña guardada con éxito',
        });
        this.showDialog = false;
        window.location.href = '/';
      }
      this.isLoading = false;
    },
  },
};
</script>
