import { Reducer } from './6_reducer'

export class State extends Reducer {

    constructor() {
        super()
        const store = this.build()
        return store
    }

    build = () => {
        this.setRecord()
        const store = this.setStore()
        this.setReducer()

        return store
    }

}