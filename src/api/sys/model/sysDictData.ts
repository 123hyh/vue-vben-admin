type YesNoFlag = 0 | 1;

/**
 * 码值类型
 */
export interface SysDictData {
  /** 字典编码 */
  dictCode: number;

  /** 字典排序 */
  dictSort: number;

  /** 字典标签 */
  dictLabel: string;

  /** 字典键值 */
  dictValue: string;

  /** 字典类型 */
  dictType: string;

  /** 样式属性（其他样式扩展） */
  cssClass: string;

  /** 表格字典样式 */
  listClass: string;

  /** 是否默认（Y是 N否） */
  isDefault: YesNoFlag;

  /** 状态（0正常 1停用） */
  status: YesNoFlag;
}
