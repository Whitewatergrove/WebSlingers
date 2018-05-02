var DBFunc = require('./DBFunctions');

var db = ["mySQL", "msSQL", "mimer"];
var oop = ["C#","Java","C++","SmalTalk"];
var robotics = ["AI", "Machine learning", "mobile robotics"];

var db1 = {class:"DB", Q:"mySQL"};
var db2 = {class:"DB", Q:"msSQL"};
var db3 = {class:"DB", Q:"mimer"};

var oop1 = {class:"OOP", Q:"C#"};
var oop2 = {class:"OOP", Q:"Java"};
var oop3 = {class:"OOP", Q:"C++"};
var oop4 = {class:"OOP", Q:"SmalTalk"};

var robotics1 = {class:"ROBOTICS", Q:"AI"};
var robotics2 = {class:"ROBOTICS", Q:"Machine learning"};
var robotics3 = {class:"ROBOTICS", Q:"Mobile robotics"};

var arr = [db1,db2,db3,oop1,oop2,oop3,oop4,robotics1,robotics2,robotics3];

var classes = [db, oop, robotics];
var test = "";

for(i = 0; i < arr.length; i++)
{
    if(arr[i].Q == "C++")
      {
        console.log(arr[i].class);
        test = arr[i].class;
      }
}
for(i = 0; i < arr.length; i++)
{
    if(arr[i].class == test)
    {
        console.log(arr[i].Q);
    }
}


var pers1 = {
    namn:"Anton Wimpel", 
    age:"24", 
    kunskap:["CSS", "C#", "C++", "AI", "mimer"]
};

var pers2 = {
    namn:"Joakim Le",
    age:"20",
    kunskap:["msSQL","Allt","KAPPA", "Ingenjör"]
};

var ex1 = {
    namn:"Epiroc", 
    krav: ["C++", "Machine learning", "robotteknik"]
};

var ex2 = {
    namn:"Uni", 
    krav: ["msSQL", "Java", "JavaScript"]
};

var ex3 = {
    namn:"Komun", 
    krav: ["Ingenjör", "Doktorand", "75årsErfaranhet", "nyexaminerad", "max 26år gammal"]
};



var persList = [pers1,pers2];
var exList = [ex1, ex2, ex3];

void match()
{
    for(var i = 0; i < persList.length; i++)
    {
        var tempListRelaterat =[];
        console.log(persList[i].namn, ":");

        for(var j = 0; j< persList[i].kunskap.length; j++)
        {
            var count = 0;
            for(var k = 0; k<arr.length; k++)
            {
                if(arr[k].Q === persList[i].kunskap[j])
                {
                    for(var h = 0; h < arr.length; h++)
                    {
                        if(arr[k].class === arr[h].class)
                        {
                            tempListRelaterat[tempListRelaterat.length] = JSON.parse(JSON.stringify(arr[h].Q));
                            count ++;
                        }
                    }
                }
            }
            if( count == 0)
                {
                    tempListRelaterat[tempListRelaterat.length] = JSON.parse(JSON.stringify(persList[i].kunskap[j]));
                }
        }

        for(var j = 0; j < exList.length; j++)
        {
            for(var k = 0; k< tempListRelaterat.length; k++)
            {
                for(h = 0; h < exList[j].krav.length; h++)
                {
                    if(tempListRelaterat[k] === exList[j].krav[h])
                    {
                        //console.log(exList[j].namn);
                        continue;
                    }
                }
            }
        }
        sortMatch(persList[i], tempListRelaterat);
        console.log("");
    }
}

void sortMatch(pers, relaterat)
{
    var sorterad = [];
    for(var i = 0; i < exList.length; i++)
    {
        var varde = 0;
        for(var j = 0; j < pers.kunskap.length; j++)
        {
            for(var k = 0; k < exList.krav.length; k++)
            {
                if(pers.kunskap[j] === exList.krav[k])
                {
                    varde = varde + 1.0;
                    continue;
                }
                else
                {
                    for(var r = 0; r < relaterat.length; r++)
                    {
                        if(relaterat[r] === exList.krav[k])
                        {
                            varde = varde + 0.4;
                            continue;
                        }
                    }
                }
            }
        }
        sorterad[sorterad.length] = {namn: exList[i].namn, vardering: varde};
    }

    for(var i = 0; i < sorterad.length; i++)
    {
        console.log(sorterad[i].namn, " : ", sorterad[i].vardering);
    }

}

match();
