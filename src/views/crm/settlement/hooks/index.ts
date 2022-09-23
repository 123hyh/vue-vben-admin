import { useService } from '/@/utils';
import { addCrmSettlement, saveCrmSettlement } from '/@/api/crm/settlement';
import { SettlemetnVoModel } from '/@/api/crm/model/settlementModel';
import { useLoading } from '/@/components/Loading';
import { useMessage } from '/@/hooks/web/useMessage';
import { useMultipleTabStore } from '/@/store/modules/multipleTab';
import { useRouter } from 'vue-router';

type Params = {
  validate: () => Promise<SettlemetnVoModel>;
  isNew: boolean;
};

/**
 * 保存
 * @param params
 */
export function useSave(params: Params) {
  const [openFullLoading, closeFullLoading] = useLoading({
    tip: '保存...',
  });
  const { createMessage } = useMessage();
  const save = async () => {
    openFullLoading();
    const [data, err1] = await useService(() => params.validate());
    if (err1 !== undefined) {
      closeFullLoading();
      createMessage.error('请检查校验');
      setTimeout(() => {
        const firstElem = document.querySelector('.ant-form-item-explain-error');
        if (firstElem !== null) {
          debugger;
          firstElem?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
      throw new Error('操作失败');
    }
    const [res, err] = await useService(() =>
      (params.isNew ? addCrmSettlement : saveCrmSettlement)(data),
    );
    closeFullLoading();
    if (err !== undefined) {
      createMessage.error(err.message ?? '');
      throw new Error('操作失败');
    }
    createMessage.success('操作成功...');
    return res?.data as SettlemetnVoModel;
  };
  return { save };
}

/**
 * 切换 tab
 * @returns
 */
export function useSwitchTab() {
  const tabStore = useMultipleTabStore();
  const router = useRouter();
  return {
    go(goPath: string, isCloseCurrentRoute = false) {
      const list = tabStore.getTabList.filter((item) => item.path === goPath);
      if (list.length > 0) {
        tabStore.closeTab(list[0], router);
        tabStore.updateCacheTab();
        setTimeout(() => {
          router.push({ path: goPath });
        });
        if (isCloseCurrentRoute) {
          tabStore.closeTab(router.currentRoute.value, router);
        }
      } else {
        router.push({ path: goPath });
      }
    },
  };
}
