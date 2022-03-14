<template>
  <div class="p-4 md:flex w-full md:space-x-4">
    <!-- 左侧 -->
    <div class="left-wrap md:basis-3/4">
      <Summary :loading="loading" class="enter-y" />
      <Utils :loading="loading" class="enter-y !mt-4" />
      <div class="md:flex md:mt-4 enter-y md:space-x-4">
        <Todo :loading="loading" class="md:flex-1 !<md:mt-4" />
        <WarnNotice :loading="loading" class="md:flex-1 !<md:mt-4" />
      </div>
    </div>
    <!-- 右侧 -->
    <div class="right-wrap md:flex-grow enter-x">
      <ExchangeRate :loading="loading" class="!md:mt-0 !<md:mt-4" />
      <Announce :loading="loading" class="!mt-4" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import Summary from './components/c/Summary.vue';
  import ExchangeRate from './components/c/ExchangeRate.vue';
  import Utils from './components/c/Utils.vue';
  import Todo from './components/c/Todo.vue';
  import WarnNotice from './components/c/WarnNotice.vue';
  import Announce from './components/c/Announce.vue';

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);
</script>
