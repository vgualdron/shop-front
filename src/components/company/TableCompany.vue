<template>
  <div class="q-pa-md">
    <q-table title="Negocios" :data="data" :columns="columns" row-key="name"
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
            <q-btn icon="image" type="reset" color="primary" flat size="sm"
              class="col q-ml-sm" @click="openModal('logo', props.row)" />
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
          <q-td key="address" :props="props">
            <q-icon size="xs" name="edit" />
            {{ props.row.address }}
            <q-popup-edit :value="props.row.address" v-slot="scope" buttons
              @input="val => save('address', val)">
              <q-input v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="email" :props="props">
            <q-icon size="xs" name="edit" />
            {{ props.row.email }}
            <q-popup-edit :value="props.row.email" v-slot="scope" buttons
              @input="val => save('email', val)">
              <q-input v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="phone" :props="props">
            <q-icon size="xs" name="edit" />
            {{ props.row.phone }}
            <q-popup-edit :value="props.row.phone" v-slot="scope" buttons
              @input="val => save('phone', val)">
              <q-input v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="whatsapp" :props="props">
            <q-icon size="xs" name="edit" />
            {{ props.row.whatsapp }}
            <q-popup-edit :value="props.row.whatsapp" v-slot="scope" buttons
              @input="val => save('whatsapp', val)">
              <q-input v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="linkweb" :props="props">
            <q-icon size="xs" name="edit" />
            {{ props.row.linkweb }}
            <q-popup-edit :value="props.row.linkweb" v-slot="scope" buttons
              @input="val => save('linkweb', val)">
              <q-input v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="facebook" :props="props">
            <q-icon size="xs" name="edit" />
            {{ props.row.facebook }}
            <q-popup-edit :value="props.row.facebook" v-slot="scope" buttons
              @input="val => save('facebook', val)">
              <q-input v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="instagram" :props="props">
            <q-icon size="xs" name="edit" />
            {{ props.row.instagram }}
            <q-popup-edit :value="props.row.instagram" v-slot="scope" buttons
              @input="val => save('instagram', val)">
              <q-input v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="latitude" :props="props">
            <q-icon size="xs" name="edit" />
            {{ props.row.latitude }}
            <q-popup-edit :value="props.row.latitude" v-slot="scope" buttons
              @input="val => save('latitude', val)">
              <q-input v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="longitude" :props="props">
            <q-icon size="xs" name="edit" />
            {{ props.row.longitude }}
            <q-popup-edit :value="props.row.longitude" v-slot="scope" buttons
              @input="val => save('longitude', val)">
              <q-input v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="schedule" :props="props">
            <q-icon size="xs" name="edit" />
            {{ props.row.schedule }}
            <q-popup-edit :value="props.row.schedule" v-slot="scope" buttons
              @input="val => save('schedule', val)">
              <q-input v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="payments" :props="props">
            <q-icon size="xs" name="edit" />
            {{ props.row.payments }}
            <q-popup-edit :value="props.row.payments" v-slot="scope" buttons
              @input="val => save('payments', val)">
              <q-input v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="status" :props="props">
            <q-icon size="xs" name="edit" />
            {{ props.row.status }}
            <q-popup-edit :value="props.row.status" v-slot="scope" buttons
              @input="val => save('status', val)">
              <q-input v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="category_id" :props="props">
            <q-icon size="xs" name="edit" />
            {{ props.row.category_id }}
            <q-popup-edit :value="props.row.category_id" v-slot="scope" buttons
              @input="val => save('category_id', val)">
              <q-input v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="city_id" :props="props">
            <q-icon size="xs" name="edit" />
            {{ props.row.city_id }}
            <q-popup-edit :value="props.row.city_id" v-slot="scope" buttons
              @input="val => save('city_id', val)">
              <q-input v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="plan_id" :props="props">
            <q-icon size="xs" name="edit" />
            {{ props.row.plan_id }}
            <q-popup-edit :value="props.row.plan_id" v-slot="scope" buttons
              @input="val => save('plan_id', val)">
              <q-input v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <form-company v-if="showModal" v-model="showModal"/>
    <form-logo v-if="showModalFormLogo" v-model="showModalFormLogo" :item="itemSelected"/>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import FormCompany from 'components/company/FormCompany.vue';
import FormLogo from 'components/company/FormLogo.vue';
import companyTypes from '../../store/modules/company/types';

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
          name: 'address', label: 'Dirección', field: 'address', sortable: true, style: 'width: 10px', align: 'center',
        },
        {
          name: 'email', align: 'center', label: 'Correo', field: 'email', sortable: true,
        },
        {
          name: 'phone', align: 'center', label: 'Teléfono', field: 'phone', sortable: true,
        },
        {
          name: 'whatsapp', align: 'center', label: 'Whatsapp', field: 'whatsapp', sortable: true,
        },
        {
          name: 'linkweb', align: 'center', label: 'Link Web', field: 'linkweb', sortable: true,
        },
        {
          name: 'facebook', align: 'center', label: 'Facebook', field: 'facebook', sortable: true,
        },
        {
          name: 'instagram', align: 'center', label: 'Instagram', field: 'instagram', sortable: true,
        },
        {
          name: 'latitude', align: 'center', label: 'Latitud', field: 'latitude', sortable: true,
        },
        {
          name: 'longitude', align: 'center', label: 'Longitud', field: 'longitude', sortable: true,
        },
        {
          name: 'schedule', align: 'center', label: 'Horario', field: 'schedule', sortable: true,
        },
        {
          name: 'payments', align: 'center', label: 'Tipos de pago', field: 'payments', sortable: true,
        },
        {
          name: 'status', align: 'center', label: 'Estado', field: 'status', sortable: true,
        },
        {
          name: 'category_id', align: 'center', label: 'Categoria', field: 'category_id', sortable: true,
        },
        {
          name: 'city_id', align: 'center', label: 'Ciudad', field: 'city_id', sortable: true,
        },
        {
          name: 'plan_id', align: 'center', label: 'Plan', field: 'plan_id', sortable: true,
        },
      ],
      pagination: {
        rowsPerPage: 30,
      },
      filter: '',
      isDiabledAdd: false,
      showModal: false,
      showModalFormLogo: false,
    };
  },
  async mounted() {
    this.isLoadingTable = true;
    await this.fetchCompanies();
    this.isLoadingTable = false;
  },
  computed: {
    ...mapState(companyTypes.PATH, [
      'companies',
    ]),
    data() {
      return [...this.companies];
    },
  },
  methods: {
    ...mapActions(companyTypes.PATH, {
      fetchCompanies: companyTypes.actions.FETCH_COMPANIES,
      updateCompany: companyTypes.actions.UPDATE_COMPANY,
      deleteCompany: companyTypes.actions.DELETE_COMPANY,
    }),
    async save(field, value) {
      this.isLoadingTable = true;
      this.itemSelected[field] = value;
      await this.updateCompany(this.itemSelected);
      await this.fetchCompanies();
      this.isLoadingTable = false;
    },
    clickRow(row) {
      this.itemSelected = { ...row };
    },
    addRow() {
      this.showModal = true;
    },
    openModal(action, row) {
      if (action === 'logo') {
        this.showModalFormLogo = true;
      } else if (action === 'delete') {
        this.$q.dialog({
          title: 'Eliminar',
          message: 'Está seguro que desea eliminar el negocio?',
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
          await this.deleteCompany(row.id);
          await this.fetchCompanies();
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
    FormCompany,
    FormLogo,
  },
};
</script>
