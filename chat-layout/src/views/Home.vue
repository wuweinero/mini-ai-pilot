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
        <a-select v-model:value="mode" :dropdown-match-select-width="false" placement="topLeft" size="small" @change="handleModeChange" style="width: 80px; margin-right: 12px;">
          <a-select-option v-for="item in modes" :key="item" :value="item">{{ item }}</a-select-option>
        </a-select>
        <a-select v-model:value="model" :dropdown-match-select-width="false" placement="topLeft" size="small" @change="handleModelChange" style="width: 120px;">
          <a-select-option v-for="item in models" :key="item" :value="item">{{ item }}</a-select-option>
        </a-select>
      </div>
      <div class="mode-box">
        <a-textarea v-model:value="userMessage" placeholder="Enter发送, Shift+Enter换行" 
              :auto-size="{maxRows: 10, minRows: 1}"
              style="flex:1; margin-right: 12px;" allowClear
              @keydown="handleKeydown" ref="textArea"/>
        <a-tooltip v-if="!isFetching" title="发送">
          <SendOutlined @click="sendMessage(false)" style="font-size: 20px;" />
        </a-tooltip>
        <a-tooltip v-else title="终止">
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
const allowAutoScroll = ref(true);
const modes = ref(['默认源', '备用源']);
const mode = ref('默认源');
const models = ref([]);
const model = ref('');

const handleModeChange = (value) => {
  mode.value = value;
  vscode.postMessage({ command: 'mode', mode: mode.value });
};

const handleModelChange = (value) => {
  model.value = value
  saveState();
}

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
    if (!userMessage.value){
      message.info('请先输入您的问题');
      return;
    }
    let content = userMessage.value;
    history.value.push({ role: 'user', content });
    userMessage.value = '';
  } else {
    history.value.pop();
  }
  isFetching.value = true;
  vscode.postMessage({
    command: 'fetch',
    messages: JSON.stringify(history.value),
    model: model.value,
    mode: mode.value
  });
  setTimeout(() => {
    const element = displayBox.value;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
    allowAutoScroll.value = true;
  }, 100)
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
  loadState();
  watch(history, () => {
    saveState();
    nextTick(() => {
      const element = displayBox.value;
      if (element && allowAutoScroll.value) {
        const delta = element.scrollHeight - element.scrollTop - element.clientHeight;
        if(delta < 300){
          element.scrollTop = element.scrollHeight;
        }else{
          allowAutoScroll.value = false;
        }
      }
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
      case 'models':{
        models.value = JSON.parse(data.models)
        if(!models.value.includes(model.value)){
          model.value = models.value[0]
        }
        saveState()
        break;
      }
      default:
        break;
    }
  });
  vscode.postMessage({ command: 'mode', mode: mode.value });
});

const loadState = () => {
  let state = vscode.getState();
  if (state) {
    history.value = state.history || [];
    clickedFiles.value = state.clickedFiles || [];
    mode.value = state.mode || '默认源';
    model.value = state.model || '';
  }
};

const saveState = () => {
  vscode.setState({
    history: history.value,
    clickedFiles: clickedFiles.value, 
    mode: mode.value, 
    model: model.value
   });
}

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
  padding: 12px 24px 0 12px;
  position: absolute;
  width: 100%;
  bottom: 30px;
  z-index: 999;
  background-color: #141414;
}

.mode-box {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  width: 100%;
  padding-left: 12px;
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
