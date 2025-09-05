class QRCodeApp {
    constructor() {
        this.video = document.getElementById('video');
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.scanning = false;
        this.stream = null;
        
        this.initializeApp();
    }

    initializeApp() {
        this.setupTabNavigation();
        this.setupScanner();
        this.setupGenerator();
    }

    // Tab Navigation
    setupTabNavigation() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                
                // Remove active class from all tabs and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                button.classList.add('active');
                document.getElementById(`${targetTab}-tab`).classList.add('active');
                
                // Stop camera when switching away from scanner
                if (targetTab !== 'scanner' && this.stream) {
                    this.stopCamera();
                }
            });
        });
    }

    // Scanner Functionality
    setupScanner() {
        const startButton = document.getElementById('start-camera');
        const stopButton = document.getElementById('stop-camera');
        const copyButton = document.getElementById('copy-result');
        const openLinkButton = document.getElementById('open-link');

        startButton.addEventListener('click', () => this.startCamera());
        stopButton.addEventListener('click', () => this.stopCamera());
        copyButton.addEventListener('click', () => this.copyToClipboard());
        openLinkButton.addEventListener('click', () => this.openLink());
    }

    async startCamera() {
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });
            
            this.video.srcObject = this.stream;
            this.video.play();
            
            document.getElementById('start-camera').style.display = 'none';
            document.getElementById('stop-camera').style.display = 'inline-flex';
            document.getElementById('scanner-status').textContent = 'Point camera at QR code';
            
            this.scanning = true;
            this.scanQRCode();
            
        } catch (error) {
            console.error('Error accessing camera:', error);
            document.getElementById('scanner-status').textContent = 'Camera access denied or not available';
        }
    }

    stopCamera() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
        
        this.scanning = false;
        this.video.srcObject = null;
        
        document.getElementById('start-camera').style.display = 'inline-flex';
        document.getElementById('stop-camera').style.display = 'none';
        document.getElementById('scanner-status').textContent = 'Click "Start Camera" to begin scanning';
    }

    scanQRCode() {
        if (!this.scanning) return;

        if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
            this.canvas.width = this.video.videoWidth;
            this.canvas.height = this.video.videoHeight;
            this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
            
            const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);
            
            if (code) {
                this.handleScanResult(code.data);
                return;
            }
        }
        
        requestAnimationFrame(() => this.scanQRCode());
    }

    handleScanResult(data) {
        this.scanning = false;
        document.getElementById('scanner-status').textContent = 'QR Code detected!';
        
        const resultContainer = document.getElementById('scan-result');
        const scannedText = document.getElementById('scanned-text');
        const openLinkButton = document.getElementById('open-link');
        
        scannedText.textContent = data;
        resultContainer.style.display = 'block';
        
        // Show open link button if it's a URL
        if (this.isValidURL(data)) {
            openLinkButton.style.display = 'inline-flex';
            openLinkButton.setAttribute('data-url', data);
        } else {
            openLinkButton.style.display = 'none';
        }
        
        // Resume scanning after 3 seconds
        setTimeout(() => {
            if (this.stream) {
                this.scanning = true;
                document.getElementById('scanner-status').textContent = 'Point camera at QR code';
                this.scanQRCode();
            }
        }, 3000);
    }

    copyToClipboard() {
        const text = document.getElementById('scanned-text').textContent;
        navigator.clipboard.writeText(text).then(() => {
            this.showNotification('Copied to clipboard!');
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showNotification('Copied to clipboard!');
        });
    }

    openLink() {
        const url = document.getElementById('open-link').getAttribute('data-url');
        if (url) {
            window.open(url, '_blank');
        }
    }

    // Generator Functionality
    setupGenerator() {
        const generateButton = document.getElementById('generate-qr');
        const clearButton = document.getElementById('clear-qr');
        const copyQRButton = document.getElementById('copy-qr-text');
        const downloadButton = document.getElementById('download-qr');
        const quickButtons = document.querySelectorAll('.quick-btn');

        generateButton.addEventListener('click', () => this.generateQRCode());
        clearButton.addEventListener('click', () => this.clearQRCode());
        copyQRButton.addEventListener('click', () => this.copyQRText());
        downloadButton.addEventListener('click', () => this.downloadQRCode());

        quickButtons.forEach(button => {
            button.addEventListener('click', () => {
                const text = button.getAttribute('data-text');
                document.getElementById('qr-input').value = text;
            });
        });
    }

    generateQRCode() {
        const input = document.getElementById('qr-input').value.trim();
        
        if (!input) {
            this.showNotification('Please enter some text to generate QR code', 'error');
            return;
        }

        const qrContainer = document.getElementById('qr-code');
        const resultContainer = document.getElementById('qr-result');
        const contentText = document.getElementById('qr-content-text');
        
        // Clear previous QR code
        qrContainer.innerHTML = '';
        
        // Generate QR code
        QRCode.toCanvas(qrContainer, input, {
            width: 256,
            height: 256,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            },
            margin: 2
        }, (error) => {
            if (error) {
                console.error('Error generating QR code:', error);
                this.showNotification('Error generating QR code', 'error');
                return;
            }
            
            contentText.textContent = input;
            resultContainer.style.display = 'block';
            document.getElementById('clear-qr').style.display = 'inline-flex';
            
            this.showNotification('QR code generated successfully!');
        });
    }

    clearQRCode() {
        document.getElementById('qr-input').value = '';
        document.getElementById('qr-result').style.display = 'none';
        document.getElementById('clear-qr').style.display = 'none';
        document.getElementById('qr-code').innerHTML = '';
    }

    copyQRText() {
        const text = document.getElementById('qr-content-text').textContent;
        navigator.clipboard.writeText(text).then(() => {
            this.showNotification('Text copied to clipboard!');
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showNotification('Text copied to clipboard!');
        });
    }

    downloadQRCode() {
        const canvas = document.querySelector('#qr-code canvas');
        if (canvas) {
            const link = document.createElement('a');
            link.download = 'qrcode.png';
            link.href = canvas.toDataURL();
            link.click();
            this.showNotification('QR code downloaded!');
        }
    }

    // Utility Functions
    isValidURL(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    showNotification(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 24px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '600',
            zIndex: '1000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            backgroundColor: type === 'error' ? '#ef4444' : '#10b981'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new QRCodeApp();
});