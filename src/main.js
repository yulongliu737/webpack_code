import count from './js/count'
import sum from './js/sum';
import "./css/index.css"
import "./less/index.less"
import "./sass/index.sass"
import "./sass/index.scss"
import "./stylus/index.styl"
import "./css/iconfont.css"
// import 'core-js' // 手动加载
import 'core-js/es/promise' // 按需加载

console.log(count(2,1))
console.log(sum(1,2,3,4))

new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(100)
    })
}).then(res => {
    console.log(res)
})