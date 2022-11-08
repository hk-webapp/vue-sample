<template>
  <div class="article-list-container">
    <h3>مقاله </h3>
    <div class="article-list-toolbar">
      <span class="article-list-add-btn" @click="this.AddNewArtivleItem"
        >افزودن آیتم جدید</span
      >
      <!-- <span class="article-list-add-btn" @click="this.AddNewArtivleItem"
        >افزودن تصویر جدید</span
      >
      <span class="article-list-add-btn" @click="this.AddNewArtivleItem"
        >افزودن کد جدید</span
      > -->
    </div>
    <div class="articles-list-editor">
      <!-- <b-modal
        :no-close-on-backdrop="true"
        ref="AIModal"
        :title="modalTitle"
        ok-title="تایید"
        cancel-title="انصراف"
        @click="modalClick($event)"
        header-close-label="انصراف و بستن"
        :hide-footer="true"
        role="modal"
      >
        <div dir="rtl">
          <ArticleListItem
            :ModeType="ModifierMode"
            :articleId="articleId"
            :articleName="articleName"
            :saveEventHandler="savearticleeHandler"
            :cancelEventHandler="cancelarticleeHandler"
          />
        </div>
      </b-modal> -->
      <Modal ref="AIModal" :modalTitle="modalTitle" :ModeType="ModifierMode">
        <div dir="rtl">
          <ArticleListItem
            :ModeType="ModifierMode"
            :articleId="articleId"
            :articleName="articleName"
            :saveEventHandler="savearticleeHandler"
            :cancelEventHandler="cancelarticleeHandler"
          />
        </div>
      </Modal>
    </div>

    <div v-if="!articles">No result</div>
    <div v-else>
      <div
        class=" article-list-row"
        v-for="(item, index) in articles"
        v-bind:key="index"
      >
        <div
          class="article-list-Text"
          v-if="item.type === ArticleItemType.Text"
        >
          {{ iten.text }}
        </div>
        <div
          class="article-list-header"
          v-if="item.type === ArticleItemType.Header"
        >
          {{ iten.text }}
        </div>
        <div
          class="article-list-image"
          v-if="item.type === ArticleItemType.Image"
        >
          <ImageControl
            :url="item.FileName"
            :alt="item.FileName"
            category="article"
            :className="'article-info-image'"
          />
        </div>
        <div
          class="article-list-code"
          v-if="item.type === ArticleItemType.Code"
        >
          {{ iten.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageControl from "./../uiControls/ImageControl";
import { mapGetters, mapActions } from "vuex";
import { ArticleItemType, ModalMode } from "./../../classes/Enums";
import ArticleListItem from "./articleListItem";
import Modal from "./../uiControls/Modal";
import './../../styles/articles.scss'
export default {
  name: "articleList",
  components: {
    ImageControl,
    ArticleListItem,
    Modal
  },
  created() {
    this.dataBindGrid();
  },
  data() {
    return {
      ModifierMode: ModalMode.insert,
      modalTitle: ""
    };
  },
  computed: {
    ...mapGetters({
      articles: "getArticleItems",
      loaded: "getLoadedArticleItems"
    }),
    articleId() {
      return this.$route.params.id;
    },
    articleName() {
      return this.$route.params.name;
    }
  },
  methods: {
    ...mapActions(["getArticleItemsData"]),
    dataBindGrid() {
      this.getArticleItemsData(this.$route.params.name, this.$route.params.id);
    },
    savearticleeHandler(item) {},
    cancelarticleeHandler(item) {},
    AddNewArtivleItem() {
      this.modalTitle = "درج";
      // this.$refs.AIModal.show();
      this.$refs.AIModal.showModal();
    }
  }
};
</script>

<style lang="scss">

</style>
