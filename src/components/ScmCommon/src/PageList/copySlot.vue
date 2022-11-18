<script setup lang="ts" name="CopySlot">
  import { useCopyToClipboard } from '/@/hooks/web/useCopyToClipboard';
  import { propTypes } from '/@/utils/propTypes';

  import { CopyOutlined } from '@ant-design/icons-vue';
  import { isEmpty } from '/@/utils/is';
  import { useMessage } from '/@/hooks/web/useMessage';

  const { clipboardRef } = useCopyToClipboard();
  const props = defineProps({
    value: propTypes.string,
  });
  const { createMessage } = useMessage();

  function goCopy() {
    if (isEmpty(props.value)) {
      createMessage.error('没有可拷贝的内容');
    } else {
      clipboardRef.value = props.value;
      createMessage.success('拷贝成功！');
    }
  }
</script>
<template>
  <span :title="value">
    <CopyOutlined
      @click="goCopy"
      class="cursor-pointer"
      style="color: rgb(132 199 22)"
      title="点击复制"
    />
    {{ value }}
  </span>
</template>
