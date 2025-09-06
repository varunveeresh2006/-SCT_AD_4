// QR Scanner setup
function onScanSuccess(decodedText) {
  document.getElementById("result").innerText = decodedText;
}

let html5QrcodeScanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });
html5QrcodeScanner.render(onScanSuccess);

// QR Generator setup
function generateQRCode() {
  let text = document.getElementById("qrText").value;
  if (text.trim() === "") {
    alert("Please enter text or URL");
    return;
  }
  document.getElementById("qrcode").innerHTML = "";
  new QRCode(document.getElementById("qrcode"), {
    text: text,
    width: 200,
    height: 200
  });
}

// Register Service Worker for PWA
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("✅ Service Worker registered"))
    .catch(err => console.log("❌ SW registration failed", err));
}
