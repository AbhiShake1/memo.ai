"use client";

import { useEffect, useRef, useState } from "react";
import {
  SOCKET_STATES,
  LiveTranscriptionEvent,
  LiveTranscriptionEvents,
  useDeepgram,
} from "@/components/speech/_providers/deepgram-context-provider";
import {
  MicrophoneEvents,
  MicrophoneState,
  useMicrophone,
} from "@/components/speech/_providers/microphone-context-provider";
import Visualizer from "./visualizer";
import { Button, ButtonProps } from "@/components/ui/button";
import { IntervalTimer } from "@/lib/utils/interval-timer";
import { CheckIcon, PauseIcon, PlayIcon } from "lucide-react"
import { ListenLiveClient } from "@deepgram/sdk";

export enum RecordingState {
  idle = 0,
  recording = 1,
  paused = 2,
  finished = 3,
}

//export function SpeechApp() {
//  const [caption, setCaption] = useState("");
//  const { connection, connectToDeepgram, connectionState } = useDeepgram();
//  const { microphone, microphoneState } =
//    useMicrophone();
//  const captionTimeout = useRef<any>();
//  const keepAliveInterval = useRef<any>();
//
//  useEffect(() => {
//    if (microphoneState === MicrophoneState.Open) {
//      connectToDeepgram({
//        model: "nova-2",
//        interim_results: true,
//        smart_format: true,
//        filler_words: true,
//        utterance_end_ms: 3000,
//      })
//        .then((connection) => {
//          switch (microphoneState) {
//            case MicrophoneState.Open:
//              startMic(connection)
//              break
//          }
//        });
//    }
//  }, [microphoneState])
//
//  async function startMic(connection: ListenLiveClient) {
//    if (!microphone) return;
//
//    const onData = (e: BlobEvent) => {
//      // iOS SAFARI FIX:
//      // Prevent packetZero from being sent. If sent at size 0, the connection will close. 
//      if (e.data.size > 0) {
//        connection?.send(e.data);
//      }
//    };
//
//    const onTranscript = (data: LiveTranscriptionEvent) => {
//      let thisCaption = data.channel.alternatives[0]?.transcript ?? "";
//
//      if (data.speech_final)
//        setCaption(c => `${c} ${thisCaption}`);
//    };
//
//    connection.addListener(LiveTranscriptionEvents.Transcript, onTranscript);
//    microphone.addEventListener(MicrophoneEvents.DataAvailable, onData);
//
//    return () => {
//      // prettier-ignore
//      connection.removeListener(LiveTranscriptionEvents.Transcript, onTranscript);
//      microphone.removeEventListener(MicrophoneEvents.DataAvailable, onData);
//      clearTimeout(captionTimeout.current);
//    };
//    // eslint-disable-next-line react-hooks/exhaustive-deps
//  }
//};

