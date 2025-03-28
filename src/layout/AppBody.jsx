import { useContext, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import OpenAI from "openai";

import ChatMessage from "../components/ChatMessage";

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

const systemMessage = {
    role: "system",
    content: "당신은 세계 최고의 투자 전문가입니다.",
};

const AppBody = () => {
    const [messageList, setMessageList] = useState([systemMessage]);
    const inputRef = useRef(null);

    const submitHandler = async () => {
        const userMessage = inputRef.current.value || "";
        if (!userMessage) {
            return;
        }

        const nextMessageList = [
            ...messageList,
            { role: "user", content: userMessage },
        ];
        setMessageList(nextMessageList);
        inputRef.current.value = "";

        // AI 응답 생성
        const aiMessage = await generateResponse(nextMessageList);
        const { content = "", role = "", annotations = [] } = aiMessage;

        setMessageList((prev) => [
            ...prev,
            { role: role, content: content, annotations: annotations },
        ]);
    };

    const generateResponse = async (messages) => {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-search-preview",
            web_search_options: {
                user_location: {
                    type: "approximate",
                    approximate: {
                        country: "KR",
                        city: "Busan",
                        timezone: "Asia/Seoul",
                    },
                },
            },
            messages: [...messages],
        });

        const { message = {} } = completion.choices[0];
        return message;
    };

    return (
        <div className="flex-auto flex flex-col">
            <ul className="flex-auto">
                {messageList &&
                    messageList.map((elem) => {
                        if (elem.role !== "system") {
                            return (
                                <ChatMessage
                                    key={uuidv4()}
                                    role={elem.role}
                                    content={elem.content}
                                    annotations={
                                        elem.role === "user"
                                            ? []
                                            : elem.annotations
                                    }
                                />
                            );
                        }
                    })}
            </ul>
            <div className="flex box-border">
                <input
                    type="text"
                    placeholder="Enter your message"
                    ref={inputRef}
                    className="flex-auto p-3"
                />
                <button
                    className="bg-pink-500 p-3 cursor-pointer text-white"
                    onClick={submitHandler}
                >
                    전송
                </button>
            </div>
        </div>
    );
};

export default AppBody;
