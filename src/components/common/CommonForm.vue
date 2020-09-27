<template>
  <el-form :inline="inline" :model="form" ref="form" label-width="100px">
    <el-form-item
      v-for="item in formLabel"
      :key="item.prop"
      :label="item.label"
    >
      <el-input
        v-model="form[item.prop]"
        :placeholder="'请输入' + item.label"
        v-if="!item.type"
      ></el-input>
      <el-select
        v-model="form[item.prop]"
        placeholder="请选择"
        v-if="item.type === 'select'"
      >
        <el-option
          v-for="optionItem in item.opts"
          :key="optionItem.value"
          :label="optionItem.label"
          :value="optionItem.value"
        ></el-option>
      </el-select>
      <el-radio-group v-model="form[item.prop]" v-if="item.type === 'radio'">
        <el-radio
          v-for="radioItem in item.radio"
          :key="radioItem.value"
          :label="radioItem.value"
          >{{ radioItem.label }}</el-radio
        >
      </el-radio-group>
      <el-switch
        v-model="form[item.prop]"
        active-color="#13ce66"
        inactive-color="#ff4949"
        v-if="item.type === 'switch'"
      ></el-switch>
      <el-date-picker
        type="date"
        placeholder="选择日期"
        v-model="form[item.prop]"
        v-if="item.type === 'date'"
      ></el-date-picker>
    </el-form-item>
    <el-form-item>
      <slot></slot>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    inline: Boolean,
    form: Object,
    formLabel: Array
  }
}
</script>

<style lang="scss" scoped></style>
