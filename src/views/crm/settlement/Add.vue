<template>
  <div :class="`${prefixCls} h-full w-full box-border`">
    <Edit :data="getInitialVo()" @register="onRegister">
      <template #rightFooter>
        <div class="space-x-2">
          <Button type="primary" @click="onSave"> 保存 </Button>
        </div>
      </template>
    </Edit>
  </div>
</template>

<script name="crm.newsettlement.:bmId.add" setup lang="ts">
  import { useDesign } from '/@/hooks/web/useDesign';
  import Edit from './components/Edit.vue';
  import { Button } from 'ant-design-vue';
  import { getInitialVo, SettlemetnVoModel } from '/@/api/crm/model/settlementModel';
  import { useSave } from './hooks/index';
  import { useRouter } from 'vue-router';
  import { useMultipleTabStore } from '/@/store/modules/multipleTab';
  const router = useRouter();
  const tabStore = useMultipleTabStore();
  let saveFn: () => Promise<SettlemetnVoModel>;
  /**
   * 样式
   */
  const { prefixCls } = useDesign('crm-settlement-edit');
  function onRegister(data) {
    const { save } = useSave({
      validate: data?.methods?.validate,
      isNew: true,
    });
    saveFn = save;
  }

  /**
   * 保存单据
   */
  async function onSave() {
    const data = await saveFn();
    tabStore.closeTab(router.currentRoute.value, router);
    router.replace({ path: `/crm/newsettlement/edit/${data.baseData.id}` });
  }
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-crm-settlement-edit';
  .@{prefix-cls} {
    .ant-input-number {
      width: 100%;
    }
  }
</style>
