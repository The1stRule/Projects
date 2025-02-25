const ModeIcond = ({ toggle, handleToggle }) => {
    return <img onClick={handleToggle} src={toggle? "/lightmode.png" :"/darkmode.png"} alt="dark mode icon" />;
}

export default ModeIcond;