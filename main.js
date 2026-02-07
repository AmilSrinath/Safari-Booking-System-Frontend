const { app, BrowserWindow } = require("electron");
const path = require("path");
const { spawn } = require("child_process");

let backendProcess;
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(__dirname, "assets", "app-icon.ico"),
    webPreferences: {
      nodeIntegration: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, "out", "index.html"));

  // When window is closed → stop backend
  mainWindow.on("closed", () => {
    if (backendProcess) {
      backendProcess.kill();   // stop Spring Boot
    }
    app.quit();
  });
}

app.whenReady().then(() => {

  // Correct JAR path for dev and EXE
  const jarPath = app.isPackaged
    ? path.join(process.resourcesPath, "backend", "safari-booking-system-0.0.1-SNAPSHOT.jar")
    : path.join(__dirname, "backend", "safari-booking-system-0.0.1-SNAPSHOT.jar");

  // Start Spring Boot backend
  backendProcess = spawn("java", ["-jar", jarPath], {
    stdio: "ignore",
    detached: false
  });

  // Wait for backend startup then open UI
  setTimeout(createWindow, 5000);
});

// Safety: if app quits any other way
app.on("before-quit", () => {
  if (backendProcess) backendProcess.kill();
});
