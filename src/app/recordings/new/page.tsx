"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { api } from "@/trpc/react"
import { SpeechApp } from "@/components/speech/_components/app"
import { MicrophoneContextProvider } from "@/components/speech/_providers/microphone-context-provider"
import { DeepgramContextProvider } from "@/components/speech/_providers/deepgram-context-provider"

export default function NewRecording() {
  const addMutation = api.memo.create.useMutation()

  return <>
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">New Recording</h1>
      <MicrophoneContextProvider>
        <form onSubmit={async (e) => {
          e.preventDefault()
          addMutation.mutate({ description: "i am abhi", title: "test", duration: 120, transcript: "i am abhi", recording_url: "" })
        }}>
          <Card>
            <CardHeader>
              <CardTitle>Start a New Recording</CardTitle>
              <CardDescription>Record your audio and we'll transcribe it for you.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <SpeechApp.ControlButton />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Recording Title</Label>
                <Input id="title" placeholder="Enter a title for your recording" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea id="description" placeholder="Add a description for your recording" />
                <DeepgramContextProvider>
                  <SpeechApp />
                </DeepgramContextProvider>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button disabled={false/* !isRecording && recordingTime === 0 */}>Save Recording</Button>
            </CardFooter>
          </Card>
        </form >
      </MicrophoneContextProvider>
    </div >
  </>
}
