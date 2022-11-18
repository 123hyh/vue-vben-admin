<template>
  <div>
    <TableComponent prefixClass="busimode" table-id="1" :apiFn="busiModelPage">
      <template #toolbar>
        <a-button type="primary" @click="goAddPage"> 新增 </a-button>
      </template>
    </TableComponent>
  </div>
</template>
<script setup lang="ts">
  import TableComponent from '/@/components/ScmCommon/src/PageList/index.vue';
  import { busiModelPage } from '/@/api/bas/busiModel';
  import { useRouter } from 'vue-router';

  const { push } = useRouter();
  function goAddPage() {
    push({ name: 'BusiModelListAdd' });
  }

  /**
   * 删除数据
   */
  // async function deleteData() {
  //   useService(() => removeBusiModel([]));
  // }
</script>
