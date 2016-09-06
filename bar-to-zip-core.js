
let _ = require('lodash');
class BarToZipCore {
    do(barcode) {
        let codeArray = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
        if(checkBarcode(barcode)){
            let CD=calculateCD(barcode);
            return buildZipCode(CD,barcode,codeArray);
        }
        return false;
    }
    check(barcode){
        if(checkBarcode(barcode))return true;
        else return false
    }
}


function formateBarcode(barcode){
    if(barcode.length===10){
        let hasGang= barcode.indexOf('-',5);
        let formatBarcode=barcode;
        if(hasGang===5){
            formatBarcode = barcode.replace('-', '');
        }
        return formatBarcode.split('');
    }
    return barcode.split('');
}

function checkIsAllNumber(barcode) {
    let barcodeArray =formateBarcode(barcode);
    let number=['1','2','3','4','5','6','7','8','9','0'];
    let  otherArray=_.difference(barcodeArray, number);
    if(otherArray.length>0)return false;
    return true;
}

function checkBarcodeLength(barcode){
    let hasGang= barcode.indexOf('-',5);
    if ((barcode.length===10)&&hasGang!==-1) return true;
    if(barcode.length===5||barcode.length===9) return true;
    return false;
}

function checkBarcode(barcode){
    if( checkBarcodeLength(barcode)){

        return checkIsAllNumber(barcode);
    }
    return false;

}

function calculateCD(barcode) {
    let barcodeArray =formateBarcode(barcode);
    let barcodeNumArray = barcodeArray.map((element)=> {
        return parseInt(element);
    });
    let CD = _.sum(barcodeNumArray) % 10;
    if (CD !== 0) {
        CD = 10 - CD;
    }
    return CD;

}

function buildZipCode(CD,barcode,codeArray){
    let barcodeArray =formateBarcode(barcode);
    let zipString='|';
    let barcodeNumArray=barcodeArray.map((element)=>{
        return parseInt(element);
    });
    for(let num of barcodeNumArray) {
        zipString +=codeArray[num];
    }
    zipString +=codeArray[CD];
    zipString +='|';
    return zipString;
}


module.exports=BarToZipCore;