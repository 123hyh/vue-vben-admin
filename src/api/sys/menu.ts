import { defHttp } from '/@/utils/http/axios';
import { template } from 'lodash-es';
import { BasicResponse } from '/@/api/model/baseModel';
import { MenuVo, Menu, RouteItem } from '/@/api/sys/model/menuModel';

/**
 * 校验是否远程地址
 * @returns
 * @param url
 */
function isNetWorkUrl(url: string) {
  return /^((https?):\/\/)([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/.test(
    url,
  );
}

/**
 * 判断url是否带有参数
 * @param url
 * @returns
 */
function hasUrlParams(url: string) {
  return /(.*)\?(.*)/.test(url);
}

/**
 * 图标集合
 */
const menuIconMap = {
  系统管理: 'ri:settings-3-fill',
  系统监控: 'ph:video-camera-fill',
  运输管理: 'mdi:van-utility',
  仓储管理: 'ic:outline-warehouse',
  费用管理: 'ant-design:money-collect-filled',
  风控管理: 'wpf:security-checked',
  系统工具: 'ant-design:tool-filled',
  订单管理: 'carbon:chart-relationship',
  公司管理: 'ic:baseline-format-align-right',
  关务管理: 'gridicons:customize',
  客户管理: 'raphael:customer',
  财务管理: 'carbon:finance',
  基础资料: 'gg:file-document',
  杂费管理: 'ant-design:money-collect-filled',
};

/**
 * 遍历处理菜单
 * @param menuList 菜单 list
 * @param proxyPrefixPath iframe 页面 代理前缀
 * @returns
 */
export const forMenu = (menuList: Menu[], proxyPrefixPath: string) => {
  const menus = [] as ReturnType<typeof handle>[];

  /**
   * 构造重定向地址
   * @param children
   * @param prefixPaths
   * @returns
   */
  const makeRedirectPaths = (children: any[], prefixPaths: string[]) => {
    function _handle(children: any[], paths: string[]): string[] {
      const { path, children: _c } = children[0] ?? {};
      paths.push(path);
      if (Array.isArray(_c) && _c[0]) {
        return _handle(_c, paths);
      } else {
        return paths;
      }
    }
    return _handle(children, [...prefixPaths]);
  };

  function handle(menuItem: any, tierNum: number, prefixPaths = [] as string[]) {
    const { menuType, menuName, url, children = [], isIframe = 0, component } = menuItem;

    // 当前路由的路径集合
    const currentPaths = [...prefixPaths, url];

    // 避免重复，取层级的
    const name = currentPaths.map((item) => item.replace(/^\//, '')).join('.');
    /**
     * menuType = M 为目录
     */
    if (menuType === 'M') {
      const _c = children.map((item) => handle(item, tierNum + 1, currentPaths)).filter(Boolean);
      const redirectPaths = makeRedirectPaths(_c, currentPaths);
      const join = (separator: string) => redirectPaths.join(separator);
      const meta = {
        icon: '',
        title: menuName,
      };
      if (menuIconMap[menuName] && tierNum === 1) {
        meta.icon = menuIconMap[menuName];
      }
      const opt = {
        path: url,
        name,
        redirect: join('/'),
        meta,
        children: _c,
      } as RouteItem;
      // 组件名称
      if (component) {
        opt.component = component;
      }
      return opt;
    } else {
      // 存在重复路由不嵌套处理
      const isNetWork = isNetWorkUrl(url);
      // 存在 query 参数(?x=1&y=2) 的  转义
      let path = hasUrlParams(url) ? encodeURIComponent(url) : url;

      const meta = { title: menuName } as any;

      if (isIframe === 1) {
        // 前缀为 http开头的定义为外链接(不允许直接open窗口)
        path = isNetWork ? encodeURIComponent(url) : path;

        // 暂时写死数据监控，不暴露 druid;
        if (menuName === '数据监控') {
          path = 'data';
        }
        meta.frameSrc = isNetWork ? url : `${proxyPrefixPath}${currentPaths.join('/')}`;
      }
      const opt = { path, name, meta } as RouteItem;
      if (component) {
        opt.component = component;
      }
      return opt;
    }
  }

  for (const menItem of menuList) {
    menus.push(handle(menItem, 1));
  }
  return menus.filter(Boolean);
};

enum Api {
  GetMenuList = '/system/menu/currentUserMenus',
  RemoteQuiteMenu = '/system/menu/shortcut/remove/${id}',
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => {
  return defHttp.get<BasicResponse<MenuVo>>({ url: Api.GetMenuList });
};

/**
 * 删除快捷菜单
 */

export const remoteQuiteMenu = (id) =>
  defHttp.post({
    url: template(Api.RemoteQuiteMenu)({ id }),
  });
