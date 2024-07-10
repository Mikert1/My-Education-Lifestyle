let pageNumber = 1;
let PageNumbers = null;
let PDF = "";

// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.mjs';

function load(PDFLink) {
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

            document.getElementById('pdfViewer').appendChild(canvas);

            const renderContext = {
                canvasContext: context,
                viewport: scaledViewport,
            };
            const renderTask = page.render(renderContext);
            renderTask.promise.then(function () {
                console.log('Page rendered');
            });
        });

        const totalPage = document.getElementById('TotalPages');
        const page = document.getElementById('PageNumber');
        totalPage.innerHTML = pdf.numPages;
        page.innerHTML = pageNumber;
        PageNumbers = pdf.numPages;

        const navigation = document.getElementById('navigation');
        navigation.classList.remove('navigation');
        navigation.classList.add('Ebook-button');
    });
    PDF = PDFLink;
}
// document.addEventListener('DOMContentLoaded', function () {
//     load();
// });
function ClosePDF() {
    const pdfViewer = document.getElementById('pdfViewer');
    while (pdfViewer.firstChild) {
        pdfViewer.removeChild(pdfViewer.firstChild);
    }
    const navigation = document.getElementById('navigation');
    navigation.classList.remove('Ebook-button');
    navigation.classList.add('navigation');
    console.log("hallo");
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

export { OpenPDF, ClosePDF, NextPage };
