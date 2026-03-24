@echo off
REM ================================
REM Khun System Build Script
REM ================================

REM Load Visual Studio environment
call "C:\Program Files\Microsoft Visual Studio\18\Community\VC\Auxiliary\Build\vcvars64.bat"

REM Set Vulkan SDK path (fallback if env not set)
IF "%VULKAN_SDK%"=="" (
    SET VULKAN_SDK=C:\VulkanSDK\1.4.341.1
)

REM Debug print
echo.
echo ===== Build Config =====
echo VULKAN_SDK = %VULKAN_SDK%
echo ========================
echo.

REM Compiler flags
SET INCLUDES=/Isrc /I"%VULKAN_SDK%\Include"
SET DEFINES=/DDEBUG
SET FLAGS=/EHsc /std:c++17 /nologo

REM Linker flags
SET LINKS=/link /LIBPATH:"%VULKAN_SDK%\Lib" vulkan-1.lib

REM Output
SET OUTPUT=/Fe:bin\app.exe

REM Create bin folder if not exist
IF NOT EXIST bin (
    mkdir bin
)

echo Khun System Building ------
echo.

REM Compile
cl %FLAGS% %INCLUDES% %DEFINES% src\main.cpp %OUTPUT% %LINKS%

IF %ERRORLEVEL% NEQ 0 (
    echo.
    echo Build Failed
    exit /b %ERRORLEVEL%
)

echo.
echo Build Success!
echo Output: bin\app.exe

REM Copy Vulkan runtime DLL (important)
copy "%VULKAN_SDK%\Bin\vulkan-1.dll" bin\ >nul 2>&1

echo.
echo Ready to run!