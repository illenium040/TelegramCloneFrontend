const Loading = (props: { className?: string }) => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <img className={props.className ?? "w-[32px] h-[32px]"} src={"images/loading.gif"} alt="loading" />
        </div>
    )
}

export default Loading
