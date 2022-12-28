import type { MenuConfig } from '@/utils'

export interface IRootState {
  count: number
}

export interface PanesState {
  panes: MenuConfig[]
  activeKey: string
}

export interface MicroState {
  microApplicationList: Map<string, string>
}

export interface IModuleState {
  panes: PanesState
  micro: MicroState
}

export type IStore = IRootState & IModuleState
