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
      message: 'Buen%20día%20,%20quiero%20tener%20más%20información%20sobre%20los%20productos%20vistos%20en%20la%20página%20web',
    };
  },
  props: {
  },
  computed: {
    link() {
      return `https://wa.me/${process.env.NUMBER_WHATSAPP}?text=${this.message}`;
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
