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
    sessionStorage.setItem("WrittenProblemStatement",0)
    sessionStorage.setItem("ObservedCustomers",0)
    sessionStorage.setItem("NoFiProto",0)
    sessionStorage.setItem("NoFiProtoResult",0)
    sessionStorage.setItem("LoFiProto",0)
    sessionStorage.setItem("HiFiProto",0)
    sessionStorage.setItem("WroteTestPlan",0) 
    
    sessionStorage.setItem("CustomerInterviews",0)
    sessionStorage.setItem("EngineersHired",false)

    
    //call once to show health variables
    updateHealth()
//clean up / wipe all articles as well, so that the Start button acts as reset as well
for (let eventday=1; eventday<31; eventday++) {
    var article=document.getElementById("event"+eventday)
    article.style.display="none"
    var header = article.querySelector("header h4");
    var paragraph = article.querySelector("p")
    header.textContent=""
    paragraph.textContent=""
}
// Show the process menu
    var hiddenDiv=document.getElementById("processmenu")
    hiddenDiv.style.display='block';

// hide the conclude game menu
    var hiddenDiv=document.getElementById("concludegame")
    hiddenDiv.style.display='none';


// reset initial button states
    var buttontoenable = document.getElementById("policyownerButton");    
    buttontoenable.style.display = "block"
    buttontoenable = document.getElementById("grounddivisionButton");    
    buttontoenable.style.display = "block"
    buttontoenable = document.getElementById("observationButton");    
    buttontoenable.style.display = "block"
    buttontoenable = document.getElementById("buildnofiButton");    
    buttontoenable.style.display = "block"

    var buttontodisable = document.getElementById("plantestButton");    
    buttontodisable.style.display = "none"
    buttontodisable = document.getElementById("testprotoButton");    
    buttontodisable.style.display = "none"
    buttontodisable.textContent = "Test Prototype"
// hi fidelity prototype cannot be accessed until you have cleared at least one no-fi or lo-fi prototype test
    buttontodisable = document.getElementById("buildhifiButton");    
    buttontodisable.style.display = "none"

    document.getElementById("startButton").textContent = "Go back to Day 1";

// Kick off Day 1 
    initiateEvent01();
}


// repeated function to show the latest health status
function updateHealth(){
    //update all health variables one by one
    document.getElementById("product-readiness").textContent=sessionStorage.getItem("ProductReadiness")
    document.getElementById("problem-statement-clarity").textContent=sessionStorage.getItem("ProblemStatementClarity")
    document.getElementById("customer-insight").textContent=sessionStorage.getItem("CustomerInsight")
    document.getElementById("team-morale").textContent=sessionStorage.getItem("TeamMorale")
    document.getElementById("business-owner-confidence").textContent=sessionStorage.getItem("BusinessOwnerConfidence")
    // check if it is day 20
    if(sessionStorage.getItem("DayX")>19){
        concludeGame()
    } 
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
    changeSSV("DayX",1)
    // sessionStorage.setItem("DayX",+sessionStorage.getItem("DayX")+1)
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
    paragraph.textContent ="Your RO, Patrick, assigns you as Project Manager for a new web-app to distribute a new service to Singaporeans. He assigns you Andrea as your designer, and tells you that when you have sufficient clarity on the solution, he will assign you engineers as well. He also describes the new service briefly and forwards you the slides showing the policy approval and intended solution."
    paragraph.innerHTML +="<p class='health-status-growth'>Problem Statement Clarity + 10</p>"
    changeSSV("ProblemStatementClarity", 10)
    // TODO - populate with more details
    // make the article visible
    article.style.display = "block"
    // update Health Status
    updateHealth()
}


// resolve result of policy owner interview. 
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
    // Pathing - has the team interviewed policy owner already? If not, then check day -> early = good response, late = bad response. If yes, has the team learnt anything that necessitates coming back? If yes, good response, else bad response
    // First conditional - has the team interviewed policy owner already? 
    var InterviewedPolicyOwner =     +sessionStorage.getItem("InterviewedPolicyOwner")
    var CustomerInsight = +sessionStorage.getItem("CustomerInsight")
    if (InterviewedPolicyOwner ==0){
        // check early or late
        if (dayX<5){
            // Good response - interview yields insights about problem statement and customer insight, builds business owner confidence and team morale
            paragraph.innerHTML ="<p>You interview the Policy Director, Jeannette. The interview goes well. Jeannette shares deeper insights into the problems the policy team were seeing on the ground as well as their thoughts about customer behavior on the ground. Jeannette suggests you speak to the ground team to hear more about their experiences with customers as well.</p>"
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
            paragraph.innerHTML ="<p>You interview the Policy Director, Jeannette. The interview starts poorly. Jeannette shares her disappointment that you had delayed speaking to her and wonders aloud what you could possibly have been doing. Andrea is visibly shaken by her comments</p>"
            paragraph.innerHTML +="<p class='health-status-loss'>Business Owner Confidence - 10, Team Morale - 10</p>"
            changeSSV("BusinessOwnerConfidence", -10)
            changeSSV("TeamMorale",-10)
            paragraph.innerHTML +="<p> After she overcomes her anger, Jeannette shares some insights into the problems the policy team were seeing on the ground. While she still gives you more clarity about the problem statement, she seems very impatient and ends the meeting early. You cannot help but feel that some important information was left unsaid. </p>"
            paragraph.innerHTML +="<p class='health-status-growth'>Problem Statement Clarity + 10</p>"
            changeSSV("ProblemStatementClarity", 10)           
        }
        //either way, store the current customer insight level as the variable for when we last interviewed the policy owner
        if (sessionStorage.getItem("CustomerInsight")==0){
            sessionStorage.setItem("InterviewedPolicyOwner",1)
        } else{
            sessionStorage.setItem("InterviewedPolicyOwner",sessionStorage.getItem("CustomerInsight"))
        }   
    } else {
        // check level of customer insight
        if ((CustomerInsight-InterviewedPolicyOwner)>20){
            // Good response - policy owner responds well to new insights, and clarifies their problem statement. Builds BOC and Morale
            paragraph.textContent =" 'Those are really interesting learning points!' Jeannette is surprised by the insights you have unearthed and digs into the evidence you have assembled. In the ensuing discussion, she lays out her thinking for how the web app should take these new learnings into account and gives the go-ahead for you to proceed on the more refined direction. "
            paragraph.innerHTML +="<p class='health-status-growth'>Problem Statement Clarity + 10</p>"
            changeSSV("ProblemStatementClarity", 10)
            sessionStorage.setItem("InterviewedPolicyOwner",sessionStorage.getItem("CustomerInsight"))
        } else{
            // Bad response - why are you wasting my time?
            paragraph.textContent =" 'I thought I just saw you recently?' Jeannette is confused and surprised why you have come to see her again when you have no new customer insights to add, and chews you and the entire team out for wasting her time"
            paragraph.innerHTML +="<p class='health-status-loss'>Business Owner Confidence - 10, Team Morale - 10</p>"
            changeSSV("BusinessOwnerConfidence", -10)
            changeSSV("TeamMorale",-10)
            // disable Interview 
            paragraph.innerHTML +="<p> After the meeting, Patrick's PA tells you that Jeannette's PA has asked her to inform you that Jeannette has indicated that she does not wish to take any more meetings with you until you have an MVP ready. </p>"       
            var buttontodisable = document.getElementById("policyownerButton");    
            buttontodisable.style.display = "none"
            }
    }
    // update the health status
    updateHealth()
}

