<template>
  <PageWrapper :class="`${prefixCls}`">
    <div class="space-y-3">
      <a-card title="基础资料" :bordered="false">
        <BasicForm @register="registerBaseForm" :labelWrap="true" />
      </a-card>
      <a-card title="订单录入" :bordered="false">
        <!--     label 自动换行处理 -->
        <BasicForm @register="registerOrderForm" :labelWrap="true" />
      </a-card>
      <a-card title="结算设置" :bordered="false">
        <div class="space-y-8">
          <BasicTable @register="registerSttleTable">
            <template #action="{ record }">
              <TableAction
                :actions="[
                  {
                    icon: 'ic:outline-delete-outline',
                    popConfirm: {
                      title: '是否删除？',
                      confirm: handleDeleteContract.bind(null, record),
                    },
                    color: 'error',
                  },
                ]"
              />
            </template>
            <template #footer>
              <a-button type="primary" block @click.stop="addOneContract">
                <PlusOutlined />新增费用
              </a-button>
            </template>
          </BasicTable>
          <!--     label 自动换行处理 -->
          <BasicForm @register="registerSettleForm" :labelWrap="true" />
        </div>
      </a-card>
    </div>
    <template #rightFooter>
      <div>
        <a-button type="primary" @click="save"> {{ $t('common.saveText') }} </a-button>
        <a-button> {{ $t('common.cancelText') }} </a-button>
      </div>
    </template>
  </PageWrapper>
