function resetVariables(){
    //declare and reset all gamestate variables
    sessionStorage.setItem("GameStart", true)

    //healthstatus variables
    sessionStorage.setItem("DayX",0)
    sessionStorage.setItem("BusinessOwnerConfidence",50)
    sessionStorage.setItem("ProblemStatementClarity",0)
    sessionStorage.setItem("CustomerInsight",0)
    sessionStorage.setItem("TeamMorale",100)
    sessionStorage.setItem("ProductReadiness","None")

    sessionStorage.setItem("CustomerInterviews",0)
    sessionStorage.setItem("TeamSize",1)
    sessionStorage.setItem("EngineersHired",false)
    sessionStorage.setItem("CustomerInterviews",0)
    sessionStorage.setItem("ManDaysSpent",0)

    sessionStorage.setItem("PaperProto",false)
    sessionStorage.setItem("FigmaProto",false)
    sessionStorage.setItem("ClickableProto",false)
    //call once to show health variables
    updateHealth()
//TODO - put in a function to clean up / wipe all articles as well, so that the Start button acts as reset as well
    //debug text
    alert("Initiating Day 1");
    initiateEvent01()
}

function updateHealth(){
    //debugger alert
    alert("Updating Health");
    //update all health variables one by one
    document.getElementById("days-elapsed").textContent=sessionStorage.getItem("DayX")
    document.getElementById("product-readiness").textContent=sessionStorage.getItem("ProductReadiness")
    document.getElementById("problem-statement-clarity").textContent=sessionStorage.getItem("ProblemStatementClarity")
    document.getElementById("customer-insight").textContent=sessionStorage.getItem("CustomerInsight")
    document.getElementById("team-morale").textContent=sessionStorage.getItem("TeamMorale")
    document.getElementById("business-owner-confidence").textContent=sessionStorage.getItem("BusinessOwnerConfidence")
}

// this is a one-off function used to kick off with the first event - boss starting the project
function initiateEvent01(){
//    select Article with ID 1
    var article = document.getElementById("1");
    // change the header to reflect current Day
    var header = article.querySelector("header h4");
    header.textContent = "Day " + sessionStorage.getItem("DayX");
    // populate the event scenario
    var paragraph = article.querySelector("p")
    paragraph.textContent ="Your RO, Patrick, assigns you to Projecct Manage a new web-app to distribute a new service to Singaporeans. He assigns you Andrea as your designer. He describes the new service briefly"
    // TODO - populate with more details
    // change variables to reflect
    sessionStorage.setItem("TeamSize",2)
    var PSC =     +sessionStorage.getItem("ProblemStatementClarity")
    PSC = PSC + 10
    sessionStorage.setItem("ProblemStatementClarity",PSC)
    updateHealth()
}

// this function is repeatedly called to show the menu of choices available in the highest 
function populateChoices(){


}