// resolve result of ground Division interview. 
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
    
    // Pathing - has the team interviewed ground owner before? Has the team interviewed policy owner?  Has the team developed solutions or interviewed customer already?
    // First conditional - has the team interviewed policy owner already? 
    var InterviewedGroundDivision =     +sessionStorage.getItem("InterviewedGroundDivision")
    var CustomerInsight = +sessionStorage.getItem("CustomerInsight")
    var InterviewedPolicyOwner =     +sessionStorage.getItem("InterviewedPolicyOwner")
    var ProblemStatementClarity = +sessionStorage.getItem("ProblemStatementClarity")
    if (InterviewedGroundDivision ==0){
        // have the team interviewed the policy owner?
        paragraph.innerHTML ="<p>You interview YT, the Director of the customer-facing division. She has great insights into the customers who might be using the product. </p>"
        paragraph.innerHTML +="<p class='health-status-growth'>Customer Insight +20</p>"
        changeSSV("CustomerInsight",20)
        if (InterviewedPolicyOwner ==0){
            // Not good response - ground division does not quite understand the policy decision. However, they are able to share their views on what the customer journey looks like
            paragraph.innerHTML +="<p> However, she questions the proposed solution, and says that she thinks it does not address the pain points of customers and the staff who inevitably face the brunt of customer unhappiness. Without a clear understanding of the policy rationale behind the decision, you find it difficult to have a deeper discussion with her on how the web app would work. You sense that she may be a bit frustrated. Andrea's confidence is also shaken.</p>"
            paragraph.innerHTML +="<p class='health-status-loss'>Business Owner Confidence - 10, Team Morale - 10</p>"
            changeSSV("BusinessOwnerConfidence", -10)
            changeSSV("TeamMorale",-10)
        } else {
            // Good response. With knowledge of the policy goals that the policy division intended, you manage to dig deeper into the problem statement. 
            paragraph.innerHTML +="<p> YT questions the proposed solution,and says that she thinks it does not address the pain points of customers and the staff who inevitably face the brunt of customer unhappiness. From your discussions with Jeannette, you recall that the policy division had highlighted that they felt that customer complaints on the ground were precipitated upstream by the behaviours of a different group of stakeholders. The proposed solution aims to address the behaviors of those stakeholders and eliminate the upstream cause of the issues which trigger customer complaints. </p>"
            paragraph.innerHTML +="<p> When you have explained that, YT thoughtfully acknowledges the view. She explains that the upstream issue is more complicated than the policy division thinks. Nonetheless, you convince her that studying the customers' behaviours more closely may shed more light on the possible solutions.   </p>"
            paragraph.innerHTML +="<p class='health-status-growth'>Problem Statement Clarity + 10, Business Owner Confidence + 10</p>"
            changeSSV("ProblemStatementClarity", 10)           
            changeSSV("BusinessOwnerConfidence", 10)
        }
        //either way, store the current customer insight level as the variable for when we last interviewed the ground division
        sessionStorage.setItem("InterviewedGroundDivision",sessionStorage.getItem("CustomerInsight"))

    } else {
        // check if level of customer insight has changed significantly since you last met her
        if ((CustomerInsight-InterviewedGroundDivision)>20){
            // Good response
            paragraph.textContent =" 'Thank you for reporting back on your findings. It looks like, we should be pursuing a different track than any of us had originally planned.'  YT feels vindicated by your findings, that the original policy solution planned would not work."
            paragraph.innerHTML +="<p class='health-status-growth'>Business Owner Confidence + 10</p>"
            changeSSV("Business Owner Confidence", 10)
            // with sufficient problem statement clarity, you can propose a solution and validate it with her
            if (ProblemStatementClarity>60){
                paragraph.innerHTML +="<p> With the insights you had accumulated on the Problem Statement Clarity, you have a working hypothesis on how you would like to position the web app. You bounce the idea off YT and she helps you to quickly fill in with her knowledge of the customers</p>"
                paragraph.innerHTML +="<p class='health-status-growth'>Customer Insight + 10</p>"
                changeSSV("CustomerInsight", 10)
            } else{
                //nothing for now
            }
        } else{
            // Bad response - why are you wasting my time!
            paragraph.textContent =" 'I do not understand why we are meeting again, when you have not done any further testing with customers.' YT is impatient and rather upset that you did not do sufficient customer groundwork before meeting her again."
            paragraph.innerHTML +="<p class='health-status-loss'>Business Owner Confidence - 10</p>"
            changeSSV("BusinessOwnerConfidence", -10)
        }
        // disable Interview after 2nd interview 
        paragraph.innerHTML +="<p> Just after you leave her office, YT's PA informs you that YT is going for a month long course and will not be available for further discussions on this project until after your MVP is complete.</p>"
        var buttontodisable = document.getElementById("grounddivisionButton");    
        buttontodisable.style.display = "none"
        
    }
    // update the health status
    updateHealth()
}

