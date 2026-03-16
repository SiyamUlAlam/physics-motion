/* ============================================================================
   JAVASCRIPT - Motion Physics Educational Website - ENHANCED VERSION 2.0
   
   ✅ IMPROVEMENTS IN THIS VERSION:
   - Fixed Quiz System with visible Next/Previous buttons
   - Enhanced Simulations with numerical value displays
   - 3 New Simulations Added (Acceleration, Vertical Throw, Constant Speed)
   - Easy Teacher Guide for Adding Questions
   - Clear Mode Indicators and Documentation
   
   TEACHER GUIDE - ADDING NEW QUESTIONS:
   1. Scroll down to the quizData array (around line 400)
   2. Add a new object following this format:
   {
       question: "Your question in Bengali?",
       options: ["Option 1", "Option 2", "Option 3", "Option 4"],
       correct: 0  // 0-3 index of correct answer
   }
   3. Save and refresh the page - new question appears automatically!
   
   ========================================================================== */

// ============= (১) ডকুমেন্ট লোডিং এবং ইনিশিয়ালাইজেশন =============
document.addEventListener('DOMContentLoaded', function() {
    console.log('Physics Motion Website Loaded Successfully');
    
    // হ্যামবার্গার মেনু সেটাপ
    setupHamburgerMenu();
    
    // কুইজ প্রশ্ন লোড করা
    loadQuizQuestions();
    
    // স্মুথ স্ক্রলিং লিঙ্ক সেটাপ
    setupSmoothScrolling();
});

// ============= (২) নেভিগেশন এবং মেনু ফাংশন =============

/**
 * হ্যামবার্গার মেনু টগল করার ফাংশন
 * মোবাইল ডিভাইসে মেনু খোলা/বন্ধ করে
 */
function setupHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // মেনু আইটেম ক্লিক করলে মেনু বন্ধ করা
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

/**
 * স্মুথ স্ক্রলিং ফাংশন
 * হ্যাশ লিঙ্কে ক্লিক করলে মসৃণ স্ক্রলিং করে
 */
