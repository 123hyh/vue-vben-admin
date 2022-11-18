import { FormSchema } from '/@/components/Form';
import { getDictDataByType } from '/@/api/sys/dict';
import { useService } from '/@/utils';
import { OptionsModel } from '/@/api/sys/model/OptionsModel';
import { SysDictData } from '/@/api/sys/model/sysDictData';
import { BusiTypeEnums } from '/@/enums/sys/dictEnum';

export async function transformDictHooks(dictType: string): Promise<OptionsModel[]> {
  const [res] = await useService(() => getDictDataByType(dictType));
  return (res ?? ([] as SysDictData[])).map((dict) => ({
    label: dict.dictLabel,
    value: dict.dictValue,
    disabled: false,
  }));
}
type ParamsType = {
  busiTypeChange: (v: keyof typeof BusiTypeEnums) => void;
  isAdd: boolean;
};
/**
 * 基础资料表单
 */
export const getBasFormSchema = (params: ParamsType) =>
  [
    {
      field: 'bmName',
      component: 'Input',
      label: '业务模式',
      required: true,
    },
    {
      field: 'busiType',
      component: 'ApiSelect',
      label: '业务类别',
      required: true,
      componentProps: {
        api: () => transformDictHooks('bas_busitype'),
        onChange: params.busiTypeChange,
        disabled: !params.isAdd,
      },
    },
    {
      field: 'busiAttr',
      component: 'ApiSelect',
      componentProps: {
        api: () => transformDictHooks('bas_busiattr'),
      },
      label: '业务属性',
      required: true,
    },
    {
      field: 'sortNo',
      component: 'Input',
      label: '排序号',
      required: true,
    },
    {
      field: 'pushBusiFlag',
      component: 'Checkbox',
      label: '下推业务',
    },
    {
      field: 'enabledFlag',
      component: 'Checkbox',
      label: '是否有效',
    },
    {
      field: 'tlCustomerFlag',
      component: 'Checkbox',
      label: '显示终端客户',
    },
  ] as FormSchema[];

export const getOrderFormSchema = () =>
  [
    {
      field: 'bmName',
      component: 'Input',
      label: '委托价录入',
      required: true,
    },
  ] as FormSchema[];
