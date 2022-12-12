import { useWebSocket } from '@vueuse/core';
import { h, onMounted, onUnmounted, watchEffect } from 'vue';
import { NotificationModel } from '/@/api/sys/model/notificationModel';
import { Button, notification } from 'ant-design-vue';
import { isEmpty } from 'lodash-es';
import { useGlobSetting } from '/@/hooks/setting';
import { FieldTimeOutlined } from '@ant-design/icons-vue';
import mitt from '/@/utils/mitt';
import { useMessage } from '/@/hooks/web/useMessage';

const { apiUrl } = useGlobSetting();

const closeNotification = (key: string) => {
  notification.close(key);
};
const { createMessage } = useMessage();
function goTodoDetail(key: string, vo: NotificationModel) {
  closeNotification(key);
  const url = apiUrl + '/' + vo.redirectUrl;
  const opts = {
    BUSINESS: (title, url) => window.$.modal.openFullS(title, url, null, null, 'view'),
    WORK_FLOW: (title, url) => {
      return window.$.modal.openFull(title, url, null, null, null, '办理');
    },
  };
  const fn = opts[vo.noticeType];
  if (fn) {
    fn(vo.title, url);
  } else {
    createMessage.error('请联系管理员对该类型推送跳转进行配置！');
  }
}

/**
 *
 * @param vo
 * @param receiveFn 接收信息回调
 */
const openNotification = (vo: NotificationModel, receiveFn: (vo: NotificationModel) => void) => {
  if (isEmpty(vo)) {
    return receiveFn(vo);
  }
  const key = `__open__${vo.traceId}`;
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
            goTodoDetail(key, vo);
          },
        },
        { default: () => '去办理' },
      ),
    key,
    onClose: () => {
      console.log('关闭了');
    },
  });
  receiveFn(vo);
};

/**
 * 通知
 * @param serverUrl 服务地址
 * @param receiveFn 接收消息回调
 */
export default function useNotification(serverUrl: string, receiveFn) {
  const { data, close, open } = useWebSocket(serverUrl, {
    autoReconnect: true,
    heartbeat: true,
  });

  // 监听响应值
  watchEffect(() => {
    if (!isEmpty(data.value)) {
      let res;
      try {
        res = JSON.parse(data.value) as NotificationModel;
      } catch (error) {
        console.log(`出现错误了：${error}`);
      }
      // @ts-ignore
      openNotification(res, receiveFn);
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

/**
 * notice 事件订阅器
 */
export const noticeEmitter = mitt();
