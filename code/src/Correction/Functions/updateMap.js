export default function updateMap(resultMap, selectedCombinationID, ChangeOrNot) {
  
    let subMap = resultMap[selectedCombinationID] // map
    let changedArr = []
    
    // 感覺應該有更聰明的寫法
    if (-2 in subMap) { 
      // 換行基本上只有在按下改回button的時候才會被處理到
      changedArr = subMap[-2]
    }
    else if (1 in subMap && -1 in subMap) {
      changedArr = ChangeOrNot ? subMap[1] : subMap[-1]
    }
    else if (1 in subMap) {
      changedArr = ChangeOrNot ? subMap[1] : []
    }
    else {
      changedArr = ChangeOrNot ? [] : subMap[-1]
    }
    
    resultMap[selectedCombinationID] = {0: changedArr}
    
    return resultMap
  }