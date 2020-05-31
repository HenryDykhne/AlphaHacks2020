async function insertStartup(){

    let data = {
        "name": document.getElementById("listCompany").elements.namedItem("companyName").value,
        "youtube": document.getElementById("listCompany").elements.namedItem("youtubeLink").value,
        "email": document.getElementById("listCompany").elements.namedItem("companyEmail").value,
        "content": document.getElementById("listCompany").elements.namedItem("companyDescription").value,
        "tags": document.getElementById("listCompany").elements.namedItem("companyTags").value.replace(/\s/g, "").toLowerCase().split(',').filter(element => ![''].includes(element))
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

    let data = {"tags": document.getElementById("myInput").value.replace(/\s/g, "").toLowerCase().split(',').filter(element => ![''].includes(element))} 

    fetch('/getStartupsMatchTags', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response=>response.json())
    .then(data => {
        console.log('Success:', data);
        showCompanyData(data);
    }).catch((error) => {
        console.error('Error:', error);
    });
}

async function insertvc(){

    let data = {
        "name": document.getElementById("listVenture").elements.namedItem("ventureName").value,
        "text": document.getElementById("listVenture").elements.namedItem("ventureDescription").value,
        "email": document.getElementById("listVenture").elements.namedItem("ventureEmail").value,
        "tags": document.getElementById("listVenture").elements.namedItem("ventureTag").value.replace(/\s/g, "").toLowerCase().split(',').filter(element => ![''].includes(element))
    }

    fetch('/insertvc', {
        method: 'POST', // or 'PUT'
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

    let data = {"tags": document.getElementById("myInput").value.replace(/\s/g, "").toLowerCase().split(',').filter(element => ![''].includes(element))}

    fetch('/getVCMatchTags', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response=>response.json())
    .then(data => {
        console.log('Success:', data);
        showInvestorData(data);
    }).catch((error) => {
        console.error('Error:', error);
    });
}

function showInvestorData(data) {
    document.getElementById("showData").innerHTML = "";
    for ( i = 0; i < data.length; i++) {
        document.getElementById("showData").innerHTML += 
        "<button type='button' class='collapsible'> " +
            data[i].name +
        "</button>" + 
        "<div class='ventureContent'>" +        
            "<div class='row'> " +
                "<div style='margin: 30px' class='col'>" +
                    "<p>" +
                        data[i].name +
                    "</p>" +
                    "<p>" +
                        data[i].text +
                    "</p>" +
                    "<p>" +
                        "Email: " + data[i].email +
                    "</p>" +
                "</div>" +
            "</div>" 
        "</div>";
    }
    enableExpansion();
}
function showCompanyData(data) {
    document.getElementById("showData").innerHTML = "";
    for ( i = 0; i < data.length; i++) {
        document.getElementById("showData").innerHTML += 
        "<button type='button' class='collapsible'> " +
            data[i].name +
        "</button>" + 
        "<div class='ventureContent'>" +        
            "<div class='row'> " +
            "<div class='col-md-auto'>" +
                "<iframe style='margin: 30px ' width='315' height='250' src='" + data[i].yt_link + "' ></iframe>" +  
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
        "</div>";
    }

    var coll = document.getElementsByClassName("collapsible");
    enableExpansion();

}

function enableExpansion(){
    var coll = document.getElementsByClassName("collapsible");

    
    for (var i = 0; i < coll.length; i++) {
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





