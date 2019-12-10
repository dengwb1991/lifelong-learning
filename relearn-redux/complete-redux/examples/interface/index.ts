export interface Action {
  type: string,
  payload?: any
}

export interface Dispatch {
  (action: Action): void
}