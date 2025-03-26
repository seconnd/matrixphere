import { Action, Reducer, Store } from 'redux'
import { LinkedList } from './queue/types.ts'

export type State = { value: any, timestamp: number }
export type Method = (data: any) => void | any
export type ActionMethod = (data: any) => any
export type Reducers = { [key: string]: CustomReducer }
export type isSilent = false | 'undo' | 'redo'

export interface Actions {
    name: string,
    method: ActionMethod,
    observable: any
}

export interface Dispatched {
    name: string,
    state: State,
    action?: Action
}

export interface CustomAction extends Action {
    dispatched?: Dispatched,
    value?: any
}

export interface CustomReducer extends Reducer {
    stateName?: string
}

export interface Parameter {
    name: string,
    value: any,
    actions?: Array<Actions>,
    before?: Method,
    undo?: Method,
    redo?: Method,
    after?: Method,
    initialState?: State,
    inputState?: State,
    reducer: CustomReducer
}

export interface CustomStore extends Store {
    dispatch: any
    dispatch0?: any,
    dispatched?: LinkedList,
    current?: any,
    currentRecord?: any,
    get?: (name: string) => any,
    set?: (parameter: Parameter, stateType: 'value' | 'film') => void,
    update?: (name: string, value: any) => void,
    remove?: (name: string, isSilent: false | 'undo' | 'redo') => void,
    action?: (name: string, action: string, value: any) => void,
    undo?: () => void,
    redo?: () => void,
    capture?: (name: string, value: any) => void,
    revert?: any,
    replay?: any,
    getStateR?: () => any,
    setValueState?: any
}