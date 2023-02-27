let stake, profit, odd, loss, limit, winning, spent, numberOfValues
let prevButtonColor = "", currentButtonColor;
let stakeArray = [], stakeCount = 0;
let amt1, amt2;
let colorr = "rgb(25, 113, 194)";

odd = 5;

function fillArray() {
  profit = 45 //profit
  loss = 0 //lostake 2
  numberOfValues = 30 //number of entries
  limit = 3000 //Limit

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

        amt2 = amountDiv.innerHTML
        amt2 = amt2.replace("KES ", "")
        amt2 = amt2.replace(",", "")
        amt2 = parseFloat(amt2)

        if (amt2 > amt1) {
          amt1 = amt2;
          stakeCount = -1;
          fillArray()
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
