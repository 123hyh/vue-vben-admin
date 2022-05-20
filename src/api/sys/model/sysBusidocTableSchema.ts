/**
 * 业务单据定义 - 表格 schema
 */

import { SysDictData } from './sysDictData';

interface Schema {
  /**
   * 主键
   */
  id: string;

  /**
   * 父id
   */
  parentId: string;

  /**
   * 排序
   */
  index: number;

  /**
   * 字段名
   */
  field: string;

  /**
   * 固定方向(left | right)
   */
  fixed: 'left' | 'right' | '';

  /**
   * 列宽度
   */
  width: number | string;

  /**
   * 排列方式
   * left = 左对齐
   * center = 居中对齐
   * right = 右对齐
   */
  align: 'left' | 'center' | 'right';

  /**
   * 列可否排序
   */
  sortable: 0 | 1;

  /**
   * 列排序字段名
   */
  sortField: string;

  visible: 0 | 1;

  /**
   *中文名
   */
  cnLabel: string;

  /**
   *英文名
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

  ditOptions: SysDictData[];

  /**
   * 表头自定义 content
   */
  headFormatter: string;

  /**
   * 单元格自定义 content
   */
  cellFormatter: string;

  /**
   *单元格点击跳转的路径 /ord/domestic/{id}
   */
  cellClickToPath: string;

  /**
   *表头图标
   */
  headIcon: string;

  /**
   *单元格图标
   */
  cellIcon: string;

  /**
   *备注
   */
  remark: string;
}

type RequiredKeys = 'id' | 'index' | 'field' | 'fixed' | 'align' | 'sortFlag' | 'cnLabel';
type RequiredType = Required<Pick<Partial<Schema>, RequiredKeys>>;
type _SysBusidocTableSchema = Partial<Schema> & RequiredType;

type SysBusidocTableSchema = _SysBusidocTableSchema & {
  /**
   * 子集
   */
  children?: _SysBusidocTableSchema[];
};

export default SysBusidocTableSchema;
