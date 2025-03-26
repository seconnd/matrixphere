// import { m$, stateObservable } from './dist/index.es.js'
// import { filter } from 'rxjs'
// console.log(m$)

// const { m$ } = require('./dist/index.es.js')
// const { m$, stateObservable } = require('./dist/index.es.js');
console.log(Matrixphere.m$)
m$ = Matrixphere.m$

m$.set({
    name: 'test', // string
    value: 'test', // any, 상태의 초기값
    actions: [{
        name: 'action1', // string
        method: (data) => {
            // 해당 상태의 본 액션을 호출할때 실행할 스크립트
            return data // 리턴할 떄는 data형식 그대로 리턴해주어야함.
        }
        // actions는 observable을 사용할 수 없음.
    }],
    // 실행하기 전 사전에 실행되는 스크립트
    // 일반 함수는 data형식 그대로 리턴해야하며 observable 구조는 리턴 없음. 혼용 가능.
    before: (data) => {
            return data
    },
    after: (data) => {
        // 해당 상태 호출이 끝나고 실행할 스크립트
        // 리턴 없음
    },
    undo: (data) => {
        // 해당 상태의 undo시 실행할 스크립트
        // 리턴 없음
    },
    // 아래와 같이 rxjs observable 구조로도 사용 가능.
    // redo: new stateObservable()
    //     .pipe(
    //         filter( (data) => {
    //             console.log(data)
    //             console.log('pipe')
    //             return true
    //         })
    //     ).subscribe({
    //         next: (data) => {
    //             console.log('next')
    //         }
    //     })
})

console.log(m$.getState())

m$.update('test', 'test2')
console.log(m$.getState())

m$.set({
    name: 'test2',
    value: 'test2',
})

console.log(m$.getState())

m$.undo()

console.log(m$.getState())

m$.redo()

console.log(m$.getState())