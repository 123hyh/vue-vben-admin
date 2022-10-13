import { h, toRaw } from 'vue';
/**
 * 将指定组件设置自定义名称
 *
 * @param {String} name 组件自定义名称
 * @param {Component | Promise<Component>} component
 * @return {Component}
 */

export function createCustomNameComponent(name, component) {
  return {
    name,
    data() {
      return { component: null };
    },
    async created() {
      if (component instanceof Promise) {
        try {
          const module = await component;
          this.component = module?.default;
        } catch (error) {
          console.error(`can not resolve component ${name}, error:`, error);
        }
      } else if (typeof component === 'function') {
        try {
          const module = await component();
          this.component = module?.default;
        } catch (error) {
          console.error(`can not resolve component ${name}, error:`, error);
        }
      }
    },
    render() {
      if (this.component === null) {
        return;
      }
      const copt = toRaw(this.component);
      const x = h(copt);
      return x;
    },
  };
}
