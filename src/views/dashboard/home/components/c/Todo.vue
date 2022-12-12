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
  const { apiUrl } = useGlobSetting();
  import { Card } from 'ant-design-vue';
  import { useRouter } from 'vue-router';
  import { ref, onMounted, computed } from 'vue';
  import { getIndexTodoList } from '/@/api/process';
  import { useService } from '/@/utils';
  import dayjs from 'dayjs';
  import { useGlobSetting } from '/@/hooks/setting';
  import { noticeEmitter } from '/@/hooks/web/useNotification';
  import { isEmpty } from '/@/utils/is';
  import { useUserStore } from '/@/store/modules/user';
  import { useMessage } from '/@/hooks/web/useMessage';
  const props = defineProps({
    loading: {
      type: Boolean,
    },
  });
  let list = ref([]);
  const isLoading = ref(props.loading);
  const { push } = useRouter();
  function goLorem() {
    push('/org/process/todo');
  }
  const { getUserId: userId } = useUserStore();
  const { createMessage } = useMessage();

  /**
   * 跳转到待办详情
   * @param item
   */
  function goTodo(item) {
    const { id, taskId, nodeName, module, todoUserId, isAdd, taskName: pageName } = item;
    if (isEmpty(taskId)) {
      // 业务单据待办
      const index = window.layer.index + 1;
      const a = document.createElement('a');
      a.href = `${apiUrl}/${item.formUrl}`;
      a.search += `&layerIndex=${index}`;
      window.$.modal.openFullS(item.itemName, a.href);
    } else {
      // 审批流待办
      if (todoUserId !== userId) {
        return createMessage.error('不允许非待办人办理待办事项');
      }
      const prefix = `${apiUrl}/process/todoitem`;
      window.$.modal.openFull(
        nodeName,
        `${prefix}/showVerifyDialog/${taskId}/${id}?module=${module}&pageName=${pageName}&isAdd=${isAdd}`,
        null,
        null,
        null,
        '办理',
      );
    }
  }
  const getList = async () => {
    isLoading.value = true;
    const [res] = await useService(() => getIndexTodoList({ pageSize: 10, pageNum: 1 }));
    if (res) {
      list.value = res.rows;
    }
    isLoading.value = false;
  };
  noticeEmitter;
  const formatDate = computed(() => (time: string) => dayjs(time).format('YYYY-MM-DD'));
  onMounted(() => {
    getList();
  });

  noticeEmitter.on('on-receive-data', (_e) => {
    getList();
  });
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
