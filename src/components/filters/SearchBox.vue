<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: 'Zoek op naam, bedrijf, referentie...' },
  debounce: { type: Number, default: 300 },
})
const emit = defineEmits(['update:modelValue'])

const localVal = ref(props.modelValue)
let timer = null

watch(() => props.modelValue, val => {
  localVal.value = val
})

function onInput(e) {
  localVal.value = e.target.value
  clearTimeout(timer)
  timer = setTimeout(() => {
    emit('update:modelValue', localVal.value)
  }, props.debounce)
}

function clear() {
  localVal.value = ''
  emit('update:modelValue', '')
}
</script>

<template>
  <div class="search-box">
    <input
      type="text"
      :value="localVal"
      :placeholder="placeholder"
      class="search-input"
      @input="onInput"
    />
    <button v-if="localVal" class="search-clear" @click="clear" aria-label="Zoekopdracht wissen">
      <span class="mi">close</span>
    </button>
    <div class="search-icon-area">
      <span class="mi">search</span>
    </div>
  </div>
</template>

<style scoped>
.search-box {
  display: flex;
  align-items: center;
  border: 1px solid var(--n400);
  border-radius: var(--r-s);
  background: var(--n0);
  height: 40px;
  width: 320px;
  overflow: clip;
  box-sizing: border-box;
}
.search-box:hover {
  border-color: var(--n800);
}
.search-box:focus-within {
  border: 2px solid var(--p500);
}

.search-input {
  flex: 1;
  border: none;
  background: none;
  font-family: var(--font);
  font-size: 16px;
  font-weight: 400;
  color: var(--n900);
  outline: none;
  min-width: 0;
  padding: 8px;
  height: 40px;
  letter-spacing: 0px;
}
.search-input::placeholder {
  color: var(--n500);
  font-weight: 400;
  opacity: 1;
}

.search-clear {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--n800);
  padding: 0;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-right: 8px;
}
.search-clear .mi { font-size: 24px; }

.search-icon-area {
  width: 40px;
  height: 40px;
  background: var(--n50);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.search-icon-area .mi {
  font-size: 24px;
  color: var(--n800);
}
</style>
