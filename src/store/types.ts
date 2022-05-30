import type { MenuConfig } from "../utils";

export interface IRootState {
  count: number
}

export interface PanesState {
  panes: MenuConfig[]
  activeKey: string
}

export interface IModuleState {
  panes: PanesState
}

export type IStore = IRootState & IModuleState;