<template>
  <div class="q-pa-md">
    <a
      :href="link"
      class="whatsapp"
      target="_blank">
      <i class="fa-brands fa-whatsapp whatsapp-icon"></i>
    </a>
  </div>
</template>
<script>
export default {
  name: 'BtnWhatsapp',
  data() {
    return {
    };
  },
  props: {
  },
  computed: {
    link() {
      return `https://wa.me/${process.env.NUMBER_WHATSAPP}?text=Me%20quiero%20comprar%20el%20articulo`;
    },
  },
  methods: {
  },
};
</script>
<style scoped>
  .whatsapp {
    position:fixed;
    width:60px;
    height:60px;
    bottom:40px;
    right:5px;
    background-color:#25d366;
    color:#FFF;
    border-radius:50px;
    text-align:center;
    font-size:30px;
    z-index:100;
  }

  .whatsapp-icon {
    margin-top:13px;
  }
</style>
