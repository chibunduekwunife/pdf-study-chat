import { Document, Page, pdfjs } from 'react-pdf';
import { useState, useEffect, useRef } from 'react';
import { FiX } from 'react-icons/fi';
import { PDFViewerProps } from "@/app/lib/interfaces";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer = ({ file, onRemove }: PDFViewerProps) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const observer = useRef<IntersectionObserver>();
  const pageElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    pageElementsRef.current = pageElementsRef.current.slice(0, numPages);
  }

  // The only purpose of this useEffect is so that the page number would update dynamically while scrolling
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Adjust the threshold to when you consider the page is visible
    };

    observer.current = new IntersectionObserver((entries) => {
      const visiblePage = entries.find(entry => entry.isIntersecting);
      if (visiblePage) {
        setPageNumber(Number(visiblePage.target.getAttribute('data-page-number')));
      }
    }, options);

    const { current: currentObserver } = observer;

    pageElementsRef.current.forEach((page) => {
      if (page) currentObserver.observe(page);
    });

    return () => {
      if (currentObserver) {
        currentObserver.disconnect();
      }
    };
  }, [numPages]); // Reinitialize observer when numPages changes

  return (
    <>
      <div className="flex justify-between items-center">
        <button
            onClick={onRemove}
            className="
              items-center gap-1 text-sm text-black bg-amber-300 hover:bg-amber-400
              transition-colors px-2 absolute z-50 top-0
            "
            aria-label="Remove PDF"
        >
          <FiX className="inline" /> Remove PDF
        </button>
        <div className="text-center rounded-3xl my-2 z-50 absolute bottom-0 right-4 bg-blue-600 text-white py-1 px-4">
          {pageNumber}/{numPages}
        </div>
      </div>
      <div className="h-[300px] md:h-full overflow-y-scroll">
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess} className="pdf-document">
          {Array.from(new Array(numPages), (el, index) => (
            <div ref={el => pageElementsRef.current[index] = el} data-page-number={index + 1} key={index}>
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                className="pdf-page"
                renderAnnotationLayer={false}
                renderTextLayer={false}
              />
            </div>
          ))}
        </Document>
      </div>
    </>
  );
};

export default PDFViewer;
