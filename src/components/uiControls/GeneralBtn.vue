<template>
  <div class="btn-container" :class="getClassInit()" @click="onclickBTN">
    {{ text }}
    <img class="btn-img" />
  </div>
</template>

<script>
export default {
  name: "GeneralBtn",
  props: {
    text: String,
    clickHandler: undefined,
    saving: Number
  },
  data() {
    return {
      doChlick: false
    };
  },
  // created() {
  // },

  methods: {
    getClassInit() {
      // if (!this.doChlick) {
      //   return "btn-text";
      // }
      switch (this.saving) {
        case 0:
          return "btn-text btn-loading";
        case 2:
          return "btn-text btn-loaded";
        default:
          return "btn-text btn-loaded";
      }
      /*
      return this.saving !== 2
        ? " btn-text btn-loading"
        : "btn-text btn-loaded";
        */
    },
    onclickBTN() {
      if (this.clickHandler != undefined) {
        this.clickHandler();
      }
    },
    getImgUrl(img) {
      try {
        return require("../../assets/images/" + img);
      } catch (e) {
        return null;
      }
    }
  }
};
</script>
