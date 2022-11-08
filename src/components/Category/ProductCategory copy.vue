<template>
  <div class="product-category-container">
    <div class="product-category-toolbar">مدیریت دسته بندی ها</div>
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
      />
    </div>
    <!-- :btns="btns" -->
    <div class="product-category-item">
      <b-modal
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
      </b-modal>
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

export default {
  name: "productcategory",
  components: {
    grid,
    categoryEntry
  },
  data() {
    return {
      selectedRow: {},
      ModifierMode: ModalMode.insert,
      modalTitle: ""
      /* btns: [
        {
          title: "نمایش دسته بندی مقالات",
          onclickEvent: this.showArticle,
          className: " grid-article-btn"
        }
      ]
      */
    };
  },
  created() {
    this.bindDataGrid();
  },
  computed: {
    ...mapGetters({
      categories: "getAllCategories",
      loaded: "getAllProductCategoryLoaded"
    }),
    // getNameOfCourse() {
    //   return this.selectedRow ? this.selectedRow.name : "";
    // },
    getCourseId() {
      return this.$route.params.id;
    },
     getCourseName() {
      return this.$route.params.name;
    },
    headers() {
      return [
        {
          name: "نام"
        },
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
          name: "name"
        },
        {
          name: "title"
        },
        {
          name: "description",
          width: 2
        },
        {
          name: "imageUrl",
          type: GridColumnType.img
        },
        {
          name: "approved",
          type: GridColumnType.Enum,
          list: ApprovedEnumValue
        }
      ];
    }
  },
  methods: {
    ...mapActions(["getAllCategoryData"]),
    selectCategory(index, item) {
      this.selectedRow = item;
    },
    bindDataGrid() {
      const name = this.$route.params.name;
      if (name !== null) {
        this.getAllCategoryData(name);
      }
    },
    showCategory() {
      if (this.selectedRow === null || this.selectedRow === undefined) {
        alert("یک مورد انتخاب نمایید");
      } else {
        this.$router.push("/Article/" + this.selectedRow.Id);
      }
    },
    modalClick() {
      // eslint-disable-next-line
      console.log(888888, item);
    },
    deleteCourse(item) {
      this.modalTitle = "حذف";
      this.ModifierMode = ModalMode.delete;
      //this.selectedRow = item;
      this.$refs.CModal.show();
    },
    editCourse(item) {
      this.modalTitle = "ویرایش";
      this.ModifierMode = ModalMode.edit;
      //this.selectedRow = item;
      this.$refs.CModal.show();
    },
    addNewCourse() {
      this.modalTitle = "درج";
      this.ModifierMode = ModalMode.insert;

      // const courseId = this.getCourseId;
      // this.selectedRow = {
      //   name: "",
      //   title: "",
      //   introInfo: "",
      //   description: "",
      //   courseid: courseId
      // };
      this.$refs.CModal.show();
    },
    saveProduceHandler(newItem, fileRef) {
      this.$refs.CModal.hide();
      this.bindDataGrid();
    },
    cancelProduceHandler() {
      this.$refs.CModal.hide();
    },
    ApprovedItem() {
      if (this.selectedRow === null || this.selectedRow === undefined) {
        alert("یک مورد انتخاب نمایید");
      }
      this.approvedProduct([this.selectedRow.id, this.selectedRow.name]).then(
        info => {
          if (info > 0) {
            this.bindDataGrid();
          }
        }
      );
    }
  }
};
</script>
