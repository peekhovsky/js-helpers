export default class EventVisibilityObserver {
    _visibleComponents = new Set()

    _componentHandlers = {}

    triggerComponentsBecomeVisible({ compIds = [] }) {
        const componentsToTrigger = compIds.filter(id => !this._visibleComponents.has(id))
        componentsToTrigger.forEach(id => {
            this._triggerCallbacks(id)
            this._visibleComponents.add(id)
        })
    }

    subscribe({ id, callback }) {
        this._addCallback(id, callback)
        this._isComponentVisible(id) && this._triggerCallbacks(id)
    }

    unsubscribe({ id, callback }) {
        this._componentHandlers[id] = this._componentHandlers[id].filter(cb => cb !== callback)
    }

    _addCallback(id, callback) {
        if (this._componentHandlers[id]) {
            this._componentHandlers[id].push(callback)
        } else {
            this._componentHandlers[id] = [callback]
        }
    }

    _triggerCallbacks(id) {
        this._componentHandlers[id]?.forEach(cb => cb())
    }

    _isComponentVisible(id) {
        return this._visibleComponents.has(id)
    }
}
