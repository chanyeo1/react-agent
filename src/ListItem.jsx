import { v4 as uuidv4 } from 'uuid';

const ListItem = ({ role, content, annotations=[] }) => {
    return (
        <li style={{
            boxSizing: 'border-box',
            padding: '5px',
        }}>
            <div className="content"><strong>{role}</strong>: {content}</div>
            <div className="annotations">
                {
                    annotations && annotations.map(
                        (elem, idx) => {
                            const { type='', url_citation={} } = elem;
                            if(type === 'url_citation') {
                                return (
                                    <p key={uuidv4()}>{url_citation.title}<br/>{url_citation.url}</p>
                                )
                            }
                        }
                    )
                }
            </div>
        </li>
    );
};

export default ListItem;