// 處理傳入的Data的地方

function StandarizedOrders(Result) {

    Result.forEach((e) => {
      if (typeof e[0] !== "number") {
        let temp = e[0];
        e[0] = e[1];
        e[1] = temp;
      }
    });
    
    return Result;
  }

// Pass字然後將字分成刪除 / 新增 / 普通三類
// Input: Result ([0, str], [1, str2], [-1, str3]...)
// Output: 還沒加好JSX Marker的Array
// [[0, [str1, str2, str3...]], [1, [str4, str5]], [-1, [str6, str7]]...] <- Return的Array長這樣
function SeparatingByMarkers(Result) {
    let SeparatedResult = [];
    let tempArrs = {
      "0": [],
      "1": [],
      "-1": [],
      "-2": []
    }

    let last = Result[0][0]; // initialize

    // 這邊先check last是否和這個字的marker一樣
    // 一樣 
    //    -> 直接push到自己的arr
    // 不一樣 
    //    -> 先push上一個arr內的內容到ResultConverToJSXTags(大array)裡
    //      - 這裡push的內容是[str, marker]
    //      - 之後會依據這個做JSX css的調整
    //    -> 之後還是push到自己的arr
    
    Result.forEach((e) => {
      // 其他的
      if (last !== e[0]) {
        SeparatedResult.push([last, tempArrs[last]]) // [[0, ["hi", "my", "name", "is"]], [1, ["someone"]], [-1, ["e", "aaa"]] ]
        tempArrs[last] = []
        last = e[0]
      }
      
    tempArrs[last].push(e[1])
  });
                  
      // 最後要再做一次
    SeparatedResult.push([last, tempArrs[last]])
    
    return SeparatedResult
  }

function ConvertToMap(SeparatedResult) {
  let key = 0
  let ConvertedMap = {}
  let tempObj = {}
  
  // map進ConvertedMap
  SeparatedResult.forEach((e) => {
    let Marker = e[0]
    let wordArr = e[1]
    
    // Normal
    if (Marker === 0 || Marker === -2) { 
      if (Object.keys(tempObj).length !== 0) {
        pushIntoMap(key, tempObj)
        tempObj = {} // clear
        key++
      }
      
      tempObj[Marker] = wordArr
      pushIntoMap(key, tempObj)
      tempObj = {} // clear
      key++
    }
    
    // Correction & Deletion
    else if (Marker === 1 || Marker === -1) {
      tempObj[Marker] = wordArr
    }

    // // 換行
    // else if (Marker === -2) {
    //   tempObj[Marker] = ["<br>"]
    // }
  })
  
  function pushIntoMap(key, Info) {
    ConvertedMap[key] = Info
  }
  
  if (Object.keys(tempObj).length !== 0) {
    pushIntoMap(key, tempObj)
    tempObj = {} // clear
    key++
  }
  
  return ConvertedMap
}

// 拿到Result的Map form
// 還沒有加上JSX Tags的版本
export default function getMap(Result) {
  
  let StandarizedOrderedResult = StandarizedOrders(Result)
  let SeparatedResult = SeparatingByMarkers(StandarizedOrderedResult)
  let resultMap = ConvertToMap(SeparatedResult)
  
  return resultMap
}
