<template>
  <div class="empty-editor-container"></div>
</template>

<script>
export default {
  name: "empty",
  created() {
    document.designMode = "on";
    document.editorLS = this;
  console.log(7777, this.$parent.$parent)
    window.____fffff = this;
    while (document.body.children.length) {
      document.body.removeChild(document.body.children[0]);
    }

    document.setRedColor = function() {
      alert(6);
      console.log(window.getSelection());
    };
  },
  methods: {
    SetColorToRed() {
      const selection = document.getSelection();
      console.log(document.getSelection());
    }
  }
};
</script>
<style lang="scss">
.empty-editor-container{
  direction: rtl;
}
</style>