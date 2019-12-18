import React from "react";
import { ScanSettings, Barcode } from "scandit-sdk";

import BarcodePicker from "./BarcodePicker/BarcodePicker";

function App() {
  return (
    <div className="App">
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
