<template>
  <div class="list-view-container">
    <div class="list-view-body">
      <div class="list-view-data-empty" v-if="!hasData">No result</div>
      <div v-else class="list-view-body-content">
        <div
          v-bind:key="index"
          v-for="(item, index) in dataSource"
          class="list-view-row"
          @click="selectRow($event, item, index)"
        >
          <span v-bind:key="index + 1000" class="list-view-row-number">
            ردیف : {{ index + 1 + "" }}
          </span>
          <div
            class="list-view-row-data"
            v-bind:key="colIndex"
            v-for="(col, colIndex) in columns"
            v-bind:title="parseDataValue(item, col)"
          >
            <span
              class="list-view-col"
              v-bind:key="index"
              v-bind:title="headers[colIndex].name"
            >
              {{headers[colIndex].name}} :
            </span>

            <span class="list-view-text"> {{ parseDataValue(item, col) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GridColumnType, BooleanEnumValue } from "../../classes/Enums";
import './../../styles/listview.scss'
export default {
  name: "listview",
  date() {
    return {
      selectedRow: null,
      selectedItem: null
    };
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
      return "list-view-col-" + colNums + " " + coWidth;
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
        this.$removeClass([this.selectedRow], " list-view-row-selected");
      }
      this.selectedItem = undefined;
    },
    selectRow(event, item, index) {
      this.selectedItem = item;
      if (this.selectedRow !== null && this.selectedRow !== undefined) {
        this.$removeClass([this.selectedRow], " list-view-row-selected");
      }
      this.selectedRow = event.target.parentElement;
      this.$addClass([this.selectedRow], " list-view-row-selected");
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
