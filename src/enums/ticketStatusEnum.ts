/* eslint-disable no-unused-vars */
export enum TicketStatusEnum {
  /** 未使用未送出 */
  NoUseNoSend = 1,
  /** 未使用已送出 */
  NoUseHaveSend,
  /** 已使用未送出 */
  HaveUseNoSend,
  /** 已使用已送出 */
  HaveUseHaveSend,
}

/**a
 * 状态描述
 */
export const TicketStatusEnumDesc = {
  [TicketStatusEnum.NoUseNoSend]: '未使用未送出',
  [TicketStatusEnum.NoUseHaveSend]: '未使用已送出',
  [TicketStatusEnum.HaveUseNoSend]: '已使用未送出',
  [TicketStatusEnum.HaveUseHaveSend]: '已使用已送出',
}
