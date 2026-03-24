#include <vulkan/vulkan.h>
#include <iostream>
int main(){
  VkApplicationInfo appInfo = {};
  appInfo.sType = VK_STRUCTURE_TYPE_APPLICATION_INFO;
  appInfo.pApplicationName = "Hello Triangle";
  appInfo.pEngineName = "No Engine";

  VkInstanceCreateInfo instanceInfor = {};
  instanceInfor.sType = VK_STRUCTURE_TYPE_INSTANCE_CREATE_INFO;
  
  instanceInfor.pApplicationInfo = &appInfo;
  

  VkInstance instance;
  VkResult  result = vkCreateInstance(&instanceInfor,0,&instance);
  if(result != VK_SUCCESS){
     std::cout << "failed to create instance!" << std::endl;
     return -1;
  }else{
     std::cout << "successfully create instance!" << std::endl;
  }
  return 0;
}