<template>
  <ConfigProvider :locale="getAntdLocale">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ConfigProvider>
</template>

<script lang="ts" setup>
  import { ConfigProvider } from 'ant-design-vue';
  import { AppProvider } from '/@/components/Application';
  import { useLocale } from '/@/locales/useLocale';

  import 'dayjs/locale/zh-cn';
  import { useGo } from '/@/hooks/web/usePage';
  import { useTabs } from '/@/hooks/web/useTabs';
  // support Multi-language
  const { getAntdLocale } = useLocale();

  // Listening to page changes and dynamically changing site titles

  // 全局创建页签（给旧的scm 项目使用）
  const go = useGo();
  const { setTitle } = useTabs();
  window.createMenuItem = (url: string, title: string) => {
    go(url);
    setTimeout(() => {
      setTitle(title);
    }, 500);
  };
</script>
