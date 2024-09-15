"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
  useCallback,
} from "react";

interface MicrophoneContextType {
  microphone: MediaRecorder | null;
  startMicrophone: () => void;
  stopMicrophone: () => void;
  setupMicrophone: () => Promise<void>;
  microphoneState: MicrophoneState | null;
}

export enum MicrophoneEvents {
  DataAvailable = "dataavailable",
  Error = "error",
  Pause = "pause",
  Resume = "resume",
  Start = "start",
  Stop = "stop",
}

export enum MicrophoneState {
  NotSetup = -1,
  SettingUp = 0,
  Ready = 1,
  Opening = 2,
  Open = 3,
  Error = 4,
  Pausing = 5,
  Paused = 6,
}

const MicrophoneContext = createContext<MicrophoneContextType | undefined>(
  undefined
);

interface MicrophoneContextProviderProps {
  children: ReactNode;
}

const MicrophoneContextProvider: React.FC<MicrophoneContextProviderProps> = ({
  children,
}) => {
  const [microphoneState, setMicrophoneState] = useState<MicrophoneState>(
    MicrophoneState.NotSetup
  );
  //const microphone = useRef<MediaRecorder | null>(null);
  const [microphone, setMicrophone] = useState<MediaRecorder | null>(null);
  const thisUserMedia = useRef<MediaStream | null>(null);

  async function setupMicrophone() {
    setMicrophoneState(MicrophoneState.SettingUp);

    try {
      const userMedia = await navigator.mediaDevices.getUserMedia({
        audio: {
          noiseSuppression: true,
          echoCancellation: true,
        },
      });
      thisUserMedia.current = userMedia

      const microphone = new MediaRecorder(userMedia);

      setMicrophoneState(MicrophoneState.Ready);
      setMicrophone(microphone);
      //microphone.current = new MediaRecorder(userMedia);
    } catch (err: any) {
      console.error(err);

      throw err;
    }
  };

  function stopMicrophone() {
    setMicrophoneState(MicrophoneState.Pausing);

    if (microphone?.state === "recording") {
      microphone.stop();
      thisUserMedia.current?.getTracks().forEach(t => t.stop())
      setMicrophoneState(MicrophoneState.Paused);
    }
  }

  //async function stopMicrophone() {
  //  setMicrophoneState(MicrophoneState.Pausing);
  //
  //  if (microphone.current?.state === "recording") {
  //    microphone.current.stop();
  //    thisUserMedia.current?.getTracks().forEach(t => t.stop())
  //    setMicrophoneState(MicrophoneState.Paused);
  //  }
  //}
  //
  //async function startMicrophone() {
  //  setMicrophoneState(MicrophoneState.Opening);
  //
  //  if (microphone.current?.state === "paused") {
  //    microphone.current.resume();
  //  } else {
  //    microphone.current?.start(250);
  //  }
  //
  //  setMicrophoneState(MicrophoneState.Open);
  //}

  function startMicrophone() {
    setMicrophoneState(MicrophoneState.Opening);

    if (microphone?.state === "paused") {
      microphone.resume();
    } else {
      microphone?.start(250);
    }

    setMicrophoneState(MicrophoneState.Open);
  }

  return (
    <MicrophoneContext.Provider
      value={{
        microphone,
        //microphone: microphone.current,
        startMicrophone,
        stopMicrophone,
        setupMicrophone,
        microphoneState,
      }}
    >
      {children}
    </MicrophoneContext.Provider>
  );
};

function useMicrophone(): MicrophoneContextType {
  const context = useContext(MicrophoneContext);

  if (context === undefined) {
    throw new Error(
      "useMicrophone must be used within a MicrophoneContextProvider"
    );
  }

  return context;
}

export { MicrophoneContextProvider, useMicrophone };
