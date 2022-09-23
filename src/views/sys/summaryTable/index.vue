<template>
  <div :class="`${prefixCls} w-full box-border`">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button v-if="false" type="primary" @click="goAddPage"> 导出 </a-button>
      </template>
    </BasicTable>
  </div>
</template>
<script setup lang="ts" name="Sys.summaryTable">
  import { onMounted } from 'vue';
  import { getDataBySysDataSourceId, getSysTableSchemaById } from '/@/api/sys/tableSchema';
  import { useService } from '/@/utils';
  import { useDesign } from '/@/hooks/web/useDesign';
  import SysBusidocTableSchema from '/@/api/sys/model/sysBusidocTableSchema';
  import { listToTree } from '/@/utils/helper/treeHelper';
  import { BasicColumn, BasicTable, useTable } from '/@/components/Table';
  import { busidocTableSchema2BasicColumn } from '/@/utils/helper/busidocHelper';
  import { flow } from 'lodash-es';

  /**
   * 样式
   */
  const { prefixCls } = useDesign('crm-settlement');
  const [registerTable, { setColumns, setProps, reload }] = useTable({
    // title: '多级表头示例',
    // api: () => getDataBySysDataSourceId(dataSourceId, {}),
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
    /*  formConfig: {
      labelWidth: 100,
      schemas: [
        {
          field: `no`,
          label: `单号`,
          component: 'RangePicker',
          colProps: {
            xl: 12,
            xxl: 8,
          },
        },
      ],
    },*/
  });

  onMounted(async () => {
    const [res] = await useService(() => getSysTableSchemaById(1));
    if (res != undefined) {
      const { data } = res;
      const { columns = [], searchs = [], dataSourceId } = data;

      // 1、设置列配置
      columns.forEach((item) => {
        // 码值处理
        if (item.dict) {
          const labelByVal = item.dictDataList.reduce((prev, d) => {
            prev[d.dictValue] = d.dictLabel;
            return prev;
          }, {});
          item.format = (v) => labelByVal[v];
        }
        return item;
      });
      const h = flow([
        () => listToTree<SysBusidocTableSchema>(columns, { pid: 'parentId' }),
        busidocTableSchema2BasicColumn,
      ]) as () => BasicColumn[];
      setColumns(h());
      setProps({
        api: apiFun(
          dataSourceId,
          searchs.reduce((prev, item) => {
            prev[item.field] = item;
            return prev;
          }, {}),
        ),
        // api: (newForm) => getDataBySysDataSourceId(dataSourceId, newForm),
        // 查询栏
        formConfig: {
          labelWidth: 100,
          schemas: searchs.map((item) => {
            const { component, cnLabel: label, field } = item;
            return {
              component,
              label,
              field,
              colProps: {
                xl: 12,
                xxl: 8,
              },
              // 组件 props 参数
              componentProps: {
                options: (item.dictDataList ?? []).map(({ dictLabel, dictValue }) => ({
                  value: dictValue,
                  label: dictLabel,
                })),
              },
            };
          }),
        },
      });
      reload();
    }
  });

  function apiFun(dataSourceId: string, searchMap: { [prop: string]: any }) {
    const wihteField = new Set(['pageSize', 'pageNum', 'orderByColumn', 'isAsc']);
    return (searchForm = {}) => {
      const newForm = Object.keys(searchForm).reduce((prev, key) => {
        const curData = searchForm[key];

        if (curData === undefined) {
          return prev;
        }

        if (wihteField.has(key)) {
          prev[key] = curData;
          return prev;
        }
        const { component, field } = searchMap[key];

        if (component === 'RangePicker') {
          prev[`${field}Begin`] = curData[0];
          prev[`${field}End`] = curData[1];
        } else {
          prev[key] = curData;
        }
        return prev;
      }, {});
      return getDataBySysDataSourceId(dataSourceId, newForm);
    };
  }
  /**
   * 点击新增按钮
   */
  function goAddPage() {}
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-crm-settlement';
  .@{prefix-cls} {
    color: red;
  }
</style>
