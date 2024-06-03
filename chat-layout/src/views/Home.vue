<template>
  <div>
    <div class="bottom-box">
      <div class="mode-box">
        <a-tooltip title="快速上下文">
          <FireOutlined @click="instantSetting" style="font-size: 20px; margin-right: 12px;" />
        </a-tooltip>
        <a-tooltip title="设置上下文">
          <SettingOutlined @click="openSettings" style="font-size: 20px; margin-right: 12px;" />
        </a-tooltip>
        <a-tooltip title="清除全部">
          <StopOutlined @click="clearContext" style="font-size: 20px; margin-right: 12px;" />
        </a-tooltip>
        <a-tooltip title="清除聊天">
          <ClearOutlined @click="clearHistory" style="font-size: 20px; margin-right: 12px;" />
        </a-tooltip>
        <a-select v-model:value="selectedMode" style="width: 100px;">
          <a-select-option value="完整代码">完整代码</a-select-option>
          <a-select-option value="片段修改">片段修改</a-select-option>
          <a-select-option value="聊天">聊天</a-select-option>
        </a-select>
      </div>
      <div class="question-box">
        <a-textarea v-model:value="userMessage" placeholder="Enter发送, Shift+Enter换行" 
              :auto-size="{maxRows: 5, minRows: 1}"
              style="flex:1; margin:0 12px;"
              @keydown="handleKeydown" ref="textArea"/>
        <a-tooltip v-if="!isFetching" title="发送消息">
          <SendOutlined @click="sendMessage(false)" style="font-size: 20px;" />
        </a-tooltip>
        <a-tooltip v-else title="取消发送">
          <PauseCircleOutlined @click="abortFetching" style="font-size: 20px;" />
        </a-tooltip>
      </div>
    </div>
    
    
    <div class="display-box" v-if="history.length > 0" ref="displayBox">
      <template v-for="(message, index) in history" :key="index">
        <a-comment>
          <template v-if="message.role === 'user'" #author>我</template>
          <template v-else-if="message.role === 'assistant'" #author>AI助手</template>
          <template v-else #author>系统</template>
          
          <template v-if="message.role === 'user'" #avatar>
            <a-avatar style="color: #f56a00; background-color: #fde3cf">Q</a-avatar>
          </template>
          <template v-else-if="message.role === 'assistant'" #avatar>
            <a-avatar style="color: #87ceeb; background-color: #a0ffff">A</a-avatar>
          </template>
          <template v-else #avatar>
            <a-avatar style="color: #ffffff; background-color: #ffa500">S</a-avatar>
          </template>
          
          <template #content>
            <MdPreview v-if="message.role !== 'user'" :modelValue="message.content" theme="dark" :codeFoldable="false" />
            <pre v-else class="pre-container">{{ message.content }}</pre>
          </template>
          
          <template #actions>
            <span key="comment-basic-like" v-if="message.role !== 'system'">
              <a-tooltip title="删除">
                <DeleteOutlined style="font-size: 16px;" @click="deleteMessage(index)"/>
              </a-tooltip>
            </span>
            <span key="comment-basic-like">
              <a-tooltip title="复制">
                <CopyOutlined style="font-size: 16px;" @click="copyContent(message.content)"/>
              </a-tooltip>
            </span>
            <span key="comment-basic-like" v-if="message.role !== 'system'">
              <a-tooltip title="复制至此">
                <FileTextOutlined style="font-size: 16px;" @click="copyToHere(index)"/>
              </a-tooltip>
            </span>
            <span key="comment-basic-dislike" v-if="message.role === 'assistant' && index === history.length - 1">
              <a-tooltip title="重新生成">
                <RedoOutlined style="font-size: 16px;" @click="sendMessage(true)"/>
              </a-tooltip>
            </span>
          </template>
        </a-comment>
      </template>
    </div>

    <div class="empty-container" v-else>
      <a-empty :image="simpleImage" description="暂无内容" />
    </div>

    <FileTreeModal 
      :visible="isModalVisible" 
      :treeData="fileTreeData" 
      :clickedFiles="clickedFiles"
      @update:visible="isModalVisible = $event"
      @update:clickedFiles="clickedFiles = $event;clearHistory()"
    />
  </div>
</template>

<script setup>
import { ref, nextTick, watch, onMounted } from 'vue';
import { SendOutlined, PauseCircleOutlined, ClearOutlined, CopyOutlined, RedoOutlined, FireOutlined, SettingOutlined, DeleteOutlined, FileTextOutlined, StopOutlined } from '@ant-design/icons-vue';
import { Empty, message } from 'ant-design-vue';
import FileTreeModal from './FileTreeModal.vue';

const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;

let vscode;
if (window.acquireVsCodeApi) {
  vscode = window.acquireVsCodeApi();
} else {
  vscode = {
    postMessage: (message) => {
      console.log('postMessage', message);
    },
    setState: (state) => {
      console.log('setState', state);
    },
    getState: () => {
      return { history: [] };
    }
  };
}

const displayBox = ref(null);
const textArea = ref(null);
const userMessage = ref('');
const history = ref([]);
const isFetching = ref(false);

