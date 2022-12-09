<template>
  <div :class="`${prefixCls}`" class="p-4 md:flex w-full md:space-x-4">
    <!-- 左侧 -->
    <div :class="`${prefixCls}-left-wrap`" class="w-full">
      <Summary :loading="loadiyg" class="enter-y" />
      <div class="w-full flex <md:flex-wrap space-x-4">
        <!--  -->
        <div class="!md:w-3/4 <md:w-full"
          ><Utils :loading="loading" class="enter-y !mt-4 w-full" />
          <div class="md:flex md:mt-4 enter-y" :class="`${prefixCls}-todo`">
            <Todo :loading="loading" class="!<md:mt-4 !md:mr-4 md:w-1/2" />
            <WarnNotice :loading="loading" class="!<md:mt-4 md:w-1/2" /> </div
        ></div>
        <div class="!md:w-1/4 <md:w-full space-y-4 mt-4">
          <ExchangeRate :loading="loading" class="!md:mt-0 !<md:mt-4 basis-1/2" />
          <Announce :loading="loading" class="!flex-grow" />
        </div>
      </div>
    </div>
    <!-- 右侧 -->
    <!-- <div class="enter-x" :class="`${prefixCls}-right-wrap`">
      <ExchangeRate :loading="loading" class="!md:mt-0 !<md:mt-4" />
      <Announce :loading="loading" class="!mt-4" />
    </div> -->
  </div>
</template>
<script lang="ts">
  import { useDesign } from '/@/hooks/web/useDesign';
  import { ref, defineComponent } from 'vue';
  import Summary from './components/c/Summary.vue';
  import ExchangeRate from './components/c/ExchangeRate.vue';
  import Utils from './components/c/Utils.vue';
  import Todo from './components/c/Todo.vue';
  import WarnNotice from './components/c/WarnNotice.vue';
  import Announce from './components/c/Announce.vue';
  export default defineComponent({
    name: 'Home',
    components: {
      Summary,
      ExchangeRate,
      Utils,
      Todo,
      WarnNotice,
      Announce,
    },
    setup() {
      const loading = ref(true);
      const { prefixCls } = useDesign('home-page');
      setTimeout(() => {
        loading.value = false;
      }, 1500);
      return {
        prefixCls,
        loading,
      };
    },
  });
</script>
<style scoped lang="less">
    @prefix-cls: ~'@{namespace}-home-page';
    @r-width: 330px;
    .@{prefix-cls}{
      @media (min-width: 1023.9px) {
         &-todo{
           width: 100%;

            & > * {
              width: calc(50% - 0.5rem);
            }
          }

        &-left-wrap{
          // width: calc(100% - @r-width - 1rem);


        }

        &-right-wrap{
          // width: @r-width;
        }
    }
  }
</style>
