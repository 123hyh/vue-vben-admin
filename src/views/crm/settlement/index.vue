<template>
  <div :class="`${prefixCls} w-full box-border`">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="goAddPage"> 新增 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'ant-design:arrow-right-outlined',
              label: '详情',
              onClick: handleGoDtl.bind(null, record),
            },
            {
              label: '删除',
              icon: 'ic:outline-delete-outline',
              popConfirm: {
                title: '是否删除？',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
  </div>
</template>
<script setup lang="ts" name="crm.newsettlement">
  import { onMounted } from 'vue';
  import { getSysBusidocTableSchemaByBusidocCode } from '/@/api/sys/busidoc';
  import { crmBusidocCodeEnum } from '/@/enums/busidoc';
  import { useService } from '/@/utils';
  import { useDesign } from '/@/hooks/web/useDesign';
  import SysBusidocTableSchema from '/@/api/sys/model/sysBusidocTableSchema';
  import { listToTree } from '/@/utils/helper/treeHelper';
  import { BasicColumn, BasicTable, useTable, TableAction } from '/@/components/Table';
  import { busidocTableSchema2BasicColumn } from '/@/utils/helper/busidocHelper';
  import { flow } from 'lodash-es';
  import { getCrmSettlementList, removeCrmSettlement } from '/@/api/crm/settlement';
  import { useRouter } from 'vue-router';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useGo } from '/@/hooks/web/usePage';
  const { hasRoute } = useRouter();
  const routerPush = useGo();

  /**
   * 样式
   */
  const { prefixCls } = useDesign('crm-settlement');

  const [registerTable, { setColumns, reload }] = useTable({
    // title: '多级表头示例',
    api: getCrmSettlementList,
    columns: [],
    bordered: true,
    showTableSetting: true,
    actionColumn: {
      width: 250,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
    onChange: (..._args) => {
      console.log('ant-design-vue，触发的');
    },
    /**
     * 开启表单搜索
     */
    useSearchForm: true,
    formConfig: {
      labelWidth: 100,
      schemas: [
        {
          field: `no`,
          label: `单号`,
          component: 'Input',
          colProps: {
            xl: 12,
            xxl: 8,
          },
        },
      ],
    },
  });

  const { createMessage } = useMessage();
  onMounted(async () => {
    const [res] = await useService(() =>
      getSysBusidocTableSchemaByBusidocCode(crmBusidocCodeEnum.SETTLEMENT),
    );
    if (res != undefined) {
      const { data } = res;
      const h = flow([
        () => listToTree<SysBusidocTableSchema>(data, { pid: 'parentId' }),
        busidocTableSchema2BasicColumn,
      ]) as () => BasicColumn[];
      setColumns(h());
    }
  });

  /**
   * 点击新增按钮
   */
  function goAddPage() {
    if (hasRoute('crm.newsettlement.add.:bmId')) {
      routerPush(`/crm/newsettlement/add/2`);
    } else {
      createMessage.error('没有权限');
    }
  }

  /**
   * 前往详情页
   */
  function handleGoDtl({ id }) {
    if (hasRoute('crm.newsettlement.edit.:id')) {
      routerPush(`/crm/newsettlement/edit/${id}`);
    } else {
      createMessage.error('没有权限');
    }
  }

  async function handleDelete({ id }) {
    const [res] = await useService(() => removeCrmSettlement(id));
    if (res?.code === 0) {
      reload();
      createMessage.success('删除成功！');
    }
    debugger;
  }
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-crm-settlement';
  .@{prefix-cls} {
    color: red;
  }
</style>
