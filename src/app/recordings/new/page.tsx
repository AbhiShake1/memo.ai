"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { api } from "@/trpc/react"

export default function NewRecording() {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)

  useEffect(() => {
    if (isRecording) {
      // Start the timer
      const interval = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1)
      }, 1000)
      return () => clearInterval(interval)
    } else {
      // Reset the timer
      setRecordingTime(0)
    }
  }, [isRecording])

  const toggleRecording = () => {
    setIsRecording(r => !r)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const addMutation = api.memo.create.useMutation()

  return <>
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">New Recording</h1>
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
              <Button
                variant={isRecording ? "destructive" : "default"}
                size="icon"
                className="w-24 h-24 rounded-full"
                onClick={toggleRecording}
              >
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <div className={`absolute inset-0 rounded-full ${isRecording ? 'animate-pulse bg-red-500/20' : 'bg-primary/10'}`} />
                  {isRecording ? (
                    <StopIcon className="w-12 h-12" />
                  ) : (
                    <MicIcon className="w-12 h-12" />
                  )}
                </div>
              </Button>
              <div className="text-2xl font-bold">{formatTime(recordingTime)}</div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Recording Title</Label>
              <Input id="title" placeholder="Enter a title for your recording" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea id="description" placeholder="Add a description for your recording" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button disabled={false/* !isRecording && recordingTime === 0 */}>Save Recording</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  </>
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

function SettingsIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
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
