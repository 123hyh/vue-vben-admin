import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';
import { ContentTypeEnum } from '/@/enums/httpEnum';

enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/system/user/detail',
  GetPermCode = '/getPermCode',
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
