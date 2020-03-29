<!-- Created By liuhuihao 2018/5/25 10:38  -->
<!-- 播放器歌曲名称组件 -->
<template>
  <div class="music-name">
    {{currentMusicTitle}}
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'musicName',
    computed: {
      ...mapGetters([
        'currentMusicTitle'
      ])
    }
  }
</script>

<style lang="less" scoped>
  .music-name {
    color: rgba(211, 140, 255, 0.8);
    font-size: 0.16rem;
    letter-spacing: -1px;
    pointer-events: none;
    user-select: none;
  }
</style>
