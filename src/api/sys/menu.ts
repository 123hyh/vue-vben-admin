import { defHttp } from '/@/utils/http/axios';
import { useGlobSetting } from '/@/hooks/setting';
import { isNullOrUnDef } from '/@/utils/is';
import { capitalize } from 'vue';
const globSetting = useGlobSetting();
import { template } from 'lodash-es';

/**
 * 校验是否远程地址
 * @param path
 * @returns
 */
function isNetWorkUrl(url: string) {
  return /^((https?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/.test(
    url,
  );
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
};

/**
 * 遍历处理菜单
 * @param menuList
 * @param tierNum
 * @returns
 */
export const forMenu = (menuList) => {
  const menus = [] as ReturnType<typeof handle>[];

  /**
   * 构造重定向地址
   * @param children
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
    const { menuType, menuName, url, children = [], component } = menuItem;

    // 当前路由的路径集合
    const currentPaths = [...prefixPaths, url];

    /**
     * menuType = M 为目录
     */
    if (menuType === 'M') {
      //  root path trim \/
      if (tierNum === 1 && currentPaths[0]) {
        currentPaths[0] = currentPaths[0].replace(/^\//, '');
      }
      const _c = children.map((item) => handle(item, tierNum + 1, currentPaths));
      const redirectPaths = makeRedirectPaths(_c, currentPaths);
      const join = (separator: string) => redirectPaths.join(separator);
      const meta = {
        icon: '',
        title: menuName,
      };
      if (menuIconMap[menuName] && tierNum === 1) {
        meta.icon = menuIconMap[menuName];
      }
      const name = join('.');
      const redirect = join('/');

      return {
        path: url,
        name,
        redirect,
        meta,
        children: _c,
        component: 'LAYOUT',
      };
    } else {
      const _u = url.split('/').filter((item) => item !== '' && !isNullOrUnDef(item));
      const currentPath = _u.map((item, i) => (i == 0 ? item : capitalize(item))).join('');

      // 避免重复，取层级的
      const name = _u.join('.');

      // 存在重复路由不嵌套处理
      const path = isNetWorkUrl(url) ? url : encodeURIComponent(currentPath);
      const has = url.startsWith('/');
      const meta = { title: menuName, frameSrc: globSetting.apiUrl + (has ? url : `/${url}`) };
      return { path, name: [...currentPaths, name].join('.'), meta, component };
    }
  }

  for (const menItem of menuList) {
    menus.push(handle(menItem, 1));
  }
  console.log(menus);
  return menus;
};

enum Api {
  GetMenuList = '/system/menu/currentUserMenus',
  RemoteQuiteMenu = '/system/menu/shortcut/remove/${id}',
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => {
  return defHttp.get<any>({ url: Api.GetMenuList });
};

/**
 * 删除快捷菜单
 */

export const remoteQuiteMenu = (id) =>
  defHttp.post({
    url: template(Api.RemoteQuiteMenu)({ id }),
  });
