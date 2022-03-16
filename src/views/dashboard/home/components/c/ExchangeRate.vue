<template>
  <!-- 汇率组件 -->
  <Card :class="`${prefixCls}`" title="今日汇率" size="small" :loading="loading">
    <template #extra>
      <div @click.stop="goLorem" class="cursor-pointer text-blue-500">更多</div>
    </template>
    <div class="flex">
      <!-- 海关汇率 -->
      <div class="basis-1/2 px-4">
        <div class="text-gray-500/80">海关汇率</div>
        <ul>
          <li class="pt-2" v-for="(item, i) in cusRates" :key="'c_' + i + '_' + item.value"
            >{{ item.label }} &nbsp;&nbsp; &nbsp;&nbsp;<span class="text-blue-500 font-medium">{{
              item.value
            }}</span></li
          >
        </ul>
      </div>
      <!-- 中银汇率 -->
      <div class="basis-1/2 px-4">
        <div class="text-gray-500/80">中银汇率</div>
        <ul>
          <li class="pt-2" v-for="(item, i) in bocRates" :key="'b_' + i + '_' + item.value"
            >{{ item.label }} &nbsp;&nbsp; &nbsp;&nbsp;<span class="text-yellow-500 font-medium">{{
              item.value
            }}</span></li
          >
        </ul>
      </div>
    </div>
  </Card>
</template>

<script lang="ts" setup>
  type Rate = { label: string; value: string };
  import { useDesign } from '/@/hooks/web/useDesign';
  const { prefixCls } = useDesign('home-exrate');
  import { Card } from 'ant-design-vue';
  import { useRouter } from 'vue-router';
  import { defineProps, ref } from 'vue';
  defineProps({
    loading: {
      type: Boolean,
    },
  });
  const { push } = useRouter();
  /**
   * 中银
   */
  const bocRates = ref([
    {
      label: '美元',
      value: '6.3463',
    },
    {
      label: '港币',
      value: '0.8463',
    },
    {
      label: '英镑',
      value: '8.5963',
    },
    {
      label: '日元',
      value: '0.059213',
    },
    {
      label: '欧元',
      value: '7.2074',
    },
  ] as Rate[]);
  /**
   * 海关汇率
   */
  const cusRates = ref([
    {
      label: '美元',
      value: '6.3463',
    },
    {
      label: '港币',
      value: '0.8463',
    },
    {
      label: '英镑',
      value: '8.5963',
    },
    {
      label: '日元',
      value: '0.059213',
    },
    {
      label: '欧元',
      value: '7.2074',
    },
  ] as Rate[]);
  function goLorem() {
    push('/bas/erpBasExchangerate');
  }
</script>

<style lang="less" scoped></style>
