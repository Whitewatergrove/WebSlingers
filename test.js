let animalContainer = document.getElementById("animal-info");
let btn = document.getElementById("btn");
btn.addEventListener("click me", function(){
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-1.json');
    ourRequest.onload = function() {
       console.log(ourRequest.responseText);
        var ourData = JSON.parse(ourRequest.responseText);
         console.log(ourData[0]);
        renderHTML(ourData);
    };
    ourRequest.send();
});



function renderHTML(data) { // lägger till html kod till sidan till empty div element
    animalContainer.insertAdjacentHTML('beforeend', 'testing');
}

