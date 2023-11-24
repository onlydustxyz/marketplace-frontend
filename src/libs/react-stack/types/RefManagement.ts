export interface RefManagementInterface<TRef> {
  state: TRef
  subscribers: {
    [key: string]: (value: TRef) => void
  }
}
