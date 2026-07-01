

function error_json(res , status_code , message ){
 
    res.writeHead(status_code , {'Content-Type' : 'application/json'});
    res.end(JSON.stringify({ error: message }));
 
}
function success_json(res , status_code , message ){
    res.writeHead(status_code , {'Content-Type' : 'application/json'});
    res.end(JSON.stringify({ message: message }));
}
function success_json_data(res , status_code , data ){ 
     const json_data = JSON.stringify(data);
    res.writeHead(200 , {'Content-Type' : 'application/json'});
    res.end(json_data);
}
module.exports = {
    error_json,
    success_json,
    success_json_data
}