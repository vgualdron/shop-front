<template>
  <div class="q-pa-md">
    <q-dialog v-if="showDialog" v-model="showDialog">
      <q-card style="width: 700px; max-width: 80vw; max-height: 80vw;">
        <q-card-section style="height: 70vh" class="scroll">
          <div :class="this.$q.screen.md || this.$q.screen.lg || this.$q.screen.xl
            ? 'f-h-phone-size row q-pa-md full-height'
            : 'f-h-phone-size q-pa-md full-height'">
            <q-carousel
              swipeable
              animated
              v-model="slide"
              thumbnails
              infinite
              class="col-xs-12 col-sm-12 col-md-7 q-mb-md"
            >
              <q-carousel-slide
                v-for="image in item.images"
                :name="image.id"
                :key="image.name"
                :img-src="srcImage(image.name)" />
            </q-carousel>
            <div class="col-xs-12 col-sm-12 col-md-5 q-px-md">
              <div class="text-h5 text-bold">{{ item.name }}</div>
              <q-rating size="18px" v-model="stars" :max="5" color="primary" />
              <span class="text-body2 text-bod q-ml-sm">{{ currency(item.price) }}</span>
              <div class="text-body1 q-mt-md">{{ item.description }}</div>
              <div class="text-body1 q-mt-lg">
                Los gastos de envío se calculan en la pantalla de pagos.
              </div>
              <div class="text-body1 q-mt-lg">
                <q-input
                  color="primary"
                  class="q-mt-sm col-xs-12 col-sm-12 col-md-4"
                  type="number"
                  label="Cantidad"
                  v-model="count"
                  outline>
                </q-input>
              </div>
              <div class="text-body1 q-mt-lg">
                <q-btn color="primary" label="Agregar al carrito" class="full-width" />
              </div>
              <div class="text-body1 q-mt-lg">
                <q-btn color="white" text-color="black" label="Comprar ahora" class="full-width" />
              </div>
              <div class="text-body1 q-mt-lg">
                Retiro disponible en
                <b>{{ address() }}.</b><br>
                Normalmente está listo en 5 días o más.
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import { formatCurrency } from '../../helpers/format';
import productTypes from '../../store/modules/product/types';
import categoryTypes from '../../store/modules/category/types';

export default {
  data() {
    return {
      stars: 5,
      count: 1,
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
    currency(value) {
      return `${formatCurrency(value)}`;
    },
    address() {
      return `${process.env.ADDRESS_COMPANY}`;
    },
  },
};
</script>
<style>
  @media (max-width: 600) {
    .f-h-phone-size {
      height: 100% !important;
      width: 100% !important;
    }
  }
</style>
