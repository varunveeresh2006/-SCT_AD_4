/* Reset and Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  color: #333;
  line-height: 1.6;
}

.container {
  max-width: 480px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
}

/* Header Styles */
.header {
  text-align: center;
  margin-bottom: 30px;
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 50px;
  padding: 16px 24px;
  margin-bottom: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.qr-icon {
  width: 24px;
  height: 24px;
  color: white;
}

.header h1 {
  color: white;
  font-size: 20px;
  font-weight: 700;
  margin: 0;
}

.subtitle {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  margin: 0;
}

/* Tab Navigation */
.tab-nav {
  display: flex;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 4px;
  margin-bottom: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.tab-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
}

.tab-btn.active {
  background: white;
  color: #667eea;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.tab-btn:hover:not(.active) {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.tab-icon {
  width: 16px;
  height: 16px;
}

/* Content Area */
.content {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.tab-content {
  display: none;
}

.tab-content.active {
  display: block;
}

/* Scanner Styles */
.scanner-container {
  text-align: center;
}

.camera-preview {
  position: relative;
  width: 100%;
  height: 280px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.scanner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scanner-frame {
  width: 200px;
  height: 200px;
  border: 2px solid white;
  border-radius: 12px;
  position: relative;
}

.scanner-frame::before,
.scanner-frame::after {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  border: 3px solid #4ade80;
}

.scanner-frame::before {
  top: -3px;
  left: -3px;
  border-right: none;
  border-bottom: none;
  border-top-left-radius: 12px;
}

.scanner-frame::after {
  bottom: -3px;
  right: -3px;
  border-left: none;
  border-top: none;
  border-bottom-right-radius: 12px;
}

.scanner-controls {
  margin-bottom: 20px;
}

/* Button Styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  min-width: 120px;
}

.btn-icon {
  width: 16px;
  height: 16px;
}

.btn-primary {
  background: white;
  color: #667eea;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-primary:hover {
  background: #f8fafc;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.btn-success {
  background: #10b981;
  color: white;
}

.btn-success:hover {
  background: #059669;
  transform: translateY(-2px);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

/* Result Container */
.result-container {
  background: rgba(16, 185, 129, 0.2);
  border: 1px solid #10b981;
  border-radius: 12px;
  padding: 20px;
  margin-top: 20px;
}

.result-container h3 {
  color: white;
  margin-bottom: 12px;
  font-size: 16px;
}

.result-container p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  word-break: break-all;
  margin-bottom: 16px;
  background: rgba(255, 255, 255, 0.1);
  padding: 12px;
  border-radius: 8px;
}

/* Error Container */
.error-container {
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid #ef4444;
  border-radius: 12px;
  padding: 20px;
  margin-top: 20px;
}

.error-container p {
  color: white;
  font-size: 14px;
  margin: 0;
}

/* Generator Styles */
.generator-container {
  text-align: center;
}

.input-group {
  margin-bottom: 20px;
  text-align: left;
}

.input-group label {
  display: block;
  color: white;
  font-weight: 500;
  margin-bottom: 8px;
  font-size: 14px;
}

#qr-text {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 14px;
  resize: vertical;
  min-height: 80px;
  backdrop-filter: blur(10px);
}

#qr-text::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

#qr-text:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.15);
}

.qr-display {
  margin-top: 24px;
}

#qr-canvas {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin-bottom: 20px;
}

.qr-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

/* History Styles */
.history-container h3 {
  color: white;
  margin-bottom: 20px;
  font-size: 18px;
  text-align: center;
}

.history-list {
  max-height: 400px;
  overflow-y: auto;
}

.history-item {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.history-header {
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 8px;
}

.history-type {
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
}

.history-type.scanned {
  background: rgba(59, 130, 246, 0.2);
  color: #93c5fd;
}

.history-type.generated {
  background: rgba(16, 185, 129, 0.2);
  color: #6ee7b7;
}

.history-time {
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
}

.history-content {
  color: white;
  font-size: 14px;
  word-break: break-all;
  margin-bottom: 12px;
  line-height: 1.4;
}

.history-actions {
  display: flex;
  gap: 8px;
}

.btn-small {
  padding: 6px 12px;
  font-size: 12px;
  min-width: auto;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: rgba(255, 255, 255, 0.6);
}

.empty-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 16px;
  opacity: 0.4;
}

/* Toast Notification */
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #10b981;
  color: white;
  padding: 12px 20px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 1000;
}

.toast.show {
  transform: translateX(0);
}

.toast-icon {
  width: 16px;
  height: 16px;
}

/* Responsive Design */
@media (max-width: 480px) {
  .container {
    padding: 16px;
  }

  .content {
    padding: 20px;
  }

  .qr-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }

  .history-actions {
    justify-content: center;
  }
}

/* Animations */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.scanner-frame {
  animation: pulse 2s infinite;
}

/* Scrollbar Styling */
.history-list::-webkit-scrollbar {
  width: 6px;
}

.history-list::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.history-list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.history-list::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
