<template>
  <div class="main-page">

    <div class="music-name-container">
      <music-name></music-name>
    </div>

    <div class="music-progress-container">
      <music-progress></music-progress>
    </div>

    <div class="music-info-container">
      <music-info></music-info>
    </div>

    <div class="music-control-container">
      <music-control></music-control>
    </div>
    <music-audio></music-audio>
    <music-canvas></music-canvas>
    <div class="music-lrc-container">
      <music-lrc></music-lrc>
    </div>
  </div>
</template>
<script>
  import { musicProgress, musicName, musicInfo, musicControl, musicAudio, musicCanvas, musicLrc } from '@/components'

  export default {
    name: 'mainPage',
    components: {
      musicProgress, musicName, musicInfo, musicControl, musicAudio, musicCanvas, musicLrc
    }
  }
</script>
<style lang="less" scoped>
  .main-page {
    width: 3rem;
    height: 100%;
    // background: #4f4861;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    -webkit-app-region: drag;

    .music-name-container, .music-progress-container, .music-info-container, .music-control-container, .music-lrc-container {
      position: absolute;
      left: 50%;
      transform: translate(-50%);
    }

    .music-name-container {
      position: absolute;
      top: 0.9rem;
      width: 3rem;
      text-align: center;
    }

    .music-progress-container {
      top: 1.4rem;
    }

    .music-info-container {
      top: 1.7rem;
    }

    .music-control-container {
      width: 1rem;
      top: 2rem;
    }
    .music-lrc-container {
      width: 100%;
      top: 3rem;
    }
  }
</style>
