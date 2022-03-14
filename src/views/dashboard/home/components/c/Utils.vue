<template>
  <!-- 常用工具组件 -->
  <Card size="small" title="常用功能" :class="`${prefixCls}`" :loading="loading">
    <div>
      <!-- 按钮列表 -->
      <div class="flex flex-wrap gap-2 <sm:max-h-screen-sm overflow-auto">
        <Button
          v-for="item in quickMenus"
          :key="item.menuId"
          size="large"
          class="!px-12 !bg-gray-500/10 !border-transparent flex-auto"
          @click.stop="() => goPage(item)"
          >{{ item.menuName }}</Button
        >
        <!-- 添加按钮 -->
        <Button
          @click="openUserMenu"
          size="large"
          class="!px-12 !border-2 !border-dashed flex-grow"
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
  import { ref, onMounted, defineProps } from 'vue';
  import { PlusOutlined } from '@ant-design/icons-vue';
  import { useGlobSetting } from '/@/hooks/setting';
  import { getQuickMenus } from '../../../../../api/sys/user';
  import { useService } from '../../../../../utils';
  import { usePermissionStoreWithOut } from '../../../../../store/modules/permission';

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
</script>

<style></style>