function writeProblemStatement(){
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
    // Pathing - has the team written the problem statement before?
    var WrittenProblemStatement =     +sessionStorage.getItem("WrittenProblemStatement")
    var ProblemStatementClarity = +sessionStorage.getItem("ProblemStatementClarity")
    var CustomerInsight = +sessionStorage.getItem("CustomerInsight")
    var TotalClarity = ProblemStatementClarity + CustomerInsight
    if (WrittenProblemStatement ==0){
        paragraph.textContent ="You spend some time writing down the problem statement as best as you understand it."
        sessionStorage.setItem("WrittenProblemStatement", TotalClarity)
        if (TotalClarity==10){
            paragraph.innerHTML +="<p> 'I think it is quite hard to write down the problem statement when we know so little. Maybe we should speak to our stakeholders first?' Andrea seems a bit disappointed in your planning. </p>"
            paragraph.innerHTML +="<p class='health-status-loss'>Team Morale - 10</p>"
            changeSSV("TeamMorale", -10)
        } else {
            paragraph.innerHTML +="<p> Spending some time to write down the problem statement helps the team to consolidate what you have learnt from different stakeholders, and gives the team more confidence</p>"
            paragraph.innerHTML +="<p class='health-status-growth'>Team Morale + 10</p>"
            changeSSV("TeamMorale", 10)
        }
    } else {
        if (ProblemStatementClarity == TotalClarity){
            paragraph.textContent ="You do not think you have learnt anything since you last attempted your problem statement. A day passes while you struggle to rephrase your problem statement."
        } else {
            paragraph.textContent ="You update the problem statement with your latest learnings. This might come in useful later."
    }
    // update the health status
    updateHealth()
    }
}


function observeCustomers(){
    // move the mostrecent day into the past and increment the dayX
    advancetheDay();
    // get the current day
    var dayX=+sessionStorage.getItem("DayX")
    //    select Article with ID mostrecent
    var article = document.getElementById("mostrecent");
    // change the header to reflect current Day. Customer Observation is multiday - takes up 3 days to conduct and write findings
    var header = article.querySelector("header h4");
    var paragraph = article.querySelector("p")
    header.textContent = "Day " + dayX
    dayX=dayX+2
    header.textContent += " to Day " + dayX
    sessionStorage.setItem("DayX", dayX)
    // Pathing - how much customerinsight and problemstatementclarity does the team have? 
    var ProblemStatementClarity = +sessionStorage.getItem("ProblemStatementClarity")
    var CustomerInsight = +sessionStorage.getItem("CustomerInsight")
    var TotalClarity = ProblemStatementClarity + CustomerInsight
    var InterviewedPolicyOwner =     +sessionStorage.getItem("InterviewedPolicyOwner")
    var InterviewedGroundDivision =     +sessionStorage.getItem("InterviewedGroundDivision")
    var ObservedCustomers = +sessionStorage.getItem("ObservedCustomers") 

    paragraph.textContent ="You spend some time planning your customer observations, conducting them at diverse sites, and then coming together to consolidate your findings."
    
    if (ObservedCustomers==0){
        if (InterviewedPolicyOwner==0){
            paragraph.innerHTML +="<p> Without deeper knowledge of the policy intention behind the product, you and Andrea do not really understand how the solution is meant to improve the customer experience. Andrea does manage to glean some findings from her observations which might be useful in future, but she is a bit worried that this round of customer observations was a waste of time.</p>"
            paragraph.innerHTML +="<p class='health-status-loss'>Team Morale - 10, <span class='health-status-growth'> ProblemStatementClarity + 10</span></p>"
            changeSSV("Team Morale", - 10)
            changeSSV("ProblemStatementClarity", 10)
            if (InterviewedGroundDivision==0){
                paragraph.innerHTML +="<p> On top of that, some of the ground staff almost chased you off the premises because they had no idea you were coming or what you were aiming to do.</p>"
                paragraph.innerHTML +="<p class='health-status-loss'>Team Morale - 10</p>"
                changeSSV("TeamMorale", - 10)
            } else {
                paragraph.innerHTML +="<p> However, YT had briefed you on the pain points in the customer journey from the perspective of the ground division. With that in mind, you zoomed in on the experiences of that customer group and were able to understand more about their customer journey. You could also see that despite her grouses, YT also has some blindspots about upstream causes for the customer issues her team is seeing.  </p>"
                paragraph.innerHTML +="<p class='health-status-growth'>Customer Insight + 10</p>"
                changeSSV("CustomerInsight", 10)
            }       
        } else{
            paragraph.innerHTML +="<p> Armed with the knowledge of the policy intention behind the product, you and Andrea are able to identify key moments in the customer journey that impact the solution space.</p>"
            paragraph.innerHTML +="<p class='health-status-growth'>Problem Statement Clarity + 10, Customer Insight + 10</p>"
            changeSSV("ProblemStatementClarity", 10)           
            changeSSV("CustomerInsight", 10)
            if (InterviewedGroundDivision==0){
                paragraph.innerHTML +="<p> Some of the ground staff almost chased you off the premises because they had no idea you were coming or what you were aiming to do.</p>"
                paragraph.innerHTML +="<p class='health-status-loss'>Team Morale - 10</p>"
                changeSSV("TeamMorale", - 10)
            } else {
                paragraph.innerHTML +="<p> Furthermore, interviewing the ground division gave you a good sense of additional complications in the planned policy solution. With those tensions in mind, Andrea and you were able to better understand the full customer journey.    </p>"
                paragraph.innerHTML +="<p class='health-status-growth'>Problem Statement Clarity + 10, Customer Insight + 10</p>"
                changeSSV("ProblemStatementClarity", 10)           
                changeSSV("CustomerInsight", 10)
                }       
        }
        // disable customerObservations and increment ObservedCustomers
        var buttontodisable = document.getElementById("observationButton");    
        buttontodisable.style.display = "none"
        changeSSV("ObservedCustomers", 1)
        paragraph.innerHTML +="<p> You would not want to re-do customer observations unless there are significant changes in the assumptions that warrant it</p>"
    } else{
        // do we want to open up avenue to re-open customer observations at some point?
    }
    // update the health status
    updateHealth()
}


