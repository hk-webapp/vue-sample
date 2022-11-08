<template>
  <div>text editor
      <div><span>bold</span><span>color</span> <span>link</span>
      </div>
    <iframe id="txtr" ref="ifrm" width="550px"  height="300px" />
  </div>
</template>

<script>
export default {
  name: "ArticleText",
created(){
this.$refs.ifrm.designMode="on"
}

};
</script>