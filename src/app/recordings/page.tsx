import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { api } from "@/trpc/server"
import moment from "moment"

export default async function RecordingsPage({ searchParams: { q } }: { searchParams: Partial<{ q: string }> }) {
  const { data: memos } = !!q ? await api.memo.search({ query: q }) : await api.memo.all()

  return (
    <main>
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
              {memos?.map(({ id, title, created_at, duration }) => (
                <TableRow key={id}>
                  <TableCell className="font-medium">{title}</TableCell>
                  <TableCell>{moment(created_at).format("ddd, Do MMMM")}</TableCell>a
                  <TableCell>{duration}</TableCell>
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
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
