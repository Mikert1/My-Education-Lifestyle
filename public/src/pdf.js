let pageNumber = 1;
let PageNumbers = null;
let PDF = "";
function load(PDFLink) {
    const url = `${PDFLink}`;

    const loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(function (pdf) {
        pdf.getPage(pageNumber).then(function (page) {
            const scale = 1;
            const viewport = page.getViewport({ scale: scale });

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            document.getElementById('pdfViewer').appendChild(canvas);

            const renderContext = {
                canvasContext: context,
                viewport: viewport,
            };
            const renderTask = page.render(renderContext);
            renderTask.promise.then(function () {
            });
        });
        const totalPage = document.getElementById('TotalPages');
        const page = document.getElementById('PageNumber');
        totalPage.innerHTML = pdf.numPages;
        page.innerHTML = pageNumber;
        PageNumbers = pdf.numPages;
        // const navigation = document.getElementById('navigation');
        // navigation.classList.add('flex');
    });
    PDF = PDFLink;
}
document.addEventListener('DOMContentLoaded', function () {
    // load();
});
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