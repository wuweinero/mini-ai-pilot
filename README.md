# MINI AI PILOT: A Minimalist AI Programming Assistant That Supports Local Large Models

[中文文档](./README_CN.md)

## Example
![Demonstration Gif](./demo.gif)

## Features 🔥
- Supports Openai API
- Supports Local LLM
- Supports code completion
- Supports chat functionality
- Supports question and answer for selected code
- Supports Windows systems

## Installation ⬇️ 
- Search for "Mini AI Pilot" in the Visual Studio Code extension market and click to install.
- Option 1: Deploy a local LLM server compatible with OpenAI's API.
  - You can choose to set up your own LLM server, as long as it is compatible with the OpenAI interface.
  - It is recommended to use [text-generation-webui](https://github.com/oobabooga/text-generation-webui) to deploy your own LLM, and [deepseek-coder-instruct](https://github.com/deepseek-ai/DeepSeek-Coder) for the model. If your computer has high configuration, you can use the 33B model; otherwise, it is recommended to use the 6.7B or 1.3B model.
  - If you don't know how to deploy or face difficulties, you can download and use my configured and packaged [version](https://pan.baidu.com/s/16uU5ToqEHEaMtFJbF05EGg?pwd=1234), after unzipping, just double click on start_windows.bat to start the service. To adapt to more people's computers, the default is the 1.3B version.
- Option 2: To use the OpenAI's API, you need to obtain an API key, and then you can simply configure it in the plugin settings.

## Usage 🚀 
- Code completion: Press the hotkey "Alt + Q" or select the "AutoComplete" option from the right-click menu. Then, press "Tab" to enter the code.
- AI chat: This feature can be accessed from the sidebar menu. Additionally, you can select a code segment and question it.

## Common QAs
#### Q: What is the character or token limit per query?
A: The maximum length of a single input is 4000 characters. In the chat function, you cannot continue typing if you exceed 4000 characters. In the code completion function, characters exceeding 4000 will be automatically truncated.
#### Q: What system requirements does my computer need to meet to deploy a local LLM?
A: Currently, in the author's tests, the lowest 4G of VRAM can use the 1.3B model without pressure. If your computer has lower specs, you can modify the 36 after the n-gpu-layers in CMD_FLAGS.txt to 0, which will completely use the CPU for calculations, but note that this will significantly reduce the speed.
#### Q: Why does code completion seem slower than Q&A?
A: Code completion is not streamed, it only returns results after all are generated, which is as fast as streamed return. And, the generation speed is related to your computer configuration. If your computer's configuration is low, it is recommended to wait a moment after pressing Alt+Q.
#### Q: Does it support auto-triggering code completion after input or line break?
A: This plugin only supports active triggering of completion (Alt+Q or right-click menu), because the author found automatic completion very confusing when using other plugins.
#### Q: What operating systems are supported?
A: The one-click LLM deployment package uploaded by the author only supports Windows systems. If you need to use it on other systems, you can install and deploy it yourself according to the official documentation of [text-generation-webui](https://github.com/oobabooga/text-generation-webui).

## Suggestions and Feedback
For any suggestions or feedback, you can contact me at wuwei_nero@163.com or leave a message in the issues.

## License
This project is licensed under the MIT License.