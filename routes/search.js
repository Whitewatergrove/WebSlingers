'use strict';
let express = require('express');
let mysql = require('mysql');
let app = express();
let bodyParser = require('body-parser')
let db = require('../DBFunctions');

//let db = ["mySQL", "msSQL", "mimer"];
//let oop = ["C#","Java","C++","SmalTalk"];
//let robotics = ["AI", "Machine learning", "mobile robotics"];
//
//let db1 = {class:"DB", Q:"mySQL"};
//let db2 = {class:"DB", Q:"msSQL"};
//let db3 = {class:"DB", Q:"mimer"};
//
//let oop1 = {class:"OOP", Q:"C#"};
//let oop2 = {class:"OOP", Q:"Java"};
//let oop3 = {class:"OOP", Q:"C++"};
//let oop4 = {class:"OOP", Q:"SmalTalk"};
//
//let robotics1 = {class:"ROBOTICS", Q:"AI"};
//let robotics2 = {class:"ROBOTICS", Q:"Machine learning"};
//let robotics3 = {class:"ROBOTICS", Q:"Mobile robotics"};
//
//let arr = [db1,db2,db3,oop1,oop2,oop3,oop4,robotics1,robotics2,robotics3];
//
//let classes = [db, oop, robotics];
//let test = "";
//
//for(i = 0; i < arr.length; i++)
//{
//    if(arr[i].Q == "C++")
//      {
//        console.log(arr[i].class);
//        test = arr[i].class;
//      }
//}
//for(i = 0; i < arr.length; i++)
//{
//    if(arr[i].class == test)
//    {
//        console.log(arr[i].Q);
//    }
//}
//
//
//let pers1 = {
//    namn:"Anton Wimpel", 
//    age:"24", 
//    kunskap:["CSS", "C#", "C++", "AI", "mimer"]
//};
//
//let pers2 = {
//    namn:"Joakim Le",
//    age:"20",
//    kunskap:["msSQL","Allt","KAPPA", "Ingenjör"]
//};
//
//let ex1 = {
//    namn:"Epiroc", 
//    krav: ["C++", "Machine learning", "robotteknik"]
//};
//
//let ex2 = {
//    namn:"Uni", 
//    krav: ["msSQL", "Java", "JavaScript"]
//};
//
//let ex3 = {
//    namn:"Komun", 
//    krav: ["Ingenjör", "Doktorand", "75årsErfaranhet", "nyexaminerad", "max 26år gammal"]
//};
//
//
//
//let persList = [pers1,pers2];
//let exList = [ex1, ex2, ex3];

//void match()
//{
//    for(let i = 0; i < persList.length; i++)
//    {
//        let tempListRelaterat =[];
//        console.log(persList[i].namn, ":");
//
//        for(let j = 0; j< persList[i].kunskap.length; j++)
//        {
//            let count = 0;
//            for(let k = 0; k<arr.length; k++)
//            {
//                if(arr[k].Q === persList[i].kunskap[j])
//                {
//                    for(let h = 0; h < arr.length; h++)
//                    {
//                        if(arr[k].class === arr[h].class)
//                        {
//                            tempListRelaterat[tempListRelaterat.length] = JSON.parse(JSON.stringify(arr[h].Q));
//                            count ++;
//                        }
//                    }
//                }
//            }
//            if( count == 0)
//                {
//                    tempListRelaterat[tempListRelaterat.length] = JSON.parse(JSON.stringify(persList[i].kunskap[j]));
//                }
//        }
//
//        for(let j = 0; j < exList.length; j++)
//        {
//            for(let k = 0; k< tempListRelaterat.length; k++)
//            {
//                for(h = 0; h < exList[j].krav.length; h++)
//                {
//                    if(tempListRelaterat[k] === exList[j].krav[h])
//                    {
//                        //console.log(exList[j].namn);
//                        continue;
//                    }
//                }
//            }
//        }
//        sortMatch(persList[i], tempListRelaterat);
//        console.log("");
//    }
//}
//
//void sortMatch(pers, relaterat)
//{
//    let sorterad = [];
//    for(let i = 0; i < exList.length; i++)
//    {
//        let varde = 0;
//        for(let j = 0; j < pers.kunskap.length; j++)
//        {
//            for(let k = 0; k < exList.krav.length; k++)
//            {
//                if(pers.kunskap[j] === exList.krav[k])
//                {
//                    varde = varde + 1.0;
//                    continue;
//                }
//                else
//                {
//                    for(let r = 0; r < relaterat.length; r++)
//                    {
//                        if(relaterat[r] === exList.krav[k])
//                        {
//                            varde = varde + 0.4;
//                            continue;
//                        }
//                    }
//                }
//            }
//        }
//        sorterad[sorterad.length] = {namn: exList[i].namn, vardering: varde};
//    }
//
//    for(let i = 0; i < sorterad.length; i++)
//    {
//        console.log(sorterad[i].namn, " : ", sorterad[i].vardering);
//    }
//
//}


























