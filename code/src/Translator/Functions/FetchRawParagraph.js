import updateMap from "../../Correction/Functions/updateMap"

export default function FetchRawParagraph(resultMap) {
    let length = Object.keys(resultMap).length
    let ChangeOrNot = true
  
    // 先改map
    for (let i = 0; i<length; i++) {
      if (1 in resultMap[i] || -1 in resultMap[i] || -2 in resultMap[i]) {
        updateMap(resultMap, i, ChangeOrNot) // 先假設直接寫回 = 全Accept
      }
    }
  
    // 先把字全部都push到一個array比較好處理
    let temp_arr = []
  
    for (let i = 0; i<length; i++) {
      let arr = resultMap[i]
      if (arr[0].length) {
        arr[0].forEach(str => {
          temp_arr.push(str)
        })
      }
    }
    let paragraph = ""
  
    // 接著把字append到paragraph上
    temp_arr.forEach(str => {
      if (str !== "." && str !== "," && str !== ";" && str !== '\n') { // 條件可能還會改
        paragraph += " "
      } 
  
      paragraph += str
    })  
  
    // 把最前面的空白去掉 
    paragraph = paragraph.trimStart() 

    // 因為很懶得改加空白的規則
    // 所以直接replace掉換行後還有空白的地方
    paragraph = paragraph.replaceAll('\n ', '\n')
    return paragraph
  }
  