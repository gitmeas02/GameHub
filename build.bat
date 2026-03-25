@echo off
REM ================================
REM Build Win32 Vulkan Window App
REM ================================

REM Load Visual Studio environment
call "C:\Program Files\Microsoft Visual Studio\18\Community\VC\Auxiliary\Build\vcvars64.bat"

REM Vulkan SDK fallback
IF "%VULKAN_SDK%"=="" (
    SET VULKAN_SDK=C:\VulkanSDK\1.4.341.1
)

REM Debug info
echo.
echo ===== Build Config =====
echo VULKAN_SDK = %VULKAN_SDK%
echo ========================
echo.

REM Create bin folder
IF NOT EXIST bin (
    mkdir bin
)

REM Compile and link
cl /EHsc /std:c++17 src\main.cpp /Fe:bin\app.exe user32.lib gdi32.lib kernel32.lib /I"%VULKAN_SDK%\Include" /link /LIBPATH:"%VULKAN_SDK%\Lib" vulkan-1.lib

IF %ERRORLEVEL% NEQ 0 (
    echo.
    echo  Build Failed
    exit /b %ERRORLEVEL%
)

echo.
echo  Build Success!
echo Output: bin\app.exe

REM Copy Vulkan runtime DLL
copy "%VULKAN_SDK%\Bin\vulkan-1.dll" bin\ >nul 2>&1

echo.
echo  Ready to run!