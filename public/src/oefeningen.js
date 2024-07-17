let pageNumber = 1;
let PageNumbers = null;
let PDF = "";
function pages() {
    const totalPage = document.getElementById('TotalPages');
    const page = document.getElementById('PageNumber');
    totalPage.innerHTML = PDF.numPages;
    page.innerHTML = pageNumber;
}
function load(PDFLink) {
    const url = `${PDFLink}`;

    const loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(function (pdf) {
        PDF = pdf;
        PageNumbers = pdf.numPages;

        renderPage();

        pages();

        const navigation = document.getElementById('navigation');
        navigation.classList.add('Ebook-button');
    });
}

function renderPage() {
    PDF.getPage(pageNumber).then(function (page) {
        console.log(page);
        const fixedWidth = 375; // Set your desired width here
        const fixedHeight = 530; // Set your desired height here

        const viewport = page.getViewport({ scale: 1 });
        const scaleX = fixedWidth / viewport.width;
        const scaleY = fixedHeight / viewport.height;
        const scale = Math.min(scaleX, scaleY);

        const scaledViewport = page.getViewport({ scale: scale });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = fixedHeight;
        canvas.width = fixedWidth;

        const pdfViewer = document.getElementById('pdfViewer');
        pdfViewer.innerHTML = ''; // Clear previous content
        pdfViewer.appendChild(canvas);

        const renderContext = {
            canvasContext: context,
            viewport: scaledViewport,
        };
        const renderTask = page.render(renderContext);
        renderTask.promise.then(function () {
            console.log('Page rendered');
        });
    });
    pages();
}

function ClosePDF() {
    const pdfViewer = document.getElementById('pdfViewer');
    while (pdfViewer.firstChild) {
        pdfViewer.removeChild(pdfViewer.firstChild);
    }
    const navigation = document.getElementById('navigation');
    navigation.classList.remove('Ebook-button');
    navigation.classList.add('navigation');
    console.log("PDF closed");
}

function OpenPDF(PDFLink) {
    const pdfViewer = document.getElementById('pdfViewer');
    while (pdfViewer.firstChild) {
        pdfViewer.removeChild(pdfViewer.firstChild);
    }
    pageNumber = 1;
    load(PDFLink);
}

function NextPage(id) {
    if (id == "next" && pageNumber < PageNumbers) {
        pageNumber += 1;
    } else if (id == "prev" && pageNumber > 1) {
        pageNumber -= 1;
    }
    renderPage();
}

window.addEventListener('DOMContentLoaded', (event) => {
    const currentLocation = window.location.pathname;
    if (currentLocation.includes('education.html')) {
        OpenPDF('pdf/Budget Planner My Education Lifestyle.pdf');
    } else if (currentLocation.includes('mentalHealth.html')) {
        OpenPDF('pdf/Journaling Oefeningen My Education Lifestyle.pdf');
    }
});

// CSS to ensure fixed size of the canvas
const style = document.createElement('style');
style.innerHTML = `
    #pdfViewer canvas {
        width: 375px; /* Set your desired width here */
        height: 530px; /* Set your desired height here */
    }
`;
document.head.appendChild(style);