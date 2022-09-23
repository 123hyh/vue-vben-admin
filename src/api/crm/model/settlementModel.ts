import { BasicEntity } from '../../model/baseModel';

type YesNo = 0 | 1;
export interface SettlementModel extends BasicEntity {
  /**
   * ID
   */
  id: string;
  /**
   * 号码
   */
  no: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 业务模式ID
   */
  bmId: string;
  /**
   * 业务模式名称
   */
  bmName: string;
  /**
   * 是否VMI
   */
  vmiFlag: YesNo;
  /**
   * 是否垫资
   */
  loanFlag: YesNo;
  /**
   * 垫资类型
   */
  loanType: string;
  /**
   * 保证金比例%(该结果为 / 100 后的 结果)
   * bigDecimal
   */
  marginRatio: string;
  /**
   * 是否有效
   */
  enabledFlag: YesNo;
  /**
   * 代理费杂费收款方式
   */
  agencyMixedType: string;
  /**
   * 退税支付条件
   */
  refundTaxType: string;
  /**
   * 退税比例
   * bigDecimal
   */
  refundTaxRatio: string;
  /**
   * 出口最晚回函期限
   */
  correspdDeadline: number;
  /**
   * 库存管理方式(按箱/按数量)
   */
  inventoryType: string;
  /**
   * 减少国内拆箱(1=国内不拆箱，进口HK的配载指令根据国内端配载指令自动生成）
   */
  nunpackFlag: YesNo;
  /**
   * 库存管理方式(按箱、按数量)
   */
  stockMode: string;
  /**
   * 汇差处理方式（调票、调款）
   */
  exchrateMarginHandle: string;
  /**
   * 订单汇率取值
   */
  orderExchRateOrigin: string;
  /**
   * 付汇汇率取值
   */
  exchangeRate: string;
  /**
   * 执行主体（记账主体，我司单位)
   */
  executiveSubjectId: string;
  /**
   * 是否返利
   */
  rebateFlag: YesNo;
  /**
   * 是否直送（中港直送）
   */
  directFlag: YesNo;
  /**
   * 保税仓
   */
  bondedFlag: YesNo;
  /**
   * 出入区标志
   */
  bondedType: string;
  /**
   * 订单默认币别
   */
  orderCurrency: string;
  /**
   * 手动录入报关价
   */
  inputDclprcFlag: YesNo;
  /**
   * 应收代理结算（外综服务)
   */
  agentstlFlag: YesNo;
  /**
   * 代理结算买方
   */
  agentstlBuyerId: string;
  /**
   * 代理结算卖方
   */
  agentstlSellerId: string;
  /**
   * 开票要求
   */
  billRequirement: string;
  /**
   * 开票要求期限X天
   */
  deadline: number;
  /**
   * 控货付款类型
   */
  controlPayment: string;
  /**
   * 控货付款，到货X天内
   */
  arrival: number;
  /**
   * 结算方式
   */
  stlTerm: string;
  /**
   * 开票明细备注显示订单号
   */
  invdtlRmkordernoFlag: YesNo;
}

/**
 * vo
 */
