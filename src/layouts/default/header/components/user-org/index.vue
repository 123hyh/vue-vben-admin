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
              <a href="javascript:;">{{ item.label }}</a>
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
  import { useLoading } from '/@/components/Loading';

  export default defineComponent({
    name: 'UserOrg',
    components: {
      Dropdown,
      Menu,
      MenuItem,
      DownOutlined,
    },

    setup() {
      const [openFullLoading] = useLoading({ tip: '加载中', absolute: true });

      const userStore = useUserStoreWithOut();
      const value = ref(userStore.getOrgId);
      const options = userStore.getOrgList;
      const getOrgName = computed(() => {
        const [{ label } = {}] = options.filter((item) => item.value === unref(value));
        return label ?? '';
      });
      const changeOrg = async ({ key } = { key: '' }) => {
        value.value = key;
        openFullLoading();
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
