<script lang="ts">
  import { Button } from 'ant-design-vue';
  import { defineComponent, onMounted, ShallowRef, unref } from 'vue';
  import { DownloadOutlined } from '@ant-design/icons-vue';
  import { useModal } from '/@/components/Modal';
  import { ExpExcelModal, ExportModalResult, jsonToSheetXlsx } from '/@/components/Excel';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicPageListResult } from '/@/api/model/baseModel';
  import { SysSummaryTableSchemaModel } from '/@/api/sys/model/summaryTableModel';
  const [register, { openModal }] = useModal();
  const { createMessage } = useMessage();
  type ExportExcelPropsType = {
    api: () => Promise<BasicPageListResult<any>>;
    columnsSchema: ShallowRef<SysSummaryTableSchemaModel[]>;
    tableResponseHandler: (list: any[]) => any[];
  };
  export default defineComponent({
    name: 'ExportExcelButton',
    components: {
      DownloadOutlined,
      Button,
      ExpExcelModal,
    },
    emits: ['register'],
    setup: (_, { emit }) => {
      let options = {} as ExportExcelPropsType;
      function exportTableData(opt: ExportExcelPropsType) {
        options = opt;
      }

      /**
       * 导出excel
       * @param filename
       * @param bookType
       */
      async function onExportExcel({ filename, bookType }: ExportModalResult) {
        const hideLoading = createMessage.loading(`正在导出,请稍等！`, 0);

        // 1、字段处理
        var columns = unref(options.columnsSchema)
          .filter((item) => item.field !== '' || item.field !== undefined)
          .sort((a, b) => {
            if (a.index > b.index) {
              return 1;
            } else if (a.index < b.index) {
              return -1;
            }
            return 0;
          });

        // 2、请求数据
        let { rows } = await options.api();
        const columnsByField = columns.reduce((prev, item) => {
          prev[item.field] = item;
          return prev;
        }, {});
        // 去除 多余字段
        rows = options.tableResponseHandler(rows ?? []).map((item) => {
          return Object.keys(columnsByField).reduce((prev, cKey) => {
            prev[cKey] = item[cKey];
            return prev;
          }, {});
        });
        debugger;

        // 3、处理 表头

        const header = columns.reduce((prev, item) => {
          prev[item.field] = item.cnLabel;
          return prev;
        }, {});

        // 4、执行下载
        // 默认Object.keys(data[0])作为header
        jsonToSheetXlsx({
          data: rows,
          header,
          filename,
          write2excelOpts: {
            bookType,
          },
          json2sheetOpts: {
            // 头排序
            header: columns.map((item) => item.field),
          },
        });
        hideLoading();
      }
      onMounted(() => {
        emit('register', exportTableData);
      });
      return {
        register,
        openModal,
        onExportExcel,
      };
    },
  });
</script>

<template>
  <Button @click="openModal">
    <template #icon>
      <DownloadOutlined />
    </template>
    导出
  </Button>
  <ExpExcelModal @register="register" @success="onExportExcel" />
</template>
