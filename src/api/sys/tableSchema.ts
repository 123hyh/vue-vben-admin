import { BasicPageListResult, BasicResponse } from '../model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import { SummaryTableModel } from '/@/api/sys/model/summaryTableModel';

enum apiEnum {
  GetSysTableSchema = '/system/sysSummaryTable/{id}/schema',
  GetTableData = '/system/sysSummaryTable/{id}/data',
}

/**
 * 根据 id 获取 统计表格 schema
 * @returns
 */
export const getSysTableSchemaById = (id: Number) =>
  defHttp.get<BasicResponse<SummaryTableModel>>({
    url: apiEnum.GetSysTableSchema.replace(/\{id\}/, id.toString()),
  });

/**
 * 获取数据
 * @param id 数据源id
 * @param data 查询参数
 */
export const getDataBySysDataSourceId = (id: string, data: { [prop: string]: any }) =>
  defHttp.post<BasicPageListResult<any>>({
    url: apiEnum.GetTableData.replace(/\{id\}/, id),
    data,
  });
