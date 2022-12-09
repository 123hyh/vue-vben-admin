<template>
  <!-- 待办事项 -->
  <Card size="small" :class="`${prefixCls}`" title="待办事项" :loading="loading">
    <template #extra>
      <span @click.stop="goLorem" class="cursor-pointer text-blue-500">更多</span>
    </template>
    <ul style="max-height: 300px" class="overflow-auto" :class="`${prefixCls}-list`">
      <li
        @click.stop="() => goTodo(item)"
        v-for="(item, index) in list"
        :key="item.todoTime + index"
        class="w-full py-1 flex items-center cursor-pointer hover:text-blue-500/70"
        :class="`${prefixCls}-list-item`"
      >
        <div
          class="flex-grow overflow-hidden overflow-ellipsis whitespace-nowrap px-4"
          :class="`${prefixCls}-list-item-text`"
          :title="item.itemName"
          >{{ item.itemName }}</div
        >
        <div class="text-gray-500/50" :class="`${prefixCls}-list-item-time`">{{
          formatDate(item.todoTime)
        }}</div>
      </li>
    </ul>
  </Card>
</template>

<script lang="ts" setup>
  import { useDesign } from '/@/hooks/web/useDesign';
  const { prefixCls } = useDesign('home-todo');
  import { Card } from 'ant-design-vue';
  import { useRouter } from 'vue-router';
  import { ref, onMounted, computed } from 'vue';
  import { getTodoList } from '/@/api/process/index.ts';
  import { useService } from '/@/utils';
  import dayjs from 'dayjs';
  defineProps({
    loading: {
      type: Boolean,
    },
  });
  let list = ref([]);
  const { push } = useRouter();
  function goLorem() {
    push('/org/process/todo');
  }
  function goTodo(item) {
    window.$.modal.openFullS(item.itemName, `/basic-api/${item.formUrl}`);
  }
  const getList = async () => {
    const [res] = await useService(() => getTodoList({ pageSize: 10, pageNum: 1 }));
    if (res) {
      list.value = res.rows;
    }
  };
  const formatDate = computed(() => (time: string) => dayjs(time).format('YYYY-MM-DD'));
  onMounted(getList);
</script>

<style scoped lang="less">
  @prefix-cls: ~'@{namespace}-home-todo';
  .@{prefix-cls} {
    &-list {
      & > li {
        &::before {
          display: block;
          content: '';
          height: 15px;
          border-left: 3px solid rgba(59, 130, 246, 0.8);
        }
      }

      &-item {
        @time-w: 5rem;

        &-text {
          width: calc(100% - @time-w);
        }

        &-time {
          width: @time-w;
        }
      }
    }
  }
</style>