export function SpeechApp() {
  const [caption, setCaption] = useState("");
  const { connection, connectToDeepgram, connectionState } = useDeepgram();
  const { setupMicrophone, microphone, startMicrophone, microphoneState } =
    useMicrophone();
  const keepAliveInterval = useRef<any>();

  useEffect(() => {
    setupMicrophone();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (microphoneState === MicrophoneState.Ready) {
      connectToDeepgram({
        model: "nova-2",
        interim_results: true,
        smart_format: true,
        filler_words: true,
        utterance_end_ms: 3000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [microphoneState]);

  useEffect(() => {
    if (!microphone) return;
    if (!connection) return;

    const onData = (e: BlobEvent) => {
      // iOS SAFARI FIX:
      // Prevent packetZero from being sent. If sent at size 0, the connection will close. 
      if (e.data.size > 0) {
        connection?.send(e.data);
      }
    };

    const onTranscript = (data: LiveTranscriptionEvent) => {
      let thisCaption = data.channel.alternatives[0]?.transcript ?? "";

      if (data.speech_final)
        setCaption(c => `${c} ${thisCaption}`);
    };

    if (connectionState === SOCKET_STATES.open) {
      connection.addListener(LiveTranscriptionEvents.Transcript, onTranscript);
      microphone.addEventListener(MicrophoneEvents.DataAvailable, onData);

      startMicrophone();
    }

    return () => {
      // prettier-ignore
      connection.removeListener(LiveTranscriptionEvents.Transcript, onTranscript);
      microphone.removeEventListener(MicrophoneEvents.DataAvailable, onData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectionState]);

  useEffect(() => {
    if (!connection) return;

    if (
      microphoneState !== MicrophoneState.Open &&
      connectionState === SOCKET_STATES.open
    ) {
      connection.keepAlive();

      keepAliveInterval.current = setInterval(() => {
        connection.keepAlive();
      }, 10000);
    } else {
      clearInterval(keepAliveInterval.current);
    }

    return () => {
      clearInterval(keepAliveInterval.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [microphoneState, connectionState]);

  return (
    <>
      <div className="flex h-full antialiased">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col flex-auto h-full">
            <div className="relative w-full h-full">
              {microphone && <Visualizer microphone={microphone} />}
              <div className="absolute top-0 inset-x-0 p-4 text-left">
                {caption && <span contentEditable onInput={e => setCaption(e.currentTarget.textContent ?? "")}>{caption}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function StatusButton({ children, pulse = false, ...props }: ButtonProps & { pulse?: boolean }) {
  return <Button
    size="icon"
    className="w-24 h-24 rounded-full"
    type="button"
    {...props}
  >
    <div className="relative w-32 h-32 flex items-center justify-center">
      <div className={`absolute inset-0 rounded-full ${pulse ? 'animate-pulse bg-red-500/20' : 'bg-transparent'}`} />
      {children}
    </div>
  </Button>
}

SpeechApp.ControlButton = () => {
  const [recordingTime, setRecordingTime] = useState(0)
  const { stopMicrophone, setupMicrophone, microphoneState, startMicrophone } = useMicrophone()

  const timerRef = useRef(new IntervalTimer(() => {
    setRecordingTime((prevTime) => prevTime + 1)
  }, 1000))
  const timer = timerRef.current

  useEffect(() => {
    console.log(microphoneState)
    switch (microphoneState) {
      case MicrophoneState.Open:
        // Start the timer
        if (!timer.paused) {
          timer.clear()
          timer.start()
          timer.pause()
        }
        timer.resume()
      case MicrophoneState.Paused:
        // hold the timer
        timer?.pause()
        break
    }
  }, [microphoneState])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }
  const [isFinished, setIsFinished] = useState(false)
  const isPaused = microphoneState === MicrophoneState.Paused
  const isIdle = microphoneState === MicrophoneState.NotSetup
  const isRecording = microphoneState === MicrophoneState.Open || microphoneState === MicrophoneState.Ready

  const pause = stopMicrophone

  const resume = startMicrophone

  const finish = () => {
    setIsFinished(true)
    stopMicrophone()
  }

  const start = async () => {
    await setupMicrophone()
    resume()
  }

  return <div className="relative flex items-center justify-center flex-col space-y-2">
    {isIdle && <StatusButton onClick={start}><MicIcon className="w-12 h-12" /></StatusButton>}
    {isPaused && !isFinished && <StatusButton onClick={resume}><PlayIcon className="w-12 h-12" /></StatusButton>}
    {isRecording && <StatusButton onClick={pause} pulse><PauseIcon className="w-12 h-12" /></StatusButton>}
    {isFinished && <StatusButton onClick={finish}><CheckIcon className="w-12 h-12" /></StatusButton>}
    {!isIdle && !isFinished && <StatusButton variant="destructive" className="absolute bottom-4 right-0 rounded-full" onClick={e => {
      e.stopPropagation()
      finish()
    }}><StopIcon className="size-6" /></StatusButton>}
    <div className="text-2xl font-bold">{formatTime(recordingTime)}</div>
  </div>
}

function MicIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  )
}

function StopIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="5" y="5" rx="2" ry="2" />
    </svg>
  )
}
