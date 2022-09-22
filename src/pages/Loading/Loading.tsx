import "./loading.css"
export const Loading = (props: { className?: string }) => {
    return (
        <div className={`w-full h-full flex items-center justify-center lds-ring ${props.className}`}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
