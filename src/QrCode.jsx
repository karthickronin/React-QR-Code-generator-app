import { useState } from "react"

const QrCode = () => {
    const [img,setImg]=useState("");
    const [loading,setLoading]=useState(false);
    const [qrdata,setQrdata]=useState("Designed by Karthick Ronin");
    const [qrsize,setQrsize]=useState("150");
    async function generateQR() {
        try {
            setLoading(true);
            const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(qrdata)}`;
            setImg(url);
        } catch (error) {
            console.log("Error Generating QR Code", error)
        }finally{
            setLoading(false);
        }
    }
    function downloadQR(){
        fetch(img)
        .then((response)=>response.blob())
        .then((blob)=>{
            const link = document.createElement("a");
            link.href=URL.createObjectURL(blob);
            link.download="qrcode.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }).catch((error)=>{
            console.log("Error in downloading QR Code", error)
        });
    }
  return (
    <div className="app-container">
        <h1>QRCODE GENERATOR</h1>
        {img && <img className="qrcode-img" src={img}/>}
        {loading && <p>Please wait ...</p>}
        <div>
            <label htmlFor="data-input" className="input-label">Data for Qr Code</label>
            <input type="text" onChange={(e)=>setQrdata(e.target.value)} placeholder="Enter data for QR code" id="data-input"/>
            <label htmlFor="size-input" className="input-label">Size for Qr Code (eg.150)</label>
            <input type="text" onChange={(e)=>setQrsize(e.target.value)} id="size-input" placeholder="Enter Size for QR code" />
            <button className="generate-button" disabled={loading} onClick={generateQR} >Generate QR Code</button>
            <button onClick={downloadQR}
             className="download-button">Download QR Code</button>
        </div>
        <p className="footer">Designed by Karthick Ronin</p>
      </div>
  )
}

export default QrCode
