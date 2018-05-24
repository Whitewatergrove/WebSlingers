'use strict';
let express = require('express');
let mysql = require('mysql');
let app = express();
let bodyParser = require('body-parser')
let db = require('../DBFunctions');

let students;
let exjobs;
let classes;

module.exports = {

    companyPrematching: function(thisCompany)                     // The function that makes all the preworking 
    {                                                           // to match students to the current exjob.

        let current = {};
        let tempqual;
        current.exjobs = [];

        Promise.all([                                           // Creating an array of promises. 
            db.get_xjob_promise(),
            db.get_students_promise(),
            db.get_studentqualifications_promise(),
            db.get_class_catagories_promise(),
            db.get_qualifications_catagories_promise(),
            db.get_demanded_promise(),
            db.get_company_promise(thisCompany),
        ]).then((lists) => {                                    // Starts working with the promises when all
                                                                // of them is resolved or rejected.
            current.company = lists[6][0],
            lists[0].forEach(exjob => {
                if(current.company.Orgnr === exjob.ExOID)
                    current.exjobs[current.exjobs.length] = exjob;
            })
            exjobs = current.exjobs,
            students = lists[1],
            classes = lists[3],

            exjobs.forEach(exjob => {                           // Sets the demanding qualification that
                exjob.demanded = [];                            // each exjob have.
                lists[5].forEach(demand => {
                    if(exjob.ID === demand.EID)
                        exjob.demanded[exjob.demanded.length] = demand.QID;
                })
            })

            students.forEach(student => {                       // Looping through all exjobs and
                student.QUAL = [];                             // sets their demandingqualifications.
                lists[2].forEach(qual => {
                    if(student.pnr === qual.SID)
                        student.QUAL[student.QUAL.length] = qual.QID;
                })
            }),

            classes.forEach(klass => {
                klass.qual = [];
                lists[4].forEach(qual => {
                    if(klass.class === qual.class)
                        klass.qual[klass.qual.length] = qual.qualifications;
                })
            });
        }).catch((error) => {
            // handle error here,
            console.error("Company Prematching Promise Error");
        });
    },

    companyMatcha: function(thisExjobID)                                   // The function that is matching exjob to students.
    {
        let temp = {};
        temp.exjob = {};
        exjobs.forEach(exjob => {
            if(exjob.ID.toString() === thisExjobID)
                temp.exjob = exjob;
        })
        temp.exjob.students = [];
        students.forEach(student => {
            if(temp.exjob.demanded.length > 0) {
                student.weight = 0;
                temp.exjob.demanded.forEach(demd => {                // Checking if the there is any exjobs that demanding 
                    student.QUAL.forEach(qual => {
                        if(temp.exjob.students[temp.exjob.students.length - 1] != student)
                            temp.exjob.students[temp.exjob.students.length] = student;
                        if(qual === demd)
                            temp.exjob.students[temp.exjob.students.length - 1].weight = temp.exjob.students[temp.exjob.students.length - 1].weight +1;
                        else {
                            let tempSQ = 'tempSQ';
                            let tempED = 'tempED';
                            classes.forEach(obj => {
                                obj.qual.forEach(element =>{
                                    if(element === demd)
                                    tempED = obj.class;
                                    if(element === qual)
                                    tempSQ = obj.class;
                                });
                            });
                            if(tempED === tempSQ)
                                temp.exjob.students[temp.exjob.students.length - 1].weight = temp.exjob.students[temp.exjob.students.length - 1].weight + 0.4;
                        }
                    });
                });
            }
            else{ console.error('No qualifications');}
        });

        temp.exjob.students.sort(function(a, b){                                            // Sort the array, Highest to lowest by weight.
            return b.weight - a.weight;
        });
        temp.exjob.students = temp.exjob.students.filter(student => student.weight > 0);    // Removes all exjobs that has a weight that is 0 or lower.

        temp.exjob.students.forEach(student => {
            if((student.weight /temp.exjob.demanded.length) > 1)
                student.procent = 100;
            else
                student.procent = ((student.weight /temp.exjob.demanded.length) * 100);
        }); 

        console.log(temp.exjob.students);
        return temp.exjob.students;
    }
}