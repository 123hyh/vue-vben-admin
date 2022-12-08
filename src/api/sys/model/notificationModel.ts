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
}
