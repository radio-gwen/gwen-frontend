const Badge = ({ content }) => {
    return (
        <div className='label' style={{ display: content ? "block" : "none" }}>
            {content}
        </div>
    );
};

export default Badge;