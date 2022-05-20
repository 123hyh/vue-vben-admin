import { BasicResponse } from '../model/baseModel';
import SysBusidocTableSchema from './model/sysBusidocTableSchema';
import { defHttp } from '/@/utils/http/axios';
enum apiEnum {
  GetSysBusidocTableSchema = '/system/sysBusidocTableSchema/{busidocCode}/list',
}

/**
 * 根据 busidocId 获取 业务单据表格 schema
 * @returns
 */
export const getSysBusidocTableSchemaByBusidocCode = (busidocCode: string) =>
  defHttp.get<BasicResponse<SysBusidocTableSchema[]>>({
    url: apiEnum.GetSysBusidocTableSchema.replace(/\{busidocCode\}/, busidocCode),
  });
