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
    sessionStorage.setItem("DesignerHired",false)
    sessionStorage.setItem("EngineersHired",false)
    sessionStorage.setItem("CustomerInterviews",0)
    sessionStorage.setItem("ManDaysSpent",0)

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
    document.getElementById("days-elapsed").textContent=sessionStorage.getItem("DayX")
    document.getElementById("product-readiness").textContent=sessionStorage.getItem("ProductReadiness")
    document.getElementById("problem-statement-clarity").textContent=sessionStorage.getItem("ProblemStatementClarity")
    document.getElementById("customer-insight").textContent=sessionStorage.getItem("CustomerInsight")
    document.getElementById("team-morale").textContent=sessionStorage.getItem("TeamMorale")
    document.getElementById("business-owner-confidence").textContent=sessionStorage.getItem("BusinessOwnerConfidence")
}

