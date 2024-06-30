import { useLocation, useParams } from "react-router-dom";

import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { Worker } from "@react-pdf-viewer/core";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useEffect, useState } from "react";

const PDF_Viewer = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const fileUrl = decodeURIComponent(params.get("fileUrl"));
  const tillerFileUrl = `https://tillerbd.com:4040${fileUrl}`;
  console.log(fileUrl, tillerFileUrl);

  const [scale, setScale] = useState(1);

  useEffect(() => {
      const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight - 64;
      const newScale = Math.min(width / 800, height / 600);
      setScale(newScale);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div >
      {fileUrl.includes(".pdf")?
      <div className="h-screen border overflow-hidden">

    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
       <Viewer
         fileUrl={tillerFileUrl}
         plugins={[defaultLayoutPluginInstance]}
         defaultScale={scale}
       />
     </Worker>
      </div>
     
     
     :
     <img src={tillerFileUrl} alt=""  className="size-[50%] overflow-scroll"/>
    
    
    }
     
    </div>
  );
};

export default PDF_Viewer;
