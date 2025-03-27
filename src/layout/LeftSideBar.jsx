export default function LeftSideBar() {
    const style = {
        background: 'yellow',
        width: '100px',
    }

    return (
        <div className="left-side-bar" style={style}>
            <ul>
                <li>사용설정</li>
            </ul>
        </div>
    )
}