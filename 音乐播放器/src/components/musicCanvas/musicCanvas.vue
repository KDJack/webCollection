<!-- 播放器Canvas组件 -->
<template>
  <canvas ref="canvas" id="canvas" :width="width" :height="height"></canvas>
</template>

<script>
  import { mapState } from 'vuex'
  import { remToPx, changePx } from '@/utils/index'

  export default {
    name: 'musicCanvas',
    computed: {
      ...mapState([
        'analyser'
      ])
    },
    data() {
      return {
        width: remToPx(3),
        height: remToPx(3),
        canvas: null
      }
    },
    methods: {
      /**
       * 创建 canvas 上下文
       */
      createCtx() {
        const canvas = this.$refs.canvas
        const ctx = canvas.getContext('2d')
        ctx.lineWidth = 2
        const gnt1 = ctx.createRadialGradient(remToPx(1.5), remToPx(1.5), remToPx(0.5), remToPx(1.5), remToPx(1.5), remToPx(1.2))
        gnt1.addColorStop(0, '#a58ff6')
        gnt1.addColorStop(0.8, '#b199f6')
        gnt1.addColorStop(1, '#ab84f6')
        ctx.strokeStyle = gnt1
        ctx.fillStyle = gnt1
        ctx.fillRect(0, 0, remToPx(3), remToPx(3))
        this.canvas = ctx
        return ctx
      },

      /**
       * Canvas 动画
       */
      animateCanvas(ctx) {
        ctx.clearRect(0, 0, remToPx(3), remToPx(3))
        let arrayLength = 0
        if (this.analyser) {
          this.analyser.fftSize = 1024
          arrayLength = this.analyser.frequencyBinCount
        }
        const array = new Uint8Array(arrayLength)
        ctx.beginPath()
        this.analyser && this.analyser.getByteFrequencyData(array)
        for (let i = 0; i < 512; i++) {
          this.drawOuter(array, i, ctx)
          this.drawInner(array, i, ctx)
          this.drawLine(array, i, ctx)
        }
        ctx.stroke()
        ctx.fill()
        requestAnimationFrame(() => {
          this.animateCanvas(ctx)
        })
      },

      /**
       * 绘制内圈 point
       */
      drawInner(array, i, ctx) {
        if (i < 136) {
          const point = i % 9 > 4 ? (9 - i % 9) : (i % 9)
          let value = (array[i]) * 120 / 256 * ((5 - point) / 5)
          if (value > 70) {
            value = changePx((value - 70) * 120 / 50)
          } else {
            value = 0
          }
          ctx.moveTo((Math.sin(((i) * 4 / 3) / 180 * Math.PI) * (remToPx(0.99) - value) + remToPx(1.5)), Math.cos(((i) * 4 / 3) / 180 * Math.PI) * (remToPx(0.99) - value) + remToPx(1.5))
          ctx.arc((Math.sin(((i) * 4 / 3) / 180 * Math.PI) * (remToPx(0.99) - value) + remToPx(1.5)), Math.cos(((i) * 4 / 3) / 180 * Math.PI) * (remToPx(0.99) - value) + remToPx(1.5), 0.6, 0, 2 * Math.PI)

          ctx.moveTo((-Math.sin(((i) * 4 / 3) / 180 * Math.PI) * (remToPx(0.99) - value) + remToPx(1.5)), Math.cos(((i) * 4 / 3) / 180 * Math.PI) * (remToPx(0.99) - value) + remToPx(1.5))
          ctx.arc((-Math.sin(((i) * 4 / 3) / 180 * Math.PI) * (remToPx(0.99) - value) + remToPx(1.5)), Math.cos(((i) * 4 / 3) / 180 * Math.PI) * (remToPx(0.99) - value) + remToPx(1.5), 0.6, 0, 2 * Math.PI)
        }
      },

      /**
       * 绘制外圈 bar
       */
      drawOuter(array, i, ctx) {
        if (i > 130 && i < 271) {
          let value = (array[i]) * 120 / 256
          if (value > 20) {
            value = changePx(value - remToPx(0.1))
          } else {
            value = 0
          }
          ctx.moveTo(Math.sin((i * 4 / 3) / 180 * Math.PI) * remToPx(1) + remToPx(1.5), Math.cos((i * 4 / 3) / 180 * Math.PI) * remToPx(1) + remToPx(1.5))
          ctx.lineTo(Math.sin((i * 4 / 3) / 180 * Math.PI) * (remToPx(1) + value) + remToPx(1.5), Math.cos((i * 4 / 3) / 180 * Math.PI) * (remToPx(1) + value) + remToPx(1.5))

          ctx.moveTo(-Math.sin((i * 4 / 3) / 180 * Math.PI) * remToPx(1) + remToPx(1.5), Math.cos((i * 4 / 3) / 180 * Math.PI) * remToPx(1) + remToPx(1.5))
          ctx.lineTo(-Math.sin((i * 4 / 3) / 180 * Math.PI) * (remToPx(1) + value) + remToPx(1.5), Math.cos((i * 4 / 3) / 180 * Math.PI) * (remToPx(1) + value) + remToPx(1.5))
        }
      },
      /**
       * 绘制中间进度条
       */
      drawLine(array, i, ctx) {
        if (i < remToPx(0.605)) {
          ctx.moveTo(remToPx(2.4) - i * 3, remToPx(1.46))
          ctx.lineTo(remToPx(2.4) - i * 3, remToPx(1.46) - (array[i] > 50 ? Math.abs(array[i] % remToPx(0.5) - remToPx(0.25)) : 0))
          ctx.moveTo(remToPx(2.4) - i * 3, remToPx(1.46))
          ctx.lineTo(remToPx(2.4) - i * 3, remToPx(1.46) + (array[i] > 50 ? Math.abs(array[i] % remToPx(0.5) - remToPx(0.25)) : 0))
        }
      }
    },
    mounted() {
      const ctx = this.createCtx()
      requestAnimationFrame(() => {
        this.animateCanvas(ctx)
      })
      // 挂在窗体大小变化
      window.onresize = () => {
        this.width = remToPx(3)
        this.height = remToPx(3)
        this.createCtx()
        this.canvas.clearRect(0, 0, remToPx(3), remToPx(3))
      }
    }
  }
</script>

<style lang="less" scoped>
  #canvas {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    user-select: none;
  }
</style>
