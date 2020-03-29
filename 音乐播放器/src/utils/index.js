/**
 * 转换时间
 * @param time
 * @returns {*}
 */
export const parseTime = (time) => {
  const source = parseInt(time)
  if (source) {
    let min = parseInt(source / 60)
    let sec = source % 60
    if (min < 10) {
      min = '0' + min
    }
    if (sec < 10) {
      sec = '0' + sec
    }
    return min + ':' + sec
  } else {
    return '00:00'
  }
}

export const remToPx = (rem) => {
  const width = window.screen.width
  let px = 1
  if (width < 360) {
    // 500%
    px = 80
  } else if (width >= 360 && width < 420) {
    // 1rem = 100px   625%倍font-size
    px = 100
  } else if (width >= 420 && width < 639) {
    // 875%
    px = 140
  } else {
    // 1250%
    px = 200
  }
  return px * rem
}

/**
 * 改变px的值
 * @param data
 * @returns {number}
 */
export const changePx = (data) => {
  const width = window.screen.width
  let ratio = 1
  if (width < 360) {
    ratio = 0.4
  } else if (width >= 360 && width < 420) {
    ratio = 0.5
  } else if (width >= 420 && width < 639) {
    ratio = 0.7
  } else {
    ratio = 1
  }
  return data * ratio
}
