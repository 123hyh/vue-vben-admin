import { defHttp } from '/@/utils/http/axios';
import { useGlobSetting } from '/@/hooks/setting';
const globSetting = useGlobSetting();

let menuNameIndex = 0;
/**
 * 遍历处理菜单
 * @param menuList
 * @param tierNum
 * @returns
 */
export const forMenu = (menuList) => {
  const menus = [];
  /**
   * 获取重定向地址
   * @param children
   * @returns
   */
  const getRedirectPath = (children: any[]) => {
    const firstItem = children[0];
    if (firstItem.children[0]) {
      return getRedirectPath(firstItem.children);
    } else {
      return firstItem.url;
    }
  };
  const handle = (menuItem: any, tierNum: number) => {
    const { menuType, menuName, url, children = [] } = menuItem;
    if (['菜单管理'].includes(menuName)) {
    }
    /**
     * menuType = M 为目录
     */
    if (menuType === 'M') {
      const _c = children.map((item) => handle(item, tierNum + 1)),
        redirect = getRedirectPath(children),
        name = redirect.split('/')[tierNum],
        path = `/${name}`,
        meta = { icon: 'carbon:user-role', title: menuName };
      if (tierNum === 1 && children.length > 0) {
        return { path, name, redirect, meta, children: _c, component: 'LAYOUT' };
      } else {
        return { path, name, redirect, meta, children: _c, component: 'LAYOUT' };
      }
    } else {
      const _u = url.split('/');
      // 避免重复，取层级的
      const name = `${_u.at(-1)}_${menuNameIndex++}`;
      const path = _u.at(-1);
      const meta = { title: menuName, frameSrc: globSetting.apiUrl + url };
      return { path, name, meta };
    }
  };

  for (const menItem of menuList) {
    menus.push(handle(menItem, 1));
  }

  return menus;
};

enum Api {
  GetMenuList = '/system/menu/currentUserMenus',
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => {
  return defHttp.get<any>({ url: Api.GetMenuList });
};
