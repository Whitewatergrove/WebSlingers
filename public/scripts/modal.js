function openTab(tab) {
    var i = 0;
    var x = document.getElementsByClassName("tab");

    while(i < x.length)
    {
        x[i].style.display = 'none';
        i++;
    }
    document.getElementById(tab).style.display = "block";  
}