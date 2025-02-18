const UserCard = ({ data, toggle }) => {
    return (
        <section style={{ backgroundColor: toggle ? "#1f2a48" : "#fefefc" }} id="main-section">
            <img src={data.avatar_url} alt="github-logo" />
            <div id="main-div">
                <div id="profile-info">
                    <div>
                        <h2 style={{ color: toggle ? "white" : "#474b4f" }}>{data.name}</h2>
                        <a style={{ fontWeight: toggle ? 400 : 600 }} href={data.html_url} target="_blank">@{data.login}</a>
                    </div>
                    <p style={{ color: toggle ? "#bdc1cc" : "#727272" }}
                        id="date-p">Joined {`${data.created_at.getDate()} ${data.created_at.getMonth() + 1} ${data.created_at.getFullYear()}`}
                    </p>
                </div>
                <p style={{ color: toggle ? "#bdc1cc" : "#727272" }} id="bio" >{data.bio !== null ? data.bio : "This profile has no bio"}</p>
                <div style={{ backgroundColor: toggle ? "#141c2f" : "#818181" }} id="achievements">
                    <div className="github-info">
                        <p>Repos</p>
                        <span>{data.public_repos}</span>
                    </div>
                    <div className="github-info">
                        <p>Followers</p>
                        <span>{data.followers}</span>
                    </div>
                    <div className="github-info">
                        <p>Following</p>
                        <span>{data.following}</span>
                    </div>
                </div>
                <div id="links-location">
                    <div className="links-loc">
                        <p style={{ color: toggle ? "#bdc1cc" : "#727272" }}>
                            <i className="fa-solid fa-location-dot"></i> {data.location !== null ? data.location : "Unknown"}
                        </p>
                        <p style={{ color: toggle ? "#bdc1cc" : "#727272" }} >
                            <i className="fa-solid fa-link"></i> https://github.blog
                        </p>
                    </div>
                    <div className="links-loc">
                        <p style={{ color: toggle ? "#bdc1cc" : "#727272" }} >
                            <i className="fa-brands fa-twitter"></i> Not Avaliable
                        </p>
                        <a style={{ color: toggle ? "#bdc1cc" : "#727272" }}
                            href={data.html_url} target="_blank"><i className="fa-solid fa-building"></i> @github
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default UserCard;