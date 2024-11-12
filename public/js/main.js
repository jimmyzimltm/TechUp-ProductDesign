function resetVariables(){
    //declare and reset all gamestate variables
    sessionStorage.setItem("GameStart", true)

    //healthstatus variables
    sessionStorage.setItem("DayX",1)
    sessionStorage.setItem("BusinessOwnerConfidence",50)
    sessionStorage.setItem("ProblemStatementClarity",0)
    sessionStorage.setItem("CustomerInsight",0)
    sessionStorage.setItem("TeamMorale",70)
    sessionStorage.setItem("ProductReadiness","None")

    sessionStorage.setItem("InterviewedPolicyOwner",0)
    sessionStorage.setItem("InterviewedGroundDivision",0)

    sessionStorage.setItem("CustomerInterviews",0)
    sessionStorage.setItem("TeamSize",1)
    sessionStorage.setItem("EngineersHired",false)
    sessionStorage.setItem("ManDaysSpent",0)

    sessionStorage.setItem("PaperProto",false)
    sessionStorage.setItem("FigmaProto",false)
    sessionStorage.setItem("ClickableProto",false)
    //call once to show health variables
    updateHealth()
//TODO - put in a function to clean up / wipe all articles as well, so that the Start button acts as reset as well
    //debug text
    alert("Initiating Day 1");

// Show the process menu
    var hiddenDiv=document.getElementById("processmenu")
    hiddenDiv.style.display='block';

    document.getElementById("startButton").textContent = "Go back to Day 1";

// Kick off Day 1 
    initiateEvent01();
}


// repeated function to show the latest health status
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

//toolbox function to change sessionStoragevariables
function changeSSV(key, increment){
    let currentValue = sessionStorage.getItem(key)
      // If the value is null (not yet set), assume it's 0
    if (currentValue === null) {
        currentValue = 0;
    } else {
        // Convert the current value to an integer
        currentValue = parseInt(currentValue, 10);

        // Check if it's a valid number, if not set it to 0
        if (isNaN(currentValue)) {
        currentValue = 0;
        }
    }
    // Increment the current value by the provided number
    currentValue += increment;
    // Store the updated value back into sessionStorage
    sessionStorage.setItem(key, currentValue.toString());
}



// repeated function to move the events from mostrecent to below the line, and advance the day.
function advancetheDay(){
    // identify the current day
    var dayX=+sessionStorage.getItem("DayX");
    // move the most recent page to the matching element 
    var eventID = "event"+sessionStorage.getItem("DayX")
    var pastarticle = document.getElementById(eventID);
    var article = document.getElementById("mostrecent");
    var pastheader = pastarticle.querySelector("header h4");
    var header = article.querySelector("header h4");
    pastheader.textContent = header.textContent;
    var pastparagraph = pastarticle.querySelector("p")
    var paragraph = article.querySelector("p")
    pastparagraph.innerHTML = paragraph.innerHTML
    // and make the matching element visible
    pastarticle.style.display = "block"
    // advance the day count
    //    dayX=dayX+1
    //    sessionStorage.setItem("DayX", dayX)
    sessionStorage.setItem("DayX",+sessionStorage.getItem("DayX")+1)
    alert("After = Day " + sessionStorage.getItem("DayX"));
}


// this is a one-off function used to kick off with the first event - boss starting the project
function initiateEvent01(){
//    select Article with ID 1
    var article = document.getElementById("mostrecent");
    // change the header to reflect current Day
    var header = article.querySelector("header h4");
    header.textContent = "Day " + sessionStorage.getItem("DayX");
    // populate the event scenario
    var paragraph = article.querySelector("p")
    paragraph.textContent ="Your RO, Patrick, assigns you as Project Manager for a new web-app to distribute a new service to Singaporeans. He assigns you Andrea as your designer. He describes the new service briefly (Problem Statement Clarity +10)"
    // TODO - populate with more details
    // make the article visible
    article.style.display = "block"
    // change variables to reflect
    sessionStorage.setItem("TeamSize",2)
    var PSC =     +sessionStorage.getItem("ProblemStatementClarity")
    PSC = PSC + 10
    sessionStorage.setItem("ProblemStatementClarity",PSC)
    updateHealth()
}

