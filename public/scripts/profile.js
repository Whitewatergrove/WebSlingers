function openTab(pageName, tab) {
    var i = 0, content, tabBorder;
    var content = document.getElementsByClassName("main-content");

    console.log(this);
    while(i < content.length)
    {
        content[i].style.display = 'none';
        i++;
    }
    tabBorder = document.getElementsByClassName("tabBorder");
    while(i < tabBorder.length)
    {
        tabBorder[i].style.display = "none"
        i++
    }
    document.getElementById(tab).style.borderLeft = "5px solid #fff";
    document.getElementById(pageName).style.display = "block";
}
// document.getElementById("Open").click();
