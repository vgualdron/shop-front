<template>
  <div class="q-pa-md">
    <q-dialog v-if="showDialog" v-model="showDialog">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-separator />
        <q-card-section style="max-height: 60vh" class="scroll">
          <div class="q-pa-md">
            <q-carousel
              swipeable
              animated
              v-model="slide"
              thumbnails
              infinite
            >
              <q-carousel-slide
                v-for="image in item.images"
                :name="image.id"
                :key="image.name"
                :img-src="srcImage(image.name)" />
            </q-carousel>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import productTypes from '../../store/modules/product/types';
import categoryTypes from '../../store/modules/category/types';

export default {
  data() {
    return {
      isLoading: false,
      showModal: false,
      slide: 1,
    };
  },
  mounted() {
    this.slide = this.item.images[0].id;
  },
  computed: {
    ...mapState(productTypes.PATH, [
      'statusAddProduct',
    ]),
    ...mapState(categoryTypes.PATH, [
      'categories',
    ]),
    optionsCategories() {
      return this.categories.map(({ id, name }) => ({ label: name, value: id }));
    },
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
    item: {
      type: Object,
      require: true,
    },
  },
  methods: {
    ...mapActions(productTypes.PATH, {
      fetchProducts: productTypes.actions.FETCH_PRODUCTS,
      addProduct: productTypes.actions.ADD_PRODUCT,
    }),
    srcImage(name) {
      return `${process.env.URL_IMAGES}/products/${name}`;
    },
  },
};
</script>
