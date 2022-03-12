<template>
  <div>
    <Dropdown>
      <a class="ant-dropdown-link" @click.prevent>
        {{ getOrgName }}
        <DownOutlined />
      </a>
      <template #overlay>
        <Menu @click="changeOrg">
          <template v-for="item in options" :key="item.value">
            <MenuItem>
              <a href="javascript:;">{{ item.deptName }}</a>
            </MenuItem>
          </template>
        </Menu>
      </template>
    </Dropdown>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { Dropdown, Menu, MenuItem } from 'ant-design-vue';
  import { DownOutlined } from '@ant-design/icons-vue';
  import { useUserStoreWithOut } from '/@/store/modules/user';
  import { useMessage } from '../../../../../hooks/web/useMessage';
  import { orgDeptTypeEnum } from '../../../../../enums/orgEnum';

  export default defineComponent({
    name: 'UserOrg',
    components: {
      Dropdown,
      Menu,
      MenuItem,
      DownOutlined,
    },

    setup() {
      const { createMessage } = useMessage();
      const userStore = useUserStoreWithOut();

      const getOrgName = computed(
        () =>
          options.find(
            (item) => item.deptType === orgDeptTypeEnum.TYPE_GROUP || item.value === unref(value),
          )?.deptName ?? '无组织',
      );

      const value = ref(userStore.getOrgId);
      const options = userStore.getOrgList;

      const changeOrg = async ({ key } = { key: '' }) => {
        value.value = key;
        createMessage.loading({
          content: '切换组织中，完成后将自动刷新',
          duration: 2,
        });
        await userStore.switchOrg(key);
        location.reload();
      };
      return {
        value,
        options,
        getOrgName,
        changeOrg,
      };
    },
  });
</script>
