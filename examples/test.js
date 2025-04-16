// import { s$, stateObservable } from './dist/index.es.js'
// import { filter } from 'rxjs'
// console.log(s$)

// const { s$ } = require('./dist/index.es.js')
// const { s$, stateObservable } = require('./dist/index.es.js');

import { b$, s$ } from '../src/index'
// console.log(Matrixphere.s$)
// console.log(Matrixphere.b$)
// s$ = Matrixphere.s$
// b$ = Matrixphere.b$
let register = b$.getNewRegister()
// register.test_log = {test:'test123'}
register.test_config = {
    custom1: 'custom1',
    beforeGet: (value) => { console.log(value + 'beforeGet') },
    beforeSet: (value) => { console.log(value + 'beforeSet') },
    afterSet: (value) => { console.log(value + 'afterSet') }
}
register.test2_log = false
register.test_log
register.test_log = 'test456'
console.log(register.export_map)
console.log(register)
register.import_object = {
    test1: 'test1',
    test2: 'test2',
    test3: 'test3'
}
console.log(register)

// console.log(s$)
// s$.test_log = 'test'

// s$.test_log = 'test2'

s$.test_config = {
    value: 'test',
    actions: [{
        name: 'action1',
        method: (data) => {
            console.log(data)
            console.log('action1')
            return data.next
        }
    }],
    before: (data) => {
        console.log(data)
        console.log('before')
        return data.next
    },
    after: (data) => {
        console.log(data)
        console.log('after')
    },
    undo: (data) => {
        console.log(data)
        console.log('undo')
    },
    redo: (data) => {
        console.log(data)
        console.log('redo')
    }
}
console.log(s$.test)
console.log(s$.get_all)

s$.test_log
console.log('-----------')
s$.test = 'test2'
console.log(s$.test)
console.log(s$.get_all)
console.log('-----------')
s$.test_action1_log = 'test3'
s$.test_action1_log
console.log(s$.test)
console.log(s$.get_all)

console.log('-----------')
s$.test2_log = 'test6'

s$.test2_log = 'test7'

console.log('-----------')

s$.undo
console.log(s$)
console.log(s$.test2)
console.log(s$.get_all)
console.log('-----------')
s$.undo
s$.undo
s$.undo

console.log(s$)
console.log(s$.test2)
console.log(s$.get_all)

// // s$.undo

// // console.log(s$)
// // console.log(s$.test2)
// // console.log(s$.get_all)

// console.log('-----------')

// s$.redo

// console.log(s$)
// console.log(s$.test2)
// console.log(s$.get_all)

// console.log('-----------')

// s$.redo

// console.log(s$)
// console.log(s$.test2)
// console.log(s$.get_all)

// basket config 부분 store랑 맞춰줘야함.
// console.log()

// 기본적으로 b$은 글로벌 register 역할을 하고 따로 getNewRegister를 호출하면
// 해당 스코프에서 사용 가능한 register를 새로 생성함.

// s$.set({
//     name: 'test', // string
//     value: 'test', // any, 상태의 초기값
//     actions: [{
//         name: 'action1', // string
//         method: (data) => {
//             console.log(data)
//             // 해당 상태의 본 액션을 호출할때 실행할 스크립트
//             return data.next // 리턴할 떄는 data형식 그대로 리턴해주어야함.
//         }
//         // actions는 observable을 사용할 수 없음.
//     },{
//         name: 'action2', // string
//         method: (data) => {
//             console.log(data)
//             // 해당 상태의 본 액션을 호출할때 실행할 스크립트
//             return data.next // 리턴할 떄는 data형식 그대로 리턴해주어야함.
//         }
//         // actions는 observable을 사용할 수 없음.
//     }],
//     // 실행하기 전 사전에 실행되는 스크립트
//     // 일반 함수는 data형식 그대로 리턴해야하며 observable 구조는 리턴 없음. 혼용 가능.
//     before: (data) => {
//         console.log(data)
//         return data.next
//     },
//     after: (data) => {
//         console.log(data)
//         // 해당 상태 호출이 끝나고 실행할 스크립트
//         // 리턴 없음
//     },
//     undo: (data) => {
//         console.log(data)
//         // 해당 상태의 undo시 실행할 스크립트
//         // 리턴 없음
//     },
//     redo: (data) => {
//         console.log(data)
//         // 해당 상태의 undo시 실행할 스크립트
//         // 리턴 없음
//     },
//     // 아래와 같이 rxjs observable 구조로도 사용 가능.
//     // redo: new stateObservable()
//     //     .pipe(
//     //         filter( (data) => {
//     //             console.log(data)
//     //             console.log('pipe')
//     //             return true
//     //         })
//     //     ).subscribe({
//     //         next: (data) => {
//     //             console.log('next')
//     //         }
//     //     })
// })

// console.log(s$.getState())

// s$.update('test', 'test3')
// console.log(s$.getState())

// s$.action('test', 'action1', '12333')
// s$.action('test', 'action2', '12444')
// console.log(s$.getState())

// console.log('--------------------------')

// s$.set({
//     name: 'test2',
//     value: 'test2',
// })

// console.log(s$.getState())

// s$.undo()

// console.log(s$.getState())

// s$.undo()

// console.log(s$.getState())
// s$.redo()

// console.log(s$.getState())