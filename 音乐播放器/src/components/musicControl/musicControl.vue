<!-- 播放控制按钮组件 -->
<template>
  <div class="music-control">
    <template v-if="!musicListIsEmpty">
      <i class="fa iconziyuan1" @click="playBackward"></i>
      <i class="fa" :class="[{'iconzanting': playStatus}, {'iconbofang': !playStatus}]" @click="togglePlayState"></i>
      <i class="fa iconziyuan" @click="playForward"></i>
    </template>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'musicControl',
    computed: {
      ...mapState([
        'playStatus', 'musicList'
      ]),
      ...mapGetters([
        'musicListIsEmpty'
      ])
    },
    methods: {
      ...mapMutations(['togglePlayState', 'playBackward', 'playForward'])
    }
  }
</script>

<style lang="less" scoped>
  .music-control {
    width: 0.95rem;
    display: flex;
    justify-content: space-between;
    i {
      font-size: 0.14rem;
      cursor: pointer;
      color: rgba(182, 133, 255, 0.6);
      -webkit-app-region: no-drag;
    }
  }
</style>
