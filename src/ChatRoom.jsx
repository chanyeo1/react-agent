import OpenAI from "openai";
import { useState } from "react";

const openai = new OpenAI({ 
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

const ChatRoom = () => {
    const [message, setMessage] = useState('');

    const changeHandler = (e) => {
        //console.log(`change event: ${e.target.value}`);
        setMessage(e.target.value);
    };

    const submitHandler = async () => {
        setMessage('');

        const completion = await openai.chat.completions.create({
            messages: [{ role: "developer", content: "You are a helpful assistant." }],
            model: "gpt-4o",
            store: true,
        });
        // console.log(completion.choices[0]);

        const { message={} } = completion.choices[0];
        const { content='', role='' } = message;
        console.log(`[${role}] ${content}`);
    };

    return (
        <>
            <input 
                type="text" 
                value={message}
                placeholder='enter your messages...' 
                onChange={changeHandler} 
            />
            <input type="submit" value="전송" onClick={submitHandler} />
        </>
    );
};

export default ChatRoom;