function smoothScroll(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * সমস্ত স্মুথ স্ক্রলিং লিঙ্ক সেটাপ করা
 */
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============= (৩) সিমুলেশন ফাংশন =============

/* --- সরলরেখীয় গতি সিমুলেশন --- */

let linearMotionInterval = null;
let linearPosition = 50;

/**
 * সরলরেখীয় গতি অ্যানিমেশন শুরু করা
 * নির্ধারিত গতিতে সফেরা চলতে থাকে
 */
function startLinearMotion() {
    const speedInput = document.getElementById('linear-speed');
    const speed = parseFloat(speedInput.value);
    
    // পূর্ববর্তী অ্যানিমেশন বন্ধ করা
    if (linearMotionInterval) clearInterval(linearMotionInterval);
    
    linearMotionInterval = setInterval(function() {
        linearPosition += speed * 0.5;
        
        // যখন গন্তব্যে পৌঁছায় তখন রিসেট করা
        if (linearPosition > 380) {
            linearPosition = 50;
        }
        
        const ball = document.getElementById('moving-ball');
        if (ball) {
            ball.setAttribute('cx', linearPosition);
        }
        
        // তথ্য আপডেট করা
        const infoElement = document.getElementById('linear-info');
        if (infoElement) {
            const distance = ((linearPosition - 50) / 330 * 100).toFixed(1);
            infoElement.textContent = `দূরত্ব: ${distance} মিটার`;
        }
    }, 50);
}

/**
 * সরলরেখীয় গতি রিসেট করা
 */
function resetLinearMotion() {
    if (linearMotionInterval) clearInterval(linearMotionInterval);
    linearPosition = 50;
    
    const ball = document.getElementById('moving-ball');
    if (ball) {
        ball.setAttribute('cx', linearPosition);
    }
    
    const infoElement = document.getElementById('linear-info');
    if (infoElement) {
        infoElement.textContent = 'অবস্থান: 0 মিটার';
    }
}

/* --- বৃত্তাকার গতি সিমুলেশন --- */

let circularMotionInterval = null;
let circularAngle = 0;

/**
 * বৃত্তাকার গতি অ্যানিমেশন শুরু করা
 * একটি সফেরা বৃত্তাকার পথে ঘোরে
 */
function startCircularMotion() {
    const speedInput = document.getElementById('circular-speed');
    const speed = parseFloat(speedInput.value);
    
    // পূর্ববর্তী অ্যানিমেশন বন্ধ করা
    if (circularMotionInterval) clearInterval(circularMotionInterval);
    
    circularMotionInterval = setInterval(function() {
        circularAngle += speed * 0.1;
        
        // ৩৬০ ডিগ্রির পর রিসেট করা
        if (circularAngle > 360) {
            circularAngle = 0;
        }
        
        // সাইন এবং কোসাইন ব্যবহার করে বৃত্তাকার অবস্থান হিসাব করা
        const radius = 50;
        const centerX = 100;
        const centerY = 90;
        const radian = (circularAngle * Math.PI) / 180;
        const x = centerX + radius * Math.cos(radian);
        const y = centerY + radius * Math.sin(radian);
        
        const ball = document.getElementById('rotating-ball');
        if (ball) {
            ball.setAttribute('cx', x);
            ball.setAttribute('cy', y);
        }
    }, 50);
}

/**
 * বৃত্তাকার গতি রিসেট করা
 */
function resetCircularMotion() {
    if (circularMotionInterval) clearInterval(circularMotionInterval);
    circularAngle = 0;
    
    const ball = document.getElementById('rotating-ball');
    if (ball) {
        ball.setAttribute('cx', 150);
        ball.setAttribute('cy', 90);
    }
}

/* --- পতনশীল বস্তু সিমুলেশন --- */

let fallingObjectInterval = null;
let fallingTime = 0;
let fallingDistance = 0;
const g = 10; // অভিকর্ষণ ত্বরণ (m/s²)

/**
 * পতনশীল বস্তু অ্যানিমেশন শুরু করা
 * h = ½gt² সূত্র ব্যবহার করে পতনের দূরত্ব হিসাব করা হয়
 */
function startFallingObject() {
    // পূর্ববর্তী অ্যানিমেশন বন্ধ করা
    if (fallingObjectInterval) clearInterval(fallingObjectInterval);
    
    fallingTime = 0;
    fallingDistance = 0;
    
    fallingObjectInterval = setInterval(function() {
        fallingTime += 0.05;
        
        // পতনের দূরত্ব: h = ½gt²
        fallingDistance = 0.5 * g * fallingTime * fallingTime;
        
        const circle = document.getElementById('falling-circle');
        if (circle) {
            const maxDistance = 150;
            if (fallingDistance > maxDistance) {
                clearInterval(fallingObjectInterval);
                fallingDistance = maxDistance;
            }
            circle.setAttribute('cy', 30 + fallingDistance);
        }
        
        // তথ্য আপডেট করা
        const infoElement = document.getElementById('falling-info');
        if (infoElement) {
            infoElement.textContent = `সময়: ${fallingTime.toFixed(2)} sec | দূরত্ব: ${fallingDistance.toFixed(2)} m`;
        }
    }, 50);
}

/**
 * পতনশীল বস্তু রিসেট করা
 */
function resetFallingObject() {
    if (fallingObjectInterval) clearInterval(fallingObjectInterval);
    fallingTime = 0;
    fallingDistance = 0;
    
    const circle = document.getElementById('falling-circle');
    if (circle) {
        circle.setAttribute('cy', 30);
    }
    
    const infoElement = document.getElementById('falling-info');
    if (infoElement) {
        infoElement.textContent = 'সময়: 0 sec | দূরত্ব: 0 m';
    }
}
/* --- নতুন: ত্বরণ সিমুলেশন --- */

let accelerationInterval = null;
let accelerationTime = 0;
let accelerationVelocity = 0;
let accelerationDistance = 0;

function startAccelerationMotion() {
    const accelInput = document.getElementById('accel-value');
    const accel = parseFloat(accelInput.value) || 2;
    
    if (accelerationInterval) clearInterval(accelerationInterval);
    accelerationTime = 0;
    accelerationVelocity = 0;
    accelerationDistance = 0;
    
    accelerationInterval = setInterval(function() {
        accelerationTime += 0.05;
        accelerationVelocity = accel * accelerationTime;
        accelerationDistance = 0.5 * accel * accelerationTime * accelerationTime;
        
        if (accelerationVelocity > 30) {
            clearInterval(accelerationInterval);
        }
        
        const box = document.getElementById('accel-box');
        if (box) {
            const movement = Math.min(accelerationDistance * 2, 320);
            box.setAttribute('x', 30 + movement);
        }
        
        const infoElement = document.getElementById('accel-info');
        if (infoElement) {
            infoElement.textContent = `সময়: ${accelerationTime.toFixed(2)}s | দূরত্ব: ${accelerationDistance.toFixed(2)}m | বেগ: ${accelerationVelocity.toFixed(2)}m/s | ত্বরণ: ${accel}m/s²`;
        }
    }, 50);
}

function resetAccelerationMotion() {
    if (accelerationInterval) clearInterval(accelerationInterval);
    accelerationTime = 0;
    accelerationVelocity = 0;
    accelerationDistance = 0;
    
    const box = document.getElementById('accel-box');
    if (box) {
        box.setAttribute('x', 30);
    }
    
    const infoElement = document.getElementById('accel-info');
    if (infoElement) {
        infoElement.textContent = 'সময়: 0s | দূরত্ব: 0m | বেগ: 0m/s | ত্বরণ: 0m/s²';
    }
}

/* --- নতুন: উর্ধ্বমুখী ফেনা সিমুলেশন --- */

let verticalThrowInterval = null;
let verticalTime = 0;

function startVerticalThrow() {
    const initialVelocity = 25;
    
    if (verticalThrowInterval) clearInterval(verticalThrowInterval);
    verticalTime = 0;
    
    verticalThrowInterval = setInterval(function() {
        verticalTime += 0.05;
        const verticalDistance = initialVelocity * verticalTime - 0.5 * g * verticalTime * verticalTime;
        const velocity = initialVelocity - g * verticalTime;
        
        if (verticalDistance < 0) {
            clearInterval(verticalThrowInterval);
        }
        
        const ball = document.getElementById('vertical-ball');
        if (ball) {
            ball.setAttribute('cy', 140 - verticalDistance * 1.5);
        }
        
        const infoElement = document.getElementById('vertical-info');
        if (infoElement) {
            infoElement.textContent = `সময়: ${verticalTime.toFixed(2)}s | উচ্চতা: ${verticalDistance.toFixed(2)}m | বেগ: ${velocity.toFixed(2)}m/s`;
        }
    }, 50);
}

function resetVerticalThrow() {
    if (verticalThrowInterval) clearInterval(verticalThrowInterval);
    verticalTime = 0;
    
    const ball = document.getElementById('vertical-ball');
    if (ball) {
        ball.setAttribute('cy', 140);
    }
    
    const infoElement = document.getElementById('vertical-info');
    if (infoElement) {
        infoElement.textContent = 'সময়: 0s | উচ্চতা: 0m | বেগ: 0m/s';
    }
}

/* --- নতুন: ধ্রুব গতি সিমুলেশন --- */

let constantSpeedInterval = null;
let constantTime = 0;
let constantDistance = 0;

function startConstantSpeed() {
    const speedInput = document.getElementById('const-speed');
    const speed = parseFloat(speedInput.value) || 3;
    
    if (constantSpeedInterval) clearInterval(constantSpeedInterval);
    constantTime = 0;
    constantDistance = 0;
    
    constantSpeedInterval = setInterval(function() {
        constantTime += 0.05;
        constantDistance = speed * constantTime;
        
        if (constantDistance > 100) {
            constantTime = 0;
            constantDistance = 0;
        }
        
        const ball = document.getElementById('const-ball');
        if (ball) {
            ball.setAttribute('cx', 30 + constantDistance * 2.5);
        }
        
        const infoElement = document.getElementById('const-info');
        if (infoElement) {
            infoElement.textContent = `সময়: ${constantTime.toFixed(2)}s | দূরত্ব: ${constantDistance.toFixed(2)}m | বেগ: ${speed}m/s (ধ্রুব)`;
        }
    }, 50);
}

function resetConstantSpeed() {
    if (constantSpeedInterval) clearInterval(constantSpeedInterval);
    constantTime = 0;
    constantDistance = 0;
    
    const ball = document.getElementById('const-ball');
    if (ball) {
        ball.setAttribute('cx', 30);
    }
    
    const infoElement = document.getElementById('const-info');
    if (infoElement) {
        infoElement.textContent = 'সময়: 0s | দূরত্ব: 0m | বেগ: 0m/s';
    }
}
// ============= (৪) কুইজ ফাংশন =============

// কুইজ প্রশ্ন এবং উত্তর ডেটা
const quizData = [
    {
        question: "গতি কী?",
        options: [
            "অবস্থানের পরিবর্তন",
            "সময়ের পরিবর্তন",
            "গতির পরিবর্তন",
            "ভরের পরিবর্তন"
        ],
        correct: 0
    },
    {
        question: "দূরত্ব এবং সরণের মধ্যে পার্থক্য কী?",
        options: [
            "কোনো পার্থক্য নেই",
            "দূরত্ব স্কেলার, সরণ ভেক্টর",
            "সরণ সবসময় দূরত্বের চেয়ে বড়",
            "দূরত্ব সরলরেখা, সরণ বক্ররেখা"
        ],
        correct: 1
    },
    {
        question: "দ্রুতি এর একক কী?",
        options: [
            "m/s²",
            "km/h",
            "m/s অথবা km/h উভয়ই",
            "মিটার"
        ],
        correct: 2
    },
    {
        question: "ত্বরণের সূত্র কোনটি?",
        options: [
            "a = v/t",
            "a = (v-u)/t",
            "a = s/t",
            "a = u/v"
        ],
        correct: 1
    },
    {
        question: "গতির প্রথম সমীকরণ কোনটি?",
        options: [
            "v² = u² + 2as",
            "v = u + at",
            "s = ut + ½at²",
            "v = s/t"
        ],
        correct: 1
    },
    {
        question: "মুক্তপতনে g এর মান প্রায় কত?",
        options: [
            "5 m/s²",
            "10 m/s²",
            "15 m/s²",
            "20 m/s²"
        ],
        correct: 1
    },
    {
        question: "নিম্নের মধ্যে কোনটি ভেক্টর রাশি?",
        options: [
            "দ্রুতি",
            "সময়",
            "বেগ",
            "দূরত্ব"
        ],
        correct: 2
    },
    {
        question: "একটি গাড়ি 100 m দূরত্ব 10 সেকেন্ডে অতিক্রম করলে দ্রুতি কত?",
        options: [
            "10 m/s",
            "5 m/s",
            "20 m/s",
            "1 m/s"
        ],
        correct: 0
    },
    {
        question: "পর্যায়ক্রমিক গতির উদাহরণ কোনটি?",
        options: [
            "গাড়ির গতি",
            "দোলনার গতি",
            "ফলের পতন",
            "ট্রেনের গতি"
        ],
        correct: 1
    },
    {
        question: "সরলরেখীয় গতির উদাহরণ কোনটি?",
        options: [
            "দোলনা",
            "পৃথিবীর গতি",
            "সাইকেলের গতি (সমতল রাস্তায়)",
            "বৈদ্যুতিক পাখা"
        ],
        correct: 2
    }
];

let currentQuestionIndex = 0;
let userAnswers = [];

/**
 * কুইজ প্রশ্ন লোড করা এবং প্রদর্শন করা
 */
function loadQuizQuestions() {
    const quizButton = document.querySelector('a[href="#quiz"]');
    if (quizButton) {
        // প্রথম প্রশ্ন লোড করার জন্য ট্রিগার যোগ করা
        document.addEventListener('scroll', function checkQuizSection() {
            const quizSection = document.getElementById('quiz');
            if (quizSection && quizSection.getBoundingClientRect().top < window.innerHeight) {
                if (userAnswers.length === 0) {
                    startQuiz();
                    document.removeEventListener('scroll', checkQuizSection);
                }
            }
        });
    }
}

/**
 * কুইজ শুরু করা
 */
function startQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    
    const quizContent = document.getElementById('quiz-content');
    const quizQuestions = document.getElementById('quiz-questions');
    const resultsSection = document.getElementById('quiz-results');
    const submitButton = document.getElementById('quiz-submit');
    
    if (quizQuestions) {
        quizQuestions.innerHTML = '';
        resultsSection.style.display = 'none';
        submitButton.style.display = 'block';
    }
    
    displayQuestion();
}