export class SettlemetnVoModel {
  public baseData!: {
    /**
     * ID
     */
    id: string;
    /**
     * 号码
     */
    no: string;
    /**
     * 名称
     */
    name: string;
    /**
     * 业务模式ID
     */
    bmId: string;
    /**
     * 业务模式名称
     */
    bmName: string;
    /**
     * 是否VMI
     */
    vmiFlag: YesNo;
    /**
     * 是否垫资
     */
    loanFlag: YesNo;
    /**
     * 垫资类型
     */
    loanType: string;
    /**
     * 保证金比例%(该结果为 / 100 后的 结果)
     * BigDecimal
     */
    marginRatio: string;
    /**
     * 是否有效
     */
    enabledFlag: YesNo;
    /**
     * 汇差处理方式（调票、调款）
     */
    exchrateMarginHandle: string;
    /**
     * 订单汇率取值
     */
    orderExchRateOrigin: string;
    /**
     * 付汇汇率取值
     */
    exchangeRate: string;
    /**
     * 执行主体（记账主体，我司单位)
     */
    executiveSubjectId: string;
    /**
     * 库存管理方式(按箱/按数量)
     */
    inventoryType: string;
    /**
     * 是否直送（中港直送）
     */
    directFlag: YesNo;
    /**
     * 订单默认币别
     */
    orderCurrency: string;
    /**
     * 手动录入报关价
     */
    inputDclprcFlag: string;

    /**
     * 开票要求
     */
    billRequirement: string;
    /**
     * 开票要求期限X天
     */
    deadline: number;
    /**
     * 代理费杂费收款方式
     */
    agencyMixedType: string;

    /**
     * 结算方式
     */
    stlTerm: string;
    /**
     * 开票明细备注是否显示订单号
     */
    invdtlRmkordernoFlag: YesNo;

    /**
     * 库存管理方式(按箱、按数量)
     */
    stockMode: string;

    /**
     * 减少国内拆箱(1=国内不拆箱，进口HK的配载指令根据国内端配载指令自动生成）
     */
    nunpackFlag: YesNo;

    /**
     * 是否返利
     */
    rebateFlag: YesNo;

    // 出口相关

    /**
     * 退税支付条件(函调控制)
     */
    refundTaxType: string;
    /**
     * 退税比例 %
     * BigDecimal
     */
    refundTaxRatio: string;
    /**
     * 出口最晚回函期限
     */
    correspdDeadline: number;
  };
  public agentstSettlement!: {
    /**
     * 应收代理结算（外综服务)
     */
    agentstlFlag: YesNo;
    /**
     * 代理结算买方id
     */
    agentstlBuyerId: string;
    /**
     * 代理结算卖方id
     */
    agentstlSellerId: string;
  };
}

/**
 * 获取初始数据
 */
export const getInitialVo = () => ({
  /**
   * 基础资料
   */
  baseData: {
    id: null as unknown as string,
    no: '',
    name: '',
    bmId: '',
    bmName: '',
    vmiFlag: 0,
    loanFlag: 0,
    loanType: '',
    marginRatio: '0',
    enabledFlag: 1,
    exchrateMarginHandle: '',
    orderExchRateOrigin: '',
    exchangeRate: '',
    executiveSubjectId: '',
    inventoryType: '',
    directFlag: 0,
    orderCurrency: '',
    inputDclprcFlag: 0,
    billRequirement: '',
    deadline: 0,
    agencyMixedType: '',
    stlTerm: '',
    invdtlRmkordernoFlag: 0,
    stockMode: '',
    nunpackFlag: 0,
    rebateFlag: 0,
    refundTaxType: '',
    refundTaxRatio: '0',
    correspdDeadline: 0,
  } as Pick<
    Partial<SettlementModel>,
    | 'id'
    | 'no'
    | 'name'
    | 'bmId'
    | 'bmName'
    | 'vmiFlag'
    | 'loanFlag'
    | 'loanType'
    | 'marginRatio'
    | 'enabledFlag'
    | 'exchrateMarginHandle'
    | 'orderExchRateOrigin'
    | 'exchangeRate'
    | 'executiveSubjectId'
    | 'inventoryType'
    | 'directFlag'
    | 'orderCurrency'
    | 'inputDclprcFlag'
    | 'billRequirement'
    | 'deadline'
    | 'agencyMixedType'
    | 'stlTerm'
    | 'invdtlRmkordernoFlag'
    | 'stockMode'
    | 'nunpackFlag'
    | 'rebateFlag'
    | 'refundTaxType'
    | 'refundTaxRatio'
    | 'correspdDeadline'
  >,
  /**
   * 代理结算相关
   */
  agentstSettlement: {
    agentstlFlag: 0,
    agentstlBuyerId: '',
    agentstlSellerId: '',
  } as Pick<Partial<SettlementModel>, 'agentstlFlag' | 'agentstlBuyerId' | 'agentstlSellerId'>,
});
