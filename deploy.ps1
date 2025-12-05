# Script de déploiement pour StudentHub sur Vercel
# Exécutez ce script avec: .\deploy.ps1

Write-Host "🚀 StudentHub - Script de Déploiement Vercel" -ForegroundColor Cyan
Write-Host ""

# Vérifier si Vercel CLI est installé
Write-Host "Vérification de Vercel CLI..." -ForegroundColor Yellow
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if (-not $vercelInstalled) {
    Write-Host "❌ Vercel CLI n'est pas installé." -ForegroundColor Red
    Write-Host "Installation de Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Erreur lors de l'installation de Vercel CLI" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Vercel CLI installé avec succès!" -ForegroundColor Green
} else {
    Write-Host "✅ Vercel CLI est déjà installé" -ForegroundColor Green
}

Write-Host ""
Write-Host "Options de déploiement:" -ForegroundColor Cyan
Write-Host "1. Déployer en mode développement (preview)" -ForegroundColor White
Write-Host "2. Déployer en production" -ForegroundColor White
Write-Host "3. Se connecter à Vercel" -ForegroundColor White
Write-Host "4. Annuler" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Choisissez une option (1-4)"

switch ($choice) {
    "1" {
        Write-Host "Déploiement en mode développement..." -ForegroundColor Yellow
        vercel
    }
    "2" {
        Write-Host "Déploiement en production..." -ForegroundColor Yellow
        vercel --prod
    }
    "3" {
        Write-Host "Connexion à Vercel..." -ForegroundColor Yellow
        vercel login
    }
    "4" {
        Write-Host "Annulation..." -ForegroundColor Yellow
        exit 0
    }
    default {
        Write-Host "Option invalide" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "✅ Déploiement terminé!" -ForegroundColor Green
Write-Host "Consultez VERCEL_DEPLOY.md pour plus d'informations." -ForegroundColor Cyan

