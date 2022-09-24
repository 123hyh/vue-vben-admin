import { SysDictData } from '/@/api/sys/model/sysDictData';
import { ComponentType } from '/@/components/Form/src/types';
type YesNoFlag = 0 | 1;
export interface SummaryTableSearchModel {
  /**
   * 主键
   */
  id: number;
  /**
   * 排序
   */
  index: number;
  /**
   * 中文名称
   */
  cnLabel: string;
  /**
   * 英文名称
   */
  enLabel: string;
  /**
   * 所属表格id
   */
  summaryId: string;
  /**
   * 字段名称
   */
  field: string;
  /**
   * 组件名称
   */
  component: ComponentType;
  /**
   * 是否显示
   */
  visible: YesNoFlag;
  /**
   * 备注
   */
  remark: string;

  /**
   * 码值
   */
  dict: string;
  dictDataList: SysDictData[];
}

/**
 * 表格字段值类型
 */
export type SummaryTableValueTypes = 'string' | 'decimal' | 'date' | 'dict';

export interface SysSummaryTableSchemaModel {
  /**
   * 主键
   */
  id: number;
  /**
   * 所属表格id
   */
  summaryId: number;
  /**
   * 父级id
   */
  parentId: number;
  /**
   * 排序
   */
  index: number;
  /**
   * 字段名
   */
  field: string;
  /**
   * 值类型
   */
  valueType: SummaryTableValueTypes;
  /**
   * 是否可查询
   */
  searchFlag: YesNoFlag;
  /**
   * 可显示的
   */
  visible: YesNoFlag;
  /**
   * 固定方向(left | right)
   */
  fixed: 'left' | 'right' | '';
  /**
   * 宽度(100px | 100)
   */
  width: string | number;
  /**
   * 排列方式(left | center | right)
   */
  align: 'left' | 'center' | 'right' | '';
  /**
   * 可排序的(0 | 1)
   */
  sortable: YesNoFlag;
  /**
   * 排序字段名词
   */
  sortField: string;
  /**
   * 中文名
   */
  cnLabel: string;
  /**
   * 英文名
   */
  enLabel: string;
  /**
   * 表头自定义样式名
   */
  headClass: string;
  /**
   * 单元格自定义样式名
   */
  cellClass: string;
  /**
   * 提示信息
   */
  headTooltip: string;
  /**
   * 码值
   */
  dict: string;
  /**
   * 码值
   */
  dictDataList: SysDictData[];
  /**
   * 表头自定义 content
   */
  headFormatter: string;
  /**
   * 单元格自定义 content
   */
  cellFormatter: string;
  /**
   * 单元格点击跳转的路径 /ord/domestic/{id}
   */
  cellClickToPath: string;
  /**
   * 表头图标
   */
  headIcon: string;
  /**
   * 单元格图标
   */
  cellIcon: string;
}

/**
 * 表格配置信息
 */
export interface SummaryTableModel {
  /**
   * 主键
   */
  id: number;
  /**
   * 名称
   */
  name: string;
  /**
   * 数据源ID
   */
  dataSourceId: string;
  /**
   * 关联ID
   */
  refId: string;
  /**
   *
   */
  title: string;
  /**
   * 当前所出 orgid
   */
  currentUserOrgId: string;
  /**
   * 查询栏配置
   */
  searchs: SummaryTableSearchModel[];
  /**
   * 列配置
   */
  columns: SysSummaryTableSchemaModel[];
}
