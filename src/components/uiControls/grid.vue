<template>
  <div class="grid-container">
    <div v-if="editable" class="grid-toolbar">
      <span
        title="افزودن آیتم جدید"
        @click="AddItem()"
        class="grid-btn grid-add-btn"
        >درج</span
      >

      <span
        title="ویرایش"
        @click="editItem()"
        aria-disabled="!hasData"
        class="grid-btn grid-edit-btn"
        >ویرایش</span
      >

      <span
        title="حذف"
        @click="deleteItem()"
        aria-disabled="!hasData"
        class="grid-btn grid-delete-btn"
        >حذف</span
      >

      <span :key="index" v-for="(item, index) in btns">
        <span
          :title="item.title"
          @click="item.onclickEvent"
          :class="'grid-btn ' + item.className"
          >{{ item.title }}</span
        >
      </span>
    </div>
    <div class="grid-context">
      <div class="grid-body">
        <div class="grid-row header-row">
          <div class="grid-row-number">
            ردیف
          </div>
          <div
            :class="getColClass(colIndex)"
            v-bind:key="colIndex"
            v-for="(item, colIndex) in headers"
            v-bind:title="item.name"
          >
            {{ item.name }}
          </div>
        </div>
        <div class="grid-data-empty" v-if="!hasData">No result</div>
        <div v-else class="grid-body-content">
          <div
            v-bind:key="index"
            v-for="(item, index) in dataSource"
            class="grid-row"
            @click="selectRow($event, item, index)"
          >
            <div v-bind:key="index + 1000" class="grid-row-number">
              {{ index + 1 + "" }}
            </div>
            <div
              :class="getColClass(colIndex)"
              v-bind:key="colIndex"
              v-for="(col, colIndex) in columns"
              v-bind:title="parseDataValue(item, col)"
            >
              <ImageControl
                v-if="isImage(col)"
                :url="item[col.name]"
                :alt="item[col.name]"
                :category="imageCategory"
                :className="'grif-info-image'"
              />

              <span v-else> {{ parseDataValue(item, col) }}</span>
            </div>
          </div>
        </div>
        <div class="grid-row footer-grid-row">
          <span
            title="بروزرسانی"
            @click="refreshGrid()"
            class="grid-btn grid-refresh-btn"
            >بروزرسانی</span
          >
          <div class="footer-recorde-number">{{ dataSource.length }} رکورد</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GridColumnType, BooleanEnumValue } from "../../classes/Enums";
import ImageControl from "./ImageControl";
export default {
  name: "grid",
  date() {
    return {
      selectedRow: null,
      selectedItem: null
    };
  },
  components: {
    ImageControl
  },
  props: {
    dataSource: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    headers: {
      type: Array,
      default: () => []
    },
    editable: {
      type: Boolean,
      default: false
    },
    selectItemHandler: {
      type: Function,
      default: undefined
    },
    addItemHandler: {
      type: Function,
      default: undefined
    },
    deleteItemHandler: {
      type: Function,
      default: undefined
    },
    editItemHandler: {
      type: Function,
      default: undefined
    },
    bindDataHandler: {
      type: Function,
      default: undefined
    },
    btns: {
      type: Array,
      default: () => []
    },
    imageCategory: {
      type: String,
      default: "shared"
    },
    IsIndexNum: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    dataSource: function(value) {
      // eslint-disable-next-line
      console.log(963, value);
    }
  },
  computed: {
    hasData() {
      return this.dataSource && this.dataSource.length > 0;
    }
  },
  methods: {
    isImage(col) {
      return col.type === GridColumnType.img;
    },
    getColClass(colIndex) {
      let colNums = this.columns ? this.columns.length : 1;
      let coWidth = "col-width-1";
      if (
        colIndex != null &&
        this.columns &&
        this.columns.length > 0 &&
        this.columns[colIndex]
      ) {
        if (this.columns[colIndex].width == 2) {
          coWidth = "col-width-2";
        }
      }
      // if (this.editable) {
      colNums++;
      // }
      return "grid-col-" + colNums + " " + coWidth;
    },
    refreshGrid() {
      if (this.bindDataHandler !== null && this.bindDataHandler !== undefined) {
        this.bindDataHandler();
        this.deSelectRow();
      }
    },
    checkSelectedRow() {
      if (this.selectedItem === null || this.selectedItem === undefined) {
        alert("لطفا یک کورد انتخاب نمایید.");
        return false;
      }
      return true;
    },
    deleteItem() {
      if (this.checkSelectedRow()) {
        if (this.editable && this.deleteItemHandler) {
          this.deleteItemHandler(this.selectedItem);
        }
      }
    },
    editItem() {
      if (this.checkSelectedRow()) {
        if (this.editable && this.editItemHandler) {
          this.editItemHandler(this.selectedItem);
        }
      }
    },
    AddItem(event) {
      if (this.editable && this.addItemHandler) {
        this.addItemHandler();
      }
    },
    deSelectRow(event, item, index) {
      if (this.selectedRow !== null && this.selectedRow !== undefined) {
        this.$removeClass([this.selectedRow], " grid-row-selected");
      }
      this.selectedItem = undefined;
    },
    selectRow(event, item, index) {
      this.selectedItem = item;
      if (this.selectedRow !== null && this.selectedRow !== undefined) {
        this.$removeClass([this.selectedRow], " grid-row-selected");
      }
      this.selectedRow = event.target.parentElement;
      this.$addClass([this.selectedRow], " grid-row-selected");
      if (this.selectItemHandler) {
        this.selectItemHandler(index, item);
      }
    },
    parseDataValue: function(item, col) {
      let data = item[col.name];

      if (col.type === GridColumnType.Boolean) {
        return data ? BooleanEnumValue.true : BooleanEnumValue.false;
      } else if (col.type === GridColumnType.img) {
        return data;
      } else if (col.type === GridColumnType.Enum) {
        return col.list[data + ""];
      } else {
        return data;
      }
    }
  }
};
</script>
