<script lang="ts">
  import { defineComponent, ref, watchEffect, unref } from 'vue';
  import { InputNumber } from 'ant-design-vue';
  import { propTypes } from '/@/utils/propTypes';
  export default defineComponent({
    name: 'NumberRange',
    components: {
      InputNumber,
    },
    props: {
      value: propTypes.array,
      showInput: propTypes.bool.def(true),
      disabled: propTypes.bool,
    },
    emits: ['score-change', 'change'],
    setup: (props, { emit }) => {
      const beginValue = ref<number>();
      const endValue = ref<number>();

      function beginChange(v) {
        beginValue.value = v;
        emit('change', [v, unref(endValue)]);
      }

      function endChange(v) {
        endValue.value = v;
        emit('change', [unref(beginValue), v]);
      }

      watchEffect(() => {
        beginValue.value = (props.value ?? [])[0] as number;
        endValue.value = (props.value ?? [])[1] as number;
      });

      return { beginValue, endValue, beginChange, endChange };
    },
  });
</script>
<template>
  <div class="inline-flex items-center w-full">
    <InputNumber style="flex: 4" :value="beginValue" @change="beginChange" />
    <div style="flex: 1" class="text-center">至</div>
    <InputNumber style="flex: 4" :value="endValue" @change="endChange" />
  </div>
</template>
