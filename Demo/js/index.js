
/**
 * 同步获取第二天时间戳
 */
async function getNextDay() {
    /*const date = new Date()
    date.setDate(date.getDate() + 1)
    return date.getTime()*/
    await setTimeout(() => {
        console.log('aaaaaaaaaaaaa')
    }, 3000)
    return 100
}

getNextDay().then((data) => {
    console.log(data)
})
