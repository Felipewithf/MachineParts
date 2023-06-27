var startBtn = $('#start');
var landingPageHolderEl = $("#landingPageHolder");
var lifeUsageEl = $("#lifeUsage");
var lifeEstimateEl = $("#lifeEstimate");
var partLifeTimeEl = $('.partLifeTime');
var partLifeTimeEndEl = $('.partLifeTimeEnd');
var partNameEl = $('.partName');
var partListEl = $("#partsList");
var replacePartBtnEl = $("#replacePartBtn");
var appEl = $("app");
var video1El = $("#myVideo1");
var video2El = $("#myVideo2");

var historyListEl = $("#historyList");


var usageTimer = 0;
var partTimer = 0;
var rateOfUsage = 0;


//create the machine array of objects
var machines = [{
    name: "Combulstion Engine Car",
    img: "https://picsum.photos/300/300",
    lifespan: 230000,
    rateOfUsage:100, //increases 10 km per second 
        parts: [{
            partName: "wheels",
            partImg: "assets/img/tire.mp4",
            partLifespan: 20000,
            partRateOfUsage: 1000 },
            {
            partName: "Engine",
            partImg: "",
            partLifespan: 100000,
            partRateOfUsage: 500
        }]
    },
    {
    name: "Xerox 34022XV",
    img: "",
    lifespan: 230000,
    rateOfUsage: 200, //decrease 200 prints per second
        parts: [{
            partName: "Scanner",
            partImg: "",
            partLifespan: 2000,
            partRateOfUsage: 100 },
            {
            partName: "TrayFeeder",
            partImg: "",
            partLifespan: 100000,
            partRateOfUsage: 500
        }]
    }
];

function hideLandingPage(){
  landingPageHolderEl.attr("class","hide");  
};

function renderUsageTimer(el,life,rate){
    var timer = life * 0.09;
    if (usageTimer === 0){
        usageTimer = timer;
    }
    var countdown = setInterval(()=>{
        timer ++;
        el.textContent = `${timer}`;
        usageTimer = timer ;
        if(timer === life){
            clearInterval(countdown);
        }
    },rate);
    return;
}

function renderUsageTimerOfParts(el,life,rate){
    var timer = life * 0.09;
    if (usageTimer === 0){
        usageTimer = timer;
    }
    var countdown = setInterval(()=>{
        timer ++;
        el.textContent = `${timer}`;
        if(timer === life){
            clearInterval(countdown);
        }
    },rate);
    return;
}


function renderMachine(event){
    event.preventDefault();

    hideLandingPage();
    appEl.removeAttr("class","hide");
    video1El.removeAttr("class","hide");


    UsageTimer = renderUsageTimer(lifeUsageEl,machines[0].lifespan, machines[0].rateOfUsage);


    lifeEstimateEl.textContent = `${machines[0].lifespan} Killometers`;

    // render parts of the machine
    // for (let partindex = 0; partindex < machines.[0].length; index++) {
    //     const element = [index];
    // }
    console.log(machines[0].parts[0].partLifespan);
    console.log(machines[0].parts[0].partRateOfUsage);

    partTimer = renderUsageTimerOfParts(partLifeTimeEl[0],machines[0].parts[0].partLifespan, machines[0].parts[0].partRateOfUsage);
    partLifeTimeEndEl[0].textContent = `/ ${machines[0].parts[0].partLifespan}`;

    partNameEl[0].textContent = `${machines[0].parts[0].partName}`;

}

function userSelectPart(event){
    //check which option the user selected
    var userChoiceEl = event.target;
    var userChoice = userChoiceEl.getAttribute("class");
    console.log(userChoice);

    if (userChoice === "partItem"){
        replacePartBtnEl.removeAttr("class","hide");
        video2El.attr("style","z-index: 2");
        video2El.removeAttr("class","hide");

    }

}

function userReplacePart(event){
 
        replacePartBtnEl.attr("class","hide");

        var newHistoryItemEl = $("<li>");
        newHistoryItemEl.attr("class","historyItem");
        historyListEl.append(newHistoryItemEl);
        var newHisItemName = $("<h4>");
        var newHisItemUsage = $("<h4>");
        newHistoryItemEl.append(newHisItemName,newHisItemUsage);

        newHisItemName.text(machines[0].parts[0].partName);
        newHisItemUsage.text(usageTimer);
   
   
        //reset the timer of the part to O
    }

    



//if user click start then render all machines
startBtn.on("click", renderMachine);

//user selects the machine
partListEl.on("click", userSelectPart);

//user selects the replace part button
replacePartBtnEl.on("click", userReplacePart);