function buildNoFiProto(){
    // move the mostrecent day into the past and increment the dayX
    advancetheDay();
    // get the current day
    var dayX=+sessionStorage.getItem("DayX")
    //    select Article with ID mostrecent
    var article = document.getElementById("mostrecent");
    // change the header to reflect current Day. 
    var header = article.querySelector("header h4");
    var paragraph = article.querySelector("p")
    header.textContent = "Day " + dayX
    
    // Pathing really depends on how much total clarity they have in various categories. Simple version here
    var NoFiProto = +sessionStorage.getItem("NoFiProto")
    var ProblemStatementClarity = +sessionStorage.getItem("ProblemStatementClarity")
    var CustomerInsight = +sessionStorage.getItem("CustomerInsight")
    var TotalClarity = ProblemStatementClarity + CustomerInsight
    var WrittenProblemStatement = sessionStorage.getItem("WrittenProblemStatement")
    if (NoFiProto==0){
        if (ProblemStatementClarity==10){
            if (CustomerInsight==0){
                paragraph.innerHTML ="<p> You dive into solutioning without having interviewed the policy owner, thought about the deeper implications of the work, or looked at how customers might be affected.</p>"
                paragraph.innerHTML +="<p> After a lot of back and forth, you emerge with an almost purely theoretical solution based on a hypothetical customer, but neither you nor Andrea have much confidence in the product.</p>"
                paragraph.innerHTML +="<p class='health-status-loss'>Team Morale - 20</p>"
                changeSSV("TeamMorale", - 20)
            } else {
                paragraph.innerHTML ="<p> You dive into solutioning without having interviewed the policy owner or thought about the deeper implications of the work. Thankfully you have studied the customer somewhat and have some useful insights to contribute.</p>"
                paragraph.innerHTML +="<p> The back and forth on the solutioning is quite frustrating as you and Andrea struggle to reach agreement on what the key problem to solve is.</p>"
                paragraph.innerHTML +="<p class='health-status-loss'>Team Morale - 10</p>"
                changeSSV("TeamMorale", - 10)
            }
        } else {
            if (CustomerInsight==0){
                paragraph.innerHTML ="<p> You dive into solutioning with some clarity on the problem statement, but without having studied the customer.</p>"
                paragraph.innerHTML +="<p> As a result, the back and forth on the solutioning is quite frustrating as you and Andrea struggle to reach agreement on how customers would be served by the web app.</p>"
                paragraph.innerHTML +="<p class='health-status-loss'>Team Morale - 10</p>"
                changeSSV("TeamMorale", - 10)
            } else {
                paragraph.innerHTML ="<p> You dive into solutioning with some clarity on both the problem statement and the underlying customer experiences.</p>"
                paragraph.innerHTML +="<p> As a result, the back and forth on the solutioning is quite productive and actually helps you develop better clarity on the problem statement.</p>"
                paragraph.innerHTML +="<p class='health-status-growth'>Problem Statement Clarity + 10</p>"
                changeSSV("ProblemStatementClarity", 10)            
            }
            if (WrittenProblemStatement==TotalClarity){
                paragraph.innerHTML +="<p> Having an up-to-date written problem statement makes it easier for you to keep your discussions on track.</p>"
                paragraph.innerHTML +="<p class='health-status-growth'>Team Morale + 10</p>"
                changeSSV("TeamMorale", 10)            
            }
        }
    } else{
        if (NoFiProto==TotalClarity){
            paragraph.innerHTML ="<p> You waste a day adjusting your concept even though you have learnt nothing new. Andrea asks you whether you have had temporary amnesia.</p>"
            paragraph.innerHTML +="<p class='health-status-loss'>Team Morale - 10</p>"
            changeSSV("TeamMorale", - 10)
        } else {
            var NoFiProtoResult = +sessionStorage.getItem("NoFiProtoResult")
            if (NoFiProtoResult == 0){
                paragraph.innerHTML ="<p> You spend a day updating your concept to take into account what you have learnt since you last built it.</p>"
            } else {
                paragraph.innerHTML ="<p> You spend a day updating your concept to take into account what you learnt from the customer tests.</p>"
                sessionStorage.setItem("NoFiProtoResult",0)
            }
        }
    }
    // Set the clarity level of the No-fi prototype, and update Readiness
    ProblemStatementClarity = +sessionStorage.getItem("ProblemStatementClarity")
    CustomerInsight = +sessionStorage.getItem("CustomerInsight")
    TotalClarity = ProblemStatementClarity + CustomerInsight
    sessionStorage.setItem("NoFiProto", TotalClarity)
    sessionStorage.setItem("ProductReadiness", "No-Fidelity Prototype")

    // // rename the no-fi prototype text
    // var buttontorename = document.getElementById("buildnofibutton")
    // buttontorename.textContent = "Refine no-fidelity prototype (1 day)"

    //enable the plantestbutton and testprotobtn
    var buttontoenable = document.getElementById("plantestButton");    
    buttontoenable.style.display = "block"
    buttontoenable = document.getElementById("testprotoButton");    
    buttontoenable.style.display = "block"
    buttontoenable.textContent = "Test No-Fi Prototype (3 days)"

    // update the health status
    updateHealth()
}


function planProtoTest(){
    // move the mostrecent day into the past and increment the dayX
    advancetheDay();
    // get the current day
    var dayX=+sessionStorage.getItem("DayX")
    //    select Article with ID mostrecent
    var article = document.getElementById("mostrecent");
    // change the header to reflect current Day. 
    var header = article.querySelector("header h4");
    var paragraph = article.querySelector("p")
    header.textContent = "Day " + dayX

    
    var ProblemStatementClarity = +sessionStorage.getItem("ProblemStatementClarity")
    var CustomerInsight = +sessionStorage.getItem("CustomerInsight")
    var TotalClarity = ProblemStatementClarity + CustomerInsight

    paragraph.innerHTML ="<p> You spend a day planning the prototype test. This included rigorously choosing the critical assumption which you wished to test, writing interview guides to help the facilitators stay on track, and preparing selection criteria for recruitment of customers for the test .</p>"

    // check which prototype you are testing for and load ProtoClarity
    var ProtoToTest = sessionStorage.getItem("ProductReadiness")
    if (sessionStorage.getItem("ProductReadiness")=="No-Fidelity Prototype"){
        var ProtoClarity = sessionStorage.getItem("NoFiProto")
 //       alert("Protoclarity " + ProtoClarity+" vs TotalClarity " + TotalClarity)
        if (ProtoClarity != TotalClarity){
            paragraph.innerHTML +="<p> You belatedly realise that you had not updated the solution to take into account your latest customer insights. To fix this, you and Andrea work till midnight to update your concept and sync your language.</p>"
            paragraph.innerHTML +="<p class='health-status-loss'>Team Morale - 10</p>"
            changeSSV("TeamMorale", - 10)
            sessionStorage.setItem("NoFiProto", TotalClarity)
        }
        // For NoFi Prototype, the most important fit is ProblemStatementClarity
        sessionStorage.setItem("WroteTestPlan",ProblemStatementClarity)
    } else {
        if (sessionStorage.getItem("ProductReadiness")=="Lo-Fidelity Prototype"){
            var ProtoClarity = sessionStorage.getItem("LoFiProto")
            if (ProtoClarity != TotalClarity){
                paragraph.innerHTML +="<p> You belatedly realise that you had not updated the prototype to take into account your latest customer insights. To fix this, Andrea pulls an all-nighter to update the figma prototype.</p>"
                paragraph.innerHTML +="<p class='health-status-loss'>Team Morale - 20</p>"
                changeSSV("TeamMorale", - 20)
                sessionStorage.setItem("LoFiProto", TotalClarity)
            }
            sessionStorage.setItem("WroteTestPlan",TotalClarity)
        } else {
            var ProtoClarity = sessionStorage.getItem("HiFiProto")
            if (ProtoClarity != TotalClarity){
                paragraph.innerHTML +="<p> You belatedly realise that you had not updated the clickable prototype to take into account your latest customer insights. To fix this, your engineers pull an all-nighter to update the clickable prototype. They are VERY unhappy</p>"
                paragraph.innerHTML +="<p class='health-status-loss'>Team Morale - 30</p>"
                changeSSV("TeamMorale", - 30)
                sessionStorage.setItem("HiFiProto", TotalClarity)
            }
            sessionStorage.setItem("WroteTestPlan",TotalClarity)
        }
    }
       // disable the plantestbtn for now
    var buttontodisable = document.getElementById("plantestButton");    
    buttontodisable.style.display = "none"
    // update the health status
    updateHealth()
}


