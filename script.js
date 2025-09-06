// QR Scanner
function onScanSuccess(decodedText) {
  document.getElementById("scan-result").innerText = "Scanned Result: " + decodedText;
}

let html5QrcodeScanner = new Html5QrcodeScanner("reader", {
  fps: 10,
  qrbox: 250
});
html5QrcodeScanner.render(onScanSuccess);

// QR Generator
function generateQR() {
  let qrContainer = document.getElementById("qrcode");
  qrContainer.innerHTML = "";
  let text = document.getElementById("qr-text").value;
  if (text.trim() === "") {
    alert("Please enter text or URL");
    return;
  }
  new QRCode(qrContainer, {
    text: text,
    width: 200,
    height: 200
  });
}
