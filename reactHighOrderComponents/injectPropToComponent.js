const withNewProp = newProp => {
    return WrappedComponent => {
        const WithNewProp = props => {
            return <WrappedComponent {...props} newProp={newProp} />
        }
        WithNewProp.displayName = `withNewProp(${Component.displayName})`
        return WithNewProp
    }
}

export default (Component, newProp) => withNewProp(newProp)(Component)
