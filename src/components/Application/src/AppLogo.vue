<!--
 * @Author: Vben
 * @Description: logo component
-->
<template>
  <div class="anticon" :class="getAppLogoClass" @click="goHome">
    <img :src="currentLogo" />
    <div class="ml-2 truncate md:opacity-100" :class="getTitleClass" v-show="showTitle">
      {{ currentTitle }}
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { computed, unref, onMounted, ref } from 'vue';
  import { useGlobSetting } from '/@/hooks/setting';
  import { useGo } from '/@/hooks/web/usePage';
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { PageEnum } from '/@/enums/pageEnum';
  import { useUserStore } from '/@/store/modules/user';
  import { getHomeData } from '/@/api/sys/dict';
  import { useService } from '/@/utils';
  import logoUrl from '../../../assets/images/logo.png';
  const props = defineProps({
    /**
     * The theme of the current parent component
     */
    theme: { type: String, validator: (v: string) => ['light', 'dark'].includes(v) },
    /**
     * Whether to show title
     */
    showTitle: { type: Boolean, default: true },
    /**
     * The title is also displayed when the menu is collapsed
     */
    alwaysShowTitle: { type: Boolean },
  });

  const { prefixCls } = useDesign('app-logo');
  const { getCollapsedShowTitle } = useMenuSetting();
  const userStore = useUserStore();
  const { title } = useGlobSetting();
  const go = useGo();
  const networkTitle = ref('');
  const networkLogo = ref('');
  const getAppLogoClass = computed(() => [
    prefixCls,
    props.theme,
    { 'collapsed-show-title': unref(getCollapsedShowTitle) },
  ]);

  const getTitleClass = computed(() => [
    `${prefixCls}__title`,
    {
      'xs:opacity-0': !props.alwaysShowTitle,
    },
  ]);

  const currentTitle = computed(() => {
    return networkTitle.value === '' ? title : networkTitle.value;
  });

  const currentLogo = computed(() => {
    return networkLogo.value === '' ? logoUrl : networkLogo.value;
  });

  function goHome() {
    go(userStore.getUserInfo.homePath || PageEnum.BASE_HOME);
  }
  onMounted(async () => {
    const [res] = await useService(() =>
      getHomeData({
        dictType: 'sys_userdefined_fieldname',
        dictValues: 'platform_headline,logo',
      }),
    );
    if (res.code === 0) {
      const dictByValue = res.data.reduce((prev, item) => {
        prev[item.dictValue] = item;
        return prev;
      }, {});
      networkTitle.value = dictByValue?.platform_headline?.dictLabel;
      networkLogo.value = dictByValue?.logo?.dictLabel;
    }
  });
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-app-logo';

  .@{prefix-cls} {
    display: flex;
    align-items: center;
    padding-left: 7px;
    cursor: pointer;
    transition: all 0.2s ease;

    &.light {
      border-bottom: 1px solid @border-color-base;
    }

    &.collapsed-show-title {
      padding-left: 20px;
    }

    &.light &__title {
      color: @primary-color;
    }

    &.dark &__title {
      color: @white;
    }

    &__title {
      font-size: 14px;
      font-weight: 700;
      transition: all 0.5s;
      line-height: normal;
    }
  }
</style>
