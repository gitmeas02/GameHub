#include <windows.h>
#include <tchar.h>
#include <iostream>
#include <vulkan/vulkan.h>

// Window procedure
LRESULT CALLBACK WindowProc(HWND hwnd, UINT uMsg, WPARAM wParam, LPARAM lParam) {
    switch (uMsg) {
    case WM_DESTROY:
        PostQuitMessage(0);
        return 0;

    case WM_PAINT:
        {
            PAINTSTRUCT ps;
            HDC hdc = BeginPaint(hwnd, &ps);
            RECT rect;
            GetClientRect(hwnd, &rect);
            FillRect(hdc, &rect, (HBRUSH)(COLOR_WINDOW+1)); // White background
            EndPaint(hwnd, &ps);
        }
        return 0;
    }
    return DefWindowProc(hwnd, uMsg, wParam, lParam);
}

int main() {
    HINSTANCE hInstance = GetModuleHandle(nullptr);

    // Register window class
    WNDCLASS wc = {};
    wc.lpfnWndProc = WindowProc;
    wc.hInstance = hInstance;
    wc.lpszClassName = _T("MyWin32Window");
    wc.hIcon = LoadIcon(nullptr, IDI_APPLICATION); // default icon

    if (!RegisterClass(&wc)) {
        std::cerr << "Failed to register window class!\n";
        return -1;
    }

    // Create window
    HWND hwnd = CreateWindowEx(
        0,
        wc.lpszClassName,
        _T("Hello Vulkan Window"),
        WS_OVERLAPPEDWINDOW,
        CW_USEDEFAULT, CW_USEDEFAULT, 800, 600,
        nullptr, nullptr, hInstance, nullptr
    );

    if (!hwnd) {
        std::cerr << "Failed to create window!\n";
        return -1;
    }

    ShowWindow(hwnd, SW_SHOW);

    // Vulkan instance
    VkApplicationInfo appInfo{};
    appInfo.sType = VK_STRUCTURE_TYPE_APPLICATION_INFO;
    appInfo.pApplicationName = "Hello Vulkan Window";
    appInfo.pEngineName = "No Engine";
    appInfo.apiVersion = VK_API_VERSION_1_0;

    VkInstanceCreateInfo instanceInfo{};
    instanceInfo.sType = VK_STRUCTURE_TYPE_INSTANCE_CREATE_INFO;
    instanceInfo.pApplicationInfo = &appInfo;

    VkInstance instance;
    VkResult result = vkCreateInstance(&instanceInfo, nullptr, &instance);
    if (result != VK_SUCCESS) {
        std::cerr << "Failed to create Vulkan instance!" << std::endl;
    } else {
        std::cout << "Successfully created Vulkan instance!" << std::endl;
    }

    // Main message loop
    MSG msg = {};
    while (GetMessage(&msg, nullptr, 0, 0)) {
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }

    // Clean up Vulkan
    vkDestroyInstance(instance, nullptr);

    return 0;
}