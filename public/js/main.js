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



function myFunction(data) {

    document.getElementById("showData").innerHTML = 
    " <div id='accordian'> " + 
        "<div class='card'> " +
          "<div class='card-header' id='headingOne'> " +
            "<h5 class'mb-0'> " +
              "<button class='btn btn-link collapsed' data-toggle='collapse' data-target='#collapseOne' aria-expanded='true' aria-controls='collapseOne'> " +
              data[6].name +
          "</button></h5></div>" +
          "<div id='collapseOne' class='collapse' aria-labelledby='headingOne' data-parent='#accordion'> " +
            "<div class='card-body'> " +
                "<div class='row'> " +
                    "<div class='col-md-6'>" +
                        "<p>" +
                            data[6].content +
                        "</p>" +
                        "<p>" +
                            "Email: " + data[6].email +
                        "</p>" +
                    "</div>" +
                    "<div class='col-md-6'>" +
                        "<iframe width='560' height='315' src='https://www.youtube.com/embed/gu-trYf96xo' ></iframe>" +
                    "</div>" +
                "</div>" +
          "</div></div> " +
        "</div>" +
      "</div>"
    ;


}



