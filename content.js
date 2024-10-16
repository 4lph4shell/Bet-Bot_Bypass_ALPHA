//algoritm
var price_alogoritm_fibonaci = false;
var price_alogoritm_randValue = true;
var price_alogoritm_double = false;
var price_algoritm_sum = false;
var price_fake_stop_algoritm = false;
//fibonaci
var fi_previous_price = 1;
var double_start_algortim = 1;
var t_coefficient = 1;//ضریب مقادیر است 1 , 10,100
var t_times = 500;//تعداد دفعات تکرار حلقه
var numberOneCount =0;
var damage = 0;
// this is the code which will be injected into a given page...
var h_docule_first_value = 12.5;
var h_double_amount = 12.5;
var t_fakeStop = 5;//ضریب توقف برای اولیت های حلقه
var t_forceStop = 4.65;//ضریب


var t_randValue;//آخرین ضریب ارایه شده
var t_correntValue;//ضریب درحال حاظر


//append to functions
var f_game_waiting = game_waiting;
var f_game_busted = game_busted;
var f_game_update = game_update;
var f_game_cash_out = game_cash_out;
var box =document.getElementsByClassName('game-controls')[0];
//elements
var t_cashoutProduct = document.getElementsByClassName('cashout-amount')[0];
var t_priceAmount = document.getElementsByClassName('game-amount')[0];
var t_setCashBtn = document.getElementsByClassName("place-bet")[0];//دکمه ثبت
var t_setCashCancelBtn = document.getElementsByClassName("place-bet-cancel")[0];//دکمه کنسل
var h_information = $('div.user-name');
h_information.after("<div class='top-link'><h4 id='hadi-box'><b>دفعات :: " + t_times + "</b></h4></div> ");
// var t_remain = $("div.top-link chips-amount");//مقدار باقی مانده ما
var counter = 0;

function getCondition( counter) {
	t_cashoutProduct.value = t_forceStop;
    t_priceAmount.value = getPrice(counter) * t_coefficient;
    t_setCashBtn.click();
}

// get price to add it
function getPrice() {
    if (price_alogoritm_fibonaci) {

        return fibonacci_algoritm();
    } else if (price_alogoritm_randValue) {

        return rand_value_algoritm();
    } else if (price_alogoritm_double) {

        return double_algoritm();
    }

    // return 0;
}

game_waiting = (function () {
    return function (str) {
        //console.log("game_waiting ", str);
        getInformation();
        //H_addOption();
		if (t_times % 0!= 0 ) {
            getCondition(counter); //gane wating
		}
		
        f_game_waiting.apply(this, arguments); // calling the real function
    };
}());

game_busted = (function () {
    return function (str) {

        var currentValue = str.amount / 100;
        if (currentValue >= t_forceStop) {
            t_times--;
            counter = 0;
            fi_previous_price = 1;
            numberOneCount = 0;
            damage = 0;
            h_double_amount = h_docule_first_value;
        } else {
            counter++;
            if (currentValue < 2){
                numberOneCount++;

            }
            damage += getPrice() * t_coefficient;
        }

        f_game_busted.apply(this, arguments); // calling the real function
    };
}());




game_update = (function () {
    return function (str) {
        try {
      //fake_stop_algoritm (counter,str);
        } catch (e){

        }

        f_game_update.apply(this, arguments); // calling the real function
    };
}());

game_cash_out = (function () {
    return function (str) {
        console.log(str);
        f_game_cash_out.apply(this, arguments); // calling the real function
    };
}());

//aloritms
function fake_stop_algoritm(counter, str) {
    var t_cachoutBtn = document.getElementsByClassName("place-bet-cashout")[0];
    if (counter ==0 || counter == 1 || counter == 3 || counter ==2) {
        if( (str.current/100) >= (t_fakeStop -0.40) ){

            t_cachoutBtn.click();
        }
    }
    if (counter == 4 || counter == 3 || counter ==2) {
        if( (str.current/100) >= t_fakeStop){

            t_cachoutBtn.click();
        }
    }
    if (numberOneCount>5){
        if( (str.current/100) >= 2.9)
            t_cachoutBtn.click();
    }
}


function fibonacci_algoritm() {
    if (t_times > 0) {
        for (var i= 0; i<counter ;i++) {
            fi_previous_price += i;
        }

        return fi_previous_price;
    }

    return 0;
}

function double_algoritm() {
    if (t_times > 0) {
		
        return h_double_amount *= 2 ;
    }

    return 0;
}

function rand_value_algoritm() {
    var t_prices = [0, 76, 114, 171, 257, 385, 577, 865, 1298, 1947, 2920, 4380, 6569, 9853, 14779, 22170, 33260, 49880, 74820, 112228, 168400, 252500, 378800, 568200, 852230, 1278340, 2343370, 3749379, 5999038, 9598479 ];//مقادیر8100

    if (t_prices.length == counter) {
        counter = 0;
    }
    return t_prices[counter];
}

function sum_alogoritm() {
    var p = 1;
    for (var i = 0; i <= counter; i++) {
        p +=i;
    }

    return p;
}

//-------------------
function getInformation(){
    var str =" <b style='color: green' ' >دفعات :"+t_times+ "</b> ";
    str +=  " <span style='color:red'>" + "  ضرر تا الان : " + damage + " </span> ";
    str += " <span style='color:greenyellow'>  شماره  " + (counter+1) + "</span>";
    str += " <span style='color:saddlebrown'>  ضریب اعداد :   " + (t_coefficient) + "</span>";
    str += " <span style='color:blue'>  ضریب بازی :   " + (t_forceStop) + "</span>";
    //str += " <span style='color:blueviolet'> Telegram: https://t.me/ALPH4Co <span style='color:green'> ^-_-^ <span style='color:red'> KhaRid BoT:@ALPH4Co ** " + (t_fakeStop) + "</span>";
    $("h4#hadi-box").html(str);
}

//-----add option
function H_addOption() {
    var h_option_text='<input id="conficient" type="number" onchange="addConficient()" placeholder="صریب بازی" value="' + t_coefficient + '">';
    h_option_text += '<button onclick="restartTimes()">restart game</button>';
    $('div.top-link.user-name').html(h_option_text);
}

function addConficient() {
    t_coefficient = $("input#conficient").val();
}
function restartTimes() {
    t_times += 100;
}
