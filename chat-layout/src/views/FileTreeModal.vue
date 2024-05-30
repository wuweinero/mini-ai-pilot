<template>
  <a-modal v-model:visible="isVisible" title="上下文" @cancel="handleCancel" width="90vw" :footer="null">
    <div style="max-height: 80vh; overflow-y: auto;">
      <a-tree :treeData="formattedTreeData" :defaultExpandAll="false" @select="handleSelect" />
      <div style="margin-top: 20px;">
        <template v-if="clickedFiles.length === 0">
          <a-empty description="点击选择上下文" />
        </template>
        <a-list v-else :dataSource="clickedFiles" bordered>
          <a-list-item v-for="(file, index) in clickedFiles" :key="file">
            <template #default>
              <span>{{ file }}</span>
            </template>
            <template #actions>
              <UpOutlined @click="moveUp(index)" />
              <DownOutlined @click="moveDown(index)" />
              <DeleteOutlined @click="removeFile(index)" />
            </template>
          </a-list-item>
        </a-list>
        <template v-if="clickedFiles.length > 0">
          <a-button type="primary" @click="clearAll" style="margin-top: 10px; display: block; margin-left: auto; margin-right: auto;">
            <DeleteOutlined /> 清空上下文
          </a-button>
        </template>
      </div>
    </div>
  </a-modal>
</template>

<script setup>
import { ref, watch } from 'vue';
import { UpOutlined, DownOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  treeData: {
    type: Array,
    required: true
  },
  clickedFiles: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['update:visible', 'update:clickedFiles']);

const isVisible = ref(props.visible);

watch(() => props.visible, (newVal) => {
  isVisible.value = newVal;
});

const handleCancel = () => {
  emit('update:visible', false);
};

const formattedTreeData = ref(formatTreeData(props.treeData));

watch(() => props.treeData, (newVal) => {
  formattedTreeData.value = formatTreeData(newVal);
});

function formatTreeData(data) {
  return data.map(item => {
    const formattedItem = { 
      title: item.name, 
      key: item.key 
    };
    if (item.isFolder && item.children && item.children.length) {
      formattedItem.children = formatTreeData(item.children);
    }
    return formattedItem;
  });
}

const handleSelect = (keys, event) => {
  const key = keys[0];
  if (!event.node.children) {
    const index = props.clickedFiles.indexOf(key);
    const updatedFiles = [...props.clickedFiles];
    if (index !== -1) {
      updatedFiles.splice(index, 1);
    }
    if (key) {
      updatedFiles.push(key);
    }
    emit('update:clickedFiles', updatedFiles);
  }
};

const moveUp = (index) => {
  if (index > 0) {
    const updatedFiles = [...props.clickedFiles];
    const temp = updatedFiles[index];
    updatedFiles.splice(index, 1);
    updatedFiles.splice(index - 1, 0, temp);
    emit('update:clickedFiles', updatedFiles);
  }
};

const moveDown = (index) => {
  if (index < props.clickedFiles.length - 1) {
    const updatedFiles = [...props.clickedFiles];
    const temp = updatedFiles[index];
    updatedFiles.splice(index, 1);
    updatedFiles.splice(index + 1, 0, temp);
    emit('update:clickedFiles', updatedFiles);
  }
};

const removeFile = (index) => {
  const updatedFiles = [...props.clickedFiles];
  updatedFiles.splice(index, 1);
  emit('update:clickedFiles', updatedFiles);
};

const clearAll = () => {
  emit('update:clickedFiles', []);
};

</script>

<style scoped>
.ant-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ant-list-item-actions {
  display: flex;
  gap: 10px;
}
</style>
