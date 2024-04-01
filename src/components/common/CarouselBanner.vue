<template>
  <div class="q-pa-md">
    <q-carousel
      v-model="slide"
      :autoplay="autoplay"
      transition-prev="scale"
      transition-next="scale"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
      height="300px"
      animated
      navigation
      infinite
      arrows
      swipeable
    >
      <q-carousel-slide
        v-for="file in files"
        :name="file.id"
        :key="file.url"
        class="column no-wrap">
        <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
          <q-img class="rounded-borders col-6 full-height" :src="file.url" />
          <q-img native-context-menu not-draggable class="rounded-borders col-6 full-height"
            :src="file.url2">
            <div>{{ file.description }}</div>
          </q-img>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script>
export default {
  name: 'CarouselBanner',
  data() {
    return {
      files: [
        {
          id: 1,
          description: 'With native context menu and not draggable - can be swiped',
          url: `${process.env.URL_IMAGES}/banner/1-1.jpeg`,
          url2: `${process.env.URL_IMAGES}/banner/1-2.jpeg`,
        },
        {
          id: 3,
          description: 'With native context menu and not draggable - can be swiped',
          url: `${process.env.URL_IMAGES}/banner/3-1.jpeg`,
          url2: `${process.env.URL_IMAGES}/banner/3-2.jpeg`,
        },
        {
          id: 4,
          description: 'With native context menu and not draggable - can be swiped',
          url: `${process.env.URL_IMAGES}/banner/4-1.jpeg`,
          url2: `${process.env.URL_IMAGES}/banner/4-2.jpeg`,
        },
      ],
      slide: 1,
      autoplay: true,
    };
  },
  props: {
  },
  methods: {
  },
};
</script>
