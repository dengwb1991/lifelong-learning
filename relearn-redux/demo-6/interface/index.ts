
export type Fn = () => any

export interface Action {
  type: string,
  payload?: any
}

export interface Store {
  subscribe: (listener: Fn) => void
  dispatch: (action: Action) => void
  getState: () => any
}
