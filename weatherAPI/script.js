let activate1 = document.getElementById("activate1");
let activate2 = document.getElementById("activate2");
let activate3 = document.getElementById("activate3");
activate1.addEventListener("click", getWeather1);
activate2.addEventListener("click", getWeather2);
activate3.addEventListener("click", getWeather3);

let result = document.getElementById("result");

let apiAddress = "http://weerlive.nl/api/json-data-10min.php?key=";
let key = "demo";
let locatie = "&locatie=";
let geoLocation = "Amsterdam";
let url = apiAddress + key + locatie + geoLocation;

function getWeather1(){
    console.log(url);
    makeAjaxCall(url, "GET"). then (showWeather1, errorHandler);
}

function showWeather1(JSONresponseFromAjax){
    result.innerHTML = JSONresponseFromAjax;
}

function makeAjaxCall(url, methodType){
    let promiseObj = new Promise(function(resolve, reject){
        console.log(url);
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open(methodType, url, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function(){
            if(xmlhttp.readyState === 4){
                if(xmlhttp.status === 200){
                    //console.log("xmlhttp done succesfully");
                    let serverResponse = xmlhttp.responseText;
                    //console.log(serverResponse);
                    resolve(serverResponse);
                } else{
                    reject(xmlhttp.status);
                    console.log("xmlhttp FAILED");
                }
            } else{
                console.log("xmlhttp IS PROCESSING");
            }
        }
        console.log("request sent succesfully");
    });
    return promiseObj;
}

function errorHandler(){
    console.log("failed with status", status);
}

function getWeather2(){
    makeAjaxCall(url, "GET"). then (showWeather2, errorHandler);
}

function showWeather2(JSONresponseFromAjax){
    let weatherObject = JSON.parse(JSONresponseFromAjax);
    let completeData = "";
    
    for (const [key,value] of Object.entries(weatherObject.liveweer[0])){
            console.log(`${key}: ${value}`);
            completeData += key + " : " + value + "<br>";
            result.innerHTML = completeData;
    }
}
function getWeather3() {
    makeAjaxCall(url, "GET").then(showWeather3, errorHandler);
}

function showWeather3(JSONresponseFromAjax) {
    let weatherObject = JSON.parse(JSONresponseFromAjax);
    let completeData = "";
    let antwoord = "YOW LOKateI: " + weatherObject.liveweer[0].plaats + "<br>DAH tempORATUUU ISU: "
        + weatherObject.liveweer[0].temp + "°C" + "<br>DUH OUSSID IS: " + weatherObject.liveweer[0].image + 
        "<br> I EXPECTO: " + weatherObject.liveweer[0].verw + "<br>HAVE A GREAT DAYYYYYYYYYY";
    result.innerHTML = antwoord;
}