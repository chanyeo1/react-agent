import OpenAI from "openai";
import { useContext, useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import ListItem from "./ListItem";
import ThemeContext from "./contexts/ThemeContext";

const openai = new OpenAI({ 
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

const systemMessage = {
    role: 'system',
    content: `당신은 20년 경력의 자바스크립트 프로그래머입니다.`,
}

const ChatRoom = () => {
    const [messageList, setMessageList] = useState([ systemMessage ]);
    const theme = useContext(ThemeContext);
    const userMessageInputRef = useRef(null);

    const submitHandler = async () => {
        // 유저 메세지 추가
        const userMessage = userMessageInputRef.current.value;
        if(userMessage === '') return;

        const nextMessageList = [...messageList, { role: 'user', content: userMessage }];
        setMessageList(nextMessageList);
        userMessageInputRef.current.value = '';

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-search-preview",
            web_search_options: {
                user_location: {
                    type: "approximate",
                    approximate: {
                        country: 'KR',
                        city: 'Busan',
                        timezone: 'Asia/Seoul',
                    }
                }
            },
            messages: [...nextMessageList],
        });

        console.log(completion);
        const { message={} } = completion.choices[0];
        const { content='', role='', annotations=[] } = message;
        
        // AI 메세지 추가
        setMessageList((prev) => [...prev, {role: role, content: content, annotations: annotations}]);
    };

    return (
        <>
            <ul style={{ 
                background: theme === 'light' ? '#fff' : '#000', 
                color: theme === 'light' ? '#000' : '#fff',
                height: '500px',
                listStyle: 'none',
                padding: '10px',
                boxSizing: 'border-box', 
                overflow: 'auto',
            }}>
            {
                messageList && messageList.map(
                    (elem) => {
                        if(elem.role !== 'system') {
                            return (
                                <ListItem 
                                    key={uuidv4()} 
                                    role={elem.role} 
                                    content={elem.content}
                                    annotations={elem.role === 'user' ? [] : elem.annotations} 
                                />
                            )
                        }
                    }
                )
            }
            </ul>
            <input 
                type="text" 
                placeholder='enter your messages...'
                ref={userMessageInputRef}
            />
            <input type="submit" value="전송" onClick={submitHandler} />
        </>
    );
};

export default ChatRoom;