function testProto(){
    // move the mostrecent day into the past and increment the dayX
    advancetheDay();
    // get the current day
    var dayX=+sessionStorage.getItem("DayX")
    //    select Article with ID mostrecent
    var article = document.getElementById("mostrecent");
    // change the header to reflect current Day. Note this is a 3 day exercise
    var header = article.querySelector("header h4");
    var paragraph = article.querySelector("p")
    header.textContent = "Day " + dayX
    dayX=dayX+2
    header.textContent += " to Day " + dayX
    sessionStorage.setItem("DayX", dayX)

    var ProblemStatementClarity = +sessionStorage.getItem("ProblemStatementClarity")
    var CustomerInsight = +sessionStorage.getItem("CustomerInsight")
    var TotalClarity = ProblemStatementClarity + CustomerInsight
    var TestPlanClarity =  +sessionStorage.getItem("WroteTestPlan")

    paragraph.innerHTML ="<p> You spend a total of 3 days (spread out with other work) testing the prototype with customers.</p>"
    paragraph.innerHTML +="<p> 2 days were spent conducting the interviews, and 1 day consolidating the findings and reporting to Patrick.</p>"
    paragraph.innerHTML +="<p> (The work to recruit customers, while significant, was thankfully undertaken by the ground division)</p>"

    // check which prototype you are testing for 
    if (sessionStorage.getItem("ProductReadiness")=="No-Fidelity Prototype"){
        // No-fidelity Prototypes are meant to quickly test Problem Statement fit and early concepts
        if (ProblemStatementClarity >60){
            paragraph.innerHTML +="<p> The no-fidelity prototype is strikingly successful. Customers interacting with you give many signals about how well the proposed solution would meet their needs, and even add more ideas for features they would like to see.</p>"
            paragraph.innerHTML +="<p class='health-status-growth'>Problem Statement Clarity +10</p>"
            changeSSV("ProblemStatementClarity", 10)
            sessionStorage.setItem("NoFiProtoResult",2)
            if(TestPlanClarity==0){
                paragraph.innerHTML +="<p> The high level of acceptance of the proposed solution gives the team a shot of confidence. However, the lack of a well-written test plan meant that many of the interviews meandered to the new features requested by customers, rather than focusing on what customers liked about the features of the prototype. This was a missed opportunity to show stakeholders the value of the proposed solution</p>"
                paragraph.innerHTML +="<p class='health-status-growth'>Team Morale + 10, Business Owner Confidence +0</p>"
                changeSSV("TeamMorale", 10)
            } else {
                paragraph.innerHTML +="<p> The high level of acceptance of the proposed solution gives the team a shot of confidence. When the report is sent to the respective stakeholders, the respective division directors reply positively with support for the direction the team is taking.</p>"
                paragraph.innerHTML +="<p class='health-status-growth'>Team Morale + 10, Business Owner Confidence +20</p>"
                changeSSV("TeamMorale", 10)
                changeSSV("BusinessOwnerConfidence", 20)
            }
            // enable the hi fi build prototype, since users accepted the solution
            paragraph.innerHTML +="<p> The successful customer tests gave Patrick sufficient confidence in the proposed solution. He assigns you three engineers, Belinda, Chris, and Dean. You can now build a high-fidelity prototype.</p>"
            var buttontoenable = document.getElementById("buildhifiButton");    
            buttontoenable.style.display = "block" 
        } else {
            paragraph.innerHTML +="<p> The proposed solution misses the mark due to lack of understanding of the underlying issues. Customers interviewed  reject the proposed solution. This is somewhat discouraging for Andrea and you, that you seem to have missed the mark. Although Patrick tries to encourage the team, when you email the report to stakeholder divisions, the email is met with a somewhat stony silence. </p>"
            paragraph.innerHTML +="<p class='health-status-loss'>Team Morale - 10, Business Owner Confidence - 10</p>"
            changeSSV("TeamMorale", -10)
            changeSSV("BusinessOwnerConfidence", -10)
            sessionStorage.setItem("NoFiProtoResult",1)
            if (TestPlanClarity==0){
                paragraph.innerHTML +="<p> Without a test plan, the facilitators struggle to capture the views of customers coherently. While you still get some useful insights to help pivot the solution, you feel that you missed an opportunity.</p>"
                paragraph.innerHTML +="<p class='health-status-growth'>Problem Statement Clarity + 10</p>"
                changeSSV("ProblemStatementClarity", 10)
            } else {
                paragraph.innerHTML +="<p> However, the well-written test plan allows the facilitators to quickly pivot towards developing and fleshing out other hypotheses about and alternativee solutions to the problem statement.</p>"
                paragraph.innerHTML +="<p class='health-status-growth'>Problem Statement Clarity + 20, Customer Insight + 10</p>"
                changeSSV("ProblemStatementClarity", 20)
                changeSSV("CustomerInsight", 10)
            }
        }
    } else {
        if (sessionStorage.getItem("ProductReadiness")=="Lo-Fidelity Prototype"){
        // Lo-fidelity Prototypes are meant to test content structure and functionality
        var ProtoClarity = sessionStorage.getItem("LoFiProto")
            if (TotalClarity>100){
                paragraph.innerHTML +="<p> The prototype tests extremely well, and customers report both that the web app meets their needs, and the content is well-structured. Andrea and you are quite excited that you have hit on the right solution.</p>"
                paragraph.innerHTML +="<p class='health-status-growth'>Team Morale + 10</p>"
                changeSSV("TeamMorale", 10)
                if (TestPlanClarity==0){
                    paragraph.innerHTML +="<p> Without a test plan, the facilitators struggle to capture the views of customers coherently. While you still get some useful insights on how to improve the customer journey, you feel that you missed an opportunity.</p>"
                    paragraph.innerHTML +="<p class='health-status-growth'>Customer Insight  + 10</p>"
                    changeSSV("CustomerInsight", 10)
                } else{
                    paragraph.innerHTML +="<p> Your facilitators stick to the test plan, which allows you to tease out and test a critical assumption in your web app flow. The insights help you decide to switch the ordering of two steps in the journey to become more intuitive to the users.</p>"
                    paragraph.innerHTML +="<p class='health-status-growth'>Problem Statement Clarity +10, Customer Insight +10</p>"
                    changeSSV("ProblemStatementClarity", 10)
                    changeSSV("CustomerInsight", 10)    
                }
                // enable the hi fi build prototype, since users accepted the solution
                paragraph.innerHTML +="<p> The successful customer tests gave Patrick sufficient confidence in the proposed solution. He assigns you three engineers, Belinda, Chris, and Dean. You can now build a high-fidelity prototype.</p>"
                var buttontoenable = document.getElementById("buildhifiButton");    
                buttontoenable.style.display = "block" 

             } else {
                paragraph.innerHTML +="<p> You have no difficulty recruiting customers for the test, suggesting that customers see the problem as real and are excited to see possible solutions. However, their feedback on the prototype suggests that the solution may have missed the mark somehow.</p>"
                paragraph.innerHTML +="<p class='health-status-loss'>Team Morale - 10</p>"
                changeSSV("TeamMorale", -10)                
                if (TestPlanClarity==0){
                    paragraph.innerHTML +="<p> Without a test plan, the facilitators struggle to capture the views clearly. The feedback captured still gives you insight into the customer journey, but does not dive deeply enough into why customers feel the way they do.</p>"
                    paragraph.innerHTML +="<p class='health-status-growth'>Customer Insight  + 10</p>"
                    changeSSV("CustomerInsight", 10)
                } else{
                    paragraph.innerHTML +="<p> Your test plan included a critical assumption to test, flags for the facilitators to look for, and suggested questions to dive deeper into the issue. With these plans in place, the facilitators were able to elicit where the prototype was falling short and understand why the test customers were struggling with the web app.  .</p>"
                    paragraph.innerHTML +="<p> Armed with those insights, you start to make changes to your web app to more directly address the problem at its source.</p>"
                    paragraph.innerHTML +="<p class='health-status-growth'>Problem Statement Clarity +10, Customer Insight +20</p>"
                    changeSSV("ProblemStatementClarity", 10)
                    changeSSV("CustomerInsight", 20)    
                }
             }
        } else {
            // high Fidelity Prototype test
            var ProtoClarity = sessionStorage.getItem("HiFiProto")
            paragraph.innerHTML +="<p> Just getting to this stage means that you were able to land on a compelling problem statement, enough to convince Patrick to assign you engineers to develop the prototype </p>"
            paragraph.innerHTML +="<p> Having the clickable prototype allows you to let stakeholders in the policy and ground divisions directly try your solution, making it easier to get their buy-in. </p>"
            paragraph.innerHTML +="<p class='health-status-growth'>Business Owner Confidence + 10</p>"
            changeSSV("BusinessOwnerConfidence", 10)

            if (TestPlanClarity==0){
                paragraph.innerHTML +="<p> As the customer tests proceed, you realise you forgot to put together a test plan. While the quality of the product speaks for itself, you are unable to derive much further insight from the customers beyond simple satisfaction ratings.</p>"
            } else{
                paragraph.innerHTML +="<p> Your test plan included critical assumptions and key metrics.</p>"
                paragraph.innerHTML +="<p> One guardrail metric helped you determine that customers were prematurely leaving one of the customer journeys, allowing you to zoom in on a key obstacle in the customer journey.</p>"
                paragraph.innerHTML +="<p class='health-status-growth'>Customer Insight +10</p>"
                changeSSV("CustomerInsight", 10)   
                paragraph.innerHTML +="<p> You had also planned to measure your primary metric (conversion), which demonstrated conclusively to stakeholders that the web app had the potential for widespread acceptance. </p>"
                paragraph.innerHTML +="<p class='health-status-growth'>Business Owner Confidence + 10</p>"
                changeSSV("BusinessOwnerConfidence", 10)
            }
        }
    }
    // reset TestPlan, hide the test prototype button again
    sessionStorage.setItem("WroteTestPlan",0)
    var buttontodisable = document.getElementById("testprotoButton");    
    buttontodisable.style.display = "none"
    // disable the plantestbtn for now also
    buttontodisable = document.getElementById("plantestButton");    
    buttontodisable.style.display = "none"
    // update the health status
    updateHealth()
}


