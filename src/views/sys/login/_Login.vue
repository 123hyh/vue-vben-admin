<template>
  <div
    :class="`${prefixCls} ${prefixCls}-bg`"
    :style="`background-image: url(${homeData.home_bg_img})`"
    class="md:flex w-full h-full bg-no-repeat"
  >
    <!-- 左侧文字 -->
    <div class="<sm:hidden md:flex-grow h-full">
      <h2 class="text-xl font-bold my-20 mx-44">
        Hello,欢迎使用<br />
        {{ homeData.platform_headline }}</h2
      >
      <!-- 底部版权 -->
      <h3 class="fixed left-40 bottom-2 text-gray-500/40">
        {{ homeData.copyright }}
      </h3>
    </div>
    <!-- 右侧操作 -->
    <div class="md:basis-100 h-full" style="background: #fff">
      <LoginForm />
      <ForgetPasswordForm />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  import { getHomeData } from '/@/api/sys/dict.ts';
  import { useDesign } from '/@/hooks/web/useDesign';
  const { prefixCls } = useDesign('login_wrap');
  import LoginForm from './_LoginForm.vue';
  import ForgetPasswordForm from './ForgetPasswordForm.vue';
  import { useService } from '/@/utils';

  let homeData = reactive({
    /**
     * 版权
     */
    copyright: '',
    /**
     * 平台名称
     */
    platform_headline: '',
    /**
     * 背景图片
     */
    home_bg_img: '',
  });
  (async () => {
    const [res] = await useService(() =>
      getHomeData({
        dictType: 'sys_userdefined_fieldname',
        dictValues: 'copyright,platform_headline,home_bg_img',
      }),
    );
    if (res) {
      res.data.reduce((prev, { dictValue, dictLabel }) => {
        prev[dictValue] = dictLabel;
        return prev;
      }, homeData);
    }
  })();
</script>

<style socped lang="less">
  @prefix-cls: ~'@{namespace}-login_wrap';
  .@{prefix-cls} {
    &-bg {
      // background-image: url('http://xunyu2test.dianmaotong.cn/upload/2022/03/11/ca05d89243f6a042b0a5ebe27b41c22f.jpg?version=1646968496169');
      background-size: 100% 100%;
    }
  }
</style>
