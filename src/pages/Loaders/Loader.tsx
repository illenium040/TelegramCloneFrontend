import "./loading.css"
type LoadingProps = {
    className?: string
    loaderWidth?: number
    thickness?: number
}
export const Loader = (props: LoadingProps) => {
    const { className, loaderWidth, thickness } = props
    return (
        <div className={`w-full h-full flex items-center justify-center lds-ring ${className ?? ""}`}>
            <div style={{ width: loaderWidth, height: loaderWidth, borderWidth: thickness }}></div>
            <div style={{ width: loaderWidth, height: loaderWidth, borderWidth: thickness }}></div>
            <div style={{ width: loaderWidth, height: loaderWidth, borderWidth: thickness }}></div>
            <div style={{ width: loaderWidth, height: loaderWidth, borderWidth: thickness }}></div>
        </div>
    )
}

export const FullPageLoader = (props: LoadingProps) => {
    return (
        <div className="full-page-loader z-40">
            <Loader className={`absolute z-50 ${props.className ?? ""}`} loaderWidth={props.loaderWidth} />
        </div>
    )
}
