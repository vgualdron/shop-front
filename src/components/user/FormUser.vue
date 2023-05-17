<template>
  <div class="q-pa-md">
    <q-dialog v-model="showDialog" persistent>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center">
          <div class="text-h6">Agregar nuevo</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-separator />
        <q-card-section style="max-height: 60vh" class="scroll">
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input outlined v-model="name" label="Nombre *" hint="Escriba el nombre" type="text"
              lazy-rules :rules="[val => val && val.length > 0 || 'Este campo es obligatorio']" />
            <q-input outlined v-model="email" label="Email *" hint="Escriba el correo" lazy-rules
            :rules="[val => val && val.length > 0 || 'El campo es obligatorio', isValidEmail]"/>
            <q-input outlined v-model="address" label="Dirección *" hint="Escriba la dirección"
              lazy-rules :rules="[val => val && val.length > 0 || 'El campo es obligatorio']"/>
            <q-input outlined v-model="phone" label="Teléfono *" hint="Escriba el teléfono"
              lazy-rules :rules="[val => val && val.length > 0 || 'El campo es obligatorio']"
              type="number"/>
            <q-input outlined v-model="password" label="Contraseña *" hint="Escriba la contraseña"
              lazy-rules :rules="[val => val && val.length > 0 || 'El campo es obligatorio']"
              type="password" />
            <q-select outlined v-model="role" :options="optionsRole" label="Rol" />
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
      name: '',
      email: '',
      address: '',
      phone: '',
      password: '',
      role: {
        label: 'Usuario',
        value: 'user',
      },
    };
  },
  computed: {
    ...mapState(userTypes.PATH, [
      'statusAddUser',
    ]),
    showDialog: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
    optionsRole() {
      const options = [];
      const user = localStorage.getItem('user');
      const roleUser = JSON.parse(user);
      if (user && roleUser.role === 'admin') {
        options.push(
          {
            label: 'Administrador',
            value: 'admin',
          },
          {
            label: 'Lider',
            value: 'leader',
          },
          {
            label: 'Ayudante',
            value: 'assistant',
          },
          {
            label: 'Usuario',
            value: 'user',
          },
        );
      } else if (user && roleUser.role === 'leader') {
        options.push(
          {
            label: 'Ayudante',
            value: 'assistant',
          },
        );
      }
      return options;
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
      fetchUsers: userTypes.actions.FETCH_USERS,
      addUser: userTypes.actions.ADD_USER,
    }),
    isValidEmail(val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || 'Invalid email';
    },
    async onSubmit() {
      this.isLoading = true;
      await this.addUser({
        name: this.name,
        email: this.email,
        address: this.address,
        phone: this.phone,
        password: this.password,
        role: this.role.value,
        city_id: 1,
      });
      if (this.statusAddUser.errors) {
        this.$q.notify({
          color: 'red-4',
          textColor: 'white',
          message: this.statusAddUser.message,
        });
      } else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Usuario agregado con éxito',
        });
        this.showDialog = false;
        await this.fetchUsers();
      }
      this.isLoading = false;
    },
  },
};
</script>
