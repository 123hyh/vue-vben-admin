import { BusiModelConfigModel, BusiModelConfigType } from '/@/api/bas/model/busiModelConfigModel';
import { FormSchema } from '/@/components/Form';
import { ComponentType } from '/@/components/Form/src/types';
import { isEmpty } from '/@/utils/is';
import { transformDictHooks } from '/@/views/bas/busiModel/Edit/data';

const comByValueType = {
  BOOLEAN: 'Checkbox',
  DICT: 'ApiSelect',
} as { [key: string]: ComponentType };
export type BusiModelFormGroupType = {
  [key in BusiModelConfigType]: BusiModelConfigModel[];
};

export const transformSchema = (groupObj: BusiModelFormGroupType) => {
  return Object.keys(groupObj).reduce((prev, key) => {
    const groupObjElement = groupObj[key as BusiModelConfigType];
    prev[key] = groupObjElement.map((item) => {
      const temp = {
        field: item.fieldName,
        component: comByValueType[item.fieldType],
        label: item.labelName,
        componentProps: {},
      } as FormSchema;
      if (!isEmpty(item.dictType)) {
        const componentProps = temp.componentProps as any;
        componentProps.api = () => transformDictHooks(item.dictType as string);
      }
      if (!isEmpty(item.remark)) {
        temp.helpMessage = item.remark;
      }
      return temp;
    });
    return prev;
  }, {} as { [key in BusiModelConfigType]: FormSchema[] });
};
