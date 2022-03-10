import { Menu } from '/#/store';

/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  /**
   * 用户名
   */
  username: string;
  /**
   * 密码
   */
  password: string;
  /**
   * 验证码
   */
  validateCode: string;

  rememberMe?: boolean;
  /**
   * 是否前后端分离登录
   */
  detached?: boolean;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
  token: string;
  role: RoleInfo;
  user: any;
  menus: Menu[];
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 真实名字
  realName: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
}

type LoginUser = {
  /**
   * 用户id
   */
  userId: string;
  /**
   * 用户名称
   */
  loginName: string;
};
/**
 * 组织信息
 */
type OrgList = {
  userId: string;
};
export interface LoginResponse {
  /**
   * 菜单
   */
  menus: Menu[];
  /**
   * 用户信息
   */
  user: LoginUser;
  /**
   * 组织列表
   */
  orgList: OrgList[];
}
