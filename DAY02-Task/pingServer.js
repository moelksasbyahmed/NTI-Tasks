function pingServer (){
    return new Promise((resolve,reject)=>{
        const online  = Math.random()>0.5;
            console.log("pinging the server ...") 
        setTimeout(()=>{
            if (online){
                resolve("server is online") 
            }
            else{
                reject("server is offline")
            }
        },2000)

    }


)}


 async function pingingServers (){
    const maxRetry =5;
    let attempts = 0; 
    for( let i = 0 ; i<maxRetry ; i++){
     try{
        const message = await pingServer();
        console.log(message)
        console.log("Server responded after " + (i+1) + " attempts")
        break ; 
     } catch (error){
        console.log(error)
        attempts++; 
          if (attempts === maxRetry){
            console.log("Server is offline after " + attempts + " attempts")
          }
    }
    
    }
}
pingingServers()