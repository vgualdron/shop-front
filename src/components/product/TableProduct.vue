<template>
  <div class="q-pa-md">
    <q-table title="Productos" :data="data" :columns="columns" row-key="name"
      :selected.sync="selected" :loading="isLoadingTable" :filter="filter"
      :pagination.sync="pagination">
      <template v-slot:top>
        <q-btn color="primary" label="Agregar nuevo" @click="addRow" :disable="isDiabledAdd"/>
        <q-space />
        <q-input dense debounce="300" color="primary" v-model="filter">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props" @click="clickRow(props.row)">
          <q-td key="actions" :props="props">
            <q-btn icon="delete" type="reset" color="primary" flat size="sm"
              class="col q-ml-sm" @click="openModal('delete', props.row)" />
          </q-td>
          <q-td key="categorie_id" :props="props">
            <q-icon size="xs" name="edit" />
            {{ optionsCategories.find((item) => props.row.categorie_id === item.value).label }}
            <q-popup-edit
              :value="optionsCategories.find((item) => props.row.categorie_id === item.value)"
              v-slot="scope"
              @input="val => save('categorie_id', val)"
              buttons>
              <q-select
                outlined
                v-model="scope.value"
                :options="optionsCategories"/>
            </q-popup-edit>
          </q-td>
          <q-td key="name" :props="props">
            <q-icon size="xs" name="edit" />
            {{ props.row.name }}
            <q-popup-edit :value="props.row.name" v-slot="scope" buttons
              @input="val => save('name', val)">
              <q-input v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="description" :props="props">
            <q-icon size="xs" name="edit" />
            {{ props.row.description }}
            <q-popup-edit :value="props.row.description" v-slot="scope" buttons
              @input="val => save('description', val)">
              <q-input v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="price" :props="props">
            <q-icon size="xs" name="edit" />
            {{ props.row.price }}
            <q-popup-edit :value="props.row.price" v-slot="scope" buttons
              @input="val => save('price', val)">
              <q-input v-model="scope.value" dense autofocus type="number" />
            </q-popup-edit>
          </q-td>
          <q-td key="priority" :props="props">
            <q-icon size="xs" name="edit" />
            {{ props.row.priority }}
            <q-popup-edit :value="props.row.priority" v-slot="scope" buttons
              @input="val => save('priority', val)">
              <q-input v-model="scope.value" dense autofocus type="number" />
            </q-popup-edit>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <form-product v-if="showModal" v-model="showModal"/>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import FormProduct from 'components/product/FormProduct.vue';
import productTypes from '../../store/modules/product/types';
import categoryTypes from '../../store/modules/category/types';

export default {
  data() {
    return {
      isLoadingTable: false,
      selected: [],
      itemSelected: {},
      columns: [
        {
          name: 'actions',
          required: true,
          label: 'Acciones',
          align: 'left',
        },
        {
          name: 'categorie_id',
          required: true,
          label: 'Categoria',
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
        {
          name: 'description', align: 'center', label: 'Descripción', field: 'description', sortable: true,
        },
        {
          name: 'price', align: 'center', label: 'Precio', field: 'price', sortable: true,
        },
        {
          name: 'priority', align: 'center', label: 'Prioridad', field: 'priority', sortable: true,
        },
      ],
      pagination: {
        rowsPerPage: 30,
      },
      filter: '',
      isDiabledAdd: false,
      showModal: false,
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
      return [...this.products];
    },
    optionsCategories() {
      return this.categories.map(({ id, name }) => ({ label: name, value: id }));
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
    async save(field, value) {
      this.isLoadingTable = true;
      this.itemSelected[field] = value.value || value;
      await this.updateProduct(this.itemSelected);
      await this.fetchProducts();
      this.isLoadingTable = false;
    },
    clickRow(row) {
      this.itemSelected = { ...row };
    },
    addRow() {
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
    FormProduct,
  },
};
</script>
