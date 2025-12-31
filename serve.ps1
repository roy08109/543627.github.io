param($Port=8000)
$root = Get-Location
$prefix = "http://localhost:$Port/"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
try {
    $listener.Start()
    Write-Host "Listening on $prefix"
    Write-Host "Press Ctrl+C to stop"
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $path = Join-Path $root $context.Request.Url.LocalPath
        if (Test-Path $path -PathType Container) { $path = Join-Path $path "index.html" }
        
        if (-not (Test-Path $path)) {
            $context.Response.StatusCode = 404
            $context.Response.Close()
            continue
        }
        
        try {
            $bytes = [System.IO.File]::ReadAllBytes($path)
            $context.Response.ContentLength64 = $bytes.Length
            
            # Set basic content types
            $ext = [System.IO.Path]::GetExtension($path)
            switch ($ext) {
                ".html" { $context.Response.ContentType = "text/html; charset=utf-8" }
                ".css"  { $context.Response.ContentType = "text/css" }
                ".js"   { $context.Response.ContentType = "application/javascript" }
                ".jpg"  { $context.Response.ContentType = "image/jpeg" }
                ".png"  { $context.Response.ContentType = "image/png" }
                ".svg"  { $context.Response.ContentType = "image/svg+xml" }
            }
            
            $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
        } catch {
            $context.Response.StatusCode = 500
        } finally {
            $context.Response.Close()
        }
    }
} catch {
    Write-Error $_
} finally {
    if ($listener.IsListening) { $listener.Stop() }
}