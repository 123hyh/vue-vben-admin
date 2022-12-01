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
          <div class="table-cell p-1">中银汇率</div>
          <div class="table-cell p-1">海关汇率</div>
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

<script lang="ts" setup name="ExchangeRate">
  type Rate = { label: string; value1: string; value2: string };
  import { useDesign } from '/@/hooks/web/useDesign';
  const { prefixCls } = useDesign('home-exrate');
  import { Card } from 'ant-design-vue';
  import { useRouter } from 'vue-router';
  import { onMounted, ref } from 'vue';
  import { useGlobSetting } from '/@/hooks/setting';
  import { formatToDate } from '/@/utils/dateUtil';
  import { getBocRateList, getExchangeRateList } from '/@/api/bas/exchangeRate';
  import dayjs from 'dayjs';

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
  const rates = ref([] as Rate[]);

  function goLorem() {
    push('/bas/exchangerate');
  }

  async function getBocRatePage() {
    const curDate = new Date();
    const p = () =>
      Promise.allSettled([
        getBocRateList({
          orderDate: formatToDate(dayjs()),
          exchRateType: 'NIN',
        }),
        getExchangeRateList({
          exchCurrency: 'CNY',
          exchangerateYear: curDate.getFullYear(),
          exchangerateMonth: curDate.getMonth() + 1,
        }),
      ]);
    const res = await p();
    if (res) {
      const [bocRateListRes, exchangeRateListRes] = res;
      let exchangeRateList = {};
      // 汇率
      if (exchangeRateListRes.status === 'fulfilled') {
        const { rows } = exchangeRateListRes.value;
        exchangeRateList = rows.reduce((prev, item) => {
          prev[item.currencyName] = item;
          return prev;
        }, {});
      }
      // 中银
      if (bocRateListRes.status === 'fulfilled') {
        const { rows } = bocRateListRes.value;
        rates.value = rows.map((item) => ({
          label: item.currencyName,
          value1: item.rateSellingPriceRound,
          value2: exchangeRateList[item.currencyName]?.customsRate ?? '-',
        }));
      }
    }
  }
  onMounted(() => {
    getBocRatePage();
  });
</script>

<style lang="less" scoped></style>
