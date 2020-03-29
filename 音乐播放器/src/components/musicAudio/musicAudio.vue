<!-- 播放器音频核心组件 -->
<template>
  <audio ref="audio" controls preload :src="path" crossOrigin="anonymous"></audio>
</template>

<script>
  import { mapState, mapGetters, mapMutations } from 'vuex'
  // import electron from 'electron'

  export default {
    name: 'musicAudio',
    computed: {
      ...mapState([
        'playStatus', 'currentTime', 'duration', 'currentPoint', 'musicList', 'musicIndex', 'analyser'
      ]),
      ...mapGetters([
        'currentMusicFileName'
      ]),
      path() {
        return 'http://q5y1d5x3s.bkt.clouddn.com/' + this.currentMusicFileName
      }
    },
    watch: {

      /**
       * 监听播放、暂停状态改变
       * -----------------------
       * 将 store 中 playStatus 的变化映射到 audio
       */
      playStatus(newVal, oldVal) {
        if (!this.analyser) {
          this.setAnalyser(this.createAnalyser())
        }
        newVal ? this.$refs.audio.play() : this.$refs.audio.pause()
      },

      /**
       * 监听当前播放时间改变
       * -----------------------
       * 当播放至最后一秒时跳转到下一首
       */
      /* currentTime(newVal, oldVal) {
        if ((oldVal >= this.duration || newVal >= this.duration) && this.playStatus) {
          this.playForward()
        }
      },*/

      /**
       * 监听进度条百分比改变
       * -----------------------
       * 将 store 中 currentPoint 的变化映射到 audio
       */
      currentPoint(newVal, oldVal) {
        this.$refs.audio.currentTime = newVal * this.duration
      }
    },
    methods: {
      ...mapMutations(['setDuration', 'setCurrentTime', 'setCurrentPoint', 'setAnalyser', 'setMusicList', 'setMusicIndex', 'setPlayStatus', 'playForward']),

      /**
       * 创建音乐分析器
       */
      createAnalyser() {
        const AC = new (window.AudioContext || window.webkitAudioContext)()
        const analyser = AC.createAnalyser()
        const gainnode = AC.createGain()
        gainnode.gain.value = 1
        const source = AC.createMediaElementSource(this.$refs.audio)
        source.connect(analyser)
        analyser.connect(gainnode)
        gainnode.connect(AC.destination)
        return analyser
      }
    },
    mounted() {
      /**
       * 监听主进程修改播放列表事件
       * -----------------------
       * 设置播放列表、将播放序号置为0、设置进度条百分比为0、设置播放状态为暂停
       * 如果播放列表为空则设置播放时长为0
       */
      const tempList = [
        { fileName: '红昭愿.mp3', artist: 'aa3', title: '红昭愿', lrc: 'hzy.lrc' },
        { fileName: 'ThatGirl.mp3', artist: 'aa3', title: 'That Girl', lrc: 'ThatGirl.lrc' }
        // { fileName: 'TakeMeToInfinity.mp3', artist: 'aa3', title: 'Take Me To Infinity', lrc: 'TakeMeToInfinity.lrc' }
      ]
      this.setMusicList(tempList)
      this.setMusicIndex(0)
      this.setCurrentPoint(0)
      this.setPlayStatus(false)
      if (!tempList || tempList.length <= 0) {
        this.setDuration(0)
      }

      /**
       * 监听audio加载音乐完成事件
       * -----------------------
       * 设置当前音乐总时长
       * 如果当前处于播放状态则开始播放否则暂停
       */
      this.$refs.audio.addEventListener('loadedmetadata', () => {
        this.setDuration(this.$refs.audio.duration)
        if (this.playStatus) {
          this.$refs.audio.play()
        } else {
          this.$refs.audio.pause()
        }
      })

      /**
       * 监听 audio 当前播放时间改变事件
       * -----------------------
       * 修改 store 中的播放时间
       */
      this.$refs.audio.addEventListener('timeupdate', () => {
        this.setCurrentTime(this.$refs.audio.currentTime)
      })

      /**
       * 监听 audio 当前播放结束
       * -----------------------
       * 重置相关
       */
      this.$refs.audio.addEventListener('ended', () => {
        this.setCurrentTime(0)
        // 判断音乐列表中是否还有其他音乐未播放-则继续播放下一曲
        if (this.musicIndex < this.musicList.length - 1) {
          this.setMusicIndex(this.musicIndex + 1)
          this.$refs.audio.load()
        } else {
          this.setPlayStatus(false)
        }
      })

      /**
       *  设置音乐分析器
       */
      // this.setAnalyser(this.createAnalyser())
    }
  }
</script>

<style lang="less" scoped>
  audio {
    visibility: hidden;
    position: absolute;
    -webkit-app-region: no-drag;
  }
</style>
