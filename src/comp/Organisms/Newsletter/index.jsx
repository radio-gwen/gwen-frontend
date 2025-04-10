import BlockCenterMedium from "../../Mollecules/BlockCenterMedium";

const Newsletter = () => {
    const inputStyle = {
        margin: "0px 0px 10px 0px !important"
    };

    const hiddenStyle = {
        position: "absolute",
        left: "-5000px"
    };

    return (
        <div className="flex-vert-center">
            <BlockCenterMedium background="background-primary">
               

                <div id="mc_embed_shell" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <h3>Newsletter</h3>
                    <div id="mc_embed_signup">
                    
                        <form
                            action="https://radiogwen.us14.list-manage.com/subscribe/post?u=82da6d2bfd791399646dadde7&amp;id=4da78a9f5e&amp;f_id=0018ace5f0"
                            method="post"
                            id="mc-embedded-subscribe-form"
                            name="mc-embedded-subscribe-form"
                            className="validate"
                            target="_self"
                            noValidate
                            style= {{margin: 'var(--spacing-large)'}}
                        >
                            
                            <div id="mc_embed_signup_scroll" style={{display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'}}>

                                <div className="mc-field-group">
                                    <input
                                        type="email"
                                        name="EMAIL"
                                        className="required email"
                                        id="mce-EMAIL"
                                        required
                                        placeholder="Inserisci la tua mail"
                                        style={inputStyle}
                                    />
                                </div>
                                <div id="mce-responses" className="clear">
                                    <div className="response" id="mce-error-response" style={{ display: "none" }}></div>
                                    <div className="response" id="mce-success-response" style={{ display: "none" }}></div>
                                </div>
                                <div aria-hidden="true" style={hiddenStyle}>
                                    <input type="text" name="b_82da6d2bfd791399646dadde7_4da78a9f5e" tabIndex="-1" value="" />
                                </div>
                                <div className="clear">
                                    <input type="submit" name="subscribe" id="mc-embedded-subscribe" className="btn-cta" value="Go!" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </BlockCenterMedium>
        </div>
    );
};

export default Newsletter;
