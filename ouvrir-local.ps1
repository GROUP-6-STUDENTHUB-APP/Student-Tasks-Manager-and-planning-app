# Script pour ouvrir StudentHub localement
# Exécutez avec: .\ouvrir-local.ps1

$port = 8000
$folder = Get-Location

Write-Host "🚀 StudentHub - Serveur Local" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📂 Dossier: $folder" -ForegroundColor Yellow
Write-Host "🌐 URL: http://localhost:$port" -ForegroundColor Green
Write-Host ""
Write-Host "Appuyez sur Ctrl+C pour arrêter le serveur" -ForegroundColor Yellow
Write-Host ""

# Vérifier si Python est installé
$python = Get-Command python -ErrorAction SilentlyContinue

if ($python) {
    Write-Host "✅ Python détecté - Démarrage du serveur..." -ForegroundColor Green
    Write-Host ""
    
    # Ouvrir le navigateur après 2 secondes
    Start-Sleep -Seconds 2
    Start-Process "http://localhost:$port"
    
    # Démarrer le serveur
    python -m http.server $port
} else {
    Write-Host "⚠️ Python non trouvé" -ForegroundColor Yellow
    Write-Host "Ouverture directe du fichier index.html..." -ForegroundColor Yellow
    Write-Host ""
    
    $indexFile = Join-Path $folder "index.html"
    if (Test-Path $indexFile) {
        Start-Process $indexFile
        Write-Host "✅ Fichier ouvert dans le navigateur" -ForegroundColor Green
        Write-Host "📍 URL: file:///$($folder -replace '\\', '/')/index.html" -ForegroundColor Cyan
    } else {
        Write-Host "❌ Fichier index.html non trouvé!" -ForegroundColor Red
        Write-Host "Assurez-vous d'être dans le bon dossier." -ForegroundColor Yellow
    }
}

