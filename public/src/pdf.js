let pageNumber = 1;
let PageNumbers = null;
function load() {
    const url = 'pdf/Document.pdf'; // Update with the path to your PDF

    const loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(function (pdf) {
        pdf.getPage(pageNumber).then(function (page) {
            const scale = 0.9;
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
        return PageNumbers;
    });
}
document.addEventListener('DOMContentLoaded', function () {
    load();
});
function NextPage(id) {
    if (id == "next" && pageNumber < PageNumbers) {
        pageNumber += 1;
        const pdfViewer = document.getElementById('pdfViewer');
        while (pdfViewer.firstChild) {
            pdfViewer.removeChild(pdfViewer.firstChild);
        }
        load();
    } else if (id == "prev" && pageNumber > 1) {
        pageNumber -= 1;
        const pdfViewer = document.getElementById('pdfViewer');
        while (pdfViewer.firstChild) {
            pdfViewer.removeChild(pdfViewer.firstChild);
        }
        load();
    }
}