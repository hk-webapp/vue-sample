<template>
  <div class="product-category-container">
    <!-- <div class="product-category-toolbar">مدیریت دسته بندی ها</div> -->
    <h4>مدیریت دسته بندی ها</h4>
    <h6 class="product-category-return-back">
      <router-link
        :to="{
          name: 'courseMngPage'
        }"
        >بازگشت به مدیریت دوره ها</router-link
      >
    </h6>
    <div v-if="!loaded" class="data-loading" />
    <div class="product-category-grid">
      <grid
        :data-source="categories"
        :columns="Columns"
        :headers="headers"
        :editable="true"
        :deleteItemHandler="deleteCourse"
        :addItemHandler="addNewCourse"
        :selectItemHandler="selectCategory"
        :editItemHandler="editCourse"
        :bindDataHandler="bindDataGrid"
        :btns="btns"
        imageCategory="category"
      />
    </div>
    <div class="app-error">{{ errormsg }}</div>
    <div class="product-category-item">
      <!-- <b-modal
        :no-close-on-backdrop="true"
        ref="CModal"
        :title="modalTitle"
        ok-title="تایید"
        cancel-title="انصراف"
        @click="modalClick($event)"
        header-close-label="انصراف و بستن"
        :hide-footer="true"
        role="modal"
      >
        <div dir="rtl">
          <categoryEntry
            :ModeType="ModifierMode"
            :courseName="getCourseName"
            :courseId="getCourseId"
            :saveEventHandler="saveProduceHandler"
            :cancelEventHandler="cancelProduceHandler"
          />
        </div>
      </b-modal> -->
      <Model ref="CModal" :modalTitle="modalTitle">
        <div dir="rtl">
          <categoryEntry
            :ModeType="ModifierMode"
            :courseName="getCourseName"
            :courseId="getCourseId"
            :saveEventHandler="saveProduceHandler"
            :cancelEventHandler="cancelProduceHandler"
          />
        </div>
      </Model>
    </div>
  </div>
</template>

<script>
import grid from "../uiControls/grid";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { mapGetters, mapActions } from "vuex";
import {
  GridColumnType,
  ApprovedEnumValue,
  ModalMode
} from "../../classes/Enums";
import categoryEntry from "../Category/CategoryEntry";
import Model from "./../uiControls/Modal";
export default {
  name: "productcategory",
  components: {
    grid,
    categoryEntry,
    Model
  },
  data() {
    return {
      selectedRow: {},
      ModifierMode: ModalMode.insert,
      modalTitle: "",
      btns: [
        {
          title: "تایید",
          onclickEvent: this.ApproveItem,
          className: " grid-approved-btn"
        },
        {
          title: " مقالات مرتبط",
          onclickEvent: this.showCategory,
          className: " grid-articles-btn"
        }
      ]
    };
  },
  created() {
    this.selectedRow = null;
    this.bindDataGrid();
  },
  computed: {
    ...mapGetters({
      categories: "getAllCategories",
      loaded: "getAllProductCategoryLoaded",
      errormsg: "geterrorMsg"
    }),
    getCourseId() {
      return this.$route.params.id;
    },
    getCourseName() {
      return this.$route.params.name;
    },
    headers() {
      return [
        {
          name: "عنوان"
        },
        {
          name: "توضبحات",
          width: 2
        },
        {
          name: "تصویر",
          type: GridColumnType.img
        },
        {
          name: "وضعیت تایید",
          type: GridColumnType.Enum,
          list: ApprovedEnumValue
        }
      ];
    },
    Columns() {
      return [
        {
          name: "Title"
        },
        {
          name: "Description",
          width: 2
        },
        {
          name: "ImageUrl",
          type: GridColumnType.img
        },
        {
          name: "Approved",
          type: GridColumnType.Enum,
          list: ApprovedEnumValue
        }
      ];
    }
  },
  methods: {
    ...mapActions([
      "getAllCategoryData",
      "setCurrentItem",
      "getEmptyCategoryData",
      "approvedCategory"
    ]),
    selectCategory(index, item) {
      this.selectedRow = item;
      this.setCurrentItem(item);
    },
    bindDataGrid() {
      this.selectedRow = undefined;
      this.setCurrentItem(undefined);
      const name = this.$route.params.name;
      if (name !== null) {
        this.getAllCategoryData(name);
      }
    },
    showCategory() {
      if (this.isThereAnySelectedItem(true)) {
        this.$router.push(
          "/Articles/" + this.selectedRow.Name + "/" + this.selectedRow.Id
        );
      }
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

    ApproveItem() {
      if (this.isThereAnySelectedItem(true)) {
        this.ApprovedItem();
      }
    },
    modalClick() {
      // eslint-disable-next-line
      console.log(888888, item);
    },
    deleteCourse(item) {
      this.modalTitle = "حذف";
      this.ModifierMode = ModalMode.delete;
      this.selectedRow = item;
      if (this.isThereAnySelectedItem(true)) {
        this.$refs.CModal.showModal();
      }
    },
    editCourse(item) {
      this.modalTitle = "ویرایش";
      this.ModifierMode = ModalMode.edit;
      this.selectedRow = item;
      if (this.isThereAnySelectedItem(true)) {
        this.$refs.CModal.showModal();
      }
    },
    addNewCourse() {
      this.modalTitle = "درج";
      this.ModifierMode = ModalMode.insert;
      this.getEmptyCategoryData(this.$route.params.name);

      const courseId = this.getCourseId;
      this.selectedRow = {
        Name: "",
        Title: "",
        Id: 0,
        Description: "",
        IsNew: false,
        Courseid: courseId
      };

      this.setCurrentItem(this.selectedRow);

      this.$refs.CModal.showModal();
    },
    saveProduceHandler(newItem, fileRef) {
      this.$refs.CModal.hideModal();
      this.bindDataGrid();
    },
    cancelProduceHandler() {
      this.$refs.CModal.hideModal();
    },
    ApprovedItem() {
      if (this.isThereAnySelectedItem(true)) {
        this.approvedCategory([
          this.selectedRow.Id,
          this.selectedRow.Name
        ]).then(info => {
          if (info > 0) {
            this.bindDataGrid();
          }
        });
      }
    }
  }
};
</script>
