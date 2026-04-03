Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$outputPath = Join-Path $root "public/og-image.png"
$profilePath = Join-Path $root "public/profile-pic.jpg"

$width = 1200
$height = 630

$bitmap = New-Object System.Drawing.Bitmap($width, $height)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

$rect = New-Object System.Drawing.Rectangle(0, 0, $width, $height)
$backgroundBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    $rect,
    [System.Drawing.ColorTranslator]::FromHtml("#091113"),
    [System.Drawing.ColorTranslator]::FromHtml("#0c1111"),
    90
)
$graphics.FillRectangle($backgroundBrush, $rect)

function New-ColorBrush([string] $hex, [int] $alpha) {
    $color = [System.Drawing.ColorTranslator]::FromHtml($hex)
    return New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb($alpha, $color))
}

$tealBrush = New-ColorBrush "#5b8078" 44
$bronzeBrush = New-ColorBrush "#b98952" 56
$softBronzeBrush = New-ColorBrush "#d9b48a" 18
$panelBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(34, [System.Drawing.ColorTranslator]::FromHtml("#152022")))

$graphics.FillEllipse($tealBrush, -140, -180, 560, 420)
$graphics.FillEllipse($bronzeBrush, 770, -120, 380, 320)
$graphics.FillEllipse($softBronzeBrush, 640, 360, 520, 260)

$panelRect = New-Object System.Drawing.RectangleF(72, 78, 740, 474)
$graphics.FillRectangle($panelBrush, $panelRect)
$graphics.DrawRectangle((New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(90, [System.Drawing.ColorTranslator]::FromHtml("#263436")), 1.4)), 72, 78, 740, 474)
$graphics.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#b98952"))), 72, 78, 8, 474)

$titleBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#edf0ea"))
$roleBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#d9b48a"))
$bodyBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#b0bbb6"))
$chipTextBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#edf0ea"))
$chipFillBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(30, [System.Drawing.ColorTranslator]::FromHtml("#b98952")))
$chipBorderPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(96, [System.Drawing.ColorTranslator]::FromHtml("#b98952")), 1)

$titleFont = New-Object System.Drawing.Font("Georgia", 37, [System.Drawing.FontStyle]::Bold)
$roleFont = New-Object System.Drawing.Font("Segoe UI Semibold", 18, [System.Drawing.FontStyle]::Regular)
$bodyFont = New-Object System.Drawing.Font("Segoe UI", 16, [System.Drawing.FontStyle]::Regular)
$chipFont = New-Object System.Drawing.Font("Segoe UI Semibold", 13, [System.Drawing.FontStyle]::Regular)
$stringFormat = New-Object System.Drawing.StringFormat
$stringFormat.Trimming = [System.Drawing.StringTrimming]::None

$graphics.DrawString("Andrew Lacroce", $titleFont, $titleBrush, 116, 124)
$graphics.DrawString("Technical Program Manager * Engineering Manager", $roleFont, $roleBrush, 118, 210)

$summaryRect = New-Object System.Drawing.RectangleF(118, 292, 610, 110)
$summary = "20+ years leading cross-functional software delivery,`nstrengthening engineering execution, and aligning`nbusiness priorities with team outcomes."
$graphics.DrawString($summary, $bodyFont, $bodyBrush, $summaryRect, $stringFormat)

$chips = @(
    @{ Text = "Program Leadership"; X = 118; Y = 458; W = 176 },
    @{ Text = "Engineering Management"; X = 312; Y = 458; W = 228 },
    @{ Text = "Delivery Execution"; X = 558; Y = 458; W = 170 }
)

foreach ($chip in $chips) {
    $graphics.FillRectangle($chipFillBrush, $chip.X, $chip.Y, $chip.W, 36)
    $graphics.DrawRectangle($chipBorderPen, $chip.X, $chip.Y, $chip.W, 36)
    $graphics.DrawString($chip.Text, $chipFont, $chipTextBrush, $chip.X + 14, $chip.Y + 9)
}

if (Test-Path $profilePath) {
    $profile = [System.Drawing.Image]::FromFile($profilePath)
    $profileSize = 228
    $profileRect = New-Object System.Drawing.Rectangle(892, 148, $profileSize, $profileSize)
    $clipPath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $clipPath.AddEllipse($profileRect)
    $graphics.SetClip($clipPath)
    $graphics.DrawImage($profile, $profileRect)
    $graphics.ResetClip()
    $graphics.DrawEllipse((New-Object System.Drawing.Pen([System.Drawing.ColorTranslator]::FromHtml("#263436"), 10)), $profileRect)
    $graphics.DrawEllipse((New-Object System.Drawing.Pen([System.Drawing.ColorTranslator]::FromHtml("#b98952"), 2)), 880, 136, 252, 252)
    $profile.Dispose()
}

$siteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#b0bbb6"))
$siteFont = New-Object System.Drawing.Font("Segoe UI", 16, [System.Drawing.FontStyle]::Regular)
$graphics.DrawString("andrewlacroce.com", $siteFont, $siteBrush, 906, 430)

$bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)

$titleFont.Dispose()
$roleFont.Dispose()
$bodyFont.Dispose()
$chipFont.Dispose()
$siteFont.Dispose()
$titleBrush.Dispose()
$roleBrush.Dispose()
$bodyBrush.Dispose()
$chipTextBrush.Dispose()
$chipFillBrush.Dispose()
$chipBorderPen.Dispose()
$panelBrush.Dispose()
$tealBrush.Dispose()
$bronzeBrush.Dispose()
$softBronzeBrush.Dispose()
$backgroundBrush.Dispose()
$stringFormat.Dispose()
$graphics.Dispose()
$bitmap.Dispose()
