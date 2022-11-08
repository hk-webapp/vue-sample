<template>
  <div class="image-picker-container">
    <span class="select-btn" @click="openModal">انتخاب تصویر </span>
    <b-modal ref="iModal">
      <div class="image-picker-modal">
        <div v-bind:key="index" v-for="(item, index) in images">
          <ImageControl :category="category" :url="item" /> <span>{{ item }}</span>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ImageControl from './ImageControl'
export default {
  name: "imagepicker",
  props: {
    category: String
  },
  components: {
    ImageControl
  },
  created() {
    this.getImagesData(this.category);
  },
  computed: {
    ...mapGetters({
      images: "getimages"
    })
  },
  methods: {
    ...mapActions(["getImagesData"]),
    openModal() {
      this.$refs.iModal.show();
    }
  }
};
</script>

<style lang="scss">
.image-picker-modal{
    border: 1ps red solid;
    width: 100%;
    height: max-content;
}
.image-picker-container {
  width: 100%;
  .select-btn {
    background-color: rgb(151, 151, 207);
    cursor: pointer;
    border-radius: 10px;
    padding: 10px 15px 10px 15px;
  }
}
</style>
