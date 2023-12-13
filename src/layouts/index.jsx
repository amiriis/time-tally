import {Fragment} from "react";

const layoutList = (await import('./list'))

const Layout = ({layout, children}) => {
    const Component = layoutList[layout?.name] || Fragment
    const props = layout?.props || {}

    return (
        <Component {...props}>
            {children}
        </Component>
    )
}

export default Layout