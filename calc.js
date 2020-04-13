// Global Variables
var arrstr = [];
var numstr = "";
var shouldclear = false;

// Functions
function clickNum(e) {
  if (shouldclear == true) { clickClear(); }
  numstr += $(e.target).text();
  $(".inputline").append( $(e.target).text() );
}

function clickOp(e) {
  var op = $(e.target).text();
  if (shouldclear == true) { clickClear(); }

  $(".inputline").append( op  );

  arrstr.push ( { num: numstr, isnum: !isDecErr(numstr) } );
  arrstr.push ( { num: op,     isnum: false             } );

  numstr = "";
}

function clickEq(e) {
  var opIndex = -1, x = 0, y = 0, ans = "";
  if (shouldclear == true) { clickClear(); }

  arrstr.push ( { num: numstr, isnum: !isDecErr(numstr) } );
  numstr = "";

  if (!isarrgood()) {shouldclear = true; showErr(); return;}

  while ( arrstr.length > 2) {
    opIndex = orderOfOp();

    x = parseFloat(arrstr[ opIndex - 1 ].num);
    y = parseFloat(arrstr[ opIndex + 1 ].num);
    op = arrstr[ opIndex ].num;

    ans = operate(op, x, y);
    arrstr.splice( opIndex - 1 , 3 , {num:ans, isnum:true});
  }

  if (arrstr.length == 1) {
    ans = arrstr[0].num;
  }

  ans = roundNum(ans);

  if ( isNaN(ans) ) { showErr(); }
  else if ( ! isFinite(ans) ) { showErr(); }
  else { $(".ansline").html(ans); }
  shouldclear = true;
}

function orderOfOp() {
  var i = 1;

  for ( i = 1; i < arrstr.length; i+=2 ) {
    if ( arrstr[i].num == "×" || arrstr[i].num == "÷" ) { return i; }  }

  for ( i = 1; i < arrstr.length; i += 2) {
    if ( arrstr[i].num == "+" || arrstr[i].num == "−" ) { return i;  }  }

  return -1;
}

function operate( op, x, y) {
  if      (op == "+")  { return x + y; }
  else if (op == "−")  { return x - y; }
  else if (op == "×")  { return x * y; }
  else if (op == "÷")  { return x / y; }
}

function clickClear( ) {
  $(".inputline").text( "" );
  $(".ansline").text( "" );
  numstr = "";
  arrstr = [];
  shouldclear = false;
}

function clearNumObj(x) {
  x.num = "";
  x.isnum = false;
}

function isarrgood() {
  var ans = true;

  for(let i = 0; i < arrstr.length; i+=2) {
    ans = ans && arrstr[i].isnum;
  }

  return ans;
}

function backspace() {
  var txt = $(".inputline").text();
  $(".inputline").text( txt.slice(0, txt.length - 1) );

  if ( numstr != "") {
    arrstr.push( { num:numstr, isnum: !isDecErr(numstr) } );
  }

  var arrtxt = arrstr.pop();
  arrtxt = arrtxt.num;
  numstr = arrtxt.slice(0, numstr.length - 1);

  if (arrtxt.length > 1) {
    arrtxt = arrtxt.slice( 0, arrtxt.length - 1);
    numstr = arrtxt;
  }
}

function roundNum(ans) {
  const numdigits = 9;

  ans = Math.round( ans * (10 ** numdigits) ) / (10 ** numdigits);
  return ans;
}

function typeNum(e) {
  if (shouldclear == true) { clickClear(); }

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

function showErr() {
  var errarr = [], ans = "";

  errarr.push ("(-.-)");
  errarr.push ("ヽ(´ー｀)┌");
//  errarr.push ("(╯°□°）╯︵ ┻━┻");
  errarr.push ("ヽ(`Д´)ﾉ");
  errarr.push ("(ㆆ_ㆆ)");
  errarr.push ("¯" + String.fromCharCode(92) + "_(ツ)_/¯");
  errarr.push ("ಠ_ಠ");

  ans = errarr[ Math.floor( Math.random() * errarr.length  ) ];
  $(".ansline").html(ans);
  numstr="";
}

function isDecErr(num1) {
  var numofdecimals = num1.match(/\./g);

  if (!numofdecimals)  {return false;}          // check if null
  if (numofdecimals.length > 1) {return true;}  // more than 1 decimal
  return false;
}



// Event Listeners
$(".number")   .on("click",   (e) => clickNum  (e) );
$(".op")       .on("click",   (e) => clickOp   (e) );
$(".eql")      .on("click",   (e) => clickEq   (e) );
$("#clear")    .on("click",   ( ) => clickClear( ) );
$("#backspace").on("click",   ( ) => backspace ( ) );
$(document)    .on("keydown", (e) => typeNum   (e) );
