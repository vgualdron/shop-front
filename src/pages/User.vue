<template>
  <q-page class="">
    <table-users />
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
import TableUsers from 'components/user/TableUsers.vue';
import commonTypes from '../store/modules/common/types';

export default {
  components: { TableUsers },
  data() {
    return {
      tab: 'list1',
    };
  },
  name: 'PageUser',
  computed: {
    ...mapState(commonTypes.PATH, ['']),
  },
};
</script>
