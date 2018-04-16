function openTab(pageName, tab) {
    var i = 0, y = 0, content, tabBorder;
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
        tabBorder[y].style.borderLeft = "0 solid #fff";
        y++
    }
    document.getElementById(tab).style.borderLeft = "5px solid #fff";
    document.getElementById(pageName).style.display = "block";
}
// document.getElementById("Open").click();