function logga(x)
{
    console.log(x);
}
function loggaerror()
{
    console.log("error");
}

async function set_student_qual(list)                               // Fetches all qualification for each student
{                                                                   // and adds den into an array
    return new Promise((resolve, reject) => {

        list.forEach(student => {
            student.QUAL = db.get_student_qual_promise(student.UID);
        })
        let x = list;
        x.onload = function() {
            resolve(x);
        }

        x.onerror = function() {
            let messege = 'set student qual error';
            reject(new Error(message));
        }

    })
    
}

async function set_exjob_demd(list)                                 // Fetches all demands for each exjob
{                                                                   // and adds den into an array
    list.forEach(exjob => {
        exjob.demanded = db.get_xjob_demanded_promise(exjob.ID);
    })
    return await list;
}

async function set_class_qual(list)                                 // Fetches all qualifications for each class
{                                                                   // and adds den into an array
    list.forEach(klass => {
        klass.qualification = db.get_qualifications_catagories_promise(klass.class);
    })
    return await list;
}

async function get_me_promises(st, ex, cl)                          
{
    return await new Promise((resolve,reject) => {                      // Atmept for nestled Promise.all()

        let temp = [];
        Promise.all([
            set_student_qual(st),
            set_exjob_demd(ex),
            set_class_qual(cl),
        ]).then((listor) => {
            
            logga(listor[0]);// Just for debugging
            logga(listor[1]);// Just for debugging
            logga(listor[2]);// Just for debugging
            logga(line);// Just for debugging
            listor[0].forEach(student => {                                  
                temp[temp.length] = student;                                // Adds the student into a new array                                 
                console.log("student");// Just for debugging
                logga(student.QUAL.Array.length);                                   
                listor[1].forEach(exjob => {                                    
                    console.log("exjob");// Just for debugging
                    if(student.QUAL.Array.length > 0)                                   
                    {                                   
                        student.QUAL.forEach(qual => {                                  
                            console.log("QUAL");// Just for debugging
                            exjob.demanded.forEach(demd => {
                                console.log("demd");// Just for debugging
                                if(qual === demd)                           // If the student have atleast one right
                                {                                           // qualification for an exjob, it adds an  
                                    temp[temp.length - 1].exJobs = exjob;   // new array in the student element
                                }
                            })
                        })
                    }
                })
            })
        }).catch((error) => {
            // handle error here
            console.error("GET ME PROMISES FAILAR"),
            loggaerror();
        });

        temp.onload = function() {
            resolve(temp);
        }

        temp.onerror = function() {
            let messege = 'get me promise error';
            reject(new Error(message));
        }
    })
}

function promising_chaining_test()
{
    let students;
    let exjobs;
    let classes;
    let line = '---------------------------------------------';
    let matched;

    new Promise((resolve, reject) =>{

        let lists = [];

        lists[0] = db.get_students_promise(students);
        logga(lists[0]);    
        lists[1] = db.get_xjob_promise(exjobs);
        logga(lists[1]);   
        lists[2] = db.get_class_catagories_promise(classes);
        logga(lists[2]);

        resolve(lists);

    }).then((lists) => {
        logga(lists);
        let results = [];
        lists[0].forEach(student => {
            student.QUAL = db.get_student_qual_promise(student.UID);
            });
            students = lists[0];

            lists[1].forEach(exjob => {
                exjob.demanded = db.get_xjob_demanded_promise(exjob.ID);
            });
            exjobs = lists[1];

            lists[2].forEach(klass => {
                klass.qualification = db.get_qualifications_catagories_promise(klass.class);
            });
            classes = lists[2];

            results[0] = students;
            results[1] = exjobs;
            results[2] = classes;
    }).then(function(results) {

            console.log("resluts: ");
            logga(results);
            logga(line);

            console.log("students: ");
            logga(students);
            logga(line);

            console.log("exjobs: ");
            logga(exjobs);
            logga(line);

            console.log("classes: ");
            logga(classes);
            logga(line);
            
    })

}


