let pageNumber = 1;
let PageNumbers = null;
let PDF = "";
function load(PDFLink, id) {
    const url = `${PDFLink}`;

    const loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(function (pdf) {
        pdf.getPage(pageNumber).then(function (page) {
            const fixedWidth = 375; // Set your desired width here
            const fixedHeight = 500; // Set your desired height here

            const viewport = page.getViewport({ scale: 1 });
            const scaleX = fixedWidth / viewport.width;
            const scaleY = fixedHeight / viewport.height;
            const scale = Math.min(scaleX, scaleY);

            const scaledViewport = page.getViewport({ scale: scale });

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = fixedHeight;
            canvas.width = fixedWidth;
            console.log(id);
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

        document.getElementById('TotalPages').innerHTML = pdf.numPages;
        document.getElementById('PageNumber').innerHTML = pageNumber;
        PageNumbers = pdf.numPages;

        const navigation = document.getElementById('navigation');
        navigation.classList.remove('navigation');
        navigation.classList.add('Ebook-button');
    });
    PDF = PDFLink;
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
function NextPage(id) {
    if (id == "next" && pageNumber < PageNumbers) {
        pageNumber += 1;
        const pdfViewer = document.getElementById('pdfViewer');
        while (pdfViewer.firstChild) {
            pdfViewer.removeChild(pdfViewer.firstChild);
        }
        load(PDF);
    } else if (id == "prev" && pageNumber > 1) {
        pageNumber -= 1;
        const pdfViewer = document.getElementById('pdfViewer');
        while (pdfViewer.firstChild) {
            pdfViewer.removeChild(pdfViewer.firstChild);
        }
        load(PDF);
    }
}
window.addEventListener('DOMContentLoaded', (event) => {
    OpenPDF1('pdf/10-Easy-Steps-to-Turning-Dreams-into-Reality.pdf');
    OpenPDF2('pdf/The-Real-Power-of-Affirmations.pdf');
});