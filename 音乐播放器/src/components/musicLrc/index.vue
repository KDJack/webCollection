<template>
  <div class="music-lrc-main" :style="{'line-height': lineHeight + 'rem'}">
    <!--<div class="current-line"></div>-->
    <div class="music-lrc-list" ref="musicLrcList" :style="{ 'transform': 'translatey(' + tranY + 'rem)' }">
      <span v-for="(item, i) in lrcTextList" :key="i" :class="[i === currentIndex ? 'active' : '']">{{ item }}</span>
    </div>
  </div>
</template>
<script>
  import { mapState, mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapState([
        'playStatus', 'currentTime', 'duration', 'currentPoint', 'musicList', 'musicIndex', 'analyser'
      ]),
      ...mapGetters([
        'currentMusicLrcName'
      ])
    },
    watch: {
      currentTime() {
        this.calcChangeRem()
      },
      playStatus(val) {
        if (val) {
          // this.changeTranY()
        }
      },
      musicIndex() {
        this.downLoadLrcFile()
      }
    },
    data() {
      return {
        lrcTimeList: [],
        lrcTextList: [],
        tranY: 0.5,
        lineHeight: 0.18,
        currentIndex: 0
      }
    },
    methods: {
      downLoadLrcFile() {
        this.lrcTimeList = []
        this.lrcTextList = []
        const that = this
        let xmlHttp = null
        try {
          xmlHttp = new XMLHttpRequest()
        } catch (e) {
          xmlHttp = false
        }
        xmlHttp.overrideMimeType('charset=utf-8')
        // xmlHttp.responseType = 'blob'
        xmlHttp.open('POST', 'http://q5y1d5x3s.bkt.clouddn.com/' + this.currentMusicLrcName, true)
        xmlHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF8')
        xmlHttp.onload = function(e) {
          // 下载完成
          const lrcs = this.response.split('\n')
          if (lrcs && lrcs.length > 0) {
            for (let i = 0; i < lrcs.length; i++) {
              lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, '').split(/\[(.+?)\]/g) // 去除前后空格
              if (lrcs[i].length === 3) {
                if (that.getLrcTime(lrcs[i][1])) {
                  that.lrcTextList.push(lrcs[i][2])
                }
              }
            }
            // 这里处理一下头和尾
            if (that.lrcTimeList[0] > 0) {
              that.lrcTimeList.splice(0, 1, 0)
              that.lrcTextList.splice(0, 1, '')
            }
            if (that.lrcTimeList[that.lrcTimeList.length - 1] < that.duration * 1) {
              that.lrcTimeList.push(that.duration)
              that.lrcTextList.push('')
            }
          }
        }
        xmlHttp.send(null)
      },
      getLrcTime(timeStr) {
        if (!/^[0-5][0-9]:[0-5][0-9].([0-9]{2,})$/.test(timeStr)) {
          return false
        }
        const timeList = timeStr.split(':')
        if (timeList.length === 2) {
          this.lrcTimeList.push(timeList[0] * 60 + timeList[1] * 1)
        }
        return true
      },
      calcChangeRem() {
        if (this.currentTime <= 0) {
          return false
        }
        // 查询当前的time所在index
        let startTime
        let endTime
        for (let i = 0; i < this.lrcTimeList.length; i++) {
          startTime = this.lrcTimeList[i]
          endTime = this.lrcTimeList[i + 1] || 9999
          if (this.currentTime > startTime && this.currentTime < endTime) {
            if (this.currentIndex !== i) {
              this.currentIndex = i
            }
            this.tranY = 0.5 - i * this.lineHeight - this.lineHeight / (endTime - startTime) * (this.currentTime - startTime)
            break
          }
        }
      }
    },
    mounted() {
      this.downLoadLrcFile()
    }
  }
</script>
<style lang="less" scoped>
  .music-lrc-main {
    font-size: 0.09rem;
    width: 100%;
    color: #b47fde;
    height: 100%;
    overflow: hidden;
    position: relative;
    .current-line {
      left: 10%;
      width: 80%;
      height: 2px;
      position: absolute;
      background: rgba(242, 198, 255, 0.5);
      top: 0.5rem;
    }
    .music-lrc-list {
      display: flex;
      flex-direction: column;
      text-align: center;
      .active {
        color: #e9c3ff;
      }
    }
  }
</style>
