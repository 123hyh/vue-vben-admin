import { BusiTypeEnums } from '/@/enums/sys/dictEnum';

export type BusiModelConfigType = 'ORDER' | 'SETTLE' | 'LOGISTIC';

export interface BusiModelConfigModel {
  /**
   * id
   */
  id: string;
  /**
   * 业务类型
   */
  busiType: keyof typeof BusiTypeEnums;
  /**
   * 业务属性
   */
  busiAttr: string;
  /**
   * 参数类别（订单、报价、商流、物流）
   */
  configType: BusiModelConfigType;
  /**
   * 列显示名称
   */
  labelName: string;
  /**
   * 字段名称
   */
  fieldName: string;
  /**
   * 默认值
   */
  fieldValue: string;
  /**
   * 字段类型（显示类型：string，decimal，dict）
   */
  fieldType: 'string' | 'decimal' | 'dict';
  /**
   * 字典类型（字段类型=DICT，必填）
   */
  dictType: string;
  /**
   * 字典可选范围
   */
  dictEnableValue: string;
  /**
   * 默认序号（显示排序）
   */
  sortNo: number;
  /**
   * 备注
   */
  remark: string;
}
