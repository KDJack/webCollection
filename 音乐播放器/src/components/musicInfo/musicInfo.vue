<!-- 播放器时间显示组件 -->
<template>
  <div class="music-info">
    {{currentTimeFormat}} ' {{durationFormat}}
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'musicInfo',
    computed: {
      ...mapGetters(['durationFormat', 'currentTimeFormat'])
    }
  }
</script>

<style lang="less" scoped>
  .music-info {
    color: rgba(182, 133, 255, 0.6);
    font-size: 0.11rem;
    letter-spacing: 1px;
    z-index: -1;
    pointer-events: none;
    user-select: none;
  }
</style>
