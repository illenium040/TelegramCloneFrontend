export const getDateString = (dbDate?: Date) => {
    if (!dbDate) return ""
    var date = new Date(dbDate)
    return `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`
}

export const getTime = (date?: Date) => {
    const d = new Date(date!)
    try {
        return d != null ? d.getTime() : 0
    } catch (error) {
        console.log(error)
        return 0
    }
}

export const scrollBottom = (selector: string) => {
    const scrollable = document.querySelector(".chat-body")
    scrollable?.scrollTo(0, scrollable.scrollHeight)
}

export const delay = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export function listAllEventListeners() {
    const allElements = Array.prototype.slice.call(document.querySelectorAll("*"))
    allElements.push(document)
    allElements.push(window)

    const types = []

    for (let ev in window) {
        if (/^on/.test(ev)) types[types.length] = ev
    }

    let elements = []
    for (let i = 0; i < allElements.length; i++) {
        const currentElement = allElements[i]
        for (let j = 0; j < types.length; j++) {
            if (typeof currentElement[types[j]] === "function") {
                elements.push({
                    node: currentElement,
                    type: types[j],
                    func: currentElement[types[j]].toString()
                })
            }
        }
    }

    return elements.sort(function (a, b) {
        return a.type.localeCompare(b.type)
    })
}
