async function insertStartup(){

    let data = {
        "name": document.getElementById("listCompany").elements.namedItem("companyName").value,
        "youtube": document.getElementById("listCompany").elements.namedItem("youtubeLink").value,
        "email": document.getElementById("listCompany").elements.namedItem("companyEmail").value,
        "content": document.getElementById("listCompany").elements.namedItem("companyDescription").value,
        "tags": document.getElementById("listCompany").elements.namedItem("companyTags").value.replace(/\s/g, "").toLowerCase().split(',')
    }


    fetch('/insertStartup', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => response.json())
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




