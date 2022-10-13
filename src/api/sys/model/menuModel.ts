import type { RouteMeta } from 'vue-router';
export interface RouteItem {
  path: string;
  component: any;
  meta: RouteMeta;
  name?: string;
  alias?: string | string[];
  redirect?: string;
  caseSensitive?: boolean;
  children?: RouteItem[];
}

/**
 * @description: Get menu return value
 */
export type getMenuListResultModel = RouteItem[];

/**
 * 路由参数
 */
export type SysMenuParams = {
  id: number;
  /**
   * 菜单id
   */
  menuId: number;

  /**
   * 路由名称
   */
  name: string;

  /**
   * 路由 url 参数
   */
  queryParams: string;

  /**
   * 前端组件路径
   */
  component: string;

  /**
   * 动态 name
   */
  dynamicNameFlag: 0 | 1;
};

export interface Menu {
  /** 菜单ID */
  menuId: number;

  /** 菜单名称 */
  menuName: string;

  /** 父菜单名称 */
  parentName: string;

  /** 父菜单ID */
  parentId: number;

  /** 显示顺序 */
  orderNum: string;

  /** 菜单URL */
  url: string;

  /** 类型: M=目录，C=菜单，F = 权限码 */
  menuType: 'M' | 'C' | 'F';

  /** 菜单状态:0显示,1隐藏 */
  visible: 0 | 1;

  /** 权限字符串 */
  perms: string;

  /** 菜单图标 */
  icon: string;

  /** 是否选择***/
  flag: boolean;

  /** 打开方式（menuItem页签 menuBlank新窗口） ***/
  target: string;

  /** 是否使用 iframe (旧页面使用) */
  isIframe: number;

  /** 前端组件路径 **/
  component: string;

  /** 前端路由参数 **/
  sysMenuParams: SysMenuParams;
}

/**
 * 菜单 vo
 */
export interface MenuVo {
  /**
   * 代理前缀
   */
  proxyPrefixPath: string;

  /**
   * 菜单 list
   */
  list: Menu[];
}
