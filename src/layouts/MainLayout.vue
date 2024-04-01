<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
          <img
            src="~/assets/logo-rectangle.png"
            width="250"
            class="">
          <q-btn flat round dense icon="search" class="q-ml-auto"/>
          <q-btn flat round dense icon="store" />
          <!--<q-btn-dropdown
            color="primary"
            class="no-shadow"
            push no-caps
            @click="onMainClick"
            label="Opciones">
            <div class="row no-wrap q-pa-md">
              <div class="column items-center">
                <q-avatar size="72px" @click="clickChangeImageProfile" class="cursor-pointer">
                  <img :src="srcProfile">
                </q-avatar>
                <div class="text-subtitle1 q-mt-md q-mb-xs">{{ name }}</div>
                <div class="text-subtitle1 q-mb-xs">{{ roleSesion }}</div>
                <q-btn
                  push
                  color="primary"
                  label="Cambiar imagen de perfil"
                  size="sm"
                  v-close-popup
                  @click="clickChangeImageProfile" />
                <q-btn
                  color="primary"
                  label="Cambiar contraseña"
                  push size="sm"
                  class="q-mt-sm"
                  v-close-popup
                  @click="clickChangePassword" />
                <q-btn
                  color="primary"
                  label="Cerrar sesión"
                  push
                  size="sm"
                  class="q-mt-sm"
                  v-close-popup
                  @click="clickLogOut" />
              </div>
            </div>
          </q-btn-dropdown> -->
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered class="text-center">
      {{ versionApp }}
    </q-footer>
    <form-change-password
      v-if="showModalChangePassword"
      v-model="showModalChangePassword" />
    <form-change-image-profile
      v-if="showModalChangeImageProfile"
      v-model="showModalChangeImageProfile"
      :src="srcProfile" />
      <btn-whatsapp/>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import FormChangePassword from 'components/user/FormChangePassword.vue';
import FormChangeImageProfile from 'components/user/FormChangeImageProfile.vue';
import BtnWhatsapp from 'components/common/BtnWhatsapp.vue';
import configurationTypes from '../store/modules/configuration/types';

const linksData = [
  {
    title: 'Inicio',
    caption: 'Visualiza los negocios destacados',
    icon: 'home',
    link: '/home',
  },
];
const user = localStorage.getItem('user');
let roleUserSesion = 'Ayudante';
if (user) {
  const roleUser = JSON.parse(user);
  if (roleUser.role === 'admin') {
    roleUserSesion = 'Administrador';
    linksData.push(
      {
        title: 'Categorias',
        caption: 'Gestiona las categorias',
        icon: 'account_tree',
        link: '/category',
      },
      {
        title: 'Productos',
        caption: 'Gestiona los productos',
        icon: 'inbox',
        link: '/product',
      },
      {
        title: 'Usuarios',
        caption: 'Crea y modifica usuarios',
        icon: 'people',
        link: '/user',
      },
      {
        title: 'Parametros',
        caption: 'Parametros para la app',
        icon: 'settings',
        link: '/settings',
      },
    );
  } else if (roleUser.role === 'leader') {
    roleUserSesion = 'Lider';
    linksData.push(
      {
        title: 'Categorias',
        caption: 'Gestiona las categorias',
        icon: 'account_tree',
        link: '/category',
      },
      {
        title: 'Productos',
        caption: 'Gestiona los productos',
        icon: 'inbox',
        link: '/product',
      },
      {
        title: 'Usuarios',
        caption: 'Crea y modifica usuarios',
        icon: 'people',
        link: '/user',
      },
    );
  } else {
    roleUserSesion = 'Usuario';
  }
}

export default {
  name: 'MainLayout',
  components: {
    FormChangePassword,
    FormChangeImageProfile,
    BtnWhatsapp,
  },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
      roleSesion: roleUserSesion,
      title: 'Inicio',
      showModalChangePassword: false,
      showModalChangeImageProfile: false,
    };
  },
  async mounted() {
    await this.fetchConfigurations();
    localStorage.setItem('configurations', JSON.stringify(this.configurations));
    const route = linksData.find((link) => link.link === this.$route.path);
    if (route) {
      this.title = route.title;
    }
  },
  computed: {
    ...mapState(configurationTypes.PATH, [
      'configurations',
    ]),
    name() {
      let name = '';
      if (user) {
        name = JSON.parse(user).name;
      }
      return `${name.substring(0, 20)} ...`;
    },
    srcProfile() {
      let photo = '';
      if (user) {
        photo = JSON.parse(user).photo;
      }
      return `${process.env.URL_IMAGES}/profile/${photo}`;
    },
    versionApp() {
      return `Version ${process.env.LATEST_VERSION_APP}`;
    },
  },
  methods: {
    ...mapActions(configurationTypes.PATH, {
      fetchConfigurations: configurationTypes.actions.FETCH_CONFIGURATIONS,
    }),
    changeMenu(title) {
      console.log(title);
      this.title = title;
    },
    onMainClick() {
      console.log('onMainClick ...');
    },
    clickChangePassword() {
      this.showModalChangePassword = true;
    },
    clickChangeImageProfile() {
      this.showModalChangeImageProfile = true;
    },
    clickLogOut() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    },
  },
};
</script>
