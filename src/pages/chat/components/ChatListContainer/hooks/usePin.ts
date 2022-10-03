import { ChatView } from "pages/chat/types"
import { useMemo } from "react"
import _ from "lodash"

export const usePin = (views: ChatView[]) => {
    const pinned = useMemo(() => views.filter(x => x.chatToUser.isPinned), [views])
    const unpinned = useMemo(
        () =>
            _.orderBy(
                views.filter(x => !x.chatToUser.isPinned),
                x => new Date(x.lastMessage?.created!),
                "desc"
            ),
        [views]
    )
    const pinnedViews = useMemo(() => [...pinned, ...unpinned], [pinned, unpinned])

    return { pinnedViews }
}
