import OpenAI from "openai";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const openai = new OpenAI({ 
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

const ChatRoom = () => {
    const [userMessage, setUserMessage] = useState('');
    const [messageList, setMessageList] = useState([]);

    const changeHandler = (e) => {
        //console.log(`change event: ${e.target.value}`);
        setUserMessage(e.target.value);
    };

    const submitHandler = async () => {
        setUserMessage('');
        
        // 유저 메세지 추가
        const nextMessageList = [...messageList, { role: 'user', content: userMessage }];
        setMessageList(nextMessageList);

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
            <ul>
            {
                messageList && messageList.map((elem) => <li key={uuidv4()}><strong>{elem.role}</strong>: {elem.content}</li>)
            }
            </ul>
            <input 
                type="text" 
                value={userMessage}
                placeholder='enter your messages...' 
                onChange={changeHandler} 
            />
            <input type="submit" value="전송" onClick={submitHandler} />
        </>
    );
};

export default ChatRoom;