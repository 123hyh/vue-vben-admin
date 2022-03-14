<template>
  <!-- 公告 -->
  <Card size="small" :class="`${prefixCls}`" title="公告" :loading="loading">
    <template #extra>
      <span @click.stop="goLorem" class="pointer-events-none cursor-pointer text-blue-500"
        >更多</span
      >
    </template>
    <ul>
      <li
        @click.stop="goDetail"
        v-for="(item, index) in list"
        :key="item.label + index"
        class="pointer-events-none cursor-pointer w-full py-1 truncate"
      >
        {{ item.label }}
      </li>
    </ul>
  </Card>
</template>

<script lang="ts" setup>
  import { useDesign } from '/@/hooks/web/useDesign';
  const { prefixCls } = useDesign('home-announce');
  import { Card } from 'ant-design-vue';
  import { useRouter } from 'vue-router';
  import { ref, onMounted } from 'vue';

  defineProps({
    loading: {
      type: Boolean,
    },
  });

  let list = ref([
    {
      label: '2022-01-04 【产品通知】系统更新产品风险通告',
    },
    {
      label: '2022-01-22 【产品通知】系统更新产品通告',
    },
    {
      label: '2022-01-24 【产品通知】系统更新产品风险通告',
    },
    {
      label: '2022-03-14 【产品通知】系统更新产品通告',
    },
  ]);
  const { push } = useRouter();

  function goDetail() {
    push('/companyManage/process/processTodoitem');
  }
  onMounted(async () => {});
</script>

<style scoped lang="less"></style>