/**
 * বর্তমান প্রশ্ন প্রদর্শন করা
 */
function displayQuestion() {
    if (currentQuestionIndex >= quizData.length) {
        return;
    }
    
    const question = quizData[currentQuestionIndex];
    const quizQuestions = document.getElementById('quiz-questions');
    
    if (!quizQuestions) return;
    
    // প্রগতি আপডেট করা
    const progressHeader = document.getElementById('quiz-progress');
    if (progressHeader) {
        progressHeader.textContent = `প্রশ্ন ${currentQuestionIndex + 1} / ${quizData.length}`;
        const progressFill = document.getElementById('progress-fill');
        if (progressFill) {
            progressFill.style.width = ((currentQuestionIndex / quizData.length) * 100) + '%';
        }
    }
    
    // প্রশ্ন এবং অপশন তৈরি করা
    quizQuestions.innerHTML = '';
    
    const questionDiv = document.createElement('div');
    questionDiv.className = 'quiz-question';
    
    const questionP = document.createElement('p');
    questionP.textContent = question.question;
    questionDiv.appendChild(questionP);
    
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'quiz-options';
    
    question.options.forEach((option, index) => {
        const optionLabel = document.createElement('label');
        optionLabel.className = 'quiz-option';
        
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'answer' + currentQuestionIndex;
        radio.value = index;
        radio.onchange = function() {
            userAnswers[currentQuestionIndex] = index;
        };
        
        const labelText = document.createElement('label');
        labelText.textContent = option;
        labelText.style.margin = '0';
        
        optionLabel.appendChild(radio);
        optionLabel.appendChild(labelText);
        optionsDiv.appendChild(optionLabel);
    });
    
    questionDiv.appendChild(optionsDiv);
    
    // Add Navigation Buttons (NEW)
    const navButtons = document.createElement('div');
    navButtons.style.marginTop = '2rem';
    navButtons.style.display = 'flex';
    navButtons.style.gap = '1rem';
    navButtons.style.justifyContent = 'center';
    navButtons.style.flexWrap = 'wrap';
    
    if (currentQuestionIndex > 0) {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'btn btn-secondary';
        prevBtn.textContent = '◀ পূর্ববর্তী';
        prevBtn.onclick = previousQuestion;
        navButtons.appendChild(prevBtn);
    }
    
    if (currentQuestionIndex < quizData.length - 1) {
        const nextBtn = document.createElement('button');
        nextBtn.className = 'btn btn-primary';
        nextBtn.textContent = 'পরবর্তী ▶';
        nextBtn.onclick = nextQuestion;
        navButtons.appendChild(nextBtn);
    } else {
        const submitBtn = document.createElement('button');
        submitBtn.className = 'btn btn-primary';
        submitBtn.textContent = '✓ জমা দিন';
        submitBtn.onclick = submitQuiz;
        navButtons.appendChild(submitBtn);
    }
    
    questionDiv.appendChild(navButtons);
    quizQuestions.appendChild(questionDiv);
}