function interviewPolicyOwner(){
    // move the mostrecent day into the past and increment the dayX
    advancetheDay();
    // get the current day
    var dayX=+sessionStorage.getItem("DayX")
    //    select Article with ID mostrecent
    var article = document.getElementById("mostrecent");
    // change the header to reflect current Day
    var header = article.querySelector("header h4");
    var paragraph = article.querySelector("p")
    header.textContent = "Day " + dayX;
    
    // resolve result of policy owner interview. Check conditionals
    // Pathing - has the team interviewed policy owner already? If not, then check day -> early = good response, late = bad response. If yes, has the team learnt anything that necessitates coming back? If yes, good response, else bad response
    // First conditional - has the team interviewed policy owner already? 
    var InterviewedPolicyOwner =     +sessionStorage.getItem("InterviewedPolicyOwner")
    var CustomerInsight = +sessionStorage.getItem("CustomerInsight")
    if (InterviewedPolicyOwner ==0){
        // check early or late
        if (dayX<5){
            // Good response - interview yields insights about problem statement and customer insight, builds business owner confidence and team morale
            paragraph.innerHTML ="<p>You interview the Business Owner, Jeannette. The interview goes well. Jeannette shares deeper insights into the problems the policy team were seeing on the ground as well as their thoughts about customer behavior on the ground. Jeannette suggests you speak to the ground team to hear more about their experiences with customers as well.</p>"
            paragraph.innerHTML +="<p class='health-status-growth'>Problem Statement Clarity + 20, Customer Insight +10</p>"
            changeSSV("ProblemStatementClarity", 20)
            changeSSV("CustomerInsight",10)
            // sessionStorage.setItem("CustomerInsight",+sessionStorage.getItem("CustomerInsight")+10)
            paragraph.innerHTML +="<p> At the end of the meeting, Jeannette shares that she is happy that the team had come to speak with her. After the meeting, Andrea tells you she has gained confidence in the project.</p>"
            paragraph.innerHTML +="<p class='health-status-growth'>Business Owner Confidence + 10, Team Morale +10</p>"
            changeSSV("BusinessOwnerConfidence", 10)
            changeSSV("TeamMorale",10)
            // sessionStorage.setItem("BusinessOwnerConfidence",+sessionStorage.getItem("BusinessOwnerConfidence")+10)
            // sessionStorage.setItem("TeamMorale",+sessionStorage.getItem("TeamMorale")+10)
        } else {
            // Bad response - business owner scolds you for coming to her so late. Still gets some insight about problem statement and customer insight, but loses business owner confidence and team morale
            paragraph.innerHTML ="<p>You interview the Business Owner, Jeannette. The interview starts poorly. Jeannette shares her disappointment that you had delayed speaking to her and wonders aloud what you could possibly have been doing. Andrea is visibly shaken by her comments</p>"
            paragraph.innerHTML +="<p class='health-status-loss'>Business Owner Confidence - 10, Team Morale - 10</p>"
            changeSSV("BusinessOwnerConfidence", -10)
            changeSSV("TeamMorale",-10)
            paragraph.innerHTML +="<p> After she overcomes her anger, Jeannette shares some insights into the problems the policy team were seeing on the ground. While she still gives you more clarity about the problem statement, she seems very impatient and ends the meeting early. You cannot help but feel that some important information was left unsaid. </p>"
            paragraph.innerHTML +="<p class='health-status-growth'>Problem Statement Clarity + 10</p>"
            changeSSV("ProblemStatementClarity", 10)           
        }
        //either way, store the current customer insight level as the variable for when we last interviewed the policy owner
            sessionStorage.setItem("InterviewedPolicyOwner",sessionStorage.getItem("CustomerInsight"))
    } else {
        // check level of customer insight
        if ((CustomerInsight-InterviewedPolicyOwner)>20){
            // Good response - policy owner responds well to new insights, and clarifies their problem statement. Builds BOC and Morale
            paragraph.textContent =" 'Those are really interesting learning points. Jeannette is surprised by the insights you have unearthed and digs into the evidence you have assembled. She quickly regroups and lays out her thinking for how the web app should take these new learnings into account "
            paragraph.innerHTML +="<p class='health-status-growth'>Problem Statement Clarity + 10</p>"
            changeSSV("ProblemStatementClarity", 10)
        } else{
            // Bad response - why are you wasting my time!
            paragraph.textContent =" 'I thought I just saw you recently?' Jeannette is confused and surprised why you have come to see her again when you have no new insights to add, and chews you and the entire team out for wasting her time"
            paragraph.innerHTML +="<p class='health-status-loss'>Business Owner Confidence - 10, Team Morale - 10</p>"
            changeSSV("BusinessOwnerConfidence", -10)
            changeSSV("TeamMorale",-10)
        }
    }
    // Regardless, increment InterviewedPolicyOwner, store it, 
    changeSSV("InterviewedPolicyOwner", 1)
    // disable Interview after 2nd interview 
    if (sessionStorage.getItem("InterviewedPolicyOwner")=="2"){
        var buttontodisable = document.getElementById("policyownerButton");    
        buttontodisable.style.display = "none"
    }
    // update the health status
    updateHealth()
}

