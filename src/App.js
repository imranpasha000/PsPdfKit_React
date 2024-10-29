import React from "react";
import PdfViewerComponent from "./components/PdfViewerComponent";

function App() {
  const pdfUrl = "https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf";

  return (
    <div>
      <h1 style={{textAlign: "center"}}>PDF Viewer</h1>
      <PdfViewerComponent document={pdfUrl} />
    </div>
  );
}

export default App;
