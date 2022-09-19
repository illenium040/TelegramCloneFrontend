import { useSearchQuery } from "api/user"
import { useState } from "react"

export const useSearch = () => {
    const [name, setName] = useState<string>("")
    const search = useSearchQuery(name)

    return { setName, search }
}
