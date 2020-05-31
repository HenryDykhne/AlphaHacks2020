async function insertStartup(){
    let data = {
        "name": "bigMoneyInc",
        "youtube": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "email": "jeff.bezos@ownsyourmom.com",
        "content": "xd",
        "tags":["finance", "dogs", "shopping"]
    }

    fetch('/insertStartup', {
        method: 'GET', // or 'PUT'
        body: data,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(data => {
        console.log('Success:', data);
    }).catch((error) => {
        console.error('Error:', error);
    });
}


async function getStartupsMatchTags(){
    let data = {"tags":["shopping", "dogs"]}

    fetch('/insertStartup', {
        method: 'POST', // or 'PUT'
        body: data,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(data => {
        console.log('Success:', data);
    }).catch((error) => {
        console.error('Error:', error);
    });
}