const isModalVisible = ref(false);
const fileTreeData = ref([]);
const clickedFiles = ref([]);
const selectedMode = ref("完整代码");

const instantSetting = () => {
  vscode.postMessage({ command: 'currentFile' });
  clearHistory();
}

const openSettings = () => {
  vscode.postMessage({ command: 'files' });
  isModalVisible.value = true;
};

const clearContext = () => {
  clickedFiles.value = [];
  clearHistory();
}

const clearHistory = () => {
  history.value = history.value.filter((msg) => msg.role === 'system');
  updateSystemPrompt();
};

const copyContent = (content) => {
  navigator.clipboard.writeText(content).then(function () {
    message.info('复制成功');
  }, function (err) {
    console.error('无法复制内容: ', err);
  });
};

const deleteMessage = (index) => {
  history.value.splice(index, 1);
};

const copyToHere = (index) => {
  let content = '';
  for (let i = 0; i <= index; i++) {
    content += history.value[i].content + '\n\n';
  }
  navigator.clipboard.writeText(content).then(function () {
    message.info('复制成功');
  }, function (err) {
    console.error('无法复制内容: ', err);
  });
};

const sendMessage = (reflag) => {
  if (isFetching.value) return;
  if (!reflag) {
    if (!userMessage.value) return;
    let content = userMessage.value;
    if (selectedMode.value.includes('完整')) {
      content += `\n\n请生成完整的代码。`;
    }else if(selectedMode.value.includes('片段')){
      content += `\n\n只需要告诉我应该怎么修改，不需要生成完整的代码。`;
    }
    history.value.push({ role: 'user', content: content });
    userMessage.value = '';
  } else {
    history.value.pop();
  }
  isFetching.value = true;
  vscode.postMessage({
    command: 'fetch',
    messages: JSON.stringify(history.value)
  });
};

const abortFetching = () => vscode.postMessage({ command: 'abort' });
const updateSystemPrompt = () => vscode.postMessage({ command: 'systemPrompt', clickedFiles: JSON.stringify(clickedFiles.value) });

const handleKeydown = async (event) => {
  if (event.key === 'Enter') {
    if (!event.shiftKey && userMessage.value && !isFetching.value) {
      event.preventDefault();
      await sendMessage();
    }
  }
};

onMounted(() => {
  watch(history, () => {
    saveState();
    nextTick(() => {
      const element = displayBox.value;
      if (element) element.scrollTop = element.scrollHeight;
    });
  }, { deep: true });
  watch(clickedFiles, () => {
    saveState();
    updateSystemPrompt();
  }, { deep: true });
  window.addEventListener('message', event => {
    const { data } = event;
    switch (data.command) {
      case 'response': {
        let chunk = data.text;
        if (history.value.length > 0 && history.value[history.value.length - 1].role === 'assistant') {
          history.value[history.value.length - 1].content += chunk;
        } else {
          history.value.push({ role: 'assistant', content: chunk });
        }
        if (data.finished) {
          isFetching.value = false;
        }
        break;
      }
      case 'reload': {
        loadState();
        break;
      }
      case 'files': {
        fileTreeData.value = JSON.parse(data.files);
        updateClickedFiles();
        break;
      }
      case 'currentFile': {
        clickedFiles.value = data.currentFile ? [data.currentFile] : [];
        updateSystemPrompt();
        break;
      }
      case 'systemPrompt': {
        const { prompt } = data;
        if (history.value.length === 0) {
          history.value.push({ role: 'system', content: prompt });
        } else if (history.value[0].role === 'system') {
          history.value[0].content = prompt;
        } else {
          history.value.unshift({ role: 'system', content: prompt });
        }
        break;
      }
      default:
        break;
    }
  });
});

const saveState = () => {
  console.log('save', history.value, clickedFiles.value);
  vscode.setState({ 
    history: history.value,
    clickedFiles: clickedFiles.value
  });
};

const loadState = () => {
  let state = vscode.getState();
  console.log('load', state);
  if (state) {
    history.value = state.history || [];
    clickedFiles.value = state.clickedFiles || [];
  }
};

const updateClickedFiles = () => {
  const flattenFileTree = (nodes) => {
    let keys = [];
    nodes.forEach(node => {
      keys.push(node.key);
      if (node.isFolder && node.children.length > 0) {
        keys = keys.concat(flattenFileTree(node.children));
      }
    });
    return keys;
  };

  const allKeys = flattenFileTree(fileTreeData.value);
  clickedFiles.value = clickedFiles.value.filter(key => allKeys.includes(key));
};

</script>

<style scoped>
.bottom-box {
  padding: 0 24px 0 12px;
  position: absolute;
  width: 100%;
  bottom: 30px;
  z-index: 999;
  height: 72px;
}

.mode-box {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  padding-left: 12px;
}

.question-box {
  display: flex;
  align-items: center;
}

.display-box {
  padding: 12px 24px;
  overflow: auto;
  height: calc(100vh - 120px);
}

.empty-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 120px);
}

.pre-container {
  max-width: 100%;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: "Microsoft YaHei", sans-serif;
  font-size: 16px;
}
</style>
