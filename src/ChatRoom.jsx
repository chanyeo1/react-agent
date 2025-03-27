import OpenAI from "openai";
import { useContext, useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import ListItem from "./ListItem";
import ThemeContext from "./contexts/ThemeContext";

const openai = new OpenAI({ 
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

const ChatRoom = () => {
    const [messageList, setMessageList] = useState([]);
    const theme = useContext(ThemeContext);
    const userMessageInputRef = useRef(null);

    const submitHandler = async () => {
        // 유저 메세지 추가
        const userMessage = userMessageInputRef.current.value;
        const nextMessageList = [...messageList, { role: 'user', content: userMessage }];
        setMessageList(nextMessageList);
        userMessageInputRef.current.value = '';

        const completion = await openai.chat.completions.create({
            messages: [...nextMessageList],
            model: "gpt-4o-mini",
        });

        const { message={} } = completion.choices[0];
        const { content='', role='' } = message;

        // AI 메세지 추가
        setMessageList((prev) => [...prev, {role: role, content: content}]);
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
            }}>
            {
                messageList && messageList.map((elem, idx) => <ListItem key={uuidv4()} index={idx} role={elem.role} content={elem.content} />)
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