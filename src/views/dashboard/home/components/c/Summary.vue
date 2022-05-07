<template>
  <div class="md:flex">
    <Card
      v-for="(item, i) in list"
      :key="item.label + i"
      size="small"
      :loading="loading"
      class="md:w-1/4 w-full !md:mt-0 !md:mr-4"
    >
      <div class="flex justify-center items-center gap-x-4">
        <component
          :is="getComByLable(item.label)"
          class="text-4xl"
          style="color: rgba(59, 130, 246, 1)"
        />
        <!--        <FileProtectOutlined class="text-4xl" style="color: rgba(59, 130, 246, 1)" />-->
        <div>
          <div class="py-2">{{ item.label }}</div>
          <CountTo
            :key="item.value1"
            :startVal="0"
            :endVal="+item.value1"
            class="font-bold text-2xl py-2"
          />
          <div
            class="flex justify-between items-center gap-x-4 py-2"
            :class="item.value2 > 0 ? 'text-red-500' : 'text-green-500'"
          >
            <CountTo :key="item.value2" :startVal="0" :endVal="+item.value2" suffix="%" />
            <Icon
              :icon="item.value2 > 0 ? 'carbon:arrow-up-right' : 'carbon:arrow-down-left'"
              :size="20"
            />
          </div>
        </div>
      </div>
    </Card>

    <template v-if="false">
      <Card size="small" :loading="loading" class="md:w-1/4 w-full !md:mt-0 !md:mr-4">
        <div class="flex justify-center items-center gap-x-4">
          <FileProtectOutlined class="text-4xl" style="color: rgba(59, 130, 246, 1)" />
          <div>
            <div class="py-2">今日订单数</div>
            <CountTo :startVal="1" :endVal="249.01" class="font-bold text-2xl py-2" />
            <div class="flex justify-between items-center gap-x-4 text-red-500 py-2">
              <CountTo :startVal="1" :endVal="3.98" suffix="%" />
              <Icon icon="carbon:arrow-up-right" :size="20" />
            </div>
          </div>
        </div>
      </Card>
      <!-- 月订单数 -->
      <Card size="small" :loading="loading" class="md:w-1/4 w-full !md:mt-0 !md:mr-4 !mt-4">
        <div class="flex justify-center items-center gap-x-4">
          <FileSyncOutlined class="text-4xl" style="color: rgba(59, 130, 246, 1)" />
          <div>
            <div class="py-2">月订单数</div>
            <CountTo :startVal="1" :endVal="88920.01" class="font-bold text-2xl py-2" />
            <div class="flex justify-between items-center gap-x-4 text-green-500 py-2">
              <CountTo :startVal="1" :endVal="-10.1" suffix="%" />
              <Icon icon="carbon:arrow-down-left" :size="20" />
            </div>
          </div>
        </div>
      </Card>
      <!-- 业务量统计 -->
      <Card size="small" :loading="loading" class="md:w-1/4 w-full !md:mt-0 !md:mr-4 !mt-4">
        <div class="flex justify-center items-center gap-x-4">
          <MoneyCollectFilled class="text-4xl" style="color: rgba(59, 130, 246, 1)" />
          <div>
            <div class="py-2">业务量统计</div>
            <CountTo prefix="$ " :startVal="1" :endVal="88920.01" class="py-2 font-bold text-2xl" />
            <div class="flex justify-between items-center gap-x-4 text-red-500 py-2">
              <CountTo :startVal="1" :endVal="10.98" suffix="%" />
              <Icon icon="carbon:arrow-up-right" :size="20" />
            </div>
          </div>
        </div>
      </Card>
      <!-- 新增客户 -->
      <Card size="small" :loading="loading" class="md:w-1/4 w-full !md:mt-0 !mt-4">
        <div class="flex justify-center items-center gap-x-4">
          <UserAddOutlined class="text-4xl" style="color: rgba(59, 130, 246, 1)" />
          <div>
            <div class="py-2">新增客户</div>
            <CountTo :startVal="1" :endVal="88920.01" class="py-2 font-bold text-2xl" />
            <div class="flex justify-between items-center gap-x-4 text-red-500 py-2">
              <CountTo :startVal="1" :endVal="0.01" suffix="%" />
              <Icon icon="carbon:arrow-up-right" :size="20" />
            </div>
          </div>
        </div>
      </Card>
    </template>
  </div>
</template>
<script lang="ts" setup>
  import { CountTo } from '/@/components/CountTo';
  import { Icon } from '/@/components/Icon';
  import { Card } from 'ant-design-vue';
  import {
    FileProtectOutlined,
    FileSyncOutlined,
    UserAddOutlined,
    MoneyCollectFilled,
  } from '@ant-design/icons-vue';
  import { getDashboardData } from '/@/api/bi';
  import { onMounted, ref } from 'vue';
  import { useService } from '/@/utils';
  import { BiBaseModel } from '/@/api/bi/model/biBaseModel';

  defineProps({
    loading: {
      type: Boolean,
    },
  });
  const list = ref([] as Array<BiBaseModel>);
  async function getData() {
    const [res, _err] = await useService(getDashboardData);
    if (res) {
      list.value = res.data;
    }
  }
  const getComByLable = (() => {
    const comByLable = {
      日销售订单数: FileProtectOutlined,
      月销售订单数: FileSyncOutlined,
      销售额统计: MoneyCollectFilled,
      月新增客户: UserAddOutlined,
    };
    return (label: string) => {
      return comByLable[label] ?? FileProtectOutlined;
    };
  })();
  onMounted(getData);
</script>
<style lang="less" scoped></style>
