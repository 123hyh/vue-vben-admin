<template>
  <div :class="`${prefixCls}  p-4 w-full box-border`">
    <Edit />
  </div>
</template>

<script name="crm.newsettlement.:id.edit" setup lang="ts">
  import Edit from './components/Edit.vue';
  import { onMounted, ref } from 'vue';
  import { getCrmSettlementById } from '/@/api/crm/settlement';
  import { useService } from '/@/utils';
  import { useRoute } from 'vue-router';
  import { BasicResponse } from '/@/api/model/baseModel';
  import { SettlementModel } from '/@/api/crm/model/settlementModel';
  import { useDesign } from '/@/hooks/web/useDesign';
  const { prefixCls } = useDesign('crm-settlement-edit');

  const {
    params: { id },
  } = useRoute();
  const data = ref({} as SettlementModel);
  onMounted(async () => {
    if (id) {
      const [res] = await useService<BasicResponse<SettlementModel>>(() =>
        getCrmSettlementById(id as string),
      );
      data.value = (res?.data ?? {}) as SettlementModel;
    }
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-crm-settlement-edit';
  .@{prefix-cls} {
    display: block;
  }
</style>
