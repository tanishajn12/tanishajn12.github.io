//change navbar styles on scroll

window.addEventListener('scroll', ()=> {
    document.querySelector('nav').classList.toggle
    ('window-scroll', window.scrollY > 0)
})


//show / hide navmenu
const menu= document.querySelector(".nav-menu")
const menuBtn=document.querySelector("#open-menu-btn");
const closeBtn=document.querySelector("#close-menu-btn");

menuBtn.addEventListener('click', ()=>{
    menu.style.display="flex";
    closeBtn.style.display="inline-block"
    menuBtn.style.display="none"
})

const closeNav=() => {
    menu.style.display="none";
    closeBtn.style.display="none";
    menuBtn.style.display="inline-block";

}

closeBtn.addEventListener('click',closeNav);



function openPdfViewer(pdfUrl) {
    document.getElementById('embeddedPdf').src = pdfUrl;
    document.getElementById('pdfPopup').style.display = 'flex';
}

function closePdfViewer() {
    document.getElementById('pdfPopup').style.display = 'none';
    // Stop the PDF viewer when closing the popup
    document.getElementById('embeddedPdf').src = 'about:blank';
}


// // view more toggled view
// function toggleProblemVisibility() {
//     var problemArticles = document.querySelectorAll('.problem-container .problem');
//     var viewMoreBtn = document.querySelector('.view-more-btn');

//     // Toggle display for each problem article starting from the 6th one
//     for (var i = 5; i < problemArticles.length; i++) {
//         var article = problemArticles[i];
//         article.style.display = (article.style.display === 'none') ? 'block' : 'none';
//     }

//     // Toggle button text
//     if (viewMoreBtn.textContent === 'View More') {
//         viewMoreBtn.textContent = 'View Less';
//     } else {
//         viewMoreBtn.textContent = 'View More';
//     }
// }

function toggleProblemVisibility() {
    var hiddenProblems = document.querySelectorAll('.problems .problem.hidden');
    var viewMoreBtn = document.querySelector('.viewmore');

    // Toggle display for all problem articles
    hiddenProblemsProblems.forEach(function(article) {
        article.classList.toggle('hidden');
    });

    // Toggle button text
    if (viewMoreBtn.textContent === 'View More') {
        viewMoreBtn.textContent = 'View Less';
    } else {
        viewMoreBtn.textContent = 'View More';
    }
}

// chatbot

const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const API_KEY="sk-proj-lTJ40GaL7bdbVbAQ4oAUT3BlbkFJtT8EDtAWdAvxHAYh19yu";

let userMessage;

const createChatLi=(message,className) => {
    //CREATE a chat </li> element with passed message and classname
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat",className);
    let chatContent = className === "outgoing"? `<p>${message}</p>` : 
    `<span><i class="fa-solid fa-message"></i></span>`;
    chatLi.innerHTML = chatContent;
    return chatLi;

}

const generateResponse = (incomingChatLi) => {
    const API_URL ="https://api.openai.com/v1/chat/completions";
    const messageElement =incomingChatLi.querySelector("p");
    const requestOptions= {
        method:"POST",
        headers:{
            "Content-Type" : "application/json",
            "Authorization":   `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo-0125",
            "messages": [{
                  "role": "user",
                  content: userMessage
                }
            ]

        })

    }

    fetch(API_URL, requestOptions).then(res=>res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content;
    }).catch((error) => {
        messageElement.textContent = "Oops! Something went wrong!! Please try again";
    })
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;


    chatbox.appendChild(createChatLi(userMessage,"outgoing"));

    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking....","incoming")
        chatbox.appendChild(incomingChatLi);  
        generateResponse(incomingChatLi); 
    }, 600);

}

sendChatBtn.addEventListener("click",handleChat);


  