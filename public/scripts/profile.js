$(document).ready(function () {
    $('.nav-trigger').click(function () {
        $('.side-nav').toggleClass('visible');
    });
});

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
}

function setIcon() {
    var el = document.getElementsByName("icontest")[0];
    var selectedRole = document.getElementById("role").value;
    var ph = document.getElementById("pnum");
    console.log(selectedRole);
    console.log(el.className);
    if (selectedRole == "student") {
        ph.placeholder = 'yymmddxxxx...';
        el.className -= " fas fa-industry";
        el.className += ' fas fa-graduation-cap';

    } else if (selectedRole == 'company') {
        ph.placeholder = 'Organization number...';
        el.className -= " fas fa-graduation-cap";
        el.className += " fas fa-industry";
    }
}

function addJob(){
    var ListVar = document.createElement("LI");
    var ParaVar = document.createElement("P");
    var h4Var = document.createElement("H4");

    var JobList = document.getElementsByClassName("Job-list");
    var JobTitle = document.getElementById("Job-title");
    var JobInfo = document.getElementById("Job-info");

    h4Var.appendChild(JobTitle);
    ParaVar.appendChild(JobInfo);
    ListVar.appendChild(h4Var);
    ListVar.appendChild(paraVar);
    
    JobList.appendChild(ListVar);
}

// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}