/**
 * কুইজ উত্তর জমা দেওয়া এবং পরবর্তী প্রশ্নে যাওয়া
 */
function nextQuestion() {
    if (userAnswers[currentQuestionIndex] === null || userAnswers[currentQuestionIndex] === undefined) {
        alert('এই প্রশ্নের উত্তর দিন!');
        return;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        displayQuestion();
    } else {
        showQuizResults();
    }
}

/**
 * কুইজের জন্য পূর্ববর্তী বোতাম
 */
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

/**
 * কুইজ জমা দেওয়া এবং ফলাফল প্রদর্শন করা
 */
function submitQuiz() {
    // সমস্ত প্রশ্নের উত্তর নিশ্চিত করা
    if (currentQuestionIndex === quizData.length - 1) {
        if (userAnswers[currentQuestionIndex] === null || userAnswers[currentQuestionIndex] === undefined) {
            alert('এই প্রশ্নের উত্তর দিন!');
            return;
        }
        showQuizResults();
    } else {
        alert('সকল প্রশ্নের উত্তর দিন!');
    }
}

/**
 * কুইজের ফলাফল প্রদর্শন করা
 */
function showQuizResults() {
    // স্কোর গণনা করা
    let correctAnswers = 0;
    for (let i = 0; i < quizData.length; i++) {
        if (userAnswers[i] === quizData[i].correct) {
            correctAnswers++;
        }
    }
    
    const score = (correctAnswers / quizData.length * 100).toFixed(1);
    
    // ফলাফল প্রদর্শন করা
    const quizQuestionsSection = document.getElementById('quiz-questions');
    const resultsSection = document.getElementById('quiz-results');
    const submitButton = document.getElementById('quiz-submit');
    const scoreDisplay = document.getElementById('score-display');
    
    if (quizQuestionsSection) quizQuestionsSection.style.display = 'none';
    if (resultsSection) resultsSection.style.display = 'block';
    if (submitButton) submitButton.style.display = 'none';
    
    if (scoreDisplay) {
        scoreDisplay.innerHTML = `
            <h2>${score}%</h2>
            <p>${correctAnswers} / ${quizData.length} সঠিক উত্তর</p>
            <p>${score >= 80 ? '🎉 দুর্দান্ত!' : score >= 60 ? '👍 ভালো!' : '💪 আরও চেষ্টা করুন!'}</p>
        `;
    }
}

