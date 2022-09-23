<template>
  <div :class="`${prefixCls} h-full w-full box-border`">
    <Edit :data="getInitialVo()" @register="onRegister">
      <template #rightFooter>
        <div class="space-x-2">
          <Button @click="go('/crm/newsettlement')">
            <template #icon>
              <LeftCircleOutlined />
            </template>
            返回列表
          </Button>
          <Button type="primary" @click="saveFn"> <SaveOutlined /> 保存 </Button>
          <!-- <Button type="primary" @click="onSubmit"> 提交 </Button> -->
        </div>
      </template>
    </Edit>
  </div>
</template>

<script name="crm.newsettlement.:id.edit" setup lang="ts">
  import { LeftCircleOutlined, SaveOutlined } from '@ant-design/icons-vue';
  import { Button } from 'ant-design-vue';
  import Edit from './components/Edit.vue';
  import { onMounted, ref } from 'vue';
  import { getCrmSettlementById } from '/@/api/crm/settlement';
  import { useService } from '/@/utils';
  import { useRoute } from 'vue-router';
  import { BasicResponse } from '/@/api/model/baseModel';
  import { getInitialVo, SettlemetnVoModel } from '/@/api/crm/model/settlementModel';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useSave, useSwitchTab } from './hooks/index';

  const { prefixCls } = useDesign('crm-settlement-edit');
  let setFormData: (d: SettlemetnVoModel) => Promise<void>;
  let saveFn = ref(null as unknown as () => Promise<SettlemetnVoModel>);
  const {
    params: { id },
  } = useRoute();

  const { go } = useSwitchTab();

  function onRegister(data) {
    setFormData = data.methods.setFormData as (d: SettlemetnVoModel) => Promise<void>;
    const { save } = useSave({
      validate: data?.methods?.validate,
      isNew: false,
    });
    saveFn.value = save;
  }

  onMounted(async () => {
    if (id) {
      const [res] = await useService<BasicResponse<SettlemetnVoModel>>(() =>
        getCrmSettlementById(id as string),
      );
      setFormData(res?.data as SettlemetnVoModel);
    }
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-crm-settlement-edit';
  .@{prefix-cls} {
    display: block;
  }
</style>
