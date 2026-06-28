
patients = require("./patients").patients

let missingDataList = [] ;
let normalTreated_List = [] ;
let treatedImmediately_List = [] ;
if (patients  &&  patients.length > 0) { 
    for (patient of patients){
        if (patient.hasdata == false) {
            missingDataList.push(patient)  
            continue ;
        }
        if (patient.condition === "critical"){
            treatedImmediately_List.push(patient) 
            continue ;

        }
        normalTreated_List.push(patient)
    }
    normalTreated_List.sort((a,b)=> b.severity - a.severity);
    console.log("Missing Data List : ", missingDataList)
    console.log("Normal Treated List : ", normalTreated_List)
    console.log("Treated Immediately List : ", treatedImmediately_List)



} else {
    console.log("No patients found.")
}

/**
 * check if the array is sorted or not   
*/

let arr = [1 ,2, 3, 4, 5, 6, 7, 8, 9] ;
let not_sorted_arr = [1, 2, 3, 4, 5, 15, 7, 8, 9, 0] ;
function checkSorted(arr){
let ascending = false ; 
let descending = false ;
for (let i = 0 ; i < arr.length - 1 ; i++){ 
     if (arr[i] > arr[i+1]){
         descending = true ;
        if (ascending == true) {
            return false ; 
        }
        }
     if (arr[i] < arr[i+1]){
         ascending = true ;
        if (descending == true) {
            return false ;
        }

        }
    }
    return true ;
}

    console.log("Is the array sorted ? ", checkSorted(arr)) 
    console.log("Is the array sorted ? ", checkSorted(not_sorted_arr))


    /***
     *  all the number greated than a certain value 
     */


    let value = 5 ;
    for ( let i = 0 ; i < arr.length ; i++){ 
        if (arr[i] > value){ 
             console.log("The number greater than ", value, " is : ", arr[i]) 
        }
    }
