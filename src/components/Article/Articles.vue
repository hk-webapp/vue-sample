<template>
  <div class="articles-management-container">
    <h4>مدیریت مقالات</h4>
    <h6 class="product-category-return-back">
      <router-link
        :to="{
          name: 'categorymng'
        }"
        >بازگشت به دسته یندی ها</router-link
      >
    </h6>
    <div v-if="!loaded" class="data-loading" />
    <div class="articles-management-grid">
      <grid
        :data-source="articles"
        :columns="Columns"
        :headers="headers"
        :editable="true"
        :addItemHandler="addNewArticle"
        :selectItemHandler="selectArticle"
        :editItemHandler="editArticle"
        :bindDataHandler="bindDataGrid"
        :btns="btns"
        :deleteItemHandler="deleteArticle"
      />
    </div>
    <div class="management-error">{{ errorMsg }}</div>
    <div class="articles-management-item">
      <!-- <b-modal
        :no-close-on-backdrop="true"
        ref="AModal"
        :title="modalTitle"
        ok-title="تایید"
        cancel-title="انصراف"
        @click="modalClick($event)"
        header-close-label="انصراف و بستن"
        :hide-footer="true"
        role="modal"
      >
        <div dir="rtl">
          <ArticleItem
            :ModeType="ModifierMode"
            :articleId="articleId"
            :articleName="articleName"
            :saveEventHandler="savearticleeHandler"
            :cancelEventHandler="cancelarticleeHandler"
          />
        </div>
      </b-modal> -->
      <Modal ref="AModal" :modalTitle="modalTitle">
        <div dir="rtl">
          <ArticleItem
            :ModeType="ModifierMode"
            :articleId="articleId"
            :articleName="articleName"
            :saveEventHandler="savearticleeHandler"
            :cancelEventHandler="cancelarticleeHandler"
          />
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import grid from "../uiControls/grid";
import ArticleItem from "./ArticleItem";
import "./../../styles/articles.scss";
import {
  GridColumnType,
  ApprovedEnumValue,
  ModalMode,
  ArticleLevelValue
} from "../../classes/Enums";
import Modal from "./../uiControls/Modal";
export default {
  name: "articles",
  components: {
    grid,
    ArticleItem,
    Modal
  },
  data() {
    return {
      selectedRow: undefined,
      modalTitle: "",
      ModifierMode: ModalMode.insert,
      btns: [
        {
          title: "تایید",
          onclickEvent: this.ApprovedItem,
          className: " grid-approved-btn"
        },
        {
          title: " متن مقاله",
          onclickEvent: this.showArticleText,
          className: " grid-categories-btn"
        }
      ]
    };
  },
  created() {
    this.bindDataGrid();
  },
  computed: {
    ...mapGetters({
      articles: "getArticles",
      errorMsg: "getArticleError",
      loaded: "getArticleLoaded"
    }),
    categoryName() {
      return this.$route.params.name;
    },
    categoryId() {
      return this.$route.params.id;
    },
    articleName() {
      return this.selectedRow ? this.selectedRow.Name : "";
    },
    articleId() {
      return this.selectedRow ? this.selectedRow.Id : 0;
    },
    Columns() {
      return [
        // { name: "Name" },
        { name: "Title", width: 2 },
        { name: "ImageUrl" },
        { name: "Level", type: GridColumnType.Enum, list: ArticleLevelValue },
        { name: "Index" },
        { name: "Approved", type: GridColumnType.Enum, list: ApprovedEnumValue }
      ];
    },
    headers() {
      return [
        // { name: "نام" },
        { name: "عنوان", width: 2 },
        { name: "تصویر" },
        { name: "سطح مقاله" },
        { name: "ترتیب" },
        { name: "تایید شده" }
      ];
    }
  },
  methods: {
    ...mapActions(["getArticleData", "approvedArticle", "getArticle"]),
    bindDataGrid() {
      this.getArticleData([this.categoryName, this.categoryId]);
    },
    isThereAnySelectedItem(showMessage) {
      if (this.selectedRow === null || this.selectedRow === undefined) {
        if (showMessage) {
          alert("لطفا یک مورد انتخاب نمایید.");
        }
        return false;
      }
      return true;
    },
    showArticleText() {
      if (this.isThereAnySelectedItem(true)) {
        this.$router.push(
          "/ArticleList/" + this.selectedRow.Name + "/" + this.selectedRow.Id
        );
      }
    },
    selectArticle(index, item) {
      this.selectedRow = item;
    },
    addNewArticle() {
      this.modalTitle = "درج";
      this.ModifierMode = ModalMode.insert;
      this.getArticle("empty");
      this.$refs.AModal.showModal();
    },
    deleteArticle() {
      if (this.isThereAnySelectedItem(true)) {
        this.modalTitle = "حذف";
        this.ModifierMode = ModalMode.delete;
        this.getArticle(this.selectedRow.Name);
        this.$refs.AModal.showModal();
      }
    },
    editArticle() {
      if (this.isThereAnySelectedItem(true)) {
        this.modalTitle = "ویرایش";
        this.ModifierMode = ModalMode.edit;
        this.getArticle(this.selectedRow.Name);
        // this.selectedRow = item;
        this.$refs.AModal.showModal();
      }
    },
    savearticleeHandler() {
      try {
        this.$refs.AModal.hideModal();
        this.bindDataGrid();
      } catch (e) {
        alert(e);
      }
    },
    cancelarticleeHandler() {
      this.$refs.AModal.hideModal();
    },
    ApprovedItem() {
      if (this.isThereAnySelectedItem(true)) {
        this.approvedArticle(this.selectedRow).then(info => {
          if (info > 0) {
            this.bindDataGrid();
          }
        });
      }
    }
  }
};
</script>
