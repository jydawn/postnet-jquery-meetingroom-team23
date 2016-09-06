/**
 * Created by zhuoyue on 16-8-5.
 */
/**
 * Created by zhuoyue on 16-8-4.
 */
let _ = require('lodash');
class ZipToBarCore {
    do(zipCode){

        if(checkZipCode(zipCode)){
            let zipCodeNumberArray=zipCodeToNumberArray(zipCode);
            if(checkCD(zipCodeNumberArray)){
                return  buildBarcode(zipCodeNumberArray);
            }
        }
        return false;
    }
    check(zipCode){
        if(checkZipCode(zipCode))return true
        else return false
    }
}


function checkZipCodeLength(zipCodeArray){
    return (zipCodeArray.length===32||zipCodeArray.length===52);
}
function checkElement(zipCodeArray){
    let  CodeArray = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    if(zipCodeArray[0]===':'||zipCodeArray[zipCodeArray.length-1]===':')return false;
    let found=zipCodeArray.find((element)=>{
        return element!==':'&&element!=='|';
    });
    if (found) return false;
    let sortedFive =sortFive(zipCodeArray);
    let filterArray=(_.difference(sortedFive,CodeArray));
    if(filterArray.length>0)return false;
    return true;
}


function sortFive(zipCodeArray){
    let withoutBar=_.slice(zipCodeArray,1,zipCodeArray.length-1);
    let fiveSortArray=_.chunk(withoutBar,5);
    return fiveSortArray.map((element)=>{
        return  element.join('');
    });
}

function checkZipCode(zipCode){
    let zipCodeArray=zipCode.split('');
    return (checkZipCodeLength(zipCodeArray)&&checkElement(zipCodeArray));
}


function zipCodeToNumberArray(zipCode){
    let  CodeArray = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    let zipCodeArray=zipCode.split('');
    let sortFiveZipCode=sortFive(zipCodeArray);
    return sortFiveZipCode.map((element)=>{
        return _.indexOf(CodeArray,element);
    });
}


function checkCD(zipCodeNumberArray){
    return((_.sum(zipCodeNumberArray)%10)==0);
}

function buildBarcode(zipCodeNumberArray){
    let zipNumberWithoutCD=_.dropRight(zipCodeNumberArray,1);
    if(zipNumberWithoutCD.length===9){
        zipNumberWithoutCD.splice(5,0,'-');
    }
    return zipNumberWithoutCD.join('');
}


module.exports = ZipToBarCore;
