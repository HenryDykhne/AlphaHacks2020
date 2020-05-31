async function getUsers(){
    let response = await fetch('/insertStartup');
    let data = await response.json()
    return data;
}
getUsers().then(data => console.log(data));
