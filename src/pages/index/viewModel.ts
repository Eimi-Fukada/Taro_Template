import { useReducer, useState } from "react";

export interface InitState {
  isLiked: boolean;
  num: number;
  commentNum: number;
  inputValue: string;
}

export function ViewModel() {
  /** write your js */
  const [currentIndex, setCurrentIndex] = useState(0);

  /**
   * useReducer + useContext
   */
  const initState: InitState = {
    isLiked: true,
    num: 5,
    commentNum: 8,
    inputValue: ""
  };
  const reducer = (oldState, action) => {
    switch (action.type) {
      case "handleLove":
        return {
          ...oldState,
          isLiked: !action.value,
          num: action.value ? oldState.num - 1 : oldState.num + 1
        };
      case "addComments":
        return { ...oldState, inputValue: "" };
      default:
        return oldState;
    }
  };
  const [contextState, dispatch] = useReducer(reducer, initState);
  /**
   * useReducer + useContext
   */

  return {
    currentIndex,
    setCurrentIndex,
    contextState,
    dispatch
  };
}
