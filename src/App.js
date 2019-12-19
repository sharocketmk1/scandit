import React, { useState } from "react";
import { ScanSettings, Barcode } from "scandit-sdk";

import BarcodePicker from "./BarcodePicker/BarcodePicker";

const App = (props) => {
  const [barcode, setBarcode] = useState(props.barcode);
  console.log('barcode', barcode);

  return (
    <div className="App">
      <p>Barcode: {barcode}</p>
      <BarcodePicker
        playSoundOnScan={true}
        vibrateOnScan={true}
        scanSettings={
          new ScanSettings({
            enabledSymbologies: ["qr", "ean8", "ean13", "upca", "upce", "code128", "code39", "code93", "itf"],
            codeDuplicateFilter: 1000
          })
        }
        onScan={scanResult => {
          console.log('scanResult', scanResult);
          document.getElementById("scandit-barcode-result").innerHTML = scanResult.barcodes.reduce(function (
            string,
            barcode
          ) {
            return string + Barcode.Symbology.toHumanizedName(barcode.symbology) + ": " + barcode.data + "<br>";
          },
            "");
        }}
        onError={error => {
          console.error(error.message);
        }}
      />
    </div>
  );
}

export default App;
