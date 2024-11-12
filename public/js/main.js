function resetVariables(){
    //declare and reset all gamestate variables
    sessionStorage.setItem("GameStart", true)
    sessionStorage.setItem("DayX",0)
    sessionStorage.setItem("BusinessOwnerConfidence",50)
    sessionStorage.setItem("ProblemStatementClarity",0)
    sessionStorage.setItem("CustomerSegmentZoom",0)
    sessionStorage.setItem("CustomerJourneyInsight",0)
    sessionStorage.setItem("CustomerInterviews",0)
    sessionStorage.setItem("TeamSize",1)
    sessionStorage.setItem("DesignerHired",false)
    sessionStorage.setItem("EngineersHired",false)
    sessionStorage.setItem("CustomerInterviews",0)
    sessionStorage.setItem("ManDaysSpent",0)
    sessionStorage.setItem("TeamMorale",100)
    sessionStorage.setItem("PaperProto",false)
    sessionStorage.setItem("FigmaProto",false)
    sessionStorage.setItem("ClickableProto",false)
    //call once to show health variables
    showHealth()
}

function showHealth(){
    //debugger alert
    alert("Hello everyone");
    //update all health variables one by one
    document.getElementById("days-elapsed").textContent=sessionStorage.getItem("BusinessOwnerConfidence")
}

