<template>
  <q-page class="">
    <table-companies />
  </q-page>
</template>

<script>
import TableCompanies from 'components/company/TableCompany.vue';

export default {
  components: { TableCompanies },
  data() {
    return {
    };
  },
  name: 'PageCompany',
  computed: {
  },
};
</script>
