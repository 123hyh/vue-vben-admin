<template>
  <!-- 待办事项 -->
  <Card size="small" :class="`${prefixCls}`" title="待办事项" :loading="loading">
    <template #extra>
      <span @click.stop="goLorem" class="cursor-pointer text-blue-500">更多</span>
    </template>
    <ul style="max-height: 300px" class="overflow-auto">
      <li
        @click.stop="goTodo"
        v-for="(item, index) in list"
        :key="item.todoTime + index"
        class="table w-full py-1"
      >
        <div class="table-cell !border-blue-500/80" style="border-left: 3px solid"></div>
        <div class="table-cell indent-xs">{{ item.itemName }}</div>
        <div class="table-cell text-right text-gray-500/50">{{ item.todoTime }}</div>
      </li>
    </ul>
  </Card>
</template>

<script lang="ts" setup>
  import { useDesign } from '/@/hooks/web/useDesign';
  const { prefixCls } = useDesign('home-todo');
  import { Card } from 'ant-design-vue';
  import { useRouter } from 'vue-router';
  import { defineProps, ref, onMounted } from 'vue';
  import { getTodoList } from '/@/api/process/index.ts';
  import { useService } from '../../../../../utils';
  defineProps({
    loading: {
      type: Boolean,
    },
  });
  let list = ref([]);
  const { push } = useRouter();
  function goLorem() {
    push('/companyManage/process/processTodoitem');
  }
  const getList = async () => {
    const [res] = await useService(() => getTodoList({ pageSize: 10, pageNum: 1 }));
    if (res) {
      list.value = res.rows;
    }
  };
  onMounted(getList);
</script>

<style scoped lang="less"></style>
