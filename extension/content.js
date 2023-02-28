let stake, profit, odd, loss, limit, winning, spent, numberOfValues
let prevButtonColor = "", currentButtonColor;
let stakeArray = [], stakeCount = 0;
let prevResult;
let amt1, amt2;
let testTarget = 10;
let currentHash = "", prevHash;
let cheatNumber = 8;

var audio = new Audio(chrome.runtime.getURL('cash.mpeg'));
let colorr = "rgb(25, 113, 194)";
odd = 5;

function fillArray() {
  profit = 45 //profit
  loss = 0 //lostake 2
  numberOfValues = 30 //number of entries
  limit = 3000 //Limit
  stakeCount = 0;

  stakeArray.length = 0;

  stake = (profit + loss) / (odd - 1) //stake 1
  winning = stake * odd //winning 3
  spent = stake + loss //spent 4

  stakeArray.push((Math.round(stake * 100) / 100).toFixed(0))

  for(var i = 2; i < numberOfValues; i++) {
    loss += stake 
    stake = (profit + loss) / (odd - 1)
    winning = stake * odd
    spent = stake + loss

    if (stake > limit) {
        break;   
    }

    stakeArray.push((Math.round(stake * 100) / 100).toFixed(0))
  }
}

function testRun(testTarget) { //x = number of tests
  

  if (document.getElementsByClassName('css-de18l5')[0].querySelectorAll('tr')[1]) {

    prevHash = document.getElementsByClassName('css-de18l5')[0]
    prevHash = prevHash.querySelectorAll('tr')[1]
    prevHash = prevHash.querySelectorAll('td.css-1wxi57q')[4]
    prevHash = prevHash.querySelector('input.css-1wpxqri')
    prevHash = prevHash.value;

    if (currentHash !== "") {
      if (currentHash == prevHash) {
        return false;
      }
    }

    for(var i = 1; i <= testTarget; i++) {
      prevResult = document.getElementsByClassName('css-de18l5')[0]
      prevResult = prevResult.querySelectorAll('tr')[i]
      prevResult = prevResult.querySelectorAll('td.css-1wxi57q')[0]
      prevResult = prevResult.querySelector('a').innerHTML
      prevResult = prevResult.replace("x","")
      prevResult = parseFloat(prevResult)
  
      if (prevResult >= odd) {
        return false;
      }
    }
    return true;
  }  
}

function placeBet() {
  let buttonn = document.getElementById("tour_bet_button");
  let inputt = document.getElementById("tour_bet_amount");
  let inputt2 = document.getElementById("tour_bet_auto_cashout");
  let amountDiv = document.getElementsByClassName("css-1im2err")[4];

  if (buttonn && inputt && amountDiv) {
    currentButtonColor = window.getComputedStyle(buttonn).getPropertyValue("background-color");

    if (currentButtonColor === colorr) {
      if (prevButtonColor !== colorr) {
        fillArray();

        if (!testRun(testTarget)) {
          return;
        }

        amt1 = amountDiv.innerHTML
        amt1 = amt1.replace("KES ", "")
        amt1 = amt1.replace(",", "")
        amt1 = parseFloat(amt1)
        
        temp1 = document.getElementsByClassName("css-i5iqto")[0].innerHTML;
        temp1 = temp1.replace("x","")
        temp1 = parseFloat(temp1)

        inputt.value = ""
        inputt.focus()
        document.execCommand('insertText', false, stakeArray[stakeCount]);
        inputt2.value = ""
        inputt2.focus()
        document.execCommand('insertText', false, odd);
        buttonn.click() 
        prevButtonColor = currentButtonColor;

      } else {
        stakeCount = stakeCount + 1

        if (stakeCount == cheatNumber) {
          stakeCount = stakeCount + 2;
        }

        amt2 = amountDiv.innerHTML
        amt2 = amt2.replace("KES ", "")
        amt2 = amt2.replace(",", "")
        amt2 = parseFloat(amt2)

        if (amt2 > amt1) {
          audio.play();
          prevButtonColor = "";
          currentHash = document.getElementsByClassName('css-de18l5')[0]
          currentHash = currentHash.querySelectorAll('tr')[1]
          currentHash = currentHash.querySelectorAll('td.css-1wxi57q')[4]
          currentHash = currentHash.querySelector('input.css-1wpxqri')
          currentHash = currentHash.value;
        } else {
          inputt.value = ""
          inputt.focus()   
          document.execCommand('insertText', false, stakeArray[stakeCount]);
          inputt2.value = ""
          inputt2.focus()
          document.execCommand('insertText', false, odd);
          buttonn.click()           
          prevButtonColor = currentButtonColor;
        }        
      }
    }
  }
}

setInterval(placeBet, 100);
