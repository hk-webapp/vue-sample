<template>
  <div>
    <div class="article-generator-toolbar">
      <span>افزودن سطر جدید</span>
    </div>
    <div>
      <div class=" article-generator-row" v-for="(item ,index)in articles" v-bind:key="index">
        <div class="article-generator-Text" v-if="item.type === ArticleItemType.Text">{{ iten.text }}</div>
        <div class="article-generator-header" v-if="item.type === ArticleItemType.Header">{{ iten.text }}</div>
        <div class="article-generator-image" v-if="item.type === ArticleItemType.Image">
          <ImageControl
            :url="item.FileName"
            :alt="item.FileName"
            category="article"
            :className="'article-info-image'"
          />
        </div>
        <div class="article-generator-code" v-if="item.type === ArticleItemType.Code">{{ iten.text }}</div>

      </div>
    </div>
  </div>
</template>

<script>
import ImageControl from "./../uiControls/ImageControl";
import { mapGetters } from "vuex";
import ArticleItemType from './../../classes/Enums';
export default {
  name: "articlegenerator",
  components:{
    ImageControl
  },
  computed: {
    ...mapGetters({
      articles: ""
    })
  }
};
</script>

<style lang="scss">
.article-generator-toolbar {
  width: 100%;
}
</style>
