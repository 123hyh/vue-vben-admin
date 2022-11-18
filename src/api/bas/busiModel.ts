import { defHttp } from '/@/utils/http/axios';
import { BusiModelModel } from '/@/api/bas/model/busiModelModel';
import { BusiTypeEnums } from '/@/enums/sys/dictEnum';
import { BasicResponse } from '/@/api/model/baseModel';
import { BusiModelConfigModel } from '/@/api/bas/model/busiModelConfigModel';
enum Api {
  BUSI_MODEL_INFO = '/bas/busimodel/{id}',
  BUSI_MODEL_PAGE = '/bas/basBusimodel/list',
  BUSI_MODEL_ADD = '/bas/basBusimodel/add',
  BUSI_MODEL_UPDATE = '/bas/basBusimodel/edit',
  BUSI_MODEL_REMOVE = '/bas/basBusimodel/remove',
  // 业务模式配置
  BUSI_MODEL_CONFIG = '/bas/basBusimodelConfigDefault/{busiType}/data',
}

/**
 * 查询业务模式详情
 * @param id
 */
export const busiModelInfoById = (id: string) =>
  defHttp.get<BasicResponse<BusiModelModel>>({ url: Api.BUSI_MODEL_INFO.replace(/{id}/g, id) });

/**
 * 业务模式列表
 * @param query
 */
export const busiModelPage = (query: BusiModelModel = {} as BusiModelModel) =>
  defHttp.post<BasicResponse<BusiModelModel>>({ url: Api.BUSI_MODEL_PAGE, data: query });

/**
 * 新增业务模式
 */

export const addBusiModel = (modelVo: BusiModelModel) =>
  defHttp.post<BasicResponse<BusiModelModel>>({ url: Api.BUSI_MODEL_ADD, data: modelVo });
/**
 * 修改业务模式
 */

export const updateBusiModel = (modelVo: BusiModelModel) =>
  defHttp.post<BasicResponse<BusiModelModel>>({ url: Api.BUSI_MODEL_REMOVE, data: modelVo });

/**
 * 删除业务模式
 * @param modelVo
 */
export const removeBusiModel = (modelIds: string[]) =>
  defHttp.post<BasicResponse<BusiModelModel>>({
    url: Api.BUSI_MODEL_UPDATE,
    data: modelIds.join(','),
  });

/**
 * 获取业务类型所对应的业务模式配置
 * @param busiType
 */
export const getBusiModelConfigInfoByType = (busiType: keyof typeof BusiTypeEnums) =>
  defHttp.get<BasicResponse<BusiModelConfigModel[]>>({
    url: Api.BUSI_MODEL_CONFIG.replace(/\{busiType\}/, busiType),
  });
