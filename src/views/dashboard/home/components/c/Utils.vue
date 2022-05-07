<template>
  <!-- 常用工具组件 -->
  <Card size="small" :class="`${prefixCls}`" :loading="loading">
    <div>
      <!-- 按钮列表 -->
      <div
        class="flex flex-wrap gap-4 <sm:max-h-screen-sm <sm:overflow-auto"
        :class="`${prefixCls}-menu`"
        style="max-height: 200px"
      >
        <Button
          v-for="item in quickMenus"
          :key="item.menuId"
          size="large"
          class="!bg-gray-500/10 !border-transparent relative md:basis-28 <sm:basis-full"
          :class="`${prefixCls}-menu-item`"
          @click.stop="() => goPage(item)"
        >
          {{ item.menuName }}
          <template #icon>
            <div class="absolute hidden right-0 -top-2" :class="`${prefixCls}-menu-item-remove`">
              <CloseOutlined style="font-size: 0.7rem" @click.stop="() => goRemoveItem(item)" />
            </div>
          </template>
        </Button>
        <!-- 添加按钮 -->
        <Button
          @click="openUserMenu"
          size="large"
          class="!border-2 !border-dashed md:basis-36 <sm:basis-full"
        >
          <template #icon>
            <PlusOutlined />
          </template>
          <span>添加快捷入口</span>
        </Button>
      </div>
    </div>
  </Card>
</template>

<script lang="ts" setup>
  import { useDesign } from '/@/hooks/web/useDesign';
  const { prefixCls } = useDesign('home-utils');
  import { Card, Button } from 'ant-design-vue';
  import { useRouter } from 'vue-router';
  import { ref, onMounted } from 'vue';
  import { PlusOutlined, CloseOutlined } from '@ant-design/icons-vue';
  import { useGlobSetting } from '/@/hooks/setting';
  import { getQuickMenus } from '/@/api/sys/user';
  import { useService } from '/@/utils';
  import { usePermissionStoreWithOut } from '/@/store/modules/permission';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { remoteQuiteMenu } from '/@/api/sys/menu';
  import { isNullOrUnDef } from '/@/utils/is';

  const quickMenus = ref([] as any[]);
  defineProps({
    loading: {
      type: Boolean,
    },
  });
  const { apiUrl } = useGlobSetting();
  const getList = async () => {
    const [res] = await useService(() => getQuickMenus());
    if (res) {
      quickMenus.value = res?.data ?? [];
    }
  };
  onMounted(getList);
  function openUserMenu() {
    window.$.modal.openSelectWin({
      ctx: apiUrl + '/',
      title: '添加菜单快捷键',
      options: {
        url: apiUrl + '/system/menu/shortcut/list',
        modalName: '菜单',
        singleSelect: false,
        columns: [
          { checkbox: true },
          {
            field: 'menuName',
            title: '菜单名称',
            sortable: true,
          },
        ],
      },
      callBack: function (selected) {
        let _selects = [] as any[];
        window.$.each(selected, function (_, item) {
          _selects.push({
            menuId: item.menuId,
          });
        });
        if (_selects && _selects.length > 0) {
          window.$.operate.saveAll(apiUrl + '/system/menu/shortcut/saveAll', _selects, function () {
            getList();
            // window.location.reload();
          });
        }
      },
    });
  }
  const permStore = usePermissionStoreWithOut();

  function getPath(url) {
    let result: string | null = null;
    const find = (list) => {
      list.forEach((item) => {
        const { path, children, meta } = item;
        if (children) {
          find(children);
        } else if (meta?.frameSrc && meta.frameSrc?.endsWith(url)) {
          // 旧菜单 iframe的处理
          result = path;
        }
      });
    };
    find(permStore.getBackMenuList);
    return result;
  }
  const { push: routerPush } = useRouter();

  function goPage({ url }: { url: string }) {
    const path = getPath(url);
    if (path == null) {
      return;
    }
    routerPush(path);
  }

  const { createConfirm } = useMessage();
  /**
   * 删除快捷菜单
   */
  function goRemoveItem(item) {
    const { menuId, menuName } = item;
    createConfirm({
      iconType: 'warning',
      title: () => '确认删除',
      content: () => `是否确认删除【${menuName}】快捷菜单`,
      onOk: async () => {
        const [res] = await useService(() => remoteQuiteMenu(menuId));
        if (!isNullOrUnDef(res)) {
          getList();
        }
      },
    });
  }
</script>

<style scoped lang="less">
  @prefix-cls: ~'@{namespace}-home-utils';
  .@{prefix-cls}{
    &-menu{
      &-item{
        &:hover &-remove{
          display: block;
        }
      }
    }
  }
</style>
