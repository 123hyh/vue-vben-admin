<template>
  <PageWrapper class="high-form" :title="`${isNewModel ? '新增' : '编辑'}结算方案`">
    <CollapseContainer title="基础资料">
      <BasicForm :labelWidth="150" @register="register" />
    </CollapseContainer>

    <template #rightFooter>
      <slot name="rightFooter"></slot>
    </template>
  </PageWrapper>
</template>

<script name="edit" setup lang="ts">
  import { BasicForm, useForm } from '/@/components/Form';
  import { PageWrapper } from '/@/components/Page';
  import { schemas } from './data';
  import { CollapseContainer } from '/@/components/Container';
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';
  import { getInitialVo, SettlemetnVoModel } from '/@/api/crm/model/settlementModel';
  import { cloneDeep } from 'lodash-es';

  const { path } = useRoute(),
    props = defineProps({
      data: {
        type: Object,
        default: () => getInitialVo(),
      },
    }),
    emit = defineEmits(['register']),
    /**
     * 是否新增
     */
    isNewModel = computed(() => !/\/crm\/settlement\/\w+\/add/.test(path ?? ''));

  const [register, methods] = useForm({
    baseColProps: {
      span: 6,
    },
    schemas: schemas({
      isNew: isNewModel.value,
    }),
    showActionButtonGroup: false,
    model: props.data,
  });

  emit('register', {
    methods: {
      validate: async () => {
        const [x] = await Promise.all([methods.validate()]);
        return { baseData: x };
      },
      setFormData: (data: SettlemetnVoModel) => {
        methods.setFieldsValue(cloneDeep(data.baseData));
        methods.clearValidate();
      },
    },
  });
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-crm-settlement-edit';
  .@{prefix-cls} {
    display: block;
  }
</style>
