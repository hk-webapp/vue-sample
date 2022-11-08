<template>
  <div class="editor_container">
    <div class="editor-toolbar">
      <span @click="setColor">قزمر</span>
      <span @click="setColor">سیاه</span>
    </div>
    <iframe
      ref="refIframe"
      class="editor-iframe"
      @load="initFn"
      src="/empty?WithoutHeaderFooter"
    />
    <textarea class="editor-textarea" cols="30" rows="10"></textarea>
  </div>
</template>

<script>
import * as $ from 'vue-jquery'
export default {
  name: "editor",
 
  methods: {
    initFn(obj) {
       console.log(6666, this.$refs.refIframe);
       console.log(999,$(this.$refs.refIframe))
      this.$refs.refIframe.setRedColor = function() {
        document.SetColor();
      };
    },
    setColor(event) {
      // console.log(333333333, this.$refs.refIframe);
      //this.$refs.refIframe.setRedColor();
    }
  }
};
</script>

<style lang="scss">
.editor_container {
  width: 80%;
  height: 85%;
  direction: rtl;
  .editor-toolbar {
    width: 100%;
    padding: 5px;
    span {
      margin: 10px;
      background-color: gray;
      padding: 5px 20px 5px 20px;
    }
  }
  .editor-iframe {
    width: 100%;
    height: 100%;
    border: 1px gray solid;
    direction: rtl;
  }

  .editor-textarea {
    display: none;
  }
}

/*
.editor_container {
  // position: relative;
  // overflow: hidden
  // ;
  width: 70%;
  height: 350px;
  border: 1px red solid;
  .editor_main {
    width: 80%;
  }
  .editor-text {
    width: 80%;
    height: 200px;
    border: 0px;
  }
  
}
*/
</style>
