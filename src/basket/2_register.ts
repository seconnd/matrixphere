import { AbstractBasket, ProxyHandler, Register, Config, StandardObject, Method } from './0_types'
import { BasketObservable } from './1_observable'

const createStyle = 'font-style: italic; font-weight: 700; color: #D9F8C4;'
const updateStyle = 'font-style: italic; font-weight: 700; color: #ebc078;'
const deleteStyle = 'font-style: italic; font-weight: 700; color: #eb6c63;'
const loggingStyle = 'font-style: italic; font-weight: 700; color: #8fdfff;'

export class Basket extends AbstractBasket {

    static getNewRegister = () => {

		const register = class Register {}

		const handler: ProxyHandler<Register> = {

			configs$: new Map(),

			get: function (target, prop) {

				switch (prop) {

					case 'export_object':
						return this.method('export_object', target)

					case 'export_array':
						return this.method('export_array', target)

					case 'export_map':
						return this.method('export_map', target)

					case 'export_json':
						return this.method('export_json', target)

				}

				const commands = prop.split('_')
				prop = commands.shift() as string

				let isLogging = false, isDelete = false

				if (!target.hasOwnProperty(prop)) {
					console.warn(`(BASKET) Cannot access. [ ${prop} ] is no exists.`)
					return true
				}

				for (let command of commands) {

					switch (command) {
						case 'log':
							isLogging = true
							break
						case 'delete':
							isDelete = true
							break
						default:
							console.warn(`(BASKET) _(underbar or underline) can't use in the name. please use camelcase. or invalid command. [ ${command} ]`)
							return true
					}
				}

				if (isDelete) {

					delete target[prop]
					this.configs$.delete(prop)

					if (isLogging) console.log(`%c(BASKET) [ ${prop} ] is deleted.`, deleteStyle)

					return true
				}

				if (isLogging) {
					console.groupCollapsed(`%c(BASKET) [ ${prop} ] = ${this.logger(target[prop])}(${this.typeCheck(target[prop])}) is accessed.`, loggingStyle)
					console.log(target[prop])
					console.trace()
					console.groupEnd()
				}

				if (this.configs$.get(prop).hasOwnProperty('beforeGet'))
					this.configs$.get(prop).beforeGet.next!(target[prop])

				return target[prop]
			},

			set: function (target, prop, value) {

				switch (prop) {

					case 'import_object':
						this.method('import_object', target, value)
						return true

					case 'import_json':
						this.method('import_json', target, value)
						return true
				}

				const commands = prop.split('_')
				prop = commands.shift() as string

				let isLogging = false, isConfig = false, config: Config = {}

				for (let command of commands) {

					switch (command) {
						case 'log':
							isLogging = true
							break
						case 'config':
							isConfig = true
							break
						default:
							console.warn(`(BASKET) _(underbar or underline) can't use in the name. please use camelcase. or invalid command. [ ${command} ]`)
							return true
					}
				}

				if (!target.hasOwnProperty(prop)) {

					if (isConfig) {

						if (!value?.value) value.value = null

						for (let key in value) {

							switch (key) {
								case 'beforeGet':
									config[key] = this.convertToObservable(value[key])
									break
								case 'beforeSet':
									config[key] = this.convertToObservable(value[key])
									break
								case 'afterSet':
									config[key] = this.convertToObservable(value[key])
									break
								default: config[key] = value[key]
							}
						}

						console.log(config)

						this.configs$.set(prop, config)

						value = value.value

					} else {

						this.configs$.set(prop, config)

						config = this.configs$.get(prop)

					}
					console.log(value)

					target[prop] = value

					if (isLogging) {
						console.groupCollapsed(`%c(BASKET) [ ${prop} ] = ${this.logger(value)}(${this.typeCheck(value)}) is created.`, createStyle)
						console.log(value)
						console.trace()
						console.groupEnd()
					}

					return true

				} 

				if (isConfig) {
					console.warn(`(BASKET) Cannot configure. Configurate initialize. The [ ${prop} ] is already exists.`)
					return true
				}

				if (config['beforeSet']) config.beforeSet.next!(target[prop])

				target[prop] = value

				if (isLogging) {
					console.groupCollapsed(`%c(BASKET) [ ${prop} ] = ${this.logger(value)}(${this.typeCheck(value)}) is updated.`, updateStyle)
					console.log(value)
					console.trace()
					console.groupEnd()
				}

				if (config['afterSet']) config.afterSet.next!(value)

				return true
			},

			logger: (value) => {

				let valueForLogging

				typeof value === 'object' ?
					valueForLogging = JSON.stringify(value)
					: valueForLogging = value

				return valueForLogging
			},

			typeCheck: (value) => {

				let type

				switch (value) {
					case null:
						type = 'null'
						break
					default: type = typeof value
				}

				return type
			},

			method: function (type, target, value = null) {

				const object: StandardObject = {}

				switch (type) {

					case 'export_object':

						for (let element of Object.entries(target))
							object[element[0]] = element[1]

						return object

					case 'export_array':
						return Object.entries(target)

					case 'export_map':

						const map = new Map()

						for (let element of Object.entries(target))
							map.set(element[0], element[1])

						return map

					case 'export_json':

						for (let element of Object.entries(target))
							object[element[0]] = element[1]

						return JSON.stringify(object)

					case 'import_object':

						if (typeof value !== 'object') {
							console.warn(`(BASKET) It is not Object type.`)
							console.log(value)
							return true
						}

						for (let element of Object.entries(target))
							delete target[element[0]]

						this.configs$.clear()

						for (let key in value) {
							target[key] = value[key]
							this.configs$.set(key, {})
						}

						return true

					case 'import_json':

						if (typeof value !== 'string') {
							console.warn(`(BASKET) Please stringify.`)
							console.log(value)
							return true
						}

						value = JSON.parse(value)

						for (let element of Object.entries(target))
							delete target[element[0]]

						this.configs$.clear()

						for (let key in value) {
							target[key] = value[key]
							this.configs$.set(key, {})
						}

						return true

				}
			},

			convertToObservable: (method) => {

				console.log(method)

				if (typeof method !== 'function') return method
		
				return new BasketObservable().subscribe(method)
			}

		}


        return new Proxy(register, handler)
    }

}