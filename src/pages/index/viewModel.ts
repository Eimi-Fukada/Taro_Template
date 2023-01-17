import { useState } from "react";

export function ViewModel() {
  /** write your js */
  const [currentIndex, setCurrentIndex] = useState(0);

  return {
    currentIndex,
    setCurrentIndex
  };
}
