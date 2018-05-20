$(document).ready(function () {
    $('.nav-trigger').click(function () {
        $('.side-nav').toggleClass('visible');
    });
});

let matching = require('../routes/match');

function openCollapse() {
    var coll = document.getElementsByClassName("collapsible");

    for (var i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }
}

function openHelptab(tabName) {
    var i, x;
    x = document.getElementsByClassName("containerTab");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";
}

function openTab(pageName, tab) {
    var i = 0,
        y = 0,
        content, tabBorder;
    var content = document.getElementsByClassName("main-content");

    console.log(this);
    while (i < content.length) {
        content[i].style.display = 'none';
        i++;
    }
    tabBorder = document.getElementsByClassName("tabBorder");
    while (y < tabBorder.length) {
        tabBorder[y].style.borderLeft = ""
        y++
    }
    document.getElementById(tab).style.borderLeft = "5px solid #2e78ba";
    document.getElementById(pageName).style.display = "block";

    if (pageName === 'Jobs') {
        matching.matcha();
        //******************************************************************************************************************************************************************************************** */
    }
}

function setIcon() {
    var el = document.getElementsByName("icontest")[0];
    var selectedRole = document.getElementById("role").value;
    var ph = document.getElementById("pnum");
    console.log(selectedRole);
    console.log(el.className);
    if (selectedRole == "student") {
        ph.placeholder = 'yymmddxxxx...';
        ph.title = "Fyll i ditt personnummer 10 siffror"
        el.className -= " fas fa-industry";
        el.className += ' fas fa-graduation-cap';

    } else if (selectedRole == 'company') {
        ph.placeholder = 'Organization number...';
        ph.title = "Fyll i ditt Org.nummer 10 siffror"
        el.className -= " fas fa-graduation-cap";
        el.className += " fas fa-industry";
    }
}

// Select all elements with data-toggle="tooltips" in the document
$(function () {
    $('[data-toggle="tooltip"]').tooltip()

})


// function addJob() {
//     var ListVar = document.createElement("LI");
//     var ParaVar = document.createElement("P");
//     var h4Var = document.createElement("H4");

//     var JobList = document.getElementsByClassName("Job-list");
//     var JobTitle = document.getElementById("Job-title");
//     var JobInfo = document.getElementById("Job-info");

//     h4Var.appendChild(JobTitle);
//     ParaVar.appendChild(JobInfo);
//     ListVar.appendChild(h4Var);
//     ListVar.appendChild(paraVar);

//     JobList.appendChild(ListVar);
// }

// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// $(document).ready(function(){
//     $("#addjob").click(function(){
//         $("#job_list").append("<li><h4>" + $('#Job-title').val() + "</h4><p>" +  $('#Job-info').val() + "<p><button class = 'changebtn' style= 'width: auto'>Change</button> <button class='deletebtn'>Delete</button></li>");
//         $('.changebtn').click(function (){ document.getElementById('id02').style.display='block'})
//     });
// });

function openModal(k) {
						
    $('.changebtn').click(function () {
        document.getElementById(k).style.display = 'block'
    });

    $('.cancelbtn').click(function () {
        document.getElementById(k).style.display = 'none'
    });
}
