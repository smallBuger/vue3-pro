const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class MyPromise {
  #state = 'pending'
  #value = 0
  #handlers = []
  constructor(executor){
    const resolve = (val) => {
     this.#setState(FULFILLED,val)
    }
    const reject = (reason) => {
      this.#setState(REJECTED,reason)
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }

  }
/**
 * 设置promise的状态和值
 * 此函数仅在当前状态为'pending'时更改状态和值，以确保状态改变的正确性
 * @param {string} state - 新的状态，应为'fulfilled'或'rejected'
 * @param {*} value - 与新状态关联的值，可以是任意类型
 */
  #setState(state:string,value){
    // 检查当前状态是否为'pending'，只有在此状态下才允许更改
    if (this.#state !== PENDING) return
    // 更新promise的值
    this.#value = value
    // 更新promise的状态
    this.#state = state
    // 如果有等待处理程序，调用它们
    this.#runTask()
  }
  #runTask(){
    queueMicrotask(()=>{ //注册微任务
      if(this.#state !== PENDING) {
        this.#handlers.forEach(cb => cb());
        this.#handlers = []
      }
    })


  }
  then(onFulfilled,onRejected){
    return new MyPromise((resolve,reject) => {
      this.#handlers.push(() => {
        try {
          const  cb = this.#state === FULFILLED ? onFulfilled : onRejected
          const result = typeof cb == 'function' ? cb(this.#value) : this.#value
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })

      this.#runTask()

    })
  }

}
const p = new MyPromise((resolve,reject) => {
    resolve(2)
})
export default p