// ============= (৫) বিস্তারিত মডাল ফাংশন =============

/**
 * বিষয়ের বিস্তারিত মডাল দেখানো
 */
function showDetail(detailId) {
    const detailContent = getDetailContent(detailId);
    const modal = document.getElementById('detail-modal');
    const modalBody = document.getElementById('modal-body');
    
    if (modalBody) {
        modalBody.innerHTML = detailContent;
        modal.style.display = 'block';
    }
}

/**
 * বিস্তারিত বিষয়বস্তু সংজ্ঞায়িত করা
 */
function getDetailContent(detailId) {
    const details = {
        'rest_motion': `
            <h2>স্থিতি ও গতি - বিস্তারিত</h2>
            <h3>স্থিতি (Rest)</h3>
            <p>যখন কোনো বস্তুর অবস্থান সময়ের সাথে পরিবর্তিত হয় না, তখন তাকে স্থিতিশীল বলা হয়।</p>
            <h3>গতি (Motion)</h3>
            <p>যখন কোনো বস্তুর অবস্থান ক্রমাগত সময়ের সাথে পরিবর্তিত হয়, তখন তাকে গতিশীল বলা হয়।</p>
            <h3>প্রধান পয়েন্ট:</h3>
            <ul>
                <li>স্থিতি এবং গতি আপেক্ষিক ধারণা</li>
                <li>একটি নির্দিষ্ট মানদণ্ড প্রয়োজন</li>
                <li>একই বস্তু বিভিন্ন মানদণ্ডে স্থিতি বা গতিশীল হতে পারে</li>
            </ul>
        `,
        'types_motion': `
            <h2>বিভিন্ন প্রকার গতি</h2>
            <h3>1. সরলরেখীয় গতি</h3>
            <p>যখন কোনো বস্তু একটি সরল রেখায় চলে।</p>
            <p>উদাহরণ: সাইকেল, ট্রেন, গাড়ি</p>
            
            <h3>2. বৃত্তাকার গতি</h3>
            <p>যখন কোনো বস্তু একটি বৃত্তের পথে চলে।</p>
            <p>উদাহরণ: চাকা, পৃথিবীর কক্ষপথ</p>
            
            <h3>3. পর্যায়ক্রমিক বা কম্পন গতি</h3>
            <p>যখন কোনো বস্তু একটি নির্দিষ্ট পয়েন্টের চারপাশে পুনরাবৃত্তিমূলকভাবে চলে।</p>
            <p>উদাহরণ: দোলনা, বৈদ্যুতিক পাখা</p>
        `,
        'scalar_vector': `
            <h2>স্কেলার ও ভেক্টর রাশি</h2>
            <h3>স্কেলার রাশি</h3>
            <ul>
                <li>শুধুমাত্র মান রয়েছে</li>
                <li>কোনো দিক নেই</li>
                <li>উদাহরণ: দ্রুতি, দূরত্ব, সময়, ভর</li>
                <li>যোগের সাধারণ নিয়ম অনুসরণ করে</li>
            </ul>
            <h3>ভেক্টর রাশি</h3>
            <ul>
                <li>মান এবং দিক উভয়ই রয়েছে</li>
                <li>সাধারণত তীর দিয়ে প্রতিনিধিত্ব করা হয়</li>
                <li>উদাহরণ: বেগ, সরণ, বল, ত্বরণ</li>
                <li>ভেক্টর সংযোজন নিয়ম অনুসরণ করে</li>
            </ul>
        `,
        'distance_displacement': `
            <h2>দূরত্ব ও সরণ</h2>
            <h3>দূরত্ব</h3>
            <ul>
                <li>একটি স্কেলার রাশি</li>
                <li>প্রকৃত পথের মোট দৈর্ঘ্য</li>
                <li>সর্বদা ধনাত্মক</li>
                <li>সবসময় সরণের চেয়ে বেশি বা সমান</li>
            </ul>
            <h3>সরণ</h3>
            <ul>
                <li>একটি ভেক্টর রাশি</li>
                <li>প্রাথমিক এবং চূড়ান্ত অবস্থানের সরাসরি দূরত্ব</li>
                <li>ধনাত্মক, ঋণাত্মক বা শূন্য হতে পারে</li>
                <li>সবসময় দূরত্বের চেয়ে কম বা সমান</li>
            </ul>
        `,
        'speed_velocity': `
            <h2>দ্রুতি ও বেগ</h2>
            <h3>দ্রুতি</h3>
            <ul>
                <li>একটি স্কেলার রাশি</li>
                <li>দূরত্ব পরিবর্তনের হার</li>
                <li>v = দূরত্ব / সময়</li>
                <li>সর্বদা ধনাত্মক</li>
            </ul>
            <h3>বেগ</h3>
            <ul>
                <li>একটি ভেক্টর রাশি</li>
                <li>সরণ পরিবর্তনের হার</li>
                <li>দিক বিবৃতি সহ দ্রুতি</li>
                <li>ধনাত্মক বা ঋণাত্মক হতে পারে</li>
            </ul>
        `,
        'acceleration': `
            <h2>ত্বরণ - বিস্তারিত</h2>
            <h3>সংজ্ঞা</h3>
            <p>ত্বরণ হল বেগের পরিবর্তনের হার।</p>
            <p>a = (v - u) / t</p>
            <h3>প্রকার</h3>
            <ul>
                <li><strong>ধনাত্মক ত্বরণ:</strong> বেগ বৃদ্ধি পাচ্ছে</li>
                <li><strong>ঋণাত্মক ত্বরণ (মন্দন):</strong> বেগ হ্রাস পাচ্ছে</li>
                <li><strong>শূন্য ত্বরণ:</strong> ধ্রুব বেগ</li>
            </ul>
        `,
        'equations_motion': `
            <h2>গতির সমীকরণ</h2>
            <p>এই সমীকরণগুলি ধ্রুব ত্বরণ সহ গতি বর্ণনা করে।</p>
            <h3>সমীকরণ ১: v = u + at</h3>
            <p>যেকোনো সময়ে চূড়ান্ত বেগ বের করতে ব্যবহৃত হয়।</p>
            <h3>সমীকরণ ২: s = ut + ½at²</h3>
            <p>নির্দিষ্ট সময়ে সরণ বের করতে ব্যবহৃত হয়।</p>
            <h3>সমীকরণ ৩: v² = u² + 2as</h3>
            <p>সময়ের তথ্য ছাড়াই চূড়ান্ত বেগ বের করতে ব্যবহৃত হয়।</p>
        `,
        'falling_object': `
            <h2>পতনশীল বস্তু - মুক্তপতন</h2>
            <h3>মুক্তপতনের সংজ্ঞা</h3>
            <p>শুধুমাত্র অভিকর্ষণ বলের প্রভাবে বস্তুর পতনকে মুক্তপতন বলা হয়।</p>
            <h3>মূল তথ্য</h3>
            <ul>
                <li>g = 10 m/s² (প্রায়)</li>
                <li>সমস্ত বস্তু একই হারে ত্বরান্বিত হয়</li>
                <li>বাতাসের প্রতিরোধণ উপেক্ষা করলে ভর গুরুত্বপূর্ণ নয়</li>
                <li>h = ½gt²</li>
            </ul>
        `
    };
    
    return details[detailId] || '<p>বিস্তারিত তথ্য পাওয়া যায়নি।</p>';
}

