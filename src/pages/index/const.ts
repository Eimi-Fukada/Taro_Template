import { createContext } from 'react'

export interface IndexProps {}

export interface InitState {
  isLiked: boolean
  num: number
  commentNum: number
  inputValue: string
}
interface ExploreContextProps {
  contextState: InitState
  dispatch: Function
}

export const ExploreContext = createContext<ExploreContextProps>({} as any)
