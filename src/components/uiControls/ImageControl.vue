<template>
  <div :class="className">
    <img class="show-on-scroll" :src="imgSrc" :alt="alt" />
  </div>
</template>

<script>
import { imageManagment } from "../../apis/imageApi";
import { ApiException } from "../../apis/ApiException";

export default {
  name: "imagecontrol",
  props: {
    url: {
      type: String,
      default: ""
    },
    category: {
      type: String,
      default: ""
    },
    alt: {
      type: String,
      default: ""
    },
    className: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      imgSrc: "",
      loaded: false,
      hasDisposed: false
    };
  },
  created() {
    this.imgSrc = "";
    this.loaded = false;
    this.hasDisposed = false;
  },
  beforeMount() {
    this.loadImages();
  },
  beforeDestroy() {
    this.hasDisposed = true;
  },
  methods: {
    async loadImages() {
      const item = await imageManagment.GetImages(this.url, this.category);
      if (this.hasDisposed) {
        return;
      }
      if (item instanceof ApiException || item === null) {
        this.imgSrc = "";
        this.loaded = false;
      } else {
        this.imgSrc = item;
        this.loaded = true;
      }
   }
  }
};
</script>
