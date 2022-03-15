<template>
  <!-- 预警通知 -->
  <Card size="small" :class="`${prefixCls}`" title="预警通知" :loading="loading">
    <template #extra>
      <span @click.stop="goLorem" class="cursor-pointer text-blue-500 pointer-events-none"
        >更多</span
      >
    </template>
    <ul style="max-height: 300px" class="overflow-auto" :class="`${prefixCls}-list`">
      <li
        @click.stop="() => goTodo(item)"
        v-for="(item, index) in list"
        :key="item.todoTime + index"
        class="w-full py-1 flex items-center cursor-pointer hover:text-blue-500/70"
      >
        <div class="w-full pl-4">{{ item.itemName }}</div>
      </li>
    </ul>
  </Card>
</template>

<script lang="ts" setup>
  import { useDesign } from '/@/hooks/web/useDesign';
  const { prefixCls } = useDesign('home-warn');
  import { Card } from 'ant-design-vue';
  import { useRouter } from 'vue-router';
  import { ref, onMounted } from 'vue';
  import { getTodoList } from '/@/api/process/index.ts';
  import { useService } from '/@/utils';
  defineProps({
    loading: {
      type: Boolean,
    },
  });
  const list = ref([]);
  const { push } = useRouter();
  function goLorem() {
    push('/companyManage/process/processTodoitem');
  }
  function goTodo(item) {
    $.modal.openFull(
      item.itemName,
      '/basic-api/bas/basCompanyCreditlineTmp/process/A3B22319-A3E5-42AF-BC46-B5AA34DE0276',
    );
  }
  onMounted(async () => {
    const [res] = await useService(() => getTodoList({ pageSize: 10, pageNum: 3 }));
    if (res) {
      list.value = res.rows;
    }
  });
</script>

<style scoped lang="less">
  @prefix-cls: ~'@{namespace}-home-warn';
  .@{prefix-cls} {
    &-list > li {
      white-space: nowrap;
      overflow: hidden;

      &::before {
        display: block;
        content: '';
        height: 15px;
        border-left: 3px solid rgba(239, 68, 68, 0.8);
      }
    }
  }
</style>
