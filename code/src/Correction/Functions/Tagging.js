// 也是處理傳入Data的地方，不過到這邊傳入的是Map了

import Word from "../Components/Word";
import Normal from "../Components/Normal";
import Correction from "../Components/Correction";
import Deletion from "../Components/Deletion";
import { Result } from "../../data";
import NextLine from "../Components/NextLine";

export default function Tagging(ConvertedMap) {
    let ResultWithJSXTags = []
    let key = 0
    // {
    //  0: {
    //      0: ["a", "b", "c"...]       
    //     },
    //  1: {
    //      1: ["a"],
    //      -1: ["b", "c"]
    //     },
    // ...
    // }
    
    // 以ConvertedMap第一個item為例子
    // combinationID: 0
    // insideMap: {0: ["a", "b", "c"]}
    // marker: 0 (value內的)
    // wordArr: ["a", "b", "c"]
    
    let wordIdx = 0
    let prevMarker = "0"
  
    for (let [combinationID, insideMap] of Object.entries(ConvertedMap)) {
      for (let [marker, wordArr] of Object.entries(insideMap)) {
        let tempTags = []
        if (prevMarker === "0" || marker === "0") wordIdx = 0
        
        // wordArr = ["abc", "bbbc", "caacc"...] 字的array
        wordArr.forEach((e) => {
          // 如果是標點符號的話：
          // 出現在array第一個的話 前面不加空格
          // 出現在array其他地方的話 前面不加空格
          // 這裡是反向寫的
          if (!e.startsWith('.') && !e.startsWith(',') && !e.startsWith(';')) {
            if (e === wordArr[0]) {
              ResultWithJSXTags.push(<span className="space"> </span>)
            }

            tempTags.push(<span className="space"> </span>)
          }
          // if (e.startsWith(',') || e.startsWith('.') || e.startsWith(';')) {
          //   tempTags.push(<span className="space"> </span>)
          // }
          tempTags.push(<Word word={e} key={wordIdx} combinationID={combinationID} wordIdx={wordIdx}/>)
          wordIdx++
        })
        
        pushArray(marker, ResultWithJSXTags, tempTags, key, combinationID)
        
        key++
  
        prevMarker = marker
      }
      
    }
  
    function pushArray(marker, targetArr, pushedArr, key, combinationID) {

      if (marker === "0") {
        targetArr.push(<Normal pushedArr={pushedArr} key={key} combinationID={combinationID}/>)
      }
      else if (marker === "1") {
        targetArr.push(<Correction pushedArr={pushedArr} key={key} combinationID={combinationID}/>)
      }
      else if (marker === "-1") {
        targetArr.push(<Deletion pushedArr={pushedArr} key={key} combinationID={combinationID}/>)
      }
      else if (marker === "-2") {
        pushedArr.forEach( e => {
          if (e.props.word === '\n') {
            targetArr.push(<NextLine />)
          }
        })
      }
    }

    return ResultWithJSXTags;
  }