# PowerShell Static Web Server cho Ứng dụng Trắc nghiệm Past Tenses
$port = 8080
$folder = $PSScriptRoot
if (-not $folder) { $folder = Get-Location }

# Lấy địa chỉ IP mạng nội bộ (Wi-Fi hoặc LAN) để mở trên điện thoại / iPad
$localIp = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -notlike "*Loopback*" -and $_.IPAddress -notlike "169.254*" } | Select-Object -ExpandProperty IPAddress -First 1)

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://+:$port/")

try {
    $listener.Start()
} catch {
    # Nếu không có quyền admin binding http://+:8080/, bind vào localhost:8080
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://localhost:$port/")
    $listener.Start()
}

Write-Host "=================================================================" -ForegroundColor Cyan
Write-Host " PHẦN MỀM TRẮC NGHIỆM 20 CÂU THÌ QUÁ KHỨ (PAST TENSES) " -ForegroundColor Yellow
Write-Host "=================================================================" -ForegroundColor Cyan
Write-Host " Máy chủ đang chạy tại:" -ForegroundColor Green
Write-Host " -> Trên máy tính (Localhost):  http://localhost:$port" -ForegroundColor White
if ($localIp) {
    Write-Host " -> Trên Điện thoại / iPad:     http://$($localIp):$port" -ForegroundColor Yellow
}
Write-Host "=================================================================" -ForegroundColor Cyan
Write-Host " Nhấn Ctrl + C để dừng máy chủ." -ForegroundColor Gray
Write-Host ""

# Tự động mở trình duyệt
Start-Process "http://localhost:$port"

# Vòng lặp phục vụ các yêu cầu HTTP
while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrEmpty($urlPath) -or $urlPath -eq "/") {
            $urlPath = "index.html"
        }

        $filePath = Join-Path $folder $urlPath

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            switch ($ext) {
                ".html" { $mime = "text/html; charset=utf-8" }
                ".css"  { $mime = "text/css; charset=utf-8" }
                ".js"   { $mime = "application/javascript; charset=utf-8" }
                ".png"  { $mime = "image/png" }
                ".jpg"  { $mime = "image/jpeg" }
                ".ico"  { $mime = "image/x-icon" }
                ".svg"  { $mime = "image/svg+xml" }
                default { $mime = "application/octet-stream" }
            }

            $response.ContentType = $mime
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.OutputStream.Write($msg, 0, $msg.Length)
        }
        $response.Close()
    } catch {
        # Bỏ qua lỗi kết nối ngắt đột ngột
    }
}
