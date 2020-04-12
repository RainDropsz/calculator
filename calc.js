// Global Variables
var arrstr = [];
var numstr = "";
var shouldclear = false;
var hasError = false;

// Functions

function clickNum(e) {
  if (shouldclear == true) { clickClear();}

  numstr += $(e.target).text();
  $(".inputline").append( $(e.target).text() );
}

function clickOp(e) {
  $(".inputline").append( $(e.target).text() );

  if (isDecErr(numstr)) { hasError = true; }

  arrstr.push(numstr);   numstr = "";
  arrstr.push( $(e.target).attr("id") );
}

function isDecErr(num1) {
  var numofdecimals = num1.match(/\./g);

  if (!numofdecimals)  {return false;}          // check if null
  if (numofdecimals.length > 1) {return true;}  // more than 1 decimal
  return false;
}

function clickEq(e) {
  var opIndex = -1, x = 0, y = 0, ans = "";
  const numdigits = 9;

  if (isDecErr(numstr) || hasError) {shouldclear = true; showerrarr(); return;}

  arrstr.push(numstr); numstr = "";

  while ( arrstr.length > 2) {
    opIndex = orderOfOp();

    x = parseFloat(arrstr[ opIndex - 1 ]);
    y = parseFloat(arrstr[ opIndex + 1 ]);
    op = arrstr[ opIndex ];

    ans = operate(op, x, y);
    arrstr.splice( opIndex - 1 , 3 , ans);
  }

  if (arrstr.length == 1) {
    ans = arrstr[0];
  }

  ans = roundNum(ans);

  if ( isNaN(ans) ) { showerrarr(); }
  else if ( ! isFinite(ans) ) { showerrarr(); }
  else { $(".ansline").html(ans); }
  shouldclear = true;
}

function orderOfOp() {
  var i = 1;

  for ( i = 1; i < arrstr.length; i+=2 ) {
    if ( arrstr[i] == "times" || arrstr[i] == "divide" ) { return i; }  }

  for ( i = 1; i < arrstr.length; i += 2) {
    if ( arrstr[i] == "plus" || arrstr[i] == "minus" ) { return i;  }  }

  return -1;
}

function operate( op, x, y) {
  if      (op == "plus")   { return x + y; }
  else if (op == "minus")  { return x - y; }
  else if (op == "times")  { return x * y; }
  else if (op == "divide") { return x / y; }
}

function clickClear( ) {
  $(".inputline").text( "" );
  $(".ansline").text( "" );
  numstr = "";
  arrstr = [];
  shouldclear = false;
  hasError = false;
}

function backspace() {
  var txt = $(".inputline").text();
  var arrtxt = "";
  var ind = 0;
  var len = arrstr.length;

  if (numstr > 0) {
    numstr = numstr.slice(0, numstr.length - 1);
    $(".inputline").text( txt.slice(0, txt.length - 1) ); }
  else if (arrstr.length > 0) {
    if(arrstr.length == 1) {
      arrstr.pop();
      $(".inputline").text( txt.slice(0, txt.length - 1) ); }
    else {
      arrtxt = arrstr[arrstr.length - 1];
      arrtxt = arrtxt.slice(0, arrtxt.length - 1);
      $(".inputline").text( txt.slice(0, txt.length - 1) ); }
  }

}

function roundNum(ans) {
  const numdigits = 9;

  ans = Math.round( ans * Math.pow(10, numdigits) ) / Math.pow(10,numdigits);
  return ans;
}

function typeNum(e) {
  if      (e.key == "1") { $("#num1").click(); }
  else if (e.key == "2") { $("#num2").click(); }
  else if (e.key == "3") { $("#num3").click(); }
  else if (e.key == "4") { $("#num4").click(); }
  else if (e.key == "5") { $("#num5").click(); }
  else if (e.key == "6") { $("#num6").click(); }
  else if (e.key == "7") { $("#num7").click(); }
  else if (e.key == "8") { $("#num8").click(); }
  else if (e.key == "9") { $("#num9").click(); }
  else if (e.key == "0") { $("#num0").click(); }

  else if (e.key == ".") { $("#dec").click(); }

  else if (e.key == "/") { $("#divide").click(); }
  else if (e.key == "-") { $("#minus") .click(); }
  else if (e.key == "+") { $("#plus")  .click(); }
  else if (e.key == "*") { $("#times") .click(); }
  else if (e.key == "=") { $("#equal") .click(); }
  else if (e.key == "Enter") { $("#equal") .click(); }

  else if (e.key == "Delete") { $("#clear") .click(); }
  else if (e.key == "Backspace") { $("#backspace") .click(); }
}

function showerrarr() {
  var errarr = [], ans = "";

  errarr.push(    "<span style='color:black'>" + "("  + "</span>" +
                  "<span style='color:red'  >" + "ㆆ" + "</span>" +
                  "<span style='color:black'>" + "_"  + "</span>" +
                  "<span style='color:red'  >" + "ㆆ" + "</span>" +
                  "<span style='color:black'>" + ")" +  "</span>" );

  errarr.push ("¯" + String.fromCharCode(92) + "_(ツ)_/¯");
  errarr.push ("ಠ_ಠ");

  ans = errarr[ Math.floor( Math.random() * errarr.length  ) ];
  $(".ansline").html(ans);
  numstr="";
}



// Event Listeners
$(".number")   .on("click",   (e) => clickNum  (e) );
$(".op")       .on("click",   (e) => clickOp   (e) );
$(".eql")      .on("click",   (e) => clickEq   (e) );
$("#clear")    .on("click",   ( ) => clickClear( ) );
$("#backspace").on("click",   ( ) => backspace ( ) );
$(document)    .on("keydown", (e) => typeNum   (e) );

