 let hotel_rooms = [{roomnumber : "1a",isTaken : true },{roomnumber : "1b",isTaken : false },{roomnumber : "1c",isTaken : false },{roomnumber : "1d",isTaken : false },{roomnumber : "b3", isTaken :true}];
function booking (slot){
    return new Promise ((resolve,reject)=>{
        console.log("searching for the room ...")
        setTimeout(()=> {
            const room = hotel_rooms.find((room)=> room.roomnumber === slot)
            if (!room){
                reject(`sorry the room ${slot} is not found`)
            }
if (!room.isTaken ){
     room.isTaken = true; 
            resolve(`you can book the room ${slot} it is available`)
        }
        else {
            reject(`sorry the room ${slot} is already booked`)
        }
        }, 2000)
        

    })
}

booking("1a").then((message)=>{
    console.log(message)
}).catch((message)=>{
    console.log(message)
}).finally(()=>{
    console.log("thank you for using our service")
})
booking("1b").then((message)=>{
    console.log(message)
}).catch((message)=>{
    console.log(message)
}).finally(()=>{
    console.log("thank you for using our service")
})