function buildLoFiProto(){
    // move the mostrecent day into the past and increment the dayX
    advancetheDay();
    // get the current day
    var dayX=+sessionStorage.getItem("DayX")
    //    select Article with ID mostrecent
    var article = document.getElementById("mostrecent");
    // change the header to reflect current Day. Note this is a 2 day exercise 
    var header = article.querySelector("header h4");
    var paragraph = article.querySelector("p")
    header.textContent = "Day " + dayX
    dayX=dayX+1
    header.textContent += " to Day " + dayX
    sessionStorage.setItem("DayX", dayX)

    // Pathing really depends on how much total clarity they have in various categories. Simple version here
    var LoFiProto = +sessionStorage.getItem("LoFiProto")
    var ProblemStatementClarity = +sessionStorage.getItem("ProblemStatementClarity")
    var CustomerInsight = +sessionStorage.getItem("CustomerInsight")
    var TotalClarity = ProblemStatementClarity + CustomerInsight
    var WrittenProblemStatement = sessionStorage.getItem("WrittenProblemStatement")
    if (LoFiProto==0){
        if (ProblemStatementClarity==10){
            if (CustomerInsight==0){
                paragraph.innerHTML ="<p> You dive into solutioning a lo-fidelity (paper or figma) prototype without having interviewed the policy owner, thought about the deeper implications of the work, or looked at how customers might be affected.</p>"
                paragraph.innerHTML +="<p> After a lot of back and forth, you emerge with an almost purely theoretical prototype based on a hypothetical customer, but neither you nor Andrea have much confidence in the product.</p>"
                paragraph.innerHTML +="<p class='health-status-loss'>Team Morale - 20</p>"
                changeSSV("TeamMorale", - 20)
            } else {
                paragraph.innerHTML ="<p> You dive into solutioning a lo-fidelity (paper or figma) prototype without having interviewed the policy owner or thought about the deeper implications of the work. Thankfully you have studied the customer somewhat and have some useful insights to contribute.</p>"
                paragraph.innerHTML +="<p> The back and forth on the prototype is quite frustrating as you and Andrea struggle to reach agreement on what the key problem to solve is.</p>"
                paragraph.innerHTML +="<p class='health-status-loss'>Team Morale - 10</p>"
                changeSSV("TeamMorale", - 10)
            }
        } else {
            if (CustomerInsight==0){
                paragraph.innerHTML ="<p> You dive into solutioning a lo-fidelity (paper or figma) prototype with some clarity on the problem statement, but without having studied the customer.</p>"
                paragraph.innerHTML +="<p> As a result, the back and forth on the prototype is quite frustrating as you and Andrea struggle to reach agreement on how customers would be served by the web app.</p>"
                paragraph.innerHTML +="<p class='health-status-loss'>Team Morale - 10</p>"
                changeSSV("TeamMorale", - 10)
            } else {
                var NoFiProto = +sessionStorage.getItem("NoFiProto")
                var NoFiProtoResult = +sessionStorage.getItem("NoFiProtoResult")
                if (NoFiProto==0){
                // ie no-fi prototype was not created
                    paragraph.innerHTML ="<p> You dive into solutioning a lo-fidelity (paper or figma prototype) with some clarity on both the problem statement and the underlying customer experiences.</p>"
                    paragraph.innerHTML +="<p> As a result, the back and forth on the prototype is quite productive and actually helps you develop better clarity on the problem statement.</p>"
                    paragraph.innerHTML +="<p class='health-status-growth'>Problem Statement Clarity + 10</p>"
                    changeSSV("ProblemStatementClarity", 10)
                } else {
                    if (NoFiProtoResult == 0){
                        paragraph.innerHTML ="<p> Having thought through and articulated the solution space in no-fidelity makes it easier to build the lo-fidelity prototype, even though it is a pity that the current proposed solution was never tested with customers.</p>"
                        paragraph.innerHTML +="<p class='health-status-growth'>Team Morale + 10</p>"
                        changeSSV("TeamMorale", 10)
                        } else if (NoFiProtoResult == 1) {
                            paragraph.innerHTML ="<p> Even though you had developed a no-fidelity prototype earlier, the tests had invalidated the underlying solution hypothesis.</p>"
                            paragraph.innerHTML +="<p> The new lo-fidelity prototype is built on the learnings from the customer tests, and putting it together helps the team to fully internalise what you learnt from the customer test.</p>"
                            paragraph.innerHTML +="<p class='health-status-growth'>Problem Statement Clarity + 10, Customer Insight +10</p>"
                            changeSSV("ProblemStatementClarity", 10)
                            changeSSV("CustomerInsight", 10)                                
                        } else {
                            paragraph.innerHTML ="<p> Having thought through and tested the solution space in no-fidelity makes it much easier to build the lo-fidelity prototype, incorporating the insights captured from the customer test.</p>"
                            paragraph.innerHTML +="<p class='health-status-growth'>Team Morale + 10</p>"
                            changeSSV("TeamMorale", 10)
                        } 
                }         
            }
            if (WrittenProblemStatement==TotalClarity){
                paragraph.innerHTML +="<p> Having an up-to-date written problem statement makes it easier for you to keep your discussions on track.</p>"
                paragraph.innerHTML +="<p class='health-status-growth'>Team Morale + 10</p>"
                changeSSV("TeamMorale", 10)            
            }
        }
        // disable the no-fi prototype button
        paragraph.innerHTML +="<p> Starting on the lo-fidelity prototype generally means you have landed on the solution space and are now working on the customer flow and structure. In the context of the tight time-line, no-fidelity prototypes have now been disabled. </p>"
        var buttontodisable = document.getElementById("buildnofiButton");    
        buttontodisable.style.display = "none"
    } else{
        if (LoFiProto==TotalClarity){
            paragraph.innerHTML ="<p> You waste time adjusting your prototype even though you have learnt nothing new. Andrea asks you whether you have had temporary amnesia.</p>"
            paragraph.innerHTML +="<p class='health-status-loss'>Team Morale - 10</p>"
            changeSSV("TeamMorale", - 10)
        } else {
            paragraph.innerHTML ="<p> You spend time updating your prototype to take into account what you have learnt since you built it.</p>"
        }
    }
    // Set the clarity level of the LoFiPrototype, and update Readiness
    ProblemStatementClarity = +sessionStorage.getItem("ProblemStatementClarity")
    CustomerInsight = +sessionStorage.getItem("CustomerInsight")
    TotalClarity = ProblemStatementClarity + CustomerInsight
    sessionStorage.setItem("LoFiProto", TotalClarity)
    sessionStorage.setItem("ProductReadiness", "Lo-Fidelity Prototype")



    // rename the lo-fi prototype text
    // var buttontorename = document.getElementById("buildlofibutton")
    // buttontorename.textContent = "Refine lo-fidelity prototype (2 days)"
    
    //enable the plantestbutton and testprotobtn
    var buttontoenable = document.getElementById("plantestButton");    
    buttontoenable.style.display = "block"
    buttontoenable = document.getElementById("testprotoButton");    
    buttontoenable.style.display = "block"
    buttontoenable.textContent = "Test Lo-Fi Prototype (3 days)"

    // update the health status
    updateHealth()
}


