const languageSelector = document.getElementById("language_to_type");

var languages = [];
var keywords = [];


function getLangSetting() {
    let langStr = localStorage.getItem("lang");
    
    if (langStr !== null) {
        try {
            let lang = JSON.parse(langStr);
            return lang["file"];
        } catch (e) {
            console.error("Invalid JSON in localStorage");
        }
    }

    localStorage.setItem("lang", JSON.stringify(languages[0]));
    return languages[0]["file"];
}

function languageLoader() {
    fetch("/langs/" + getLangSetting())
    .then(response => response.json())
    .then(json => {
        keywords = json["words"];
    }).catch(e => {
        alert("THERE WAS ERROR WHILE LOADING LANGUAGE FILE!");
    });
}

function placeUpdate() {
    languages.forEach(lang => {
        if ( lang["file"] == languageSelector.value ) {
            localStorage.setItem("lang", JSON.stringify(lang));
            window.location.reload();
        }
    });
}


fetch("/langs/index.json")
.then(response => response.json())
.then(json => {
    languages = json["languages"];

    languages.forEach(i => {
        const option = document.createElement("option");
        option.innerText = i["name"];
        option.value = i["file"];

        if ( i["file"] == getLangSetting() ) {
            option.selected = true;
        }

        languageSelector.appendChild(option);
    });

    languageLoader();
}).catch(e => {
    alert("THERE WAS ERROR WHILE LOADING LANGUAGE INDEX!");
});