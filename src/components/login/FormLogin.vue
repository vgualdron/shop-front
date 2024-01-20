<template>
  <div class="q-pa-md" style="max-width: 400px; margin: auto;">
    <q-card class="my-card" flat bordered>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>Iniciar sesión</q-item-label>
          <q-item-label caption>
            Ingresa tus datos
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-card-section horizontal>
        <q-card-section class="col-12">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input outlined v-model="email" label="Correo *" hint="Escriba el correo" lazy-rules
              :rules="[val => val && val.length > 0 || 'Este campo es obligatorio', isValidEmail]"/>
            <q-input outlined v-model="password" label="Contraseña *" hint="Escriba la contraseña"
              type="password" lazy-rules
              :rules="[val => val && val.length > 0 || 'Este campo es obligatorio']" />
            <div class="row text-center">
              <q-btn label="Entrar" type="submit" color="primary" :loading="isLoading"
                class="col" />
              <!--<q-btn label="Resetear" type="reset" color="primary" :disable="isLoading"
                outline class="col q-ml-sm" /> -->
            </div>
          </q-form>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import commonTypes from '../../store/modules/common/types';

export default {
  data() {
    return {
      email: null,
      password: null,
      isLoading: false,
    };
  },
  computed: {
    ...mapState(commonTypes.PATH, [
      'statusSignIn',
    ]),
  },
  methods: {
    ...mapActions(commonTypes.PATH, {
      signin: commonTypes.actions.SIGN_IN,
    }),
    isValidEmail(val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || 'Invalid email';
    },
    async onSubmit() {
      this.isLoading = true;
      const data = {
        name: this.email,
        email: this.email,
        password: this.password,
      };
      await this.signin(data);

      this.isLoading = false;
      if (this.statusSignIn.errors) {
        this.$q.notify({
          color: 'red-4',
          textColor: 'white',
          message: this.statusSignIn.message,
        });
      } else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Sesión iniciada con éxito',
        });
        this.$router.push('/home');
      }
    },
    onReset() {
      this.email = null;
      this.password = null;
    },
  },
};
</script>
<style scoped>
  .my-card {
    width: 100%;
    max-width: 450px;
  }
</style>
