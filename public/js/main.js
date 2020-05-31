async function insertStartup(){
    let data = {
        "name": "bigMoneyInc",
        "youtube": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "email": "jeff.bezos@ownsyourmom.com",
        "content": "xd",
        "tags":["finance", "dogs", "shopping"]
    }

    fetch('/insertStartup', {
        method: 'POST', // or 'PUT'
        body: data,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response=>response.json())
    .then(data => {
        console.log('Success:', data);
    }).catch((error) => {
        console.error('Error:', error);
    });
}


async function getStartupsMatchTags(){
    let data = {"tags":["shopping", "dogs"]}

    fetch('/getStartupsMatchTags', {
        method: 'POST', // or 'PUT'
        body: data,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response=>response.json())
    .then(data => {
        console.log('Success:', data);
        myFunction(data);
    }).catch((error) => {
        console.error('Error:', error);
    });
}

async function insertvc(){
    let data = {
        "name": "Kevin O'Donnel",
        "text": "Kevin O'Donnel's first venture was selling unwanted newspapers for dimes. Now, as the owner of his own VC firm, Kevin wants to offer a leg up to promising entrepreneurs and innovators. Kevin has decades of experience in monetizing ideas, avoiding stagnation and providing expert marketing advice. Kevin is interested in investing in: Tech, Finance, Law, Multimedia. Reach out to Kevin and give him your pitch!",
        "email": "kdo@odonnelventures.com",
        "tags":["finance", "shopping", "dogs"]
    }

    fetch('/insertvc', {
        method: 'POST', // or 'PUT'
        body: data,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response=>response.json())
    .then(data => {
        console.log('Success:', data);
    }).catch((error) => {
        console.error('Error:', error);
    });
}

async function getVCMatchTags(){
    let data = {"tags":["shopping", "dogs"]}

    fetch('/getVCMatchTags', {
        method: 'POST', // or 'PUT'
        body: data,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response=>response.json())
    .then(data => {
        console.log('Success:', data);
        myFunction(data);
    }).catch((error) => {
        console.error('Error:', error);
    });
}

function myFunction(data) {

    for ( i = 0; i < data.length; i++)
    {
        document.getElementById("showData").innerHTML += 
        "<button type='button' class='collapsible'> " +
            data[i].name +
        "</button>" + 
        "<div class='ventureContent'>" +        
            "<div class='row'> " +
            "<div class='col-md-auto'>" +
                "<iframe style='margin: 30px ' width='315' height='250' src='" + data[i].youtube + "' ></iframe>" +  
            "</div>" +
            "<div style='margin: 30px' class='col-md-6'>" +
                "<p>" +
                    data[i].name +
                "</p>" +
                "<p>" +
                    data[i].content +
                "</p>" +
                "<p>" +
                    "Email: " + data[i].email +
                "</p>" +
            "</div>" +
        "</div>" 
        "</div>"
    ;
    }

    var coll = document.getElementsByClassName("collapsible");
    var i;
    
    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    }


}




