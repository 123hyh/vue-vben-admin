/**
 * 通知类型枚举
 */
export enum NoticeTypeEnum {
  /**
   * 业务单据
   */
  BUSINESS = 'BUSINESS',
  /**
   * 工作流
   */
  WORK_FLOW = 'WORK_FLOW',
  /**
   * 撤回
   */
  RECALL = 'RECALL',
}
export interface NotificationModel {
  /**
   * id
   */
  traceId: string;
  /**
   * 通知标题
   */
  title: string;
  /**
   * 通知内容
   */
  content: string;
  /**
   * 跳转连接
   */
  redirectUrl: string;
  /**
   * 业务单据主键
   */
  businessKey: string;
  /**
   * 提交人id
   */
  submitBy: string;
  /**
   * 提交人名称
   */
  submitByName: string;
  /**
   * 通知类型
   */
  noticeType: 'BUSINESS' | 'WORK_FLOW' | 'RECALL';
  /**
   * 通知栏目编码
   */
  channelCode: string;
}
