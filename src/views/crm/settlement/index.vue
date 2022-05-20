<template>
  <div :class="`${prefixCls} p-4 w-full box-border`">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="goAddPage"> 新增 </a-button>
        <a-button type="primary" @click="goEditPage"> 编辑 </a-button>
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
  import { BasicColumn, BasicTable, useTable } from '/@/components/Table';
  import { busidocTableSchema2BasicColumn } from '/@/utils/helper/busidocHelper';
  import { flow } from 'lodash-es';
  import { getCrmSettlementList } from '/@/api/crm/settlement';
  import { getFormConfig } from '../../demo/table/tableData';
  import { useRouter } from 'vue-router';

  const { hasRoute, push: routerPush } = useRouter();
  import { message } from 'ant-design-vue';

  /**
   * 样式
   */
  const { prefixCls } = useDesign('crm-settlement');

  const [registerTable, { setColumns }] = useTable({
    // title: '多级表头示例',
    api: getCrmSettlementList,
    columns: [],
    bordered: true,
    showTableSetting: true,
    onChange: (..._args) => {
      console.log('ant-design-vue，触发的');
    },
    /**
     * 开启表单搜索
     */
    useSearchForm: true,
    formConfig: getFormConfig(),
  });
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
    if (hasRoute('crm.newsettlement.:bmId.add')) {
      routerPush(`/crm/newsettlement/2/add`);
    } else {
      message.error('没有权限');
    }
  }

  function goEditPage() {
    if (hasRoute('crm.newsettlement.:id.edit')) {
      routerPush(`/crm/newsettlement/1222/edit`);
    } else {
      message.error('没有权限');
    }
  }
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-crm-settlement';
  .@{prefix-cls} {
    color: red;
  }
</style>
