<template>
  <div class="q-pa-md">
    <q-dialog v-model="showDialog" persistent>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Agregar nuevo logo</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-separator />
        <q-card-section style="max-height: 60vh" class="scroll">
          <div class="flex column justify-center text-center text-body1">
            <p>Cargar imagen</p>
            <q-file outlined clearable v-model="fileName" class="q-mb-md" label="Buscar imagen..."
              accept=".jpg, image/*" @input="handleFile" />
            <p>Click en la imagen para empezar a editar</p>
            <div id="display-area">
              <div class="container cursor-pointer column items-center"
                @mouseover="showOverlay = !showOverlay">
                <img ref="image" :src="imageSrc" style="width: 250px;">
                <div class="overlay flex justify-center items-center" :hidden="showOverlay">
                  <q-icon name="crop" size="xl" color="grey-10" class="crop-icon" />
                </div>
              </div>
            </div>
            <q-popup-proxy ref="popup" anchor="center middle" self="center left"
              transition-show="scale" transition-hide="scale" target="#display-area">
              <CropperDialog @destroy="finishCropper" :imageSrc="imageSrc" />
            </q-popup-proxy>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import CropperDialog from 'components/common/CropperDialog.vue';
import companyTypes from '../../store/modules/company/types';

export default {
  data() {
    return {
      isLoading: false,
      imageSrc: 'https://live.staticflickr.com/3491/3762768243_1fafb16edf.jpg',
      showOverlay: false,
      fileName: null,
    };
  },
  computed: {
    ...mapState(companyTypes.PATH, [
      'statusChangeLogo',
    ]),
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
    },
  },
  mounted() {
    if (this.item.description && this.item.description.length > 0) {
      this.imageSrc = this.item.description;
    }
  },
  methods: {
    ...mapActions(companyTypes.PATH, {
      fetchCompanies: companyTypes.actions.FETCH_COMPANIES,
      changeLogoCompany: companyTypes.actions.CHANGE_LOGO,
    }),
    handleFile(file) {
      this.imageSrc = URL.createObjectURL(file);
    },
    finishCropper(croppedImage) {
      this.imageSrc = croppedImage;
      this.saveImage();
    },
    async saveImage() {
      this.isLoading = true;
      await this.changeLogoCompany({
        id: this.item.id,
        image: this.imageSrc,
      });
      await this.fetchCompanies();
      this.isLoading = false;
    },
  },
  components: {
    CropperDialog,
  },
};
</script>
<style lang="stylus" scoped>
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