/**
 * মডাল বন্ধ করা
 */
function closeDetail() {
    const modal = document.getElementById('detail-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// মডাল বাইরে ক্লিক করলে বন্ধ করা
window.onclick = function(event) {
    const modal = document.getElementById('detail-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// ============= (৬) শিক্ষক মোড ফাংশন =============


/**
 * সমস্ত সিমুলেশন শুরু করা - সবার জন্য উপলব্ধ (ছাত্র বা শিক্ষক)
 */
function teacherStartAnimation() {
    startLinearMotion();
    startCircularMotion();
    startFallingObject();
    startAccelerationMotion();
    startVerticalThrow();
    startConstantSpeed();
}

/**
 * সমস্ত সিমুলেশন রিসেট করা
 */
function resetAllSimulations() {
    resetLinearMotion();
    resetCircularMotion();
    resetFallingObject();
    resetAccelerationMotion();
    resetVerticalThrow();
    resetConstantSpeed();
}


/**
 * পূর্ণ স্ক্রিন মোড টগল করা
 */
function toggleFullscreen() {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
    }
}

/**
 * পেজ প্রিন্ট করা
 */
function printContent() {
    window.print();
}

// ============= (৭) পেজ লোডিং অ্যানিমেশন =============

/**
 * পেজ এ পৌঁছানোর সময় উপাদান অ্যানিমেশন
 */
function observeElements() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, options);
    
    // দৃশ্যমান কার্ডগুলো অবজারভ করা
    const cards = document.querySelectorAll('.objective-card, .topic-card, .example-card, .formula-card, .summary-box');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// পেজ লোড হলে অবজারভেশন শুরু করা
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeElements);
} else {
    observeElements();
}

// ============= (८) ইউটিলিটি ফাংশন =============

/**
 * কনসোলে সাহায্যকর বার্তা প্রিন্ট করা
 */
console.log('%c🧪 গতি শিক্ষা প্ল্যাটফর্ম লোড হয়েছে', 'font-size:18px; color: #4ECDC4; font-weight: bold;');
console.log('%cশিক্ষার্থীরা, এই প্ল্যাটফর্মটি সম্পূর্ণভাবে অভিযোজনশীল এবং ইন্টারেক্টিভ!', 'font-size:14px; color: #34495E;');
console.log('%cশিক্ষকরা আপনার ক্লাসে এই ওয়েবসাইটটি ব্যবহার করতে পারেন।', 'font-size:14px; color: #34495E;');