</template>
<script lang="ts">
  import { PageWrapper } from '/@/components/Page';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useService } from '/@/utils';
  import {
    addBusiModel,
    updateBusiModel,
    busiModelInfoById,
    getBusiModelConfigInfoByType,
  } from '/@/api/bas/busiModel';
  import { useRouter, useRoute } from 'vue-router';
  import { BusiModelModel } from '/@/api/bas/model/busiModelModel';
  import { isUnDef } from '/@/utils/is';
  import { Card } from 'ant-design-vue';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form';
  import { onMounted, defineComponent, ref } from 'vue';
  import { getBasFormSchema } from '/@/views/bas/busiModel/Edit/data';
  import { BusiTypeEnums } from '/@/enums/sys/dictEnum';
  import { BusiModelConfigModel, BusiModelConfigType } from '/@/api/bas/model/busiModelConfigModel';
  import { forOwn } from 'lodash-es';
  import { transformSchema } from '/@/views/bas/busiModel/Edit/utils';
  import { BasicTable, TableAction, useTable } from '/@/components/Table';
  import { PlusOutlined } from '@ant-design/icons-vue';
  TableAction;

  export default defineComponent({
    components: {
      [Card.name]: Card,
      BasicForm,
      PageWrapper,
      BasicTable,
      PlusOutlined,
      TableAction,
    },
    setup: () => {
      const { prefixCls } = useDesign('busi-model-form');

      const groupConfigs = ref({} as { [key in BusiModelConfigType]: BusiModelConfigModel[] });
      const { replace } = useRouter();
      const { name: routeName } = useRoute();
      const isAdd = routeName === 'BusiModelListAdd';
      const getBaseFormProps = (schema: FormSchema) =>
        ({
          baseColProps: {
            span: 6,
          },
          labelCol: {
            span: 8,
          },
          schemas: [],
          showActionButtonGroup: false,
          ...schema,
        } as FormSchema);
      /**
       * 基础表单
       */
      const [
        registerBaseForm,
        { validate: validateBaseForm, setFieldsValue: setFieldsValueBaseForm },
      ] = useForm({
        baseColProps: {
          span: 6,
        },
        labelCol: {
          span: 8,
        },
        schemas: getBasFormSchema({ busiTypeChange, isAdd }),
        showActionButtonGroup: false,
      });
      /**
       * 订单表单
       */
      const [registerOrderForm, { setProps: setOrderFormProps, resetFields: resetOrderFields }] =
        useForm({
          baseColProps: {
            span: 6,
          },
          labelCol: {
            span: 8,
          },
          schemas: [],
          showActionButtonGroup: false,
        });
      /**
       * 结算报价科目
       */
      const [
        registerSttleTable,
        { insertTableDataRecord, deleteTableDataRecord: deleteOneSettleData },
      ] = useTable({
        columns: [
          {
            title: 'tempId',
            dataIndex: 'tempId',
            defaultHidden: true,
          },
          {
            title: 'ID',
            dataIndex: 'id',
            defaultHidden: true,
          },
          {
            title: '费用类型',
            dataIndex: 'arapType',
            width: 260,
          },
          {
            title: '费用名称',
            dataIndex: 'arapSubject',
            width: 260,
          },
          {
            title: '应收/应付',
            dataIndex: 'arapType',
            width: 260,
          },
          {
            title: '付款方',
            dataIndex: 'payerId',
            width: 260,
          },
          {
            title: '收款方',
            dataIndex: 'payeeId',
            width: 260,
          },
          {
            title: '产生事件',
            dataIndex: 'generateEvent',
            width: 260,
          },
          {
            title: '汇率取值',
            dataIndex: 'exchrateOrigin',
            width: 260,
          },
          {
            title: '币别',
            dataIndex: 'currency',
            width: 260,
          },
          {
            title: '计算基准',
            dataIndex: 'calculateBase',
            width: 260,
          },
          {
            title: '费率',
            dataIndex: 'arapRate',
            width: 260,
          },
          {
            title: '账期',
            dataIndex: 'arapTermId',
            width: 260,
          },
        ],
        // rowSelection: { type: 'radio' },
        bordered: true,
        maxHeight: 500,
        pagination: false,
        actionColumn: {
          width: 50,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });
      /**
       * 结算参数表单
       */
      const [registerSettleForm, { setProps: setSettleProps, resetFields: resetSettleFields }] =
        useForm(getBaseFormProps({} as FormSchema));

      onMounted(() => {
        setFieldsValueBaseForm({
          bmId: 1,
          pushBusiFlag: true,
          enabledFlag: false,
          tlCustomerFlag: false,
        });
        if (!isAdd) {
          getInfo();
        }
      });

      /**
       * 业务类型变化事件
       * @param type
       */
      async function busiTypeChange(type: keyof typeof BusiTypeEnums) {
        const [res] = await useService(() => getBusiModelConfigInfoByType(type));
        if (res) {
          const { data = [] as BusiModelConfigModel[] } = res;
          const groupData = data.reduce((prev, item) => {
            const temp = (prev[item.configType] = prev[item.configType] ?? []);
            temp.push(item);
            return prev;
          }, {} as { [key in BusiModelConfigType]: BusiModelConfigModel[] });
          forOwn(groupData, (configs = []) => {
            // 排序
            configs.sort((a, b) => {
              if (a.sortNo > b.sortNo) {
                return 1;
              } else if (a.sortNo < b.sortNo) {
                return -1;
              }
              return 0;
            });
          });
          groupConfigs.value = groupData;
          let formSchemaByType = transformSchema(groupData);
          // 清空表单
          resetOrderFields();
          resetSettleFields();
          // 设置表单
          setOrderFormProps({ schemas: formSchemaByType.ORDER ?? [] });
          setSettleProps({ schemas: formSchemaByType.SETTLE ?? [] });
        }
      }

      /**
       * 新增结算费用科目
       */
      function addOneContract() {
        insertTableDataRecord({ tempId: 1, currency: '12' });
      }

      /**
       * 删除结算费用科目
       */
      function handleDeleteContract(d) {
        deleteOneSettleData(d.key);
      }

      /**
       * 保存业务模式
       */
      async function save() {
        // 测试设置数据
        await validateBaseForm();
        if (true) {
          return;
        }
        const [res] = await useService(() =>
          isAdd ? addBusiModel({} as BusiModelModel) : updateBusiModel({} as BusiModelModel),
        );
        if (!isUnDef(res)) {
          if (isAdd) {
            replace({ name: 'BusiModelListEdit', params: { bmId: 1 } });
          }
        }
      }

      /**
       * 获取详情数据
       */
      async function getInfo() {
        await useService(() => busiModelInfoById('1'));
      }
      return {
        prefixCls,
        save,
        registerBaseForm,
        registerOrderForm,
        registerSettleForm,
        groupConfigs,
        registerSttleTable,
        addOneContract,
        handleDeleteContract,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-busi-model-form';
  .@{prefix-cls} {
    display: block;
  }
</style>
