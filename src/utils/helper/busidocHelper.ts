import SysBusidocTableSchema from '/@/api/sys/model/sysBusidocTableSchema';
import { BasicColumn } from '/@/components/Table';

/**
 * 业务单据 table schema 转 table schema
 * @param list
 * @returns
 */
export function busidocTableSchema2BasicColumn(list: SysBusidocTableSchema[]) {
  const handle = (list: SysBusidocTableSchema[]) => {
    return list.map<BasicColumn>((item) => {
      const column = {} as BasicColumn;
      const {
        field,
        children = [],
        cnLabel,
        sortable,
        ditOptions,
        align,
        visible,
        format,
        fixed,
        width,
      } = item;
      column.dataIndex = field;
      column.title = cnLabel;
      column.sorter = sortable === 1;
      column.align = align;
      column.ifShow = visible === 1;
      column.format = format;
      // @ts-ignore
      column.fixed = fixed;
      if (width) {
        column.width = width;
      }
      column.align = align;

      /**
       * 超过宽度将自动省略，暂不支持和排序筛选一起使用。
       */
      column.ellipsis = true;

      if (children?.length > 0) {
        column.children = handle(children);
      }

      if (ditOptions) {
        /**
         * 过滤 多选
         */
        column.filterMultiple = true;
        column.filters = ditOptions.map((item) => ({
          text: item.dictLabel,
          value: item.dictValue,
        }));
        /**
         * 码值自定义列
         */
        column.format = (() => {
          const op = ditOptions.reduce((prev, item) => {
            prev[item.dictValue] = item.dictLabel;
            return prev;
          }, {});
          return (v) => op[v];
        })();
      }
      return column;
    });
  };

  return handle(list);
}
