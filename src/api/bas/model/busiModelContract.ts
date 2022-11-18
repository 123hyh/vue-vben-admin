/**
 * 业务模式报价
 */
export interface BusiModelContract {
  /**
   * 业务模式报价明细ID
   */
  id: string;
  /**
   * 业务模式ID
   */
  bmId: string;
  /**
   * 应收/应付
   */
  arapType: string;
  /**
   * 费用科目
   */
  arapSubject: string;
  /**
   * 科目名称
   */
  arapSubjectName: string;
  /**
   * 产生事件
   */
  generateEvent: string;
  /**
   * 汇率取值
   */
  exchrateOrigin: string;
  /**
   * 费率
   */
  arapRate: number;
  /**
   * 账期ID
   */
  arapTermId: string;
  /**
   * 账期名
   */
  arapTermName: string;
  /**
   * 账期基准
   */
  arapTermBase: string;
  /**
   * 计算基准(税前后，委托价or报关价格)
   */
  calculateBase: string;
  /**
   * 币别
   */
  currency: string;
  /**
   * 收款方id
   */
  payeeId: string;
  /**
   * 收款方
   */
  payeeName: string;
  /**
   * 付款方id
   */
  payerId: string;
  /**
   * 付款方
   */
  payerName: string;
  /**
   * 收款方类型
   */
  payeeType: string;
  /**
   * 付款方类型
   */
  payerType: string;
  /**
   * 关联物流序号
   */
  logisticSortNo: string;
  /**
   * 代理结算、贸易结算
   */
  stlType: string;
  /**
   * 虚拟台账
   */
  virtualFlag: 0 | 1;

  /**
   * 额外费率
   */
  extraRate: number;
  /**
   * 违约金费率
   */
  overdueRate: number;
  /**
   * 台账备注
   */
  accRemark: number;

  /**
   * 可抵扣
   */
  deduceFlag: 0 | 1;
}