function buildHiFiProto(){
    // move the mostrecent day into the past and increment the dayX
    advancetheDay();
    // get the current day
    var dayX=+sessionStorage.getItem("DayX")
    //    select Article with ID mostrecent
    var article = document.getElementById("mostrecent");
    // change the header to reflect current Day. Note this is a 3 day exercise 
    var header = article.querySelector("header h4");
    var paragraph = article.querySelector("p")
    header.textContent = "Day " + dayX
    dayX=dayX+2
    header.textContent += " to Day " + dayX
    sessionStorage.setItem("DayX", dayX)

// pathing goes here
var HiFiProto = +sessionStorage.getItem("HiFiProto")
var ProblemStatementClarity = +sessionStorage.getItem("ProblemStatementClarity")
var CustomerInsight = +sessionStorage.getItem("CustomerInsight")
var TotalClarity = ProblemStatementClarity + CustomerInsight
var WrittenProblemStatement = sessionStorage.getItem("WrittenProblemStatement")
if (HiFiProto==0){
    paragraph.innerHTML ="<p> Belinda, Chris, and Dean work closely with you and Andrea over the course of three days to turn your concept into a high-fidelity clickable prototype which you can use to conduct further testing and to explain the solution to stakeholders.</p>"

    // determine whether there was a lo-fi prototype before this
    if (sessionStorage.getItem("ProductReadiness")=="Lo-Fidelity Prototype"){
        paragraph.innerHTML +="<p> The work that had gone into the previous lo-fidelity prototype makes it easier for the engineers to visualise the intended outcome, making discussions smoother and freeing up you and Andrea for other tasks.</p>"
        paragraph.innerHTML +="<p> You spend that time cleaning up reports and preparing presentations to help stakeholders understand the choices you have made, generating organisational buy-in into your product.</p>"
        paragraph.innerHTML +="<p class='health-status-growth'>Business Owner Confidence + 10</p>"
        changeSSV("BusinessOwnerConfidence", 10)
        paragraph.innerHTML +="<p> Andrea is also able to go through the customer experience with a fine toothed comb, and continues to tweak the customer journey</p>"
        paragraph.innerHTML +="<p class='health-status-growth'>Customer Insight + 10</p>"
        changeSSV("CustomerInsight", 10)
    } else {
// this means only a no-fidelity prototype was built
        paragraph.innerHTML +="<p> Going straight from a no-fidelity prototype to a clickable prototype was always going to be difficult.</p>"
        paragraph.innerHTML +="<p> In the end, all five of you go into crunch time together to ensure that the prototype is true to the project vision. You think you had 6 hours of sleep over those 3 nights!</p>"
        paragraph.innerHTML +="<p class='health-status-loss'>Team Morale - 10</p>"
        changeSSV("TeamMorale", -20)
    }
    if (WrittenProblemStatement==TotalClarity){
        paragraph.innerHTML +="<p> Having an up-to-date written problem statement makes it easier for you to keep your discussions on track.</p>"
        paragraph.innerHTML +="<p class='health-status-growth'>Team Morale + 10</p>"
        changeSSV("TeamMorale", 10)            
    }
    // disable the no-fi prototype button
    paragraph.innerHTML +="<p> Starting on the hi-fidelity prototype generally means you have zeroed in on the solution. Once you have committed resources to coding, and in the context of the tight time-line, lower-fidelity prototypes have now been disabled. </p>"
    var buttontodisable = document.getElementById("buildnofiButton");    
    buttontodisable.style.display = "none"
    buttontodisable = document.getElementById("buildlofiButton");    
    buttontodisable.style.display = "none"
} else{
    if (HiFiProto==TotalClarity){
        paragraph.innerHTML ="<p> Since you have time to spare, you spend three more days refining the clickable prototype, resulting in a more polished piece of work.</p>"
        paragraph.innerHTML +="<p class='health-status-growth'>Business Owner Confidence +10</p>"
        changeSSV("BusinessOwnerConfidence", 10)
    } else {
        paragraph.innerHTML ="<p> You spend three days updating your prototype to take into account what you have learnt since you built it. You also manage to go through the processes one more time, resulting in a more polished piece of work.</p>"
        paragraph.innerHTML +="<p class='health-status-growth'>Business Owner Confidence +10</p>"
        changeSSV("BusinessOwnerConfidence", 10)
    }
}
    // Set the clarity level of the HiFiPrototype, and update Readiness
    ProblemStatementClarity = +sessionStorage.getItem("ProblemStatementClarity")
    CustomerInsight = +sessionStorage.getItem("CustomerInsight")
    TotalClarity = ProblemStatementClarity + CustomerInsight
    sessionStorage.setItem("HiFiProto", TotalClarity)
    sessionStorage.setItem("ProductReadiness", "Hi-Fidelity Prototype")

    // rename the hi-fi prototype text
    // var buttontorename = document.getElementById("buildhifibutton")
    // buttontorename.textContent = "Refine hi-fidelity prototype (3 days)"

    //enable the plantestbutton and testprotobtn
    var buttontoenable = document.getElementById("plantestButton");    
    buttontoenable.style.display = "block"
    buttontoenable = document.getElementById("testprotoButton");    
    buttontoenable.style.display = "block"
    buttontoenable.textContent = "Test Hi-Fi Prototype (3 days)"


    // update the health status
    updateHealth()
}

function concludeGame(){
    //hide process menu
    var hiddenDiv=document.getElementById("processmenu")
    hiddenDiv.style.display='none';
    //display game over text with button to save score
    hiddenDiv=document.getElementById("concludegame")
    hiddenDiv.style.display='block';
    var ProblemStatementClarity = +sessionStorage.getItem("ProblemStatementClarity")
    var CustomerInsight = +sessionStorage.getItem("CustomerInsight")
    var TeamMorale = +sessionStorage.getItem("TeamMorale")
    var BusinessOwnerConfidence = +sessionStorage.getItem("BusinessOwnerConfidence")
    var finalscore = ProblemStatementClarity+CustomerInsight+TeamMorale+BusinessOwnerConfidence
    var scorereport = document.getElementById("scorereport")
    scorereport.textContent = "Your total score is " + finalscore
    // send the final score into the score box
    scorereport = document.getElementById("scoresaver")
    scorereport.value=finalscore
}