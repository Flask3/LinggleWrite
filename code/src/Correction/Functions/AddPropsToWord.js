import React from "react"

export default function AddPropsToWord(pushedArr, selectedCombinationID, selectedWordIdx, updateSelectedWordIdx, updateSelectedCombination, handleChange, type) {
  for (let i = 0; i<pushedArr.length; i++) {
    pushedArr[i] = React.cloneElement(pushedArr[i], {
      selectedCombinationID: selectedCombinationID,
      selectedWordIdx: selectedWordIdx,
      updateSelectedWordIdx: updateSelectedWordIdx,
      updateSelectedCombination: updateSelectedCombination,
      handleChange: handleChange,
      type: type
      })
  }
  
  return pushedArr
}