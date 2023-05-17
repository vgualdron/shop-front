<template>
  <q-page class="">
    <table-plans />
  </q-page>
</template>

<script>
import TablePlans from 'components/plan/TablePlan.vue';

export default {
  components: { TablePlans },
  data() {
    return {
    };
  },
  name: 'PagePlan',
  computed: {
  },
};
</script>
