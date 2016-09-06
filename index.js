function showMessage(message) {
  $("#console").text(message);
}
var  menu=`
1 zipcode to barcode
2 barcode to zipcode
3 quit
please input (1-3)`;
var status=0;

function send() {
  let input = $("#input").val();
  // TODO just demo
  if (input ==="1"&& status == 0) {
    status = 1;
    let message = "please input zipcode";
    showMessage(message);
  }
  else if (input === "2" && status == 0) {
    status = 2;
    let message = "please input barcode";
    showMessage(message);
  }

  else if (input === "3"&& status == 0) {
    let message = "exit";
    showMessage(message);
  }
  else if (status ==1) {

    startZiptoBar(input);
  }
  else if (status == 2) {
    startBartoZip(input);
  }
}

function startBartoZip(barcode) {
  $.get('./barcode-to-zipcode/'+barcode, function(zipcode) {
    if(zipcode==false){
      showMessage("please input right input");
    }else {
      status = 0;
      showMessage(zipcode+'\n'+menu);
    }
  })
}

function startZiptoBar(zipcode) {
  $.get('./zipcode-to-barcode/'+zipcode, function(barcode) {
    if(barcode==false){
      showMessage("please input right input");
    }
    else {
      status = 0;
      showMessage(barcode+'\n'+menu);
    }
  });
}

function mainMenu(menu){

  showMessage(menu);
}



mainMenu(menu);