function skillsMemeber() {
    var skills = document.getElementById("skills").value;
    var skillsArray = skills.split(",");
    var skillsList = document.getElementById("skillsList");
    skillsList.innerHTML = "";
    for (var i = 0; i < skillsArray.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = skillsArray[i];
        skillsList.appendChild(li);
    }
}  
