import { useWebSocket } from '@vueuse/core';
import { h, onMounted, onUnmounted, watchEffect } from 'vue';
import { NotificationModel } from '/@/api/sys/model/notificationModel';
import { Button, notification } from 'ant-design-vue';
import { isEmpty } from 'lodash-es';
import { useGlobSetting } from '/@/hooks/setting';
import { FieldTimeOutlined } from '@ant-design/icons-vue';

const closeNotification = (key: string) => {
  notification.close(key);
};

const openNotification = (vo: NotificationModel) => {
  const { apiUrl } = useGlobSetting();
  const key = `open${vo.traceId}`;
  notification.open({
    message: vo.title ?? '无标题',
    description: () =>
      h('div', [
        h('div', vo.content ?? '无内容'),
        h(
          'div',
          {
            style: {
              'margin-top': '10px',
            },
          },
          `提交人：${vo.submitByName ?? '无'}`,
        ),
      ]),
    duration: 0,
    placement: 'bottomRight',
    style: {
      width: '500px',
    },
    icon: () => h(FieldTimeOutlined, { style: 'color: #108ee9' }),
    btn: () =>
      h(
        Button,
        {
          type: 'primary',
          size: 'small',
          onClick: () => {
            closeNotification(key);
            const url = apiUrl + '/' + vo.redirectUrl;
            // 开启弹窗通知
            window.$.modal.openFull(vo.title, url, null, null, 'view');
          },
        },
        { default: () => '去办理' },
      ),
    key,
    onClose: () => {
      console.log('关闭了');
    },
  });
};

/**
 * 通知
 * @param serverUrl 服务地址
 */
export default function useNotification(serverUrl: string) {
  const { data, close, open } = useWebSocket(serverUrl, {
    autoReconnect: true,
    heartbeat: true,
  });

  // 监听响应值
  watchEffect(() => {
    if (!isEmpty(data.value)) {
      try {
        const res = JSON.parse(data.value) as NotificationModel;
        console.log(res);
        openNotification(res);
        debugger;
      } catch (error) {
        console.log(`出现错误了：${error}`);
      }
    }
  });

  // 打开连接
  onMounted(open);

  // 关闭连接
  onUnmounted(close);
  window.addEventListener('beforeunload', () => {
    close();
  });
}
