import { SpeechApp } from "./_components/app";
import { DeepgramContextProvider } from "./_providers/deepgram-context-provider";
import { MicrophoneContextProvider } from "./_providers/microphone-context-provider";

export default function Page() {
  return <main className="h-screen">
    <MicrophoneContextProvider>
      <DeepgramContextProvider>
        <SpeechApp />
      </DeepgramContextProvider>
    </MicrophoneContextProvider>
  </main>
}
