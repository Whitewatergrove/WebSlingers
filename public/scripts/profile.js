$(document).ready(function() {
    $('.nav-trigger').click(function() {
        $('.side-nav').toggleClass('visible');
    });
});
function openTab(pageName, tab) {
    var i = 0, y= 0 ,content, tabBorder;
    var content = document.getElementsByClassName("main-content");

    console.log(this);
    while(i < content.length)
    {
        content[i].style.display = 'none';
        i++;
    }
    tabBorder = document.getElementsByClassName("tabBorder");
    while(y < tabBorder.length)
    {
        tabBorder[y].style.borderLeft = ""
        y++
    }
    document.getElementById(tab).style.borderLeft = "5px solid #2e78ba";
    document.getElementById(pageName).style.display = "block";
}
// document.getElementById("Open").click();
