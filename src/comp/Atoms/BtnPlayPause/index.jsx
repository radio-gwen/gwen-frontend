function BtnPlayPause ({onClick, content, isPlaying}){

    return(
        <div className='btn-play-pause' onClick={onClick}>
            {isPlaying ?
                    <svg
                    xmlns="http://www.w3.org/2000/svg"

                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    stroklinejoinn="round"
                    className="icon-pause"
                    >
                    <rect x="6" y="4" width="4" height="16"></rect>
                    <rect x="14" y="4" width="4" height="16"></rect>
                    </svg>
            
            :   <svg
                xmlns="http://www.w3.org/2000/svg"

                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                stroklinejoin="round"
                className="icon-play"
                >
                <polygon points="5 3, 19 12, 5 21, 5 3" />
                </svg>
        }
               <span>{content}</span>   
        </div>
    )
}

export default BtnPlayPause