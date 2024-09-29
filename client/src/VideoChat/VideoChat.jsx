import React, { useState, useEffect } from 'react';

const VideoChat = () => {
  const jitsiContainerId = 'jitsi-container-id';
  const [jitsi, setJitsi] = useState({});

  const loadJitsiScript = () => {
    let resolveLoadJitsiScriptPromise = null;

    const loadJitsiScriptPromise = new Promise((resolve) => {
      resolveLoadJitsiScriptPromise = resolve;
    });

    const script = document.createElement('script');
    script.src = 'https://meet.jit.si/external_api.js';
    script.async = true;
    script.onload = () => resolveLoadJitsiScriptPromise(true);
    document.body.appendChild(script);

    return loadJitsiScriptPromise;
  };

  const initialiseJitsi = async () => {
    if (!window.JitsiMeetExternalAPI) {
      await loadJitsiScript();
    }

    const _jitsi = new window.JitsiMeetExternalAPI('meet.jit.si', {
      parentNode: document.getElementById(jitsiContainerId)
    });

    setJitsi(_jitsi);
  };

  useEffect(() => {
    initialiseJitsi();

    return () => jitsi?.dispose?.();
    // eslint-disable-next-line
  }, []);

  return (
    <div id={jitsiContainerId} style={{ height: '100%', width: '100%' }} />
  );
};

export default VideoChat;
