<template>
  <!-- 汇率组件 -->
  <Card :class="`${prefixCls}`" title="今日汇率" size="small" :loading="loading">
    <template #extra>
      <div @click.stop="goLorem" class="cursor-pointer text-blue-500">更多</div>
    </template>
    <div class="w-full table">
      <div class="table-row-group" style="font-size: 14px">
        <div class="table-row">
          <div class="table-cell p-1"></div>
          <div class="table-cell p-1">海关汇率</div>
          <div class="table-cell p-1">中银汇率</div>
        </div>
        <template v-for="(row, index) in rates" :key="row.label + index">
          <div class="table-row">
            <template v-for="(column, index1) in columns" :key="column.label + index1">
              <div class="table-cell p-1">
                <template v-if="iconMap[row[column.field]]">
                  <div class="flex space-x-2">
                    <span> {{ row[column.field] }}</span>
                    <img
                      style="width: 20px"
                      :src="`${apiUrl}${iconMap[row[column.field]]}`"
                      alt=""
                    />
                  </div>
                </template>
                <span v-else> {{ row[column.field] }}</span>
              </div>
            </template>
          </div>
        </template>
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
  import { ref } from 'vue';
  import { useGlobSetting } from '/@/hooks/setting';

  defineProps({
    loading: {
      type: Boolean,
    },
  });
  const { push } = useRouter();
  const { apiUrl } = useGlobSetting();
  const iconMap = {
    美元: '/img/flag-USD.png',
    港币: '/img/flag-HKD.png',
    英镑: '/img/flag-GBP.png',
    日元: '/img/flag-JPY.png',
    欧元: '/img/flag-EUR.png',
  };
  const columns = [{ field: 'label' }, { field: 'value1' }, { field: 'value2' }];
  /**
   * 中银
   */
  const rates = ref([
    {
      label: '美元',
      value1: '6.3463',
      value2: '6.3463',
    },
    {
      label: '港币',
      value1: '0.8463',
      value2: '0.8463',
    },
    {
      label: '英镑',
      value1: '8.5963',
      value2: '8.5963',
    },
    {
      label: '日元',
      value1: '0.059213',
      value2: '0.059213',
    },
    {
      label: '欧元',
      value1: '7.2074',
      value2: '7.2074',
    },
  ] as Rate[]);

  function goLorem() {
    push('/bas/exchangerate');
  }
</script>

<style lang="less" scoped></style>
