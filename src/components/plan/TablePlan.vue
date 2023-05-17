<template>
  <div class="q-pa-md">
    <q-table title="Planes" :data="data" :columns="columns" row-key="name"
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
    <form-plan v-if="showModal" v-model="showModal"/>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import FormPlan from 'components/plan/FormPlan.vue';
import planTypes from '../../store/modules/plan/types';

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
    await this.fetchPlans();
    this.isLoadingTable = false;
  },
  computed: {
    ...mapState(planTypes.PATH, [
      'plans',
    ]),
    data() {
      return [...this.plans];
    },
  },
  methods: {
    ...mapActions(planTypes.PATH, {
      fetchPlans: planTypes.actions.FETCH_PLANS,
      updatePlan: planTypes.actions.UPDATE_PLAN,
      deletePlan: planTypes.actions.DELETE_PLAN,
    }),
    async save(field, value) {
      this.isLoadingTable = true;
      this.itemSelected[field] = value;
      await this.updatePlan(this.itemSelected);
      await this.fetchPlans();
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
          message: 'Está seguro que desea eliminar el plan?',
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
          await this.deletePlan(row.id);
          await this.fetchPlans();
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
    FormPlan,
  },
};
</script>
