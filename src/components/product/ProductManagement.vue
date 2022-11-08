<template>
  <div class="product-management-container">
    <!-- <div class="product-management-toolbar">مدیریت دوره ها</div> -->
    <h3>مدیریت دوره ها</h3>
    <div v-if="!loaded" class="data-loading" />
    <div class="product-management-grid">
      <grid
        :data-source="products"
        :columns="Columns"
        :headers="headers"
        :editable="true"
        :deleteItemHandler="deleteCourse"
        :addItemHandler="addNewCourse"
        :selectItemHandler="selectCourse"
        :editItemHandler="editCourse"
        :bindDataHandler="bindDataGrid"
        :btns="btns"
        imageCategory="course"
      />
    </div>
    <div class="management-error">{{ errormsg }}</div>
    <div class="product-management-item">
      <!-- <b-modal
        :no-close-on-backdrop="true"
        ref="PModal"
        :title="modalTitle"
        ok-title="تایید"
        cancel-title="انصراف"
        @click="modalClick($event)"
        header-close-label="انصراف و بستن"
        :hide-footer="true"
        role="modal"
      >
        <div dir="rtl">
          <ProductEntry
            :ModeType="ModifierMode"
            :productname="getNameOfCourse"
            :saveEventHandler="saveProduceHandler"
            :cancelEventHandler="cancelProduceHandler"
          />
        </div>
      </b-modal> -->
      <Modal ref="PModal" :modalTitle="modalTitle">
        <div dir="rtl">
          <ProductEntry
            :ModeType="ModifierMode"
            :productname="getNameOfCourse"
            :saveEventHandler="saveProduceHandler"
            :cancelEventHandler="cancelProduceHandler"
          />
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import grid from "../uiControls/grid";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { mapGetters, mapActions } from "vuex";
import ProductEntry from "./ProductEntry";

import {
  GridColumnType,
  ApprovedEnumValue,
  BooleanEnumValue,
  ModalMode
} from "../../classes/Enums";
import Modal from "./../uiControls/Modal";

export default {
  name: "productmanagement",
  components: {
    grid,
    ProductEntry,
    Modal
  },
  data() {
    return {
      selectedRow: undefined,
      modalTitle: "",
      ModifierMode: ModalMode.insert,
      btns: [
        {
          title: "تایید ",
          onclickEvent: this.ApproveItem,
          className: " grid-approved-btn"
        },
        {
          title: " دسته بندی مرتبط",
          onclickEvent: this.showCategory,
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
      products: "getProducts",
      loaded: "getProductsLoaded",
      errormsg: "getProductsError"
    }),
    getNameOfCourse() {
      return this.selectedRow ? this.selectedRow.Name : "";
    },
    headers() {
      return [
        {
          name: "نام"
        },
        {
          name: "عنوان",
          width: 2
        },
        // {
        //   name: "اطلاعات اولیه",
        //   width: 2
        // },
        {
          name: "تصویر",
          type: GridColumnType.img
        },
        {
          name: "آیا جدید است؟",
          type: GridColumnType.Boolean,
          list: BooleanEnumValue
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
          name: "Name"
        },
        {
          name: "Title",
          width: 2
        },
        // {
        //   name: "Description",
        //   width: 2
        // },
        {
          name: "ImageUrl",
          type: GridColumnType.img
        },
        {
          name: "IsNew",
          type: GridColumnType.Boolean
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
    ...mapActions(["getProductsData", "approvedProduct"]),
    bindDataGrid() {
      this.getProductsData();
    },
    selectCourse(index, item) {
      this.selectedRow = item;
    },
    isThereAnySelectedItem(showMessage) {
      if (this.selectedRow === null || this.selectedRow === undefined) {
        if (showMessage) {
          alert("یک مورد انتخاب نمایید");
          return false;
        }
      } else {
        return true;
      }
    },
    ApproveItem() {
      if (this.isThereAnySelectedItem(true)) {
        this.ApprovedItem();
      }
    },
    showCategory() {
      if (this.isThereAnySelectedItem(true)) {
        this.$router.push(
          "/ProductCategory/" +
            this.selectedRow.Name +
            "/" +
            this.selectedRow.Id
        );
      }
    },
    modalClick() {
      // eslint-disable-next-line
      console.log(item);
    },
    deleteCourse() {
      this.modalTitle = "حذف";
      this.ModifierMode = ModalMode.delete;
      //  this.selectedRow = item;
      this.$refs.PModal.showModal();
      //  this.bindDataGrid();
    },
    editCourse() {
      this.modalTitle = "ویرایش";
      this.ModifierMode = ModalMode.edit;
      // this.selectedRow = item;
      this.$refs.PModal.showModal();
      // this.bindDataGrid();
    },
    addNewCourse() {
      this.$refs.PModal.showModal();

      this.modalTitle = "درج";
      this.ModifierMode = ModalMode.insert;
      //   this.selectedRow = undefined;

      this.selectedRow = {
        Name: "empty",
        Title: "",
        IntroInfo: "",
        IsNew: false
      };
      // this.bindDataGrid();
    },
    saveProduceHandler(event, product, fileRef) {
      try {
        this.$refs.PModal.hideModal();
        this.bindDataGrid();
      } catch (e) {
        alert(e);
      }
    },
    cancelProduceHandler() {
      this.$refs.PModal.hideModal();
    },
    ApprovedItem() {
      if (this.isThereAnySelectedItem(true)) {
        this.approvedProduct([this.selectedRow.Id, this.selectedRow.Name]).then(
          info => {
            if (info > 0) {
              this.bindDataGrid();
            }
          }
        );
      }
    }
  }
};
</script>
