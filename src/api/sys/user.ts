import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';
import { ContentTypeEnum } from '/@/enums/httpEnum';

enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/system/user/detail',
  GetPermCode = '/getPermCode',
  IsLogin = '/system/user/isLogin',
  SwitchOrg = '/system/switchOrg',
  GetUserOrgList = '/system/user/getUserOrgList',
  GetQuickMenus = '/system/user/quickMenus',
}
/**
 *
 * 登录前置请求
 * @param username
 * @returns
 */
export function preLogin(username: string) {
  return defHttp.post({
    url: '/login/pre',
    data: { username },
  });
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      data: params,
      headers: {
        'Content-Type': ContentTypeEnum.FORM_URLENCODED,
      },
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.post<any>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

/**
 * 判断是否登录
 * @returns
 */
export const isLogin = () => defHttp.post({ url: Api.IsLogin });

/**
 * 切换组织
 * @param orgId 组织id
 * @returns
 */
export const switchOrg = (orgId: string) =>
  defHttp.post({
    url: Api.SwitchOrg,
    data: {
      orgId,
    },
    headers: {
      'Content-Type': ContentTypeEnum.FORM_URLENCODED,
    },
  });

/**
 * 获取当前用户所拥有的 组织
 * @returns
 */
export const getUserOrgList = () =>
  defHttp.get({
    url: Api.GetUserOrgList,
  });

/**
 * 获取用户快捷菜单
 * @returns
 */
export const getQuickMenus = () =>
  defHttp.get({
    url: Api.GetQuickMenus,
  });
