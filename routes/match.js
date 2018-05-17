'use strict';
let express = require('express');
let mysql = require('mysql');
let app = express();
let bodyParser = require('body-parser')
let db = require('../DBFunctions');


let students;
let exjobs;
let classes;
let line = '---------------------------------------------';

module.exports = {

    prematching: function(thisStudent)
    {

        let current = {};
        current.student = thisStudent;

        Promise.all([
            db.get_xjob_promise(exjobs),                            // Fetching all exjobs
            db.get_class_catagories_promise(classes),               // Fetching all classes
            db.get_student_qual_promise(current.student),           
            db.get_demanded_promise(),
        ]).then((lists) => {
            
            exjobs = lists[0],
            classes = lists[1],

            current.QUAL = lists[2],
            students = current,

            exjobs.forEach(exjob => {
                exjob.demanded = [];
                lists[3].forEach(demand => {
                    if(exjob.ID === demand.EID)
                    {
                        exjob.demanded[exjob.demanded.length] = demand.QID;
                    }
                })
            }),

            /*classes.forEach(klass => {
                klass.qualification = db.get_qualifications_catagories_promise(klass.class);
            }),*/

            //console.log(classes),
            console.log(line);
        }).catch((error) => {
            // handle error here,
            console.error("Student Prematching Promise Error");
        });
    },

    matcha: function()
    {
        let temp = {}
        temp.student = students;
        temp.ex = [];
        exjobs.forEach(exjob => {
            if(students.QUAL.length > 0)
            {
                students.QUAL.forEach(qual => { 
                    exjob.demanded.forEach(demd => {
                        if(qual.QID === demd)
                        {
                            temp.ex[temp.ex.length] = exjob;
                        }
                    })
                })
            }
            else{ console.error('No qualifications');}
        })
        console.log(temp);

        return temp;            // kanske avändbar
    }
}