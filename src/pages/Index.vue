<template>
  <q-page class="q-pa-md">
    <carousel-banner/>
    <table-product/>
  </q-page>
</template>

<script>
import CarouselBanner from 'components/common/CarouselBanner.vue';
import TableProduct from 'components/home/TableProduct.vue';

export default {
  data() {
    return {
    };
  },
  name: 'PageIndex',
  watch: {
  },
  mounted() {
  },
  computed: {
  },
  methods: {
  },
  components: {
    CarouselBanner,
    TableProduct,
  },
};
</script>
