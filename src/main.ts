import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
import '/@/design/index.less';
import 'virtual:windi-utilities.css';
// Register icon sprite
import 'virtual:svg-icons-register';
import App from './App.vue';
import { createApp } from 'vue';
import { initAppConfigStore } from '/@/logics/initAppConfig';
import { setupErrorHandle } from '/@/logics/error-handle';
import { router, setupRouter } from '/@/router';
import { setupRouterGuard } from '/@/router/guard';
import { setupStore } from '/@/store';
import { setupGlobDirectives } from '/@/directives';
import { setupI18n } from '/@/locales/setupI18n';
import { registerGlobComp } from '/@/components/registerGlobComp';
import { setupScmFrameHook } from './utils/scmFrame';
async function bootstrap() {
  const app = createApp(App);
  const { MODE } = import.meta.env;

  // Configure store
  setupStore(app);

  // Initialize internal system configuration
  initAppConfigStore();

  // Register global components
  registerGlobComp(app);

  // Multilingual configuration
  // Asynchronous case: language files may be obtained from the server side
  await setupI18n(app);

  // Configure routing
  setupRouter(app);

  // router-guard
  setupRouterGuard(router);

  // Register global directive
  setupGlobDirectives(app);

  // Configure global error handling
  setupErrorHandle(app);
  // 当时有frame中台时注册事件
  setupScmFrameHook();

  // https://next.router.vuejs.org/api/#isready
  // await router.isReady();
  app.mount('#scmApp');
  // 加载 h5调试工具
  if (['test', 'dev', 'frameDev'].includes(MODE)) {
    import('vconsole').then((VConsole) => {
      new VConsole.default();
    });
  }
}

bootstrap();
