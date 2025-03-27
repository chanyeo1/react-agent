import LeftSideBar from "./LeftSideBar";

const AppBody = () => {
    const style = {
        background: 'blue',
        width: '100%',    
    }

    return (
        <div style={style}>
            <LeftSideBar />
        </div>
    );
};

export default AppBody;