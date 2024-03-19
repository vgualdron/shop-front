<template>
  <q-item
    clickable
    tag="a"
    @click="clickOption(link, title)"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      default: '',
    },

    link: {
      type: String,
      default: '#',
    },

    icon: {
      type: String,
      default: '',
    },
  },
  methods: {
    clickOption(link) {
      this.$router.push(link);
      /* setTimeout(() => {
        window.location.reload();
        this.$emit('changeMenu', title);
      }, 500); */
    },
  },
};
</script>
