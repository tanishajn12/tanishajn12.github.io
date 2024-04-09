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