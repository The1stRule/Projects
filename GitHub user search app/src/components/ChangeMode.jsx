import ModeIcond from "./ModeIcon.jsx";

const ChangeMode = ({ toggle, handleToggle }) => {
    return (
        <section style={{ color: toggle? "white" : "#474b4f" }}>
            <p>devfinder</p>
            <span>{toggle? "DARK" : "LIGHT"} {<ModeIcond toggle={toggle} handleToggle={handleToggle}></ModeIcond>}</span>
        </section>
    );
}

export default ChangeMode;
