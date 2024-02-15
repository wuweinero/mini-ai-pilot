<template>
  <div>
    <div class="quesiton-box">
      <ClearOutlined @click="clearHistory" style="font-size: 20px;"/>
      <a-textarea v-model:value="userMessage" :placeholder="questionPlaceholder" 
            :maxlength="maxlength" :auto-size="{maxRows: 5}"
            style="width:88vw; margin:0 12px;"
            @keydown="handleKeydown" ref="textArea"/>
      <SendOutlined v-if="!isFetching" @click="sendMessage(false)" style="font-size: 20px;" />
      <PauseCircleOutlined v-else @click="abortFetching" style="font-size: 20px;" />
    </div>
    
    <div class="display-box" v-if="history.length > 0" ref="displayBox">
      <template v-for="(message, index) in history" :key="index">
        <a-comment>
          <template v-if="message.role === 'user'" #author>{{ userText }}</template>
          <template v-else #author>{{ assistantText }}</template>
          <template v-if="message.role === 'user'" #avatar>
            <a-avatar style="color: #f56a00; background-color: #fde3cf">Q</a-avatar>
          </template>
          <template v-else #avatar>
            <a-avatar style="color: #87ceeb; background-color: #a0ffff">A</a-avatar>
          </template>
          <template #content>
            <MdPreview :modelValue="message.content" theme="dark" />
          </template>
          <template #actions>
            <span key="comment-basic-like">
              <a-tooltip title="Copy">
                <CopyOutlined style="font-size: 16px;" @click="copyContent(message.content)"/>
              </a-tooltip>
            </span>
            <span key="comment-basic-dislike" v-if="message.role === 'assistant' && index==history.length-1">
              <a-tooltip title="Regenerate">
                <RedoOutlined style="font-size: 16px;" @click="sendMessage(true)"/>
              </a-tooltip>
            </span>
          </template>
        </a-comment>
      </template>
    </div>

    <div class="empty-container" v-else>
      <a-empty :image="simpleImage" :description="noContentText" />
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, watch, onMounted, computed, reactive } from 'vue'
import { SendOutlined, PauseCircleOutlined, ClearOutlined,CopyOutlined,RedoOutlined } from '@ant-design/icons-vue';
import { Empty, message } from 'ant-design-vue';
const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
const langFlag = ref('en');
const langMapping = reactive({
  questionPlaceholder: {
    zh: 'Enter发送, Shift+Enter换行',
    en: 'Press Enter to send, Shift+Enter for a new line'
  },
  user: {
    zh: '我',
    en: 'User'
  },
  assistant: {
    zh: 'AI助手',
    en: 'AI Assistant'
  },
  noContent: {
    zh: '暂无内容',
    en: 'No Content'
  }
});
const questionPlaceholder = computed(() => langMapping.questionPlaceholder[langFlag.value]);
const userText = computed(() => langMapping.user[langFlag.value]);
const assistantText = computed(() => langMapping.assistant[langFlag.value]);
const noContentText = computed(() => langMapping.noContent[langFlag.value]);

const vscode = window.acquireVsCodeApi();
const displayBox = ref(null);
const textArea = ref(null);
const userMessage = ref('');
const maxlength = ref(8192)
const history = ref([]);
const isFetching = ref(false);

const clearHistory = () => {
  history.value = [];
  saveState()
}

const copyContent = (content)=>{
  navigator.clipboard.writeText(content).then(function() {
    message.info('复制成功')
  }, function(err) {
    console.error('无法复制内容: ', err);
  });
}

const sendMessage = (reflag) => {
  if(isFetching.value) return
  if(!reflag){
    if (!userMessage.value) return;
    history.value.push({ role: 'user', content: userMessage.value });
    userMessage.value = '';
  }else{
    history.value.pop();
  }
  isFetching.value = true;
  let totalContentLength = history.value.reduce((total, item) => total + item.content.length, 0);
  while (totalContentLength > maxlength.value && history.value.length > 1) {
    history.value.shift();
    history.value.shift();
    totalContentLength = history.value.reduce((total, item) => total + item.content.length, 0);
  }

  nextTick(() => {
    vscode.postMessage({
      command: 'fetch',
      messages: JSON.stringify(history.value)
    });
  })
};

const abortFetching = () => {
  vscode.postMessage({
    command: 'abort-fetch'
  });
};

const handleKeydown = async (event) => {
  if (event.key === 'Enter') {
    if (!event.shiftKey && userMessage.value && !isFetching.value) {
      // 阻止默认事件
      event.preventDefault();
      await sendMessage();
    }
  }
};

onMounted(() => {
  watch(history, () => {
    nextTick(() => {
      const element = displayBox.value;
      element.scrollTop = element.scrollHeight;
    });
  }, { immediate: true, deep: true });

  // 监听vscode的消息
  window.addEventListener('message', event => {
    const {data} = event;
    switch(data.command){
      case 'response':{
        let chunk = data.text;
        if (history.value.length > 0 && history.value[history.value.length - 1].role === 'assistant') {
          history.value[history.value.length - 1].content += chunk;
        } else {
          history.value.push({role: 'assistant', content: chunk});
        }
        if(data.finished){
          isFetching.value = false
          saveState()
        }
        break
      }
      case 'reload':{
        loadState();
        maxlength.value = data.maxLength || 8192
        break;
      }
      case 'select':{
        if (data.text) {
          userMessage.value += (userMessage.value ? '\r\n' : '') + data.text + '\r\n';
          nextTick(() => {
            const textAreaEl = textArea.value.$el
            textAreaEl.scrollTop = textAreaEl.scrollHeight;
          });
        }
        break;
      }
      default:
        break
    }
  })
});

const saveState = () => {
  vscode.setState({ history: history.value});
};

const loadState = () => {
  let state = vscode.getState();
  if (state) {
    history.value = state.history || [];
    langFlag.value = state.langFlag || 'en'
  }
};

</script>


<style scoped>
.quesiton-box{
  padding: 0 24px;
  position: absolute;
  width: 100%;
  bottom: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.display-box{
  padding: 12px 24px;
  overflow: auto;
  height: calc(100vh - 84px);
}

.empty-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 84px);
}
</style>