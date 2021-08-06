export default class QueuedLoaderService {
    _loadingQueue = new Set()

    constructor(loader, splitTime = 50) {
        this.loader = loader
        this.splitTime = splitTime
        this._loaderPromise = Promise.resolve()
        this._isInitializated = false
    }

    loadEvent = event => {
        this._loadingQueue.add(event)
        if (!this._isInitializated) {
            this._loaderPromise = this._initLoader()
            this._isInitializated = true
        }
        return this._loaderPromise.then(data => data[event.cacheId])
    }

    _initLoader() {
        return this._wait().then(() => this._loadEvents())
    }

    _loadEvents() {
        const events = [...this._loadingQueue]
        this._isInitializated = false
        this._loadingQueue.clear()
        return this.loader(events)
    }

    _wait = () => new Promise(resolve => setTimeout(resolve, this.splitTime))
}
