let pageNumber = 1;
let PageNumbers = null;
let PDF = "";
let pdf1 = {
    PDF: null,
    pageNumber: 1,
    totalPage: null
};

let pdf2 = {
    PDF: null,
    pageNumber: 1,
    totalPage: null
};

function load(PDFLink, id) {
    const url = `${PDFLink}`;
    let pdfData = (id === 'pdfViewer1') ? pdf1 : pdf2;

    const loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(function (pdf) {
        pdfData.totalPage = pdf.numPages;
        pdfData.PDF = pdf;

        renderPage(id);
    });

    const navigation = document.getElementById(id === 'pdfViewer1' ? 'navigation1' : 'navigation2');
    navigation.classList.remove('navigation');
    navigation.classList.add('Ebook-button');
}

function renderPage(id) {
    let pdfData = (id === 'pdfViewer1') ? pdf1 : pdf2;
    const pageNumber = pdfData.pageNumber;

    pdfData.PDF.getPage(pageNumber).then(function (page) {
        const fixedWidth = 375;
        const fixedHeight = 500;

        const viewport = page.getViewport({ scale: 1 });
        const scaleX = fixedWidth / viewport.width;
        const scaleY = fixedHeight / viewport.height;
        const scale = Math.min(scaleX, scaleY);

        const scaledViewport = page.getViewport({ scale: scale });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = fixedHeight;
        canvas.width = fixedWidth;

        const container = document.getElementById(id);
        container.innerHTML = ''; // Clear previous content
        container.appendChild(canvas);

        const renderContext = {
            canvasContext: context,
            viewport: scaledViewport,
        };
        const renderTask = page.render(renderContext);
        renderTask.promise.then(function () {
            console.log('Page rendered');
        });
    });

    if (id === 'pdfViewer1') {
        document.getElementById('TotalPages1').innerHTML = pdfData.totalPage;
        document.getElementById('PageNumber1').innerHTML = pageNumber;
    } else if (id === 'pdfViewer2') {
        document.getElementById('TotalPages2').innerHTML = pdfData.totalPage;
        document.getElementById('PageNumber2').innerHTML = pageNumber;
    }
}

function NextPage(direction, viewerId) {
    let pdfData = (viewerId === 'pdfViewer1') ? pdf1 : pdf2;

    if (direction === 'prev' && pdfData.pageNumber > 1) {
        pdfData.pageNumber--;
    } else if (direction === 'next' && pdfData.pageNumber < pdfData.totalPage) {
        pdfData.pageNumber++;
    }

    renderPage(viewerId);
}

function OpenPDF1(PDFLink) {
    const pdfViewer = document.getElementById('pdfViewer1').id;
    while (pdfViewer.firstChild) {
        pdfViewer.removeChild(pdfViewer.firstChild);
    }
    pageNumber = 1;
    load(PDFLink, pdfViewer);
}
function OpenPDF2(PDFLink) {
    const pdfViewer = document.getElementById('pdfViewer2').id;
    while (pdfViewer.firstChild) {
        pdfViewer.removeChild(pdfViewer.firstChild);
    }
    pageNumber = 1;
    load(PDFLink, pdfViewer);
}
window.addEventListener('DOMContentLoaded', (event) => {
    OpenPDF1('pdf/10-Easy-Steps-to-Turning-Dreams-into-Reality.pdf');
    OpenPDF2('pdf/The-Real-Power-of-Affirmations.pdf');
});