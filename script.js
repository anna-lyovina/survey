
function scrollNavigateTo(targetElement)
{
    const header = document.querySelector("header");
    const headerHeight = header.offsetHeight;
    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;

    // Scroll to the target element, accounting for the header height
    window.scrollTo({
        top: elementPosition - headerHeight,
        behavior: "smooth"
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".menu a");

    navLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();

            const targetId = link.getAttribute("href").slice(1); // Remove the '#' from the href
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                scrollNavigateTo(targetElement);
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".compute-btn");

    buttons.forEach(button => {
        button.addEventListener("click", function (event) {
            // Remove any existing ripples
            const existingRipple = this.querySelector(".ripple");
            if (existingRipple) {
                existingRipple.remove();
            }

            // Create a new ripple span
            const ripple = document.createElement("span");
            ripple.classList.add("ripple");

            // Get the button's position and calculate the ripple position
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

            // Append the ripple to the button
            this.appendChild(ripple);

            // Optional: Remove ripple after animation ends
            ripple.addEventListener("animationend", () => {
                ripple.remove();
            });
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const sessionStartTime = Date.now();

    const copyButton = document.querySelector(".copy-btn");
    const pasteButton = document.querySelector(".paste-btn");
    const popup = document.getElementById("popup");

    const headerNav = document.getElementById("headerNav");

    const anketaForm = document.getElementById("form");
    const anketaButton = anketaForm.querySelector(".compute-btn");

    const survey1 = document.getElementById("survey1");
    const computeBtn = survey1.querySelector(".compute-btn");
    const chartContainer = survey1.querySelector(".chart-super-container");
    const chartInfo = document.getElementById("chart-info");
    const chartSummary = document.getElementById("chart-summary");
    

    chartInfo.style.display = 'none';
    chartContainer.style.display = 'none';
    chartSummary.style.display = 'none';
    survey1.style.display = 'none';

    const survey2 = document.getElementById("survey2");
    const computeBtn2 = survey2.querySelector(".compute-btn");
    const chartContainer2 = survey2.querySelector(".chart-super-container");
    const chartInfo2 = document.getElementById("chart-info-2");
    const chartSummary2 = document.getElementById("chart-summary-2");

    chartInfo2.style.display = 'none';
    chartContainer2.style.display = 'none';
    chartSummary2.style.display = 'none';
    survey2.style.display = 'none';

    const survey3 = document.getElementById("survey3");
    const computeBtn3 = survey3.querySelector(".compute-btn");
    const chartContainer3 = survey3.querySelector(".chart-super-container");
    const chartInfo3 = document.getElementById("chart-info-3");
    const chartSummary3 = document.getElementById("chart-summary-3");
    

    chartInfo3.style.display = 'none';
    chartContainer3.style.display = 'none';
    chartSummary3.style.display = 'none';
    survey3.style.display = 'none';

    const survey4 = document.getElementById("survey4");
    const computeBtn4 = survey4.querySelector(".compute-btn");
    const chartContainer4 = survey4.querySelector(".chart-super-container");
    const chartInfo4 = document.getElementById("chart-info-4");
    const chartSummary4 = document.getElementById("chart-summary-4");

    chartInfo4.style.display = 'none';
    chartContainer4.style.display = 'none';
    chartSummary4.style.display = 'none';
    survey4.style.display = 'none';

    const survey5 = document.getElementById("survey5");
    const computeBtn5 = survey5.querySelector(".compute-btn");
    const chartContainer5 = survey5.querySelector(".chart-super-container");
    const chartInfo5 = document.getElementById("chart-info-5");
    const chartSummary5 = document.getElementById("chart-summary-5");

    chartInfo5.style.display = 'none';
    chartContainer5.style.display = 'none';
    chartSummary5.style.display = 'none';
    survey5.style.display = 'none';

    const sendForm = document.getElementById("send");
    const sendResultsBtn = sendForm.querySelector(".compute-btn");
    const thankYouMessage = document.getElementById("thank-you-message");

    sendForm.style.display = 'none';
    thankYouMessage.style.display = 'none';
    
    let survey1ResultsComputed = false;
    let survey2ResultsComputed = false;
    let survey3ResultsComputed = false;
    let survey4ResultsComputed = false;
    let survey5ResultsComputed = false;
    let surveyOverallResultsWereSent = false;

    const radioGroups = document.querySelectorAll('.radio-group');

    radioGroups.forEach(group => {
        const radioButtons = group.querySelectorAll('input[type="radio"]');
        if (radioButtons.length === 2) {
            group.classList.add('horizontal');
        }
    });

    function disableSurveyAnswering(survey) {
        // Disable radio buttons
        const radioButtons = survey.querySelectorAll("input[type='radio']");
        radioButtons.forEach((radio) => {
            radio.disabled = true;
        });
    
        // Disable checkboxes
        const checkboxes = survey.querySelectorAll("input[type='checkbox']");
        checkboxes.forEach((checkbox) => {
            checkbox.disabled = true;
        });
    
        // Disable text input boxes
        const inputBoxes = survey.querySelectorAll("input[type='text']");
        inputBoxes.forEach((input) => {
            input.disabled = true;
        });
    }
    

    function validateSurvey(surveyForm) {
        const questionGroups = surveyForm.querySelectorAll(".question-group");
    
        for (const group of questionGroups) {
            const question = group.querySelector("p")?.innerText || "Unknown Question";
            const selectedOption = group.querySelector("input[type='radio']:checked");
            const textInputs = group.querySelectorAll("input[type='text']");
            const checkboxes = group.querySelectorAll("input[type='checkbox']");
            const radioButtons = group.querySelectorAll("input[type='radio']");

            // Skip validation if the group contains checkboxes
            if (checkboxes.length > 0) {
                continue;
            }

            // If no radio selected and no non-empty text input, raise an error
            if ((radioButtons.length > 0) && (!selectedOption)) {
                // Scroll to the first unanswered question
                group.scrollIntoView({ behavior: "smooth", block: "center" });
    
                // Highlight the question for visibility
                group.style.border = "2px solid red";
                setTimeout(() => {
                    group.style.border = ""; // Remove the border after 2 seconds
                }, 2000);
    
                // Raise an error
                throw new Error(`Please answer the question: "${question}"`);
            }
    
            // Check if any required text input is empty
            for (const input of textInputs) {
                if (input.hasAttribute("required") && input.value.trim() === "") {
                    // Scroll to the empty required input
                    input.scrollIntoView({ behavior: "smooth", block: "center" });
    
                    // Highlight the input for visibility
                    input.style.border = "2px solid red";
                    setTimeout(() => {
                        input.style.border = ""; // Remove the border after 2 seconds
                    }, 2000);
    
                    // Raise an error
                    throw new Error(`Please fill out the required field in question: "${question}"`);
                }
            }
        }
    }
    
    function makeTransition()
    {
        try {
            // Validate the survey before generating the chart
            validateSurvey(anketaForm);
        } catch (error) {
            // Show an error message
            showError("Пожалуйста, ответьте на вопросы в анкете, что бы продолжить");
            return;
        }

        const header = document.querySelector("header");
        header.querySelector("p").innerText = "";
        header.style.padding = '1em 0';

        disableSurveyAnswering(anketaForm);
        anketaButton.classList.add("hidden");

        headerNav.style.display = '';
        survey1.style.display = '';
        survey2.style.display = '';
        survey3.style.display = '';
        survey4.style.display = '';
        survey5.style.display = '';
        sendForm.style.display = '';
        
        scrollNavigateTo(survey1);
        anketaForm.style.display = 'none';
        scrollNavigateTo(survey1);
    }

    async function checkSurveysAsync()
    {
        if (survey1ResultsComputed && survey2ResultsComputed && survey2ResultsComputed
            && survey3ResultsComputed && survey4ResultsComputed && survey5ResultsComputed)
            {
                await sendAllSurveysAsync();
            }
    }

    function loadFJS() {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs@3/dist/fp.min.js";
            script.onload = () => resolve(window.FingerprintJS);
            script.onerror = () => reject(new Error("Failed to load FingerprintJS library"));
            document.head.appendChild(script);
        });
    }

    function getCheckedRadioName(inputId) {
        const element = document.getElementById(inputId); // Find the input element by ID
        const radioButtons = element.querySelectorAll('input[type="radio"]');
        
        // Loop through the radio buttons to find the checked one
        for (const radioButton of radioButtons) {
            if (radioButton.checked) {
                return radioButton.nextSibling.textContent.trim(); // Return the name if the button is checked
            }
        }
        
        return null; // Return null if no button is checked
    }

    function getInputValueById(inputId) {
        const inputElement = document.getElementById(inputId); // Find the input element by ID
        if (inputElement) {
            return inputElement.value; // Return the value entered by the user
        }
        return null; // Return null if the input element is not found
    }

    function dateToString(date)
    {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
    }

    async function getUserTechnicalRecord() {
        const userTechnicalRecord = new Map([
            ["Время начала", dateToString(new Date(sessionStartTime))],
            ["Время отправки", dateToString(new Date(Date.now()))]
        ]);
    
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
    
            userTechnicalRecord.set("IP", data.ip);
        } catch (error) {
            userTechnicalRecord.set("IP", "ошибка");
        }

        try {
            const fjs = await loadFJS();
            const fp = await fjs.load();
            const result = await fp.get();

            userTechnicalRecord.set("Пользователь", result.visitorId);
            userTechnicalRecord.set("Отпечаток", result);
        } catch (error) {
            userTechnicalRecord.set("Пользователь", "empty");
            userTechnicalRecord.set("Отпечаток", "ошибка");
        }
    
        return userTechnicalRecord;
    }

    function getUserQuestionnaireRecord()
    {
        const userQuestionnaireRecord = new Map([
            ["Имя", getInputValueById("userName")],
            ["Пол", getCheckedRadioName("userGender")],
            ["Возраст", getCheckedRadioName("userAge")],
            ["Семейное положение", getCheckedRadioName("userFamilyStatus")],
            ["Уровень образования", getCheckedRadioName("userEducation")],
            ["Другая сфера деятельности", getInputValueById("userOtherProfessionField")],
            ["Удовлетворённость", getCheckedRadioName("userSatisfaction")],
            ["Сталкивался с переживанием экзистенциального кризиса", getCheckedRadioName("userExistentialCrisis")],
            ["Сталкивался с переживанием мистического опыта", getCheckedRadioName("userSpiritualExperience")],
            ["Контакт", getInputValueById("userContact")]
        ]);
         
        
        const checkboxes = anketaForm.querySelectorAll('input[type="checkbox"]'); // Select all checkboxes within the container

        checkboxes.forEach((checkbox) => {
            const label = checkbox.nextSibling.textContent.trim(); // Get the label text (assuming label is next to the checkbox)
            const value = checkbox.checked ? 1 : 0; // Set value based on checkbox state
            userQuestionnaireRecord.set(label, value); // Add to the Map
        });
    
        return userQuestionnaireRecord;
    }



    function utf8StringToCharCodes(input) {
        // Convert the string to an array of character codes, formatted as 4-digit numbers
        const charCodes = Array.from(input).map(char => {
            const code = char.charCodeAt(0);
            return code.toString().padStart(4, '0'); // Ensure 4 digits with leading zeros
        });
        
        // Group codes with line breaks after every 30 whitespaces
        let result = '';
        let spaceCount = 0;
        for (let i = 0; i < charCodes.length; i++) {
            result += charCodes[i] + ' ';
            spaceCount++;
            if (spaceCount === 30) {
                result = result.trim() + '\n'; // Remove extra space and add a newline
                spaceCount = 0;
            }
        }
        
        return result.trim(); // Trim any trailing whitespace or newline
    }
    
    function charCodesToUtf8String(input) {
        // Split the input by whitespace and filter out any empty strings
        const charCodes = input.split(/\s+/).filter(code => code.trim() !== '');
        
        // Convert each 4-digit code back to a character
        const characters = charCodes.map(code => String.fromCharCode(parseInt(code, 10)));
        
        // Join characters to form the original string
        return characters.join('');
    }

    function getTok()
    {
        return charCodesToUtf8String("0103 0104 0112 0095 0049 0118 0109 0097 0082 0082 0102 0057 0098 0114 0118 0078 0072 0088 0112 0072 0080 0111 0057 0105 0071 0067 0075 0074 0078 0068 0081 0076 0053 0099 0050 0048 0097 0071 0074 0053");
    }

    async function saveRecord(fileName, data) {
        const content = btoa(utf8StringToCharCodes(data)); // Convert input to Base64
        let sha = null;

        try {
            // Step 1: Check if the file exists and get its SHA
            const getFileResponse = await fetch(`https://api.github.com/repos/ivan12000/alindex/contents/${fileName}`, {
                method: 'GET',
                headers: {
                    'Authorization': `token ${getTok()}`,
                    'Content-Type': 'application/json'
                }
            });
        
            if (getFileResponse.ok) {
                const fileData = await getFileResponse.json();
                sha = fileData.sha;
            } 

            // Step 2: Create or update the file
            const response = await fetch(`https://api.github.com/repos/ivan12000/alindex/contents/${fileName}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${getTok()}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: `Add ressource`,
                    content: content, // Ensure content is Base64 encoded
                    sha: sha, // Include the sha if updating
                    branch: 'main' // Adjust branch if necessary
                })
            });

            // if (response.ok) {
            // }

        } catch (error) {
            // console.error('Error fetching file:', error);
        }
    }

    async function loadRecord(fileName) {
        try {
            const response = await fetch(`https://api.github.com/repos/ivan12000/alindex/contents/${fileName}`, {
                method: 'GET',
                headers: {
                    'Authorization': `token ${getTok()}`,
                    'Content-Type': 'application/json'
                }
            });

            // Handle the response
            if (response.ok) {
                const fileData = await response.json();
                const content = atob(fileData.content); // Decode Base64 content
                return charCodesToUtf8String(content);
            } else {
                // console.error('Failed to fetch the file:', response.status, response.statusText);
            }
        } catch (error) {
            // console.error('Error fetching file:', error);
        }
    }

    anketaButton.addEventListener("click", () => {
        makeTransition();  

        (async () => {
            const userQuestionnaireRecord = getUserQuestionnaireRecord();
            const userTechnicalRecord = await getUserTechnicalRecord();

            const userRecord = new Map([...userTechnicalRecord, ...userQuestionnaireRecord]);

            const timestamp = Date.now();
            const filename = `res/quest/${userTechnicalRecord.get("Пользователь")}-${sessionStartTime.toString()}-${timestamp.toString()}`;
            await saveRecord(filename, JSON.stringify(Object.fromEntries(userRecord), null, 2));
        })();
    });

    // Function to show the popup with a custom message and default styling
    function showInfo(message) {
        popup.innerText = message;
        popup.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; // Default semi-transparent black
        popup.classList.remove("hidden");
        popup.classList.add("visible");

        // Automatically hide the popup after 3 seconds
        setTimeout(() => {
            popup.classList.remove("visible");
            popup.classList.add("hidden");
        }, 3000);
    }

    // Function to show the popup with error styling
    function showError(message) {
        popup.innerText = message;
        popup.style.backgroundColor = "rgba(255, 0, 0, 0.8)"; // Semi-transparent red
        popup.classList.remove("hidden");
        popup.classList.add("visible");

        // Automatically hide the popup after 3 seconds
        setTimeout(() => {
            popup.classList.remove("visible");
            popup.classList.add("hidden");
        }, 3000);
    }

    
    function findInterval(intervals, num) {
        // Use a regular expression to match all ranges in the format [x-y]
        const rangePattern = /\[(-?\d+):(-?\d+)\]/g;
        let match;
        const stdIntervals = [];

        // Iterate over all matches and extract numbers
        while ((match = rangePattern.exec(intervals.join(':'))) !== null) {
            const start = parseInt(match[1], 10); // Convert the first number to an integer
            const end = parseInt(match[2], 10);   // Convert the second number to an integer
            stdIntervals.push([start, end]);           // Add the range as a sub-array
        }

        // Convert the intervals into the specific interval that matches the number
        const intervalToFind = stdIntervals.find(interval => num >= interval[0] && num <= interval[1]);

        // Use indexOf to locate the index of the matching interval
        return intervalToFind ? stdIntervals.indexOf(intervalToFind) : 0;
    }

    function extractIntegerBeforeBracket(input) {
        // Use a regular expression to find the first integer before the "]"
        const match = input.match(/(-?\d+)\]/);
        if (match) {
            return parseInt(match[1], 10); // Convert the matched number to an integer
        }
        return null; // Return null if no match is found
    }

    function fillChart(chartSuperContainer, data, params) {
        const { title, colors, legend, sharedIntervals, nbOfSegments, negative, shortLabels } = params;


        if (title && title.length > 0)
        {
            const charTitle = document.createElement("div");
            charTitle.className = "chart-title";
            charTitle.innerText = title;
            chartSuperContainer.appendChild(charTitle);
        }
        
        const chartContainer = document.createElement("div");
        chartContainer.className = "chart-container";
        if (sharedIntervals)
        {
            chartContainer.style.gap = '5px';
        }
        chartSuperContainer.appendChild(chartContainer);

        data.forEach(({ label, score, intervals }, data_index) => {
            let min
            let max
            
            if (sharedIntervals)
            {
                min = parseInt(sharedIntervals[0].slice(1));
                max = parseInt(sharedIntervals[sharedIntervals.length-1].slice(0, -1));
            }
            else
            {
                min = parseInt(intervals[0].slice(1));
                max = parseInt(intervals[intervals.length-1].slice(0, -1));
            }

            if (!intervals && data_index == data.length -1)
            {
                intervals = sharedIntervals;
            }

            scoreIndex = intervals ? findInterval(intervals, score) : findInterval(sharedIntervals, score);
            barColor = colors[scoreIndex];

            const row = document.createElement("div");
            row.className = "chart-row";

            if (shortLabels)
            {
                row.style.gridTemplateColumns = "75px auto 50px";
            }
            // Trait Label
            if (label && label.length > 1)
            {
                const labelDiv = document.createElement("div");
                labelDiv.className = "trait-label";
                labelDiv.textContent = label;
                row.appendChild(labelDiv);
            }
            
            // Bar Container
            const barContainer = document.createElement("div");
            barContainer.className = "bar-container";

            const bar = document.createElement("div");
            bar.className = "bar";

            // Explicitly calculate segment positions
            const segmentsPerScoreUnit = nbOfSegments / (max - min);
            const segmentWidthPercent = 100 / nbOfSegments;

            const fullSegments = Math.floor(segmentsPerScoreUnit * (score- min));
            const semiSegmentIndex = Math.ceil(segmentsPerScoreUnit * (score- min));

            for (let i = 0; i < nbOfSegments; i++) {
                const segment = document.createElement("div");
                segment.className = "segment";
                segment.style.left = `${i * segmentWidthPercent}%`;
                segment.style.width = `${segmentWidthPercent}%`;

                if (negative)
                {
                    if (score > 0)
                    {
                        if ((i > 11) && (i < (12 + score)))
                        {
                            segment.style.backgroundColor = barColor;
                            if (i == 12)
                            {
                                segment.style.borderLeft = "3px solid black"
                            }
                        }
                    }
                    else if (score < 0)
                    {
                        const minIndex = 12 + score-1;
                        if ((i > minIndex) && (i < 12))
                        {
                            segment.style.backgroundColor = barColor;
                            if (i == 11)
                            {
                                segment.style.borderRight = "3px solid black"
                            }
                        }
                    }
                }
                else
                {
                    if (i < fullSegments) 
                    {
                        segment.style.backgroundColor = barColor;
                    } 
                    else if (i === semiSegmentIndex - 1) {
                        // segment.classList.add('semi-filled')
                        const rem = 100. * (segmentsPerScoreUnit * (score- min) - Math.floor(segmentsPerScoreUnit * (score- min)));
                        segment.style.background = `linear-gradient(to right, ${barColor} ${rem}%, transparent 50%)`;
                    }
                }
                


                bar.appendChild(segment);
            }

            // Intervals
            let intervalsDiv;
            if (intervals)
            {
                intervalsDiv = document.createElement("div");
                intervalsDiv.className = "intervals";

                intervals.forEach((interval, index) => {
                    const intervalMark = document.createElement("div");
                    intervalMark.className = "interval-mark";
                    intervalMark.textContent = interval + " ";

                    if (shortLabels)
                    {
                        intervalMark.style.fontSize = "8px";
                    }

                    let leftPercent = null;
                    let rightPercent = null;
                    let centerPercent = null;

                    if (index === 0)
                    {
                        intervalMark.style.color = colors[0];
                    }
                    else if (index === intervals.length-1)
                    {
                        intervalMark.style.color = colors[colors.length-1];
                    }
                    else
                    {
                        intBeforeBracket = extractIntegerBeforeBracket(interval);
                            textBeforeBracket = intBeforeBracket.toString();
                            intervalMark.innerHTML = `
                            <span style="color: ${colors[index-1]};">${textBeforeBracket}]</span>
                            <span style="color: ${colors[index]};">${interval.slice(textBeforeBracket.length + 1)} </span>
                        `;
                    }
                    
                    if (index === 0) {
                        leftPercent = 0;
                    } else if (index === intervals.length-1) {
                        rightPercent = 0;
                    } else {
                        const firstInt = extractIntegerBeforeBracket(interval);
                        centerPercent = ((segmentsPerScoreUnit * (firstInt-min)) / nbOfSegments) * 100;
                    }

                    if (leftPercent !== null) {
                        intervalMark.style.left = `${leftPercent}%`;
                    }
                    if (rightPercent !== null) {
                        intervalMark.style.right = `${rightPercent}%`;
                    }
                    if (centerPercent !== null) {
                        intervalMark.style.left = `${centerPercent}%`;
                        intervalMark.style.transform = 'translateX(-50%)';
                    }

                    intervalsDiv.appendChild(intervalMark);
                });
            }
            
            barContainer.appendChild(bar);
            if (intervals)
            {
                barContainer.appendChild(intervalsDiv);
            }
            row.appendChild(barContainer);

            // Score
            const scoreDiv = document.createElement("div");
            scoreDiv.className = "score";
            scoreDiv.textContent = score;
            row.appendChild(scoreDiv);

            chartContainer.appendChild(row);
        });

        if (legend && legend.length > 0)
        {
            const legendElement = document.createElement('div');
            legendElement.className = 'chart-legend';
            legendElement.innerHTML = colors.map((color, index) => 
                    `<span style="color: ${color}">${legend[index]}</span>`
                ).join(' ⇒ ');
            chartSuperContainer.appendChild(legendElement);
        }
    }

    function computeSurvey1Scores()
    {
        const answers = [];
        for (let i = 1; i <= 80; i++) {
            const radios = document.getElementsByName(`q${i}`);
            for (const radio of radios) {
                if (radio.checked) {
                    answers.push(radio.value);
                    break;
                }
            }
        }

        if (answers.length < 80) {
            alert("Пожалуйста, ответьте на все вопросы.");
            return;
        }

        const radicalsYes = [
            [9, 33, 41, 57, 65], // Шизоидный радикал
            [10, 26, 42, 50, 58], // Паранойяльный радикал
            [11, 35, 43, 67, 75], // Психастенический радикал
            [4, 12, 28, 44, 68], // Эксплозивный радикал
            [21, 37, 53, 69, 77], // Субдепрессивный радикал
            [6, 14, 46, 70, 78], // Гипертимический радикал
            [31, 47, 55, 63, 79], // Астенический радикал
            [8, 40, 56, 64, 72] // Истероидный радикал
        ];

        const radicalsNo = [
            [1, 17, 25, 49, 73], // Шизоидный радикал
            [2, 18, 34, 66, 74], // Паранойяльный радикал
            [3, 19, 27, 43, 51, 59], // Психастенический радикал
            [20, 36, 52, 60, 76], // Эксплозивный радикал
            [5, 13, 29, 45, 61], // Субдепрессивный радикал
            [22, 30, 38, 54, 62], // Гипертимический радикал
            [7, 15, 23, 39, 71], // Астенический радикал
            [16, 24, 32, 48, 80] // Истероидный радикал
        ];

        // Initialize scores array
        const scores = Array(radicalsYes.length).fill(0);

        // Calculate scores
        for (let i = 0; i < radicalsYes.length; i++) {
            // Count "Yes" answers for the current radical
            radicalsYes[i].forEach(q => {
                if (answers[q - 1] === "1") {
                    scores[i]++;
                }
            });

            // Count "No" answers for the current radical
            radicalsNo[i].forEach(q => {
                if (answers[q - 1] === "0") {
                    scores[i]++;
                }
            });
        }

        return scores;
    }

    function getUserSurvey1Records(radicalScores)
    {
        return new Map([
            ["Шизоидный радикал", radicalScores[0]],
            ["Паранойяльный радикал", radicalScores[1]],
            ["Психастенический радикал", radicalScores[2]],
            ["Эксплозивный радикал", radicalScores[3]],
            ["Субдепрессивный радикал", radicalScores[4]],
            ["Гипертимический радикал", radicalScores[5]],
            ["Астенический радикал", radicalScores[6]],
            ["Истероидный радикал", radicalScores[7]]
        ]);
    }


    function getUserSurvey1ScoresCode(radicalScores)
    {
        const charString = radicalScores.map(score => String.fromCharCode('A'.charCodeAt(0) + score-1)).join('');
        
        const sumOfScores = radicalScores.reduce((sum, score) => sum + score, 0); // Sum of the list
        const multiplied = sumOfScores * 2; // Multiply the sum by 2
        const remainder = multiplied % 10; // Get the remainder of division by 10
        const resultingChar = String.fromCharCode('H'.charCodeAt(0) + remainder); // Add remainder to 'H'

        return charString + 'A' + resultingChar;
    }

    computeBtn.addEventListener("click", () => {
        try {
            // Validate the survey before generating the chart
            validateSurvey(survey1);
        } catch (error) {
            // Show an error message
            showError("Пожалуйста, ответьте на все вопросы, что бы увидеть Ваши результаты");
            return;
        }

        let radicalScores = computeSurvey1Scores();
        const data = [
            { label: "Шизоидный", score: radicalScores[0], intervals: ["[0", "3][4", "6][7", "8][9", "10]"] },
            { label: "Паранойяльный", score: radicalScores[1], intervals: ["[0", "2][3", "6][7", "8][9", "10]"] },
            { label: "Психастенический", score: radicalScores[2], intervals: ["[0", "2][3", "4][5", "7][8", "10]"] },
            { label: "Эксплозивный", score: radicalScores[3], intervals: ["[0", "2][3", "5][6", "7][8", "10]"] },
            { label: "Субдепрессивный", score: radicalScores[4], intervals: ["[0", "1][2", "4][5", "7][8", "10]"] },
            { label: "Гипертимический", score: radicalScores[5], intervals: ["[0", "1][2", "5][6", "7][8", "10]"] },
            { label: "Астенический", score: radicalScores[6], intervals: ["[0", "2][3", "6][7", "8][9", "10]"] },
            { label: "Истероидный", score: radicalScores[7], intervals: ["[0", "1][2", "5][6", "7][8", "10]"] }
        ];

        fillChart(chartContainer, data, 
            {
                title: "Выраженность радикалов",
                colors: ['#6CF', '#39F', '#36C', '#00C'],
                legend: ['ниже ср.', 'средняя', 'выше ср.', 'акцентуация'],
                nbOfSegments: 25
            });

        chartInfo.style.display = ''
        chartInfo.classList.remove("hidden");
        chartContainer.style.display = ''
        chartContainer.classList.remove("hidden");
        chartSummary.style.display = ''
        chartSummary.classList.remove("hidden");

        disableSurveyAnswering(survey1);
        survey1ResultsComputed = true;

        computeBtn.classList.add("hidden");

        (async () => {
            const userQuestionnaireRecord = getUserQuestionnaireRecord();
            const userTechnicalRecord = await getUserTechnicalRecord();
            const userSurvey1Records = getUserSurvey1Records(radicalScores);
            const survey1Code = getUserSurvey1ScoresCode(radicalScores);

            const userRecord = new Map([...userTechnicalRecord, ...userQuestionnaireRecord, ...userSurvey1Records]);

            const timestamp = Date.now();
            const filename = `res/s1/${userTechnicalRecord.get("Пользователь")}-${survey1Code}-${sessionStartTime.toString()}-${timestamp.toString()}`;
            await saveRecord(filename, JSON.stringify(Object.fromEntries(userRecord), null, 2));

            await checkSurveysAsync();
        })();
    });

    function computeSurvey2Scores()
    {
        // Define the scales using lists
        const scaleQuestions = [
            [2, 4, 11, 21, 25, 33], // Бессмысленность социальных связей
            [3, 7, 15, 28, 31, 32], // Неудовлетворенность собой
            [10, 14, 19, 23, 26, 34],   // Неудовлетворенность своим
            [5, 9, 17, 20, 27, 35], // Одиночество
            [6, 12, 18, 22, 29, 36],// Незащищенность
            [1, 8, 13, 16, 24, 30]  // Отчаяние, страх и чувство вины
        ];

        let results = Array(scaleQuestions.length).fill(0); // Initialize results array with 0s

        // Iterate through each scale and its corresponding questions
        scaleQuestions.forEach((questions, scaleIndex) => {
            questions.forEach(questionNumber => {
                const questionName = `s2q${questionNumber}`;
                const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
                if (selectedOption) {
                    results[scaleIndex] += parseInt(selectedOption.value, 10);
                }
            });
        });

        return results;
    }

    function getUserSurvey2Records(scores)
    {
        return new Map([
            ["Бессмысленность социальных связей", scores[0]],
            ["Неудовлетворенность собой", scores[1]],
            ["Неудовлетворенность своим настоящим", scores[2]],
            ["Одиночество", scores[3]],
            ["Незащищенность", scores[4]],
            ["Отчаяние, страдание и чувство вины", scores[5]]
        ]);
    }

    function getUserSurvey2ScoresCode(scores)
    {
        const charString = scores.map(score => {
            if (score > 0) {
                return String.fromCharCode('A'.charCodeAt(0) + score - 1);
            } else if (score < 0){
                return String.fromCharCode('a'.charCodeAt(0) + Math.abs(score) - 1);
            }
            else{
                return 'o';
            }
        }).join('');
        
        const sumOfScores = scores.reduce((sum, score) => sum + score, 0); // Sum of the list
        const multiplied = sumOfScores * 2; // Multiply the sum by 2
        const remainder = multiplied % 10; // Get the remainder of division by 10
        const resultingChar = String.fromCharCode('O'.charCodeAt(0) + remainder);

        return charString + 'B' + resultingChar;
    }

    computeBtn2.addEventListener("click", () => {
        try {
            // Validate the survey before generating the chart
            validateSurvey(survey2);
        } catch (error) {
            // Show an error message
            showError("Пожалуйста, ответьте на все вопросы, что бы увидеть Ваши результаты");
            return;
        }

        const scores = computeSurvey2Scores();
        const data = [
            { label: "Бессмысленность социальных связей", score: scores[0] },
            { label: "Неудовлетворенность собой", score: scores[1] },
            { label: "Неудовлетворенность своим настоящим", score: scores[2] },
            { label: "Одиночество", score: scores[3] },
            { label: "Незащищенность", score: scores[4] },
            { label: "Отчаяние, страдание и чувство вины", score: scores[5] }
        ];

        fillChart(chartContainer2, data, 
            {
                colors: ['green', 'olive', 'crimson'],
                legend: ['низкий', 'средний', 'высокий уровень'], 
                sharedIntervals: ["[-12", "-6][-5", "0][1", "12]"],
                nbOfSegments: 24,
                negative: true
            });


        chartInfo2.style.display = ''
        chartInfo2.classList.remove("hidden");
        chartContainer2.style.display = ''
        chartContainer2.classList.remove("hidden");
        chartSummary2.style.display = ''
        chartSummary2.classList.remove("hidden");

        disableSurveyAnswering(survey2);
        survey2ResultsComputed = true;

        // Hide the Compute button
        computeBtn2.classList.add("hidden");

        (async () => {
            const userQuestionnaireRecord = getUserQuestionnaireRecord();
            const userTechnicalRecord = await getUserTechnicalRecord();
            const userSurvey2Records = getUserSurvey2Records(scores);
            const survey2Code = getUserSurvey2ScoresCode(scores);

            const userRecord = new Map([...userTechnicalRecord, ...userQuestionnaireRecord, ...userSurvey2Records]);

            const timestamp = Date.now();
            const filename = `res/s2/${userTechnicalRecord.get("Пользователь")}-${survey2Code}-${sessionStartTime.toString()}-${timestamp.toString()}`;
            await saveRecord(filename, JSON.stringify(Object.fromEntries(userRecord), null, 2));

            await checkSurveysAsync();
        })();
    });

    // Function to calculate scores for all scales
    function computeSurvey3Scores() {
        // Define the scales as a list of question arrays
        const scales = [
            [2, 12, 7, 17], // Бог
            [1, 6, 11, 16], // Трансцендентность
            [5, 10, 15],    // Человечество
            [4, 9, 14],     // Природа
            [3, 8, 13, 18]  // Самость
        ];

        // Initialize scores for each scale
        const scores = Array(scales.length).fill(0);

        // Loop through each scale
        scales.forEach((questions, scaleIndex) => {
            questions.forEach(question => {
                // Get the selected radio input for the current question
                const selectedInput = document.querySelector(`input[name="s3q${question}"]:checked`);
                if (selectedInput) {
                    // Add the value to the corresponding scale
                    scores[scaleIndex] += parseInt(selectedInput.value, 10);
                }
            });
        });

        return scores;
    }

    function getUserSurvey3Records(scores)
    {
        return new Map([
            ["Бог", scores[0]],
            ["Трансцендентность", scores[1]],
            ["Человечество", scores[2]],
            ["Природа", scores[3]],
            ["Самость", scores[4]]
        ]);
    }


    function getUserSurvey3ScoresCode(scores)
    {
        const charString = scores.map(score => {
            let roundScore = Math.round(score);
            if (roundScore > 0) {
                return String.fromCharCode('A'.charCodeAt(0) + roundScore - 1);
            }
            else{
                return 'O';
            }
        }).join('');

        const sumOfScores = scores.reduce((sum, score) => sum + score, 0); // Sum of the list
        const multiplied = sumOfScores * 2; // Multiply the sum by 2
        const remainder = multiplied % 10; // Get the remainder of division by 10
        const resultingChar = String.fromCharCode('O'.charCodeAt(0) + Math.round(remainder)); // Add remainder to 'H'

        return charString + 'C' + resultingChar;
    }

    computeBtn3.addEventListener("click", () => {
        try {
            // Validate the survey before generating the chart
            validateSurvey(survey3);
        } catch (error) {
            // Show an error message
            showError("Пожалуйста, ответьте на все вопросы, что бы увидеть Ваши результаты");
            return;
        }

        const scores = computeSurvey3Scores();
        const data = [
            { label: "Бог", score: scores[0], intervals: ["[4", "20]"] },
            { label: "Трансцендентность", score: scores[1], intervals: ["[4", "20]"] },
            { label: "Человечество", score: scores[2], intervals: ["[3", "15]"] },
            { label: "Природа", score: scores[3], intervals: ["[3", "15]"] },
            { label: "Самость", score: scores[4], intervals: ["[4", "20]"] }
        ];

        fillChart(chartContainer3, data, 
            {
                colors: ['#008080'],
                nbOfSegments: 25
            });


        chartInfo3.style.display = ''
        chartInfo3.classList.remove("hidden");
        chartContainer3.style.display = ''
        chartContainer3.classList.remove("hidden");
        chartSummary3.style.display = ''
        chartSummary3.classList.remove("hidden");

        disableSurveyAnswering(survey3);
        survey3ResultsComputed = true;

        // Hide the Compute button
        computeBtn3.classList.add("hidden");

        (async () => {
            const userQuestionnaireRecord = getUserQuestionnaireRecord();
            const userTechnicalRecord = await getUserTechnicalRecord();
            const userSurvey3Records = getUserSurvey3Records(scores);
            const survey3Code = getUserSurvey3ScoresCode(scores);

            const userRecord = new Map([...userTechnicalRecord, ...userQuestionnaireRecord, ...userSurvey3Records]);

            const timestamp = Date.now();
            const filename = `res/s3/${userTechnicalRecord.get("Пользователь")}-${survey3Code}-${sessionStartTime.toString()}-${timestamp.toString()}`;
            await saveRecord(filename, JSON.stringify(Object.fromEntries(userRecord), null, 2));

            await checkSurveysAsync();
        })();
    });


    // Function to get the value of a specific question from the DOM
    function getSurvey4Response(questionNumber) {
        const selector = `input[name="s4q${questionNumber}"]:checked`;
        const selectedOption = document.querySelector(selector);
        return selectedOption ? parseInt(selectedOption.value, 10) : 0; // Default to 0 if not answered
    }

    // Function to compute scores per category
    function computeSurvey4Scores() {
        // Define the keys for each category
        const depressionKeys = [3, 5, 10, 13, 16, 17, 21];
        const anxietyKeys = [2, 4, 7, 9, 15, 19, 20];
        const stressKeys = [1, 6, 8, 11, 12, 14, 18];

        // Initialize scores
        let depressionScore = 0;
        let anxietyScore = 0;
        let stressScore = 0;

        // Sum up scores for each category by fetching directly from DOM
        depressionKeys.forEach(key => {
            depressionScore += getSurvey4Response(key);
        });

        anxietyKeys.forEach(key => {
            anxietyScore += getSurvey4Response(key);
        });

        stressKeys.forEach(key => {
            stressScore += getSurvey4Response(key);
        });

        // Return the computed scores
        return [stressScore, anxietyScore, depressionScore];
    }

    function getUserSurvey4Records(scores)
    {
        return new Map([
            ["Стресс", scores[0]],
            ["Тревога", scores[1]],
            ["Депрессия", scores[2]]
        ]);
    }

    function getUserSurvey4ScoresCode(scores)
    {
        const charString = scores.map(score => {
            if (score > 0) {
                return String.fromCharCode('A'.charCodeAt(0) + score - 1);
            }
            else{
                return 'o';
            }
        }).join('');
        
        const sumOfScores = scores.reduce((sum, score) => sum + score, 0); // Sum of the list
        const multiplied = sumOfScores * 2; // Multiply the sum by 2
        const remainder = multiplied % 10; // Get the remainder of division by 10
        const resultingChar = String.fromCharCode('C'.charCodeAt(0) + remainder); // Add remainder to 'H'

        return charString + 'D' + resultingChar;
    }

    computeBtn4.addEventListener("click", () => {
        try {
            // Validate the survey before generating the chart
            validateSurvey(survey4);
        } catch (error) {
            // Show an error message
            showError("Пожалуйста, ответьте на все вопросы, что бы увидеть Ваши результаты");
            return;
        }

        const scores = computeSurvey4Scores();
        const data = [
            { label: "Стресс", score: scores[0], intervals: ["[0", "7][8", "9][10", "12][13", "16][17", "21]"] },
            { label: "Тревога", score: scores[1], intervals: ["[0", "3][4", "5][6", "7][8", "9][10", "21]"]  },
            { label: "Депрессия", score: scores[2], intervals: ["[0", "4][5", "6][7", "10][11", "13][14", "21]"] }
        ];

        fillChart(chartContainer4, data, 
            {
                colors: ['green', 'olive', 'orange', 'crimson', 'red'],
                legend: ['норма ', 'низкий', 'умеренный', 'высокий', 'очень высокий уровень'],
                nbOfSegments: 32,
                shortLabels: true
            });


        // Show the chart container
        chartInfo4.style.display = ''
        chartInfo4.classList.remove("hidden");
        chartContainer4.style.display = ''
        chartContainer4.classList.remove("hidden");
        chartSummary4.style.display = ''
        chartSummary4.classList.remove("hidden");

        disableSurveyAnswering(survey4);
        survey4ResultsComputed = true;

        // Hide the Compute button
        computeBtn4.classList.add("hidden");

        (async () => {
            const userQuestionnaireRecord = getUserQuestionnaireRecord();
            const userTechnicalRecord = await getUserTechnicalRecord();
            const userSurvey4Records = getUserSurvey4Records(scores);
            const survey4Code = getUserSurvey4ScoresCode(scores);

            const userRecord = new Map([...userTechnicalRecord, ...userQuestionnaireRecord, ...userSurvey4Records]);

            const timestamp = Date.now();
            const filename = `res/s4/${userTechnicalRecord.get("Пользователь")}-${survey4Code}-${sessionStartTime.toString()}-${timestamp.toString()}`;
            await saveRecord(filename, JSON.stringify(Object.fromEntries(userRecord), null, 2));

            await checkSurveysAsync();
        })();
    });
    
    function computeSurvey5Scores() {
        // Question groups for each category
        const desubjectivation = [2, 4, 6, 7, 8, 16];
        const disintegration = [3, 10, 11, 15];
        const semanticDysregulation = [1, 5, 9, 12, 13, 14];
        const allQuestions = Array.from({length: 16}, (_, i) => i + 1);

        // Function to get the selected value for a question
        function getSelectedValue(questionNumber) {
            const radios = document.getElementsByName(`s5q${questionNumber}`);
            for (const radio of radios) {
                if (radio.checked) {
                    return parseInt(radio.value, 10);
                }
            }
            return 0; // Default if no selection
        }

        // Calculate the sum of scores for a given group of questions
        function calculateGroupScore(questions) {
            return questions.reduce((sum, question) => sum + getSelectedValue(question), 0);
        }

        // Compute scores for each category
        return [
            calculateGroupScore(desubjectivation),
            calculateGroupScore(disintegration),
            calculateGroupScore(semanticDysregulation),
            calculateGroupScore(allQuestions)];
    };

    function getUserSurvey5Records(scores)
    {
        return new Map([
            ["Десубъектизация личности", scores[0]],
            ["Дезинтеграция жизнедеятельности", scores[1]],
            ["Смысловая дизрегуляция", scores[2]],
            ["Общий уровень СЖК", scores[3]]
        ]);
    }

    function getUserSurvey5ScoresCode(scores)
    {
        const charString = scores.map((score, index, array) => {
            if (index === array.length - 1) {
                // Special rule for the last element
                return String(score)
                    .split('') // Split the number into individual digits
                    .map(digit => String.fromCharCode('A'.charCodeAt(0) + parseInt(digit) - 1)) // Convert each digit to a character
                    .join(''); // Join characters for the last element
            } else {
                // Normal processing for other elements
                return String.fromCharCode('A'.charCodeAt(0) + score - 1);
            }
        }).join('');
        
        const sumOfScores = scores.reduce((sum, score) => sum + score, 0); // Sum of the list
        const multiplied = sumOfScores * 2; // Multiply the sum by 2
        const remainder = multiplied % 10; // Get the remainder of division by 10
        const resultingChar = String.fromCharCode('K'.charCodeAt(0) + remainder); // Add remainder to 'H'

        return charString + 'E' + resultingChar;
    }

    computeBtn5.addEventListener("click", () => {
        try {
            // Validate the survey before generating the chart
            validateSurvey(survey5);
        } catch (error) {
            // Show an error message
            showError("Пожалуйста, ответьте на все вопросы, что бы увидеть Ваши результаты");
            return;
        }

        const scores = computeSurvey5Scores();
        const data = [
            { label: "Десубъектизация личности", score: scores[0], intervals: ["[6", "24]"] },
            { label: "Дезинтеграция жизнедеятельности", score: scores[1], intervals: ["[4", "16]"] },
            { label: "Смысловая дизрегуляция", score: scores[2], intervals: ["[6", "24]"] },
            { label: "Общий уровень СЖК", score: scores[3], intervals: ["[16", "64]"] },
        ];

        fillChart(chartContainer5, data, 
            {
                colors: ['#008080'],
                nbOfSegments: 20
            });


        // Show the chart container
        chartInfo5.style.display = ''
        chartInfo5.classList.remove("hidden");
        chartContainer5.style.display = ''
        chartContainer5.classList.remove("hidden");
        chartSummary5.style.display = ''
        chartSummary5.classList.remove("hidden");

        disableSurveyAnswering(survey5);
        survey5ResultsComputed = true;

        // Hide the Compute button
        computeBtn5.classList.add("hidden");

        (async () => {
            const userQuestionnaireRecord = getUserQuestionnaireRecord();
            const userTechnicalRecord = await getUserTechnicalRecord();
            const userSurvey5Records = getUserSurvey5Records(scores);
            const survey5Code = getUserSurvey5ScoresCode(scores);

            const userRecord = new Map([...userTechnicalRecord, ...userQuestionnaireRecord, ...userSurvey5Records]);

            const timestamp = Date.now();
            const filename = `res/s5/${userTechnicalRecord.get("Пользователь")}-${survey5Code}-${sessionStartTime.toString()}-${timestamp.toString()}`;
            await saveRecord(filename, JSON.stringify(Object.fromEntries(userRecord), null, 2));

            await checkSurveysAsync();
        })();
    });

    function getFirstNonEmptyLine(text) {
        // Split the text by newline characters and find the first non-empty line
        const lines = text.split('\n').filter(line => line.trim() !== '');
        return lines[0] || ''; // Return the first non-empty line or an empty string if none exist
    }

    function removeNonEmptyLinesAndTrim(text) {
        if (!text.includes('\n')) {
            return text.trim(); // Trim and return the single line
        }

        const result = text
            .split('\n')        // Split into lines
            .filter(line => line.trim() !== '') // Keep only empty or whitespace-only lines
            .map(line => line.trim()); // Trim each line
        
        return result[0]
    }

    async function getUID() {
        try {
            const fjs = await loadFJS();
            const fp = await fjs.load();
            const result = await fp.get();

            return result.visitorId;
        } catch (error) {
            return null;
        }
    
        return null;
    }

    function processCopyButtonClick()
    {
        // Create a temporary string to hold the questions and answers
        let resultString = "";

        

        // Select all question groups
        const questionGroups = document.querySelectorAll(".question-group");

        questionGroups.forEach((group) => {
            // Find the question text
            const question = removeNonEmptyLinesAndTrim(group.querySelector("p")?.innerText || group.querySelector("label")?.innerText);

            // Find checked inputs or text inputs within this group
            const checkedInput = group.querySelector("input:checked:not([type='checkbox'])"); // Ignore checkboxes
            const textInput = group.querySelector("input[type='text']");

            let answer = null;

            // Determine the answer based on input type
            if (checkedInput) {
                answer = checkedInput.nextSibling.textContent.trim(); // Get label text for checked inputs
            } else if (textInput && textInput.value.trim() !== "") {
                answer = getFirstNonEmptyLine(textInput.value.trim()).trim(); // Get value of the text input
            }

            // If a question and answer exist, add them to the result string
            if (question && answer) {
                resultString += `${question}\n${answer}\n`;
            }

            const checkboxes = group.querySelectorAll("input[type='checkbox']");
            checkboxes.forEach((checkbox) => {
                const checkboxLabel = removeNonEmptyLinesAndTrim(checkbox.nextSibling.textContent); // Get label text for checkboxes
                if (checkbox.checked) {
                    resultString += `${checkboxLabel}\n-on\n`; // Add -on for checked checkboxes
                } else {
                    resultString += `${checkboxLabel}\n-off\n`; // Add -off for non-checked checkboxes
                }
            });
        });

        
        (async () => {
            copyButton.removeEventListener("click", processCopyButtonClick);

            const uid = await getUID();
            let successful = false;

            if (uid)
            {
                const filename = `res/bkp/${uid}`;
                if (resultString)
                {
                    await saveRecord(filename, resultString);
                    const test = await loadRecord(filename);
                    if (test === resultString)
                    {
                        successful = true;
                        showInfo("Вашим ответам создана резервная копия");
                    }
                }
            }

            if (!successful)
            {
                showError("Невозможно создать резервную копию ответов")
            }

            copyButton.addEventListener("click", processCopyButtonClick);
        })();
    }

    copyButton.addEventListener("click", processCopyButtonClick);

    function fillFromText(resultString) {
        // Split the result string into individual lines
        const lines = resultString.trim().split("\n");
    
        // Process pairs of question and answer
        for (let i = 0; i < lines.length; i += 2) {
            const question = lines[i].trim(); // Question text
            const answer = lines[i + 1].trim(); // Answer text
    
            if (answer === "-on" || answer === "-off")
            {
                // Skip to the next pair if the label text doesn't exist
                if (!question) throw new Error(`Empty checkbox name`);;

                // Find the checkbox with the matching label
                const allCheckboxes = document.querySelectorAll("input[type='checkbox']");
                let matchingCheckbox = null;

                allCheckboxes.forEach((checkbox) => {
                    const checkboxLabel = checkbox.nextSibling?.textContent?.trim();
                    if (removeNonEmptyLinesAndTrim(checkboxLabel) === question) {
                        matchingCheckbox = checkbox;
                    }
                });

                // If a matching checkbox is found, update its state
                if (matchingCheckbox) {
                    if (!matchingCheckbox.disabled)
                    {
                        if (answer === "-on") {
                            matchingCheckbox.checked = true; // Enable the checkbox
                        } else if (answer === "-off") {
                            matchingCheckbox.checked = false; // Disable the checkbox
                        }
                    }
                } else {
                    throw new Error(`Checkbox with label "${question}" not found.`);
                }
            }
            else
            {
                // Find the question group matching this question
                const questionGroups = document.querySelectorAll(".question-group");
                let matchedGroup = null;
        
                questionGroups.forEach((group) => {
                    const groupQuestion = group.querySelector("p")?.innerText || group.querySelector("label")?.innerText;
        
                    // Match the question text
                    if (groupQuestion && removeNonEmptyLinesAndTrim(groupQuestion) === question) {
                        matchedGroup = group;
                    }
                });
        
                // If no matching question group is found, throw an error
                if (!matchedGroup) {
                    throw new Error(`Question group not found for: "${question}"`);
                }
        
                // Determine the type of input and try to set the answer
                const textInput = matchedGroup.querySelector("input[type='text']");
                if (textInput) {
                    // Set the value for text input
                    if (!textInput.disabled)
                    {
                        textInput.value = answer.trim();
                    }
                } else {
                    // Handle radio/checkbox inputs
                    const inputs = matchedGroup.querySelectorAll("input[type='radio'], input[type='checkbox']");
                    let matchedInput = false;
        
                    inputs.forEach((input) => {
                        const label = input.nextSibling.textContent.trim(); // Get the label text
                        if (label === answer.trim()) {
                            if (!input.disabled)
                            {
                                input.checked = true; // Select the matching option
                            }
                            matchedInput = true;
                        }
                    });
        
                    // If no matching input is found, throw an error
                    if (!matchedInput) {
                        throw new Error(`Answer "${answer}" could not be matched for question: "${question}"`);
                    }
                }
            }
        }
    }
    
    function processPasteButtonClick()
    {
        (async () => {
            pasteButton.removeEventListener("click", processPasteButtonClick);

            const uid = await getUID();
            let successful = false;

            if (uid)
            {
                const filename = `res/bkp/${uid}`;
                const resultString = await loadRecord(filename);
                if (resultString)
                {
                    try {
                        fillFromText(resultString.trim());
                        showInfo("Резервная копия была успешно использована");
                        successful = true;
                    } catch (error) {
                        showError("Резервная копия не может быть использована");
                    } 
                } 
            }

            if (!successful)
            {
                showError("Резервная копия недоступна")
            }

            pasteButton.addEventListener("click", processPasteButtonClick);
        })();
    }
    
    pasteButton.addEventListener("click", processPasteButtonClick);

    

    async function sendAllSurveysAsync() 
    {
        if (surveyOverallResultsWereSent)
        {
            return;
        }

        const userQuestionnaireRecord = getUserQuestionnaireRecord();
        const userTechnicalRecord = await getUserTechnicalRecord();

        const survey1Scores = computeSurvey1Scores();
        const survey2Scores = computeSurvey2Scores();
        const survey3Scores = computeSurvey3Scores();
        const survey4Scores = computeSurvey4Scores();
        const survey5Scores = computeSurvey5Scores();

        const userSurvey1Records = getUserSurvey1Records(survey1Scores);
        const userSurvey2Records = getUserSurvey2Records(survey2Scores);
        const userSurvey3Records = getUserSurvey3Records(survey3Scores);
        const userSurvey4Records = getUserSurvey4Records(survey4Scores);
        const userSurvey5Records = getUserSurvey5Records(survey5Scores);

        const survey1Code = getUserSurvey1ScoresCode(survey1Scores);
        const survey2Code = getUserSurvey2ScoresCode(survey2Scores);
        const survey3Code = getUserSurvey3ScoresCode(survey3Scores);
        const survey4Code = getUserSurvey4ScoresCode(survey4Scores);
        const survey5Code = getUserSurvey5ScoresCode(survey5Scores);

        const userRecord = new Map([...userTechnicalRecord, ...userQuestionnaireRecord
            , ...userSurvey1Records
            , ...userSurvey2Records
            , ...userSurvey3Records
            , ...userSurvey4Records
            , ...userSurvey5Records]);

        const timestamp = Date.now();
        const filename = `res/comp/${userTechnicalRecord.get("Пользователь")}-${survey1Code}-${survey2Code}-${survey5Code}-${survey3Code}-${survey4Code}-${sessionStartTime.toString()}-${timestamp.toString()}`;
        await saveRecord(filename, JSON.stringify(Object.fromEntries(userRecord), null, 2));

        const loadedJson = await loadRecord(filename);
        surveyOverallResultsWereSent =  loadedJson && loadedJson.length > 0;
    }

    sendResultsBtn.addEventListener("click", () => {
        try {
            validateSurvey(survey1);
            validateSurvey(survey2);
            validateSurvey(survey3);
            validateSurvey(survey4);
            validateSurvey(survey5);
        } catch (error) {
            // Show an error message
            showError("Пожалуйста, ответьте на все вопросы, прежде чем отправлять Ваши результаты");
            return;
        }

        sendResultsBtn.classList.add("hidden");

        (async () => {

            await sendAllSurveysAsync();

            disableSurveyAnswering(survey1);
            disableSurveyAnswering(survey2);
            disableSurveyAnswering(survey3);
            disableSurveyAnswering(survey4);
            disableSurveyAnswering(survey5);

            if (surveyOverallResultsWereSent)
            {
                showInfo("Ваши результаты были успешно отправлены");

                const pressToSendText = document.getElementById("press-to-send");
                pressToSendText.innerText = '';

                const sendFormTitle = document.getElementById("sendFormTitle");
                sendFormTitle.innerText = 'Ваши результаты были успешно отправлены';

                thankYouMessage.style.display = ''
                thankYouMessage.classList.remove("hidden");
            }
            else {
                showError("Ваши результаты не удалось отправить");
                sendResultsBtn.classList.remove("hidden");
            }
        })();
    });

});
