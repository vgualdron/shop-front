<template>
  <div class="q-pa-md">
    <q-table
      :title="title"
      :data="data"
      :columns="columns"
      row-key="name"
      :loading="isLoadingTable"
      :pagination.sync="pagination"
      ref="tableGrid"
      grid>
      <template v-slot:top>
        <div class="row full-width q-pb-sm">
          <q-select
            v-model="categorieSelected"
            label="Categoria"
            placeholder="Seleccione la categoria"
            :options="optionsCategories"
            class="col-xs-12 col-sm-12 col-md-3"
            lazy-rules>
            <template v-slot:append>
              <q-icon name="close" @click.stop="categorieSelected = null" class="cursor-pointer" />
            </template>
          </q-select>
          <q-space/>
          <q-input
            debounce="300"
            color="primary"
            v-model="filter"
            class="col-xs-12 col-sm-12 col-md-4">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <p class="col-xs-12 col-sm-12 col-md-4 text-subtitle1 text-right">
            {{ title }}
          </p>
        </div>
      </template>
      <template v-slot:top-right>
      </template>
      <template v-slot:item="props">
        <div
          class="q-pa-md col-xs-12 col-sm-6 col-md-4 cursor-pointer"
          @click="clickRow(props.row)">
          <q-card class="my-card">
            <q-card-section>
              <div class="text-h6 q-mb-xs">{{ props.row.name }}</div>
              <div class="row no-wrap items-center">
                <q-rating size="18px" v-model="stars" :max="5" color="primary" />
                <span class="text-caption text-grey q-ml-sm">{{ currency(props.row.price) }}</span>
              </div>
            </q-card-section>
            <img :src="srcImage(props.row.images[0].name)">
          </q-card>
        </div>
      </template>
    </q-table>
    <modal-product v-if="showModal" v-model="showModal" :item="itemSelected" />
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import ModalProduct from 'components/home/ModalProduct.vue';
import productTypes from '../../store/modules/product/types';
import categoryTypes from '../../store/modules/category/types';
import { formatCurrency } from '../../helpers/format';

export default {
  data() {
    return {
      stars: 5,
      isLoading: false,
      isLoadingTable: false,
      itemSelected: {},
      categorieSelected: null,
      columns: [
        {
          name: 'images',
          required: true,
          label: 'Imagenes',
          align: 'left',
        },
        {
          name: 'name',
          required: true,
          label: 'Nombre',
          align: 'left',
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
        },
      ],
      pagination: {
        rowsPerPage: 10,
      },
      filter: '',
      showModal: false,
      fileName: null,
      showOverlay: false,
      imageSrc: '',
    };
  },
  async mounted() {
    this.isLoadingTable = true;
    await this.fetchCategories();
    await this.fetchProducts();
    this.isLoadingTable = false;
  },
  computed: {
    ...mapState(productTypes.PATH, [
      'products',
    ]),
    ...mapState(categoryTypes.PATH, [
      'categories',
    ]),
    data() {
      const text = this.filter.toLowerCase();
      let items = this.products.filter(({ name }) => name.toLowerCase().includes(text));
      if (this.categorieSelected && this.categorieSelected.value) {
        const val = this.categorieSelected.value;
        items = items.filter(({ categorie }) => parseInt(categorie.id, 10) === parseInt(val, 10));
      }
      return items;
    },
    optionsCategories() {
      return this.categories.map(({ id, name }) => ({ label: name, value: id }));
    },
    title() {
      return `${this.data.length} articulos`;
    },
  },
  methods: {
    ...mapActions(productTypes.PATH, {
      fetchProducts: productTypes.actions.FETCH_PRODUCTS,
      updateProduct: productTypes.actions.UPDATE_PRODUCT,
      deleteProduct: productTypes.actions.DELETE_PRODUCT,
    }),
    ...mapActions(categoryTypes.PATH, {
      fetchCategories: categoryTypes.actions.FETCH_CATEGORIES,
    }),
    srcImage(name) {
      return `${process.env.URL_IMAGES}/products/${name}`;
    },
    currency(value) {
      return `${formatCurrency(value)}`;
    },
    async save(field, value) {
      this.isLoadingTable = true;
      this.itemSelected[field] = value.value || value;
      await this.updateProduct(this.itemSelected);
      await this.fetchProducts();
      this.isLoadingTable = false;
    },
    clickRow(row) {
      console.log(row);
      this.itemSelected = { ...row };
      this.showModal = true;
    },
    openModal(action, row) {
      if (action === 'delete') {
        this.$q.dialog({
          title: 'Eliminar',
          message: 'Está seguro que desea eliminar el producto?',
          ok: {
            push: true,
          },
          cancel: {
            push: true,
            color: 'negative',
            text: 'adsa',
          },
          persistent: true,
        }).onOk(async () => {
          this.isLoadingTable = true;
          await this.deleteProduct(row.id);
          await this.fetchProducts();
          this.isLoadingTable = false;
        }).onCancel(() => {
          // console.log('>>>> Cancel')
        }).onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
      }
    },
  },
  components: {
    ModalProduct,
  },
};
</script>
<style lang="stylus" scoped>
  .image_product
    max-width 230px
    display flex
  .container
    position relative
    max-width 80vw
    max-height 50vh
    overflow hidden
  .container img
    display block
    max-width 100%
    max-height 50vh
  .container .overlay
    position absolute
    display flex
    top 0
    bottom 0
    left 0
    right 0
    width 100%
    height 100%
    background-color rgba(#fff, .7)
    opacity 0
    transition .3s ease
    &:hover
      opacity 0.6
  .crop-icon
    opacity 1
</style>
