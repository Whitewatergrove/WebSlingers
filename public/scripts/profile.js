function openTab(pageName, tab) {
<<<<<<< HEAD
    var i = 0, y = 0, content, tabBorder;
=======
    var i = 0, y= 0 ,content, tabBorder;
>>>>>>> 30cc757e92b56b1c5a4173988c86a5c3fafd6eac
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
<<<<<<< HEAD
        tabBorder[y].style.borderLeft = "0 solid #fff";
=======
        tabBorder[y].style.borderLeft = ""
>>>>>>> 30cc757e92b56b1c5a4173988c86a5c3fafd6eac
        y++
    }
    document.getElementById(tab).style.borderLeft = "5px solid #fff";
    document.getElementById(pageName).style.display = "block";
}
// document.getElementById("Open").click();
