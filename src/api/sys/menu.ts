import { defHttp } from '/@/utils/http/axios';
import { useGlobSetting } from '/@/hooks/setting';
import { isNullOrUnDef } from '/@/utils/is';
import { capitalize } from 'vue';
const globSetting = useGlobSetting();
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
const getMenName = (() => {
  let menuIndex = 0;
  return (lavel: number) => `template.lavel.${lavel}.${menuIndex++}`;
})();
/**
 * 遍历处理菜单
 * @param menuList
 * @param tierNum
 * @returns
 */

export const forMenu = (menuList) => {
  const checkNotPath = (path) => /^#/.test(path);
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
  const handle = (menuItem: any, tierNum: number, prefixName = '') => {
    const { menuType, menuName, url, children = [] } = menuItem;
    /**
     * menuType = M 为目录
     */
    if (menuType === 'M') {
      const _c = children.map((item) => handle(item, tierNum + 1, `${prefixName}.${url}`));
      const redirect = getRedirectPath(children);
      const _curName = redirect.split('/')[tierNum];
      const name = isNullOrUnDef(_curName) ? getMenName(tierNum) : _curName;
      const path = encodeURIComponent(name);
      const meta = { icon: 'carbon:user-role', title: menuName };
      if (['供应链管理'].includes(menuName.trim())) {
      }
      if (tierNum === 1 && children.length > 0) {
        return {
          path: checkNotPath(url) ? '/' + path : url,
          name,
          redirect,
          meta,
          children: _c,
          component: 'LAYOUT',
        };
      } else {
        return {
          path: url,
          name: `${prefixName}.${url}`,
          meta,
          children: _c,
        };
      }
    } else {
      const _u = url.split('/').filter((item) => item !== '' && !isNullOrUnDef(item));
      const currentPath = _u.map((item, i) => (i == 0 ? item : capitalize(item))).join('');
      // 避免重复，取层级的
      const name = _u.join('.');

      // 存在重复路由不嵌套处理
      const path = isNetWorkUrl(url) ? url : encodeURIComponent(currentPath);
      const has = url.startsWith('/');
      const meta = { title: menuName, frameSrc: globSetting.apiUrl + (has ? url : `/${url}`) };

      return { path, name: `${prefixName}.${name}`, meta };
    }
  };

  for (const menItem of menuList) {
    menus.push(handle(menItem, 1));
  }
  debugger;
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
