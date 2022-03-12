/**
 * Plugin to minimize and use ejs template syntax in index.html.
 * https://github.com/anncwb/vite-plugin-html
 */
import type { PluginOption } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import pkg from '../../../package.json';
import { GLOB_CONFIG_FILE_NAME } from '../../constant';

export function configHtmlPlugin(env: ViteEnv, isBuild: boolean) {
  const { VITE_GLOB_APP_TITLE, VITE_PUBLIC_PATH, VITE_GLOB_API_URL } = env;

  const path = VITE_PUBLIC_PATH.endsWith('/') ? VITE_PUBLIC_PATH : `${VITE_PUBLIC_PATH}/`;

  const getAppConfigSrc = () => {
    return `${path || '/'}${GLOB_CONFIG_FILE_NAME}?v=${pkg.version}-${new Date().getTime()}`;
  };

  const htmlPlugin: PluginOption[] = createHtmlPlugin({
    minify: isBuild,
    inject: {
      // Inject data into ejs template
      data: {
        title: VITE_GLOB_APP_TITLE,
        injectScript: [
          '/js/jquery.min.js?v=20210320',
          '/js/bootstrap.min.js?v=20210320',
          '/ajax/libs/layer/layer.min.js?v=20210320',
          '/ruoyiLoc/js/ry-ui.js?v=20210320',
          '/ruoyiLoc/js/common.js?v=20210320',
          '/ruoyiLoc/index.js?v=20211211',
          '/ajax/libs/fullscreen/jquery.fullscreen.js?v=20210320',
        ].reduce((prev, uri) => (prev += `<script src="${VITE_GLOB_API_URL}${uri}"></script>`), ''),
      },
      // Embed the generated app.config.js file
      tags: isBuild
        ? [
            {
              tag: 'script',
              attrs: {
                src: getAppConfigSrc(),
              },
            },
          ]
        : [],
    },
  });
  return htmlPlugin;
}