function interviewGroundDivision(){
    // move the mostrecent day into the past and increment the dayX
    advancetheDay();
    // get the current day
    var dayX=+sessionStorage.getItem("DayX")
    //    select Article with ID mostrecent
    var article = document.getElementById("mostrecent");
    // change the header to reflect current Day
    var header = article.querySelector("header h4");
    var paragraph = article.querySelector("p")
    header.textContent = "Day " + dayX;
    
    // resolve result of ground Division interview. Check conditionals
    // Pathing - has the team interviewed ground owner before? Has the team interviewed policy owner?  Has the team developed solutions or interviewed customer already?
    // First conditional - has the team interviewed policy owner already? 
    var InterviewedGroundDivision =     +sessionStorage.getItem("InterviewedGroundDivision")
    var CustomerInsight = +sessionStorage.getItem("CustomerInsight")
    if (InterviewedGroundDivision ==0){
        // check early or late
        if (dayX<5){
            // Good response - interview yields insights about problem statement and customer insight, builds business owner confidence and team morale
            paragraph.innerHTML ="<p>You interview the Business Owner, Jeannette. The interview goes well. Jeannette shares deeper insights into the problems the policy team were seeing on the ground as well as their thoughts about customer behavior on the ground. Jeannette suggests you speak to the ground team to hear more about their experiences with customers as well.</p>"
            paragraph.innerHTML +="<p class='health-status-growth'>Problem Statement Clarity + 20, Customer Insight +10</p>"
            changeSSV("ProblemStatementClarity", 20)
            changeSSV("CustomerInsight",10)
            // sessionStorage.setItem("CustomerInsight",+sessionStorage.getItem("CustomerInsight")+10)
            paragraph.innerHTML +="<p> At the end of the meeting, Jeannette shares that she is happy that the team had come to speak with her. After the meeting, Andrea tells you she has gained confidence in the project.</p>"
            paragraph.innerHTML +="<p class='health-status-growth'>Business Owner Confidence + 10, Team Morale +10</p>"
            changeSSV("BusinessOwnerConfidence", 10)
            changeSSV("TeamMorale",10)
            // sessionStorage.setItem("BusinessOwnerConfidence",+sessionStorage.getItem("BusinessOwnerConfidence")+10)
            // sessionStorage.setItem("TeamMorale",+sessionStorage.getItem("TeamMorale")+10)
        } else {
            // Bad response - business owner scolds you for coming to her so late. Still gets some insight about problem statement and customer insight, but loses business owner confidence and team morale
            paragraph.innerHTML ="<p>You interview the Business Owner, Jeannette. The interview starts poorly. Jeannette shares her disappointment that you had delayed speaking to her and wonders aloud what you could possibly have been doing. Andrea is visibly shaken by her comments</p>"
            paragraph.innerHTML +="<p class='health-status-loss'>Business Owner Confidence - 10, Team Morale - 10</p>"
            changeSSV("BusinessOwnerConfidence", -10)
            changeSSV("TeamMorale",-10)
            paragraph.innerHTML +="<p> After she overcomes her anger, Jeannette shares some insights into the problems the policy team were seeing on the ground. While she still gives you more clarity about the problem statement, she seems very impatient and ends the meeting early. You cannot help but feel that some important information was left unsaid. </p>"
            paragraph.innerHTML +="<p class='health-status-growth'>Problem Statement Clarity + 10</p>"
            changeSSV("ProblemStatementClarity", 10)           
        }
    } else {
        // check level of customer insight
        if ((CustomerInsight-InterviewedPolicyOwner)>20){
            // Good response - policy owner responds well to new insights, and clarifies their problem statement. Builds BOC and Morale
            paragraph.textContent =" 'Those are really interesting learning points. Jeannette is surprised by the insights you have unearthed and digs into the evidence you have assembled. She quickly regroups and lays out her thinking for how the web app should take these new learnings into account "
            paragraph.innerHTML +="<p class='health-status-growth'>Problem Statement Clarity + 10</p>"
            changeSSV("ProblemStatementClarity", 10)
        } else{
            // Bad response - why are you wasting my time!
            paragraph.textContent =" 'I thought I just saw you recently?' Jeannette is confused and surprised why you have come to see her again when you have no new insights to add, and chews you and the entire team out for wasting her time"
            paragraph.innerHTML +="<p class='health-status-loss'>Business Owner Confidence - 10, Team Morale - 10</p>"
            changeSSV("BusinessOwnerConfidence", -10)
            changeSSV("TeamMorale",-10)
        }
    }
    // Regardless, increment InterviewedPolicyOwner, store it, 
    changeSSV("InterviewedPolicyOwner", 1)
    // disable Interview after 2nd interview 
    if (sessionStorage.getItem("InterviewedPolicyOwner")=="2"){
        var buttontodisable = document.getElementById("policyownerButton");    
        buttontodisable.style.display = "none"
    }
    // update the health status
    updateHealth()
}
