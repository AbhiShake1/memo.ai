import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function RecordingsPage() {
  return (
    <main>
      <RecordingsList />
    </main>
  );
}

function RecordingsList() {
  return <>
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Recordings</h1>
      <Button asChild>
        <Link href="/recordings/new" className="flex items-center gap-2" prefetch={false}>
          <MicIcon className="w-5 h-5 mr-2" />
          New Recording
        </Link>
      </Button>
    </div>
    <Card>
      <CardHeader>
        <CardTitle>All Recordings</CardTitle>
        <CardDescription>A list of all your recorded and transcribed sessions.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Meeting Notes</TableCell>
              <TableCell>June 15, 2023</TableCell>
              <TableCell>32:10</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  <PlayIcon className="w-4 h-4 mr-2" />
                  Play
                </Button>
                <Button variant="ghost" size="sm">
                  <FileTextIcon className="w-4 h-4 mr-2" />
                  Transcript
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Interview Transcript</TableCell>
              <TableCell>June 10, 2023</TableCell>
              <TableCell>45:22</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  <PlayIcon className="w-4 h-4 mr-2" />
                  Play
                </Button>
                <Button variant="ghost" size="sm">
                  <FileTextIcon className="w-4 h-4 mr-2" />
                  Transcript
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Brainstorming Session</TableCell>
              <TableCell>June 5, 2023</TableCell>
              <TableCell>28:45</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  <PlayIcon className="w-4 h-4 mr-2" />
                  Play
                </Button>
                <Button variant="ghost" size="sm">
                  <FileTextIcon className="w-4 h-4 mr-2" />
                  Transcript
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
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

function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  )
}

function FileTextIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  )
}
