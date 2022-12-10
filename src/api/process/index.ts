import { BasicPageParams } from '../model/baseModel';
import { ContentTypeEnum } from '/@/enums/httpEnum';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  GetTodoList = '/process/todoitem/list',
  GetIndexTodoList = '/process/todoitem/index/list',
}

/**
 * 获取待办事项列表
 * @param params
 * @returns
 */

export const getTodoList = (params: BasicPageParams) =>
  defHttp.post({
    url: Api.GetTodoList,
    data: params,
    headers: {
      'Content-Type': ContentTypeEnum.FORM_URLENCODED,
    },
  });
/**
 * 首页查询待办
 * @param params
 */
export const getIndexTodoList = (params: BasicPageParams) =>
  defHttp.post({
    url: Api.GetIndexTodoList,
    data: params,
    headers: {
      'Content-Type': ContentTypeEnum.FORM_URLENCODED,
    },
  });
