import { v4 as uuidv4 } from "uuid";

export default function ChatMessage({ role, content, annotations = [] }) {
    return (
        <li>
            <div className="content">
                <strong>{role}</strong>: {content}
            </div>
            <div className="annotations">
                {annotations &&
                    annotations.map((elem, idx) => {
                        const { type = "", url_citation = {} } = elem;
                        if (type === "url_citation") {
                            return (
                                <p key={uuidv4()}>
                                    {url_citation.title}
                                    <br />
                                    {url_citation.url}
                                </p>
                            );
                        }
                    })}
            </div>
        </li>
    );
}
