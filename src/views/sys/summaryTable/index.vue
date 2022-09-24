<script lang="ts">
  import { onMounted, shallowRef, defineComponent } from 'vue';
  import { getDataBySysDataSourceId, getSysTableSchemaById } from '/@/api/sys/tableSchema';
  import { useService } from '/@/utils';
  import { useDesign } from '/@/hooks/web/useDesign';
  import SysBusidocTableSchema from '/@/api/sys/model/sysBusidocTableSchema';
  import { listToTree } from '/@/utils/helper/treeHelper';
  import { BasicColumn, BasicTable, useTable } from '/@/components/Table';
  import { busidocTableSchema2BasicColumn } from '/@/utils/helper/busidocHelper';
  import { cloneDeep, flow, get } from 'lodash-es';
  import componentSetting from '/@/settings/componentSetting';
  import { isEmpty, isUnDef } from '/@/utils/is';
  import { useRoute } from 'vue-router';
  import qs from 'qs';
  import { useMessage } from '/@/hooks/web/useMessage';
  import ExportExcelButton from './ExportExcelButton.vue';
  import {
    SysSummaryTableSchemaModel,
    type SummaryTableSearchModel,
  } from '/@/api/sys/model/summaryTableModel';
  import { thousands } from '/@/utils/numberUtils';
  import { useComponentRegister } from '/@/components/Form';
  import NumberRangeFormItem from './NumberRangeFormItem.vue';
  export default defineComponent({
    name: 'SysSummaryTable',
    components: {
      BasicTable,
      ExportExcelButton,
    },
    setup: () => {
      useComponentRegister('NumberRange', NumberRangeFormItem);
      /**
       * 样式
       */
      const { prefixCls } = useDesign('summary-table');
      const { createMessage } = useMessage();
      const { fullPath } = useRoute();
      const originalPath = decodeURIComponent(fullPath);
      if (originalPath.indexOf('?') === -1) {
        return createMessage.error('请配置初始参数');
      }
      const { id: summaryId, ...query } = qs.parse(
        originalPath.substring(originalPath.indexOf('?') + 1),
      );
      const [registerTable, { setColumns, setProps, reload, getForm }] = useTable({
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
      });

      let columnsSchema = shallowRef([] as BasicColumn[]);
      let dataSourceIdTop = '';
      let searchsTop = [] as SummaryTableSearchModel[];
      let dictMapByType = {} as { [prop: string]: { [prop: string]: string } };

      onMounted(async () => {
        const [res, err] = await useService(() =>
          getSysTableSchemaById(summaryId as unknown as number),
        );

        if (!isUnDef(err)) {
          console.error(err);
          return;
        }

        if (res !== undefined) {
          const { data } = res;
          const { columns = [], searchs = [], dataSourceId, currentUserOrgId } = data;
          // 赋值当前用户的 orgid
          query.orgId = currentUserOrgId;
          dataSourceIdTop = dataSourceId;
          searchsTop = searchs;

          dictMapByType = columns
            .filter((item) => !isEmpty(item.dict))
            .reduce((prev, dItem) => {
              prev[dItem.dict] = (dItem.dictDataList ?? []).reduce((prev, dItem) => {
                prev[dItem.dictValue] = dItem.dictLabel;
                return prev;
              }, {});
              return prev;
            }, {});

          columnsSchema.value = columns as BasicColumn[];

          const h = flow([
            () => listToTree<SysBusidocTableSchema>(columns, { pid: 'parentId' }),
            busidocTableSchema2BasicColumn,
          ]) as () => BasicColumn[];
          setColumns(h());
          setProps({
            api: apiFun(dataSourceId, false),
            // 请求后置处理
            afterFetch: tableResponseHandler(columns, false),
            // 查询栏
            formConfig: {
              labelWidth: 100,
              autoAdvancedLine: 1, // 默认显示一行查询栏
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
          // 刷新表格数据
          reload();
        }
      });

      /**
       * api
       * @param dataSourceId 数据源id
       * @param isExport 是否导出
       */
      function apiFun(dataSourceId: string, isExport = false) {
        const searchMap = searchsTop.reduce((prev, item) => {
          prev[item.field] = item;
          return prev;
        }, {});
        const {
          table: { fetchSetting },
        } = componentSetting;
        const wihteField = new Set([
          fetchSetting.sizeField,
          fetchSetting.pageField,
          'orderByColumn',
          'isAsc',
        ]);
        return (searchForm = {}) => {
          const newForm = Object.keys(searchForm).reduce(
            (prev, key) => {
              const curData = searchForm[key];

              if (curData === undefined) {
                return prev;
              }

              if (wihteField.has(key)) {
                prev[key] = curData;
                return prev;
              }
              const { component, field } = searchMap[key];

              if (component === 'RangePicker' || component === 'NumberRange') {
                prev[`${field}Begin`] = curData[0];
                prev[`${field}End`] = curData[1];
              } else {
                prev[key] = curData;
              }
              return prev;
            },
            { ...query },
          ) as { [props: string]: any };

          // 导出 excel 设置
          if (isExport) {
            newForm[fetchSetting.pageField] = 1;
            newForm[fetchSetting.sizeField] = 999999;
          }
          return getDataBySysDataSourceId(dataSourceId, newForm);
        };
      }

      /**
       * 注册 excel 导出
       * @param getOptionsFn
       */
      function registerExportTable(getOptionsFn) {
        const { getFieldsValue } = getForm();
        return getOptionsFn({
          api: () => apiFun(dataSourceIdTop, true)(getFieldsValue()),
          columnsSchema,
          tableResponseHandler: (list) =>
            tableResponseHandler(columnsSchema.value as SysSummaryTableSchemaModel[], true)(list),
        });
      }

      /**
       * 表格响应数据 处理
       */
      function tableResponseHandler(columns: SysSummaryTableSchemaModel[], isDownExcel = false) {
        const columnByValueType = columns.reduce((prev, item) => {
          const isTtrue = !isEmpty(item.field);
          if (isTtrue) {
            const { valueType } = item;
            if (!isEmpty(valueType)) {
              let list = prev[valueType];
              if (isUnDef(list)) {
                prev[valueType] = list = [];
              }
              list.push(item);
            }
          }
          return prev;
        }, {} as { [props: string]: SysSummaryTableSchemaModel[] });

        return (list: { [props: string]: any }[]) => {
          return list.map((item) => {
            const nd = cloneDeep(item);
            // 1、码值处理
            const dictColumns = get(columnByValueType, 'dict') ?? [];
            dictColumns.forEach((citem) => {
              const currentDictData = dictMapByType[citem.dict];
              if (isUnDef(currentDictData)) {
                return;
              }
              nd[citem.field] = dictMapByType[citem.dict][nd[citem.field]];
            });

            // 2、decimal 处理()
            if (!isDownExcel) {
              const decimalColumns = get(columnByValueType, 'decimal') ?? [];
              decimalColumns.forEach((citem) => {
                nd[citem.field] = thousands(nd[citem.field]);
              });
            }

            return nd;
          });
        };
      }

      return {
        prefixCls,
        registerTable,
        registerExportTable,
      };
    },
  });
</script>
<template>
  <div :class="`${prefixCls} w-full box-border`">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <ExportExcelButton @register="registerExportTable" />
      </template>
    </BasicTable>
  </div>
</template>
<style lang="less">
  @prefix-cls: ~'@{namespace}-summary-table';
  .@{prefix-cls} {
    color: red;

    .ant-picker-range {
      width: 100%;
    }
  }
</style>
