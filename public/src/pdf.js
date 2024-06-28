document.addEventListener('DOMContentLoaded', function () {
    const url = 'pdf/Document.pdf'; // Update with the path to your PDF

    const loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(function (pdf) {
        console.log('PDF loaded');

        const pageNumber = 1;
        pdf.getPage(pageNumber).then(function (page) {
            console.log('Page loaded');

            const scale = 1.5;
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
                console.log('Page rendered');
            });
        });
    });
});
