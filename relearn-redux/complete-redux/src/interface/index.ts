
export type Fn = () => any

export type Unsubscribe = () => any

export interface Action {
  type: string;
  payload?: any;
}

export interface Store {
  subscribe: (listener: Fn) => Unsubscribe;
  dispatch: (action: Action) => void;
  getState: () => any;
  replaceReducer: (nextReducer: any) => any;
}
