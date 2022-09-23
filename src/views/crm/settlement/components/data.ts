import { FormSchema } from '/@/components/Form/src/types/form';

export const schemas = ({ isNew } = { isNew: true }): FormSchema[] => [
  {
    field: 'id',
    component: 'Input',
    label: '主键',
    show: false,
  },
  {
    field: 'no',
    component: 'Input',
    label: '单据号码',
    componentProps: {
      disabled: true,
    },
    colProps: {
      xs: 24,
      md: 6,
    },
  },
  {
    field: 'name',
    component: 'Input',
    label: '名称',
    required: true,
  },
  {
    field: 'bmId',
    component: 'Input',
    label: '业务模式ID',
    show: false,
  },
  {
    field: 'bmName',
    component: 'Input',
    label: '业务模式',
    required: true,
    componentProps: {
      disabled: !isNew,
    },
  },
  {
    field: 'executiveSubjectId',
    component: 'Select',
    label: '执行主体',
    required: true,
    componentProps: {
      options: [{ label: '测试1', value: 1 }],
    },
  },
  {
    field: 'orderExchRateOrigin',
    component: 'Select',
    label: '订单汇率取值',
    required: true,
    componentProps: {
      options: [{ label: '测试1', value: 1 }],
    },
  },
  {
    field: 'exchangeRate',
    component: 'Select',
    label: '付汇汇率取值',
    required: true,
    componentProps: {
      options: [{ label: '测试1', value: 1 }],
    },
  },
  {
    field: 'orderCurrency',
    component: 'Select',
    label: '订单默认币别',
    required: true,
    componentProps: {
      options: [{ label: '测试1', value: 1 }],
    },
  },
  {
    field: 'loanFlag',
    component: 'Switch',
    label: '是否垫资',
    defaultValue: 0,
    componentProps: {
      checkedValue: 1,
      unCheckedValue: 0,
    },
  },
  {
    field: 'loanType',
    component: 'Select',
    label: '垫资类型',
    required: true,
    componentProps: {
      options: [{ label: '测试1', value: 1 }],
    },
  },
  {
    field: 'vmiFlag',
    component: 'Switch',
    label: '是否VMI',
    defaultValue: 0,
    componentProps: {
      checkedValue: 1,
      unCheckedValue: 0,
    },
  },
  {
    field: 'marginRatio',
    component: 'Input',
    label: '保证金比例',
    defaultValue: 0,
    rules: [
      {
        pattern: /^-?\d+(,\d{3})*(\.\d{1,10})?$/,
        message: '请输入数字',
      },
      {
        required: true,
      },
    ],
    renderComponentContent: () => {
      return {
        suffix: () => '%',
      };
    },
  },
  {
    field: 'inventoryType',
    component: 'Select',
    label: '库存管理方式',
    required: true,
    componentProps: {
      options: [{ label: '测试1', value: 1 }],
    },
  },
  {
    field: 'exchrateMarginHandle',
    component: 'Select',
    label: '汇差处理方式',
    required: true,
    componentProps: {
      options: [{ label: '测试1', value: 1 }],
    },
  },
  {
    field: 'billRequirement',
    component: 'Select',
    label: '开票要求',
    required: true,
    componentProps: {
      options: [{ label: '测试1', value: 1 }],
    },
  },
  {
    field: 'enabledFlag',
    component: 'Switch',
    label: '是否有效',
    componentProps: {
      checkedValue: 1,
      unCheckedValue: 0,
    },
  },
  {
    field: 'directFlag',
    component: 'Switch',
    label: '是否直送',
    componentProps: {
      checkedValue: 1,
      unCheckedValue: 0,
    },
  },

  {
    field: 'nunpackFlag',
    component: 'Switch',
    label: '减少国内拆箱',
    componentProps: {
      checkedValue: 1,
      unCheckedValue: 0,
    },
  },
  {
    field: 'rebateFlag',
    component: 'Switch',
    label: '是否返利',
    componentProps: {
      checkedValue: 1,
      unCheckedValue: 0,
    },
  },
  {
    field: 'inputDclprcFlag',
    component: 'Switch',
    label: '手动录入报关价',
    componentProps: {
      checkedValue: 1,
      unCheckedValue: 0,
    },
  },
];
