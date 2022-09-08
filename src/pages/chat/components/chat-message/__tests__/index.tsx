import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { MessageContentType, MessageState } from "pages/chat/models/message"
import Message from ".."

test("loading message", async () => {
    render(
        <Message
            message={{
                chatId: "1",
                content: "A LOT OF CONTENT fdsdafdasmfmdsafmsmfksdmfdlsmflkdsmf;lsdfklsmd;lfmsdlk;fm",
                contentType: MessageContentType.Text,
                created: new Date(),
                id: "123",
                state: MessageState.LOADING,
                userIdFrom: "1",
                userIdTo: "2"
            }}
            userFrom={{
                avatar: "images/davida.jpg",
                email: "asd",
                id: "1",
                name: "DAVIDA"
            }}
            userTo={{
                avatar: "images/gigachad.jpg",
                email: "asd",
                id: "2",
                name: "GIGACHAD"
            }}
        />
    )
})
