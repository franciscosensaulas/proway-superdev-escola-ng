# Criar arquivo setup.ps1 no mesmo diretório que tem angular.ps1
# Executar no power shell
# powershell -ExecutionPolicy Bypass -File .\setup.ps1


# Verifica se Node.js está instalado
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js não está instalado. Por favor, instale o Node.js primeiro." -ForegroundColor Red
    exit 1
}

# Verifica se npm está instalado
if (!(Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "npm não está instalado. Por favor, instale o npm primeiro." -ForegroundColor Red
    exit 1
}

# Instala Angular CLI globalmente
Write-Host "Instalando Angular CLI globalmente..." -ForegroundColor Cyan
npm install -g @angular/cli

# Obtém o diretório global de pacotes npm
$npmGlobalRoot = npm root -g
$npmGlobalBin = (Get-Item $npmGlobalRoot).Parent.FullName

# Função para adicionar ao PATH do usuário
function Add-ToUserPath($pathToAdd) {
    $currentUserPath = [Environment]::GetEnvironmentVariable("Path", "User")
    if ($currentUserPath -notlike "*$pathToAdd*") {
        Write-Host "Adicionando '$pathToAdd' ao PATH do usuário..." -ForegroundColor Cyan
        $newPath = "$currentUserPath;$pathToAdd"
        [Environment]::SetEnvironmentVariable("Path", $newPath, "User")
        Write-Host "Caminho atualizado. Reinicie o terminal para aplicar as alterações." -ForegroundColor Green
    } else {
        Write-Host "'$pathToAdd' já está no PATH do usuário." -ForegroundColor Yellow
    }
}

# Verifica se ng está disponível
if (!(Get-Command ng -ErrorAction SilentlyContinue)) {
    Write-Host "O comando 'ng' não foi encontrado. Tentando corrigir PATH..." -ForegroundColor Yellow
    Add-ToUserPath $npmGlobalBin

    # Tenta encontrar ng manualmente e informar o caminho
    $ngPath = Join-Path $npmGlobalBin "ng.cmd"
    if (Test-Path $ngPath) {
        Write-Host "Angular CLI está instalado em: $ngPath" -ForegroundColor Cyan
        Write-Host "Use um novo terminal para que o PATH atualizado seja reconhecido." -ForegroundColor Green
    } else {
        Write-Host "Angular CLI parece não ter sido instalado corretamente." -ForegroundColor Red
        exit 1
    }
} else {
    $version = ng version | Select-String "Angular CLI"
    Write-Host "Angular CLI instalado com sucesso! $version" -ForegroundColor Green
}

# Executa npm install se package.json estiver presente
if (Test-Path "./package.json") {
    Write-Host "Executando 'npm install' no diretório atual..." -ForegroundColor Cyan
    npm install
    Write-Host "'npm install' concluído." -ForegroundColor Green
} else {
    Write-Host "Nenhum package.json encontrado no diretório atual. Ignorando 'npm install'." -ForegroundColor Yellow
}


