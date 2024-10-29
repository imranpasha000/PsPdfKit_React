import { useEffect, useRef } from "react";

export default function PdfViewerComponent(props) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let PSPDFKit;

    (async function () {
      PSPDFKit = await import("pspdfkit");
      const instance = await PSPDFKit.load({
        container,
        document: props.document,
        baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
        toolbarItems: [
          { type: "sidebar-thumbnails" },
          { type: "sidebar-document-outline" },
          { type: "sidebar-annotations" },
          { type: "sidebar-bookmarks" },
          { type: "sidebar-signatures" },
          { type: "sidebar-layers" },
          { type: "pager" },
          { type: "pan" },
          { type: "zoom-out" },
          { type: "zoom-in" },
          { type: "zoom-mode" },
          { type: "spacer" },
          { type: "annotate" },
          { type: "ink" },
          { type: "highlighter" },
          { type: "text-highlighter" },
          { type: "ink-eraser" },
          { type: "signature" },
          { type: "image" },
          { type: "stamp" },
          { type: "note" },
          { type: "text" },
          { type: "line" },
          { type: "arrow" },
          { type: "rectangle" },
          { type: "cloudy-rectangle" },
          { type: "dashed-rectangle" },
          { type: "ellipse" },
          { type: "cloudy-ellipse" },
          { type: "dashed-ellipse" },
          { type: "polygon" },
          { type: "cloudy-polygon" },
          { type: "dashed-polygon" },
          { type: "polyline" },
          { type: "print" },
          { type: "document-editor" },
          { type: "document-crop" },
          { type: "search" },
          { type: "export-pdf" },
          { type: "debug" },
          { type: "content-editor" },
          { type: "link" },
          { type: "multi-annotations-selection" },
          { type: "callout" },
        ],
      });
    })();

    return () => PSPDFKit && PSPDFKit.unload(container);
  }, [props.document]);

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
}
