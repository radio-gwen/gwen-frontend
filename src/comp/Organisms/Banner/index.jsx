import React, { useEffect, useState } from 'react';

const Banner = () => {
  const [trackInfo, setTrackInfo] = useState({
    title: '',
    artist: '',
    cover: '',
  });

  // Dynamically load the RadioJar script
  const loadRadioJarScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = "//www.radiojar.com/wrappers/api-plugins/v1/radiojar-min.js";
      script.type = "text/javascript";
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load RadioJar script.'));
      document.head.appendChild(script);
    });
  };

  useEffect(() => {
    // Load the RadioJar script when the component mounts
    loadRadioJarScript()
      .then(() => {
        const rjq = window.rjq; // Ensure RadioJar API is available

        if (rjq) {
          // Initialize the RadioJar player
          rjq('#rjp-radiojar-player').radiojar('player', {
            streamName: 'h6eddm4h9quvv', // Your stream name
            enableUpdates: true,
            defaultImage: '//www.radiojar.com/img/sample_images/Radio_Stations_Avatar_BLUE.png',
            autoplay: false,
          });
          console.log('RadioJar player initialized');

          // Event listener for track load event
          const trackLoadListener = (event, data) => {
            if (data.title && data.artist) {
              setTrackInfo({
                title: data.title,
                artist: data.artist,
                cover: data.thumb || '', // Use thumbnail if available
              });
            } else {
              setTrackInfo({
                title: 'No track info available',
                artist: '',
                cover: '',
              });
            }
          };

          // Attach event listener
          rjq('#rjp-radiojar-player').off('rj-track-load-event');
          rjq('#rjp-radiojar-player').on('rj-track-load-event', trackLoadListener);

          // Cleanup listener on component unmount
          return () => {
            rjq('#rjp-radiojar-player').off('rj-track-load-event', trackLoadListener);
          };
        } else {
          console.error('RadioJar script did not load correctly.');
        }
      })
      .catch((error) => {
        console.error('Error loading RadioJar script:', error);
      });
  }, []); // Empty dependency array to run this effect only once when the component mounts

  return (
    <section id="playing-now" className="color-one-bg">
      <p className="scrolling-text">
        <span id="trackInfo" className="rjp-info">
          {trackInfo.artist && trackInfo.title
            ? `Playing now: ${trackInfo.artist} - "${trackInfo.title}"`
            : 'Loading...'}
        </span>
      </p>

      {/* Player and Cover */}
      <div id="rj-player" style={{ display: trackInfo.artist ? 'block' : 'none' }}>
        <div className="player-v3 player-medium">
          <div id="rj-cover">
            {trackInfo.cover ? (
              <a href="#">
                <img src={trackInfo.cover} alt="Track cover" />
              </a>
            ) : (
              <p>No cover image</p>
            )}
          </div>
          <div className="info">
            <div className="rjp-trackinfo-container">
              <h4 className="rjp-label">Now playing:</h4>
            </div>
            <div className="rjp-player-container">
              <div id="rjp-radiojar-player"></div>
              <div id="rj-player-controls" className="rj-player-controls">
                {/* Control Buttons (Play, Pause, etc.) */}
                <div className="jp-gui jp-interface">
                  <div className="jp-controls">
                    <button className="jp-play" title="Play">
                      <i className="icon-play"></i>
                    </button>
                    <button className="jp-pause" style={{ display: 'none' }} title="Pause">
                      <i className="icon-pause"></i>
                    </button>
                    <button className="jp-mute" title="Mute">
                      <i className="icon-volume-up"></i>
                    </button>
                    <button className="jp-unmute" style={{ display: 'none' }} title="Unmute">
                      <i className="icon-volume-off"></i>
                    </button>
                    <div className="jp-volume-bar-wrapper">
                      <div className="jp-volume-bar">
                        <div className="jp-volume-bar-value"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="jp-no-solution">
                <span>Update Required</span>
                To play the media, you will need to either update your browser or your{' '}
                <a href="//get.adobe.com/flashplayer/" target="_blank" rel="noopener noreferrer">
                  Flash plugin
                </a>.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="line"></div>
    </section>
  );
};

export default Banner;
