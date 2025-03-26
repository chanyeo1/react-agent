const ListItem = ({ index, role, content }) => {
    return (
        <li><strong>{role}</strong>: {content}</li>
    );
};

export default ListItem;