<template>
  <div :class="`${prefixCls}  p-4 w-full box-border`">
    <Edit />
  </div>
</template>

<script name="crm.newsettlement.:bmId.add" setup lang="ts">
  import { useDesign } from '/@/hooks/web/useDesign';
  import Edit from './components/Edit.vue';
  /**
   * 样式
   */
  const { prefixCls } = useDesign('crm-settlement-edit');
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-crm-settlement-edit';
  .@{prefix-cls} {
    display: block;
  }
</style>