module.exports = {


    testmatch: function()
    {
        let students;
        let tempex;
        let exjobs;
        let classes;
        let line = '---------------------------------------------';
        let matched;

        //promising_chaining_test();

        console.log("Meeh")
        logga(line);

        Promise.all([
            db.get_students_promise(students),                      // Fetching all students
            db.get_xjob_promise(exjobs),                            // Fetching all exjobs
            db.get_demanded_promise(),
            db.get_class_catagories_promise(classes),               // Fetching all classes
            db.get_qualifications_catagories_promise(),
        ]).then((lists) => {

            lists[0].forEach(student => {
            student.QUAL = db.get_student_qual_promise(student.UID);
            }),

            students = lists[0],

            lists[1].forEach(exjob => {
                exjob.demanded = [];
                lists[2].forEach(demand => {
                    if(exjob.ID === demand.EID)
                    {
                        exjob.demanded[exjob.demanded.length] = demand.QID;
                    }
                })
            }),

            exjobs = lists[1],

            lists[3].forEach(klass => {
                klass.qual = [];
                lists[4].forEach(qual => {
                    if(klass.class === qual.class)
                    {
                        klass.qual[klass.qual.length] = qual.qualifications;
                    }
                })
            }),

            classes = lists[3],
            logga(classes),
            logga(line),
            


            /*students.forEach(student => {
                console.log("student");
                let pos = mathced.length
                matched[pos].student = student; 
                logga(student.QUAL.Array.length);
                exjobs.forEach(exjob => {
                    let check = 0;
                    console.log("exjob");
                    if(student.QUAL.Array.length > 0)
                    {
                        student.QUAL.forEach(qual => { 
                            console.log("QUAL");
                            exjob.demanded.forEach(demd => {
                                console.log("demd");
                                if(qual === demd)
                                {
                                    matched[pos].exjob = exjob;
                                }
                            })
                        })
                    }
                })
            }),*/

            logga(line);


        }).catch((error) => {
            // handle error here
            console.error("HÄR"),
            loggaerror();
        });
    }
}



























































//void match2()
//{
//    let students;
//    search.get('/test', function(req, res) {
//        db.get_students(null, null, function(err, result){
//            if (err) throw err;
//            res.json(result);
//            students = results;
//            console.log(result);
//        })
//      });
//  
//      for(let i = 0; i < students.length; i++)
//      {
//          db.getstudentqual(students[i].UID,function(req, res){
//            if (err) throw err;
//            res.json(result);
//            students[i].QUAL = result;
//          })
//      }
//
//      console.log(students);
//
//
//    for(let i = 0; i< students.length; i++)
//    {
//        console.log(students[i].UID, ":");
//
//
//    }
//
//
//    for(let i = 0; i < persList.length; i++)
//    {
//        let tempListRelaterat =[];
//        console.log(persList[i].namn, ":");
//
//        for(let j = 0; j< persList[i].kunskap.length; j++)
//        {
//            let count = 0;
//            for(let k = 0; k<arr.length; k++)
//            {
//                if(arr[k].Q === persList[i].kunskap[j])
//                {
//                    for(let h = 0; h < arr.length; h++)
//                    {
//                        if(arr[k].class === arr[h].class)
//                        {
//                            tempListRelaterat[tempListRelaterat.length] = JSON.parse(JSON.stringify(arr[h].Q));
//                            count ++;
//                        }
//                    }
//                }
//            }
//            if( count == 0)
//                {
//                    tempListRelaterat[tempListRelaterat.length] = JSON.parse(JSON.stringify(persList[i].kunskap[j]));
//                }
//        }
//
//        for(let j = 0; j < exList.length; j++)
//        {
//            for(let k = 0; k< tempListRelaterat.length; k++)
//            {
//                for(h = 0; h < exList[j].krav.length; h++)
//                {
//                    if(tempListRelaterat[k] === exList[j].krav[h])
//                    {
//                        //console.log(exList[j].namn);
//                        continue;
//                    }
//                }
//            }
//        }
//        sortMatch(persList[i], tempListRelaterat);
//        console.log("");
//    }
//
//}
//