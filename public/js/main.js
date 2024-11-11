function resetVariables(){
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
    alert("Hello everyone "+ sessionStorage.getItem("BusinessOwnerConfidence"));
}