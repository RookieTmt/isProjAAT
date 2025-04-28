"use client"

import { useParams, useRouter } from "next/navigation"
import { useItems } from "@/context/items-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, MapPinIcon, TagIcon, PhoneIcon, ArrowLeft, MessageSquare, Flag } from "lucide-react"
import { format } from "date-fns"
import { useState } from "react"

export default function ItemDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { items } = useItems()
  const [message, setMessage] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const item = items.find((item) => item.id === params.id)

  if (!item) {
    return (
      <div className="container py-10">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h3 className="mt-4 text-lg font-medium">Item not found</h3>
          <p className="mt-2 text-sm text-gray-500 max-w-md">
            The item you're looking for doesn't exist or has been removed.
          </p>
          <Button className="mt-4" onClick={() => router.push("/browse")}>
            Browse Items
          </Button>
        </div>
      </div>
    )
  }

  const handleSendMessage = () => {
    // In a real app, this would send a message to the item owner/finder
    alert(`Message sent: ${message}`)
    setMessage("")
    setIsDialogOpen(false)
  }

  return (
    <div className="container py-10">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{item.name}</CardTitle>
                  <CardDescription>{item.type === "lost" ? "Lost item report" : "Found item report"}</CardDescription>
                </div>
                <Badge
                  className={`${
                    item.type === "lost" ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {item.type === "lost" ? "Lost" : "Found"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg">
                {item.image ? (
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="object-cover w-full h-full" />
                ) : (
                  <div className="w-full h-64 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                    <span className="text-gray-500 dark:text-gray-400">No image available</span>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
              </div>

              <Separator />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-2">
                  <MapPinIcon className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p className="text-gray-600 dark:text-gray-400">{item.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CalendarIcon className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">{item.type === "lost" ? "Date Lost" : "Date Found"}</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {item.type === "lost"
                        ? format(new Date(item.dateLost), "PPP")
                        : format(new Date(item.dateFound), "PPP")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <TagIcon className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Category</h4>
                    <p className="text-gray-600 dark:text-gray-400 capitalize">{item.category}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CalendarIcon className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Date Reported</h4>
                    <p className="text-gray-600 dark:text-gray-400">{format(new Date(item.dateReported), "PPP")}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.push("/browse")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Browse
              </Button>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Flag className="mr-2 h-4 w-4" />
                  Report
                </Button>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Contact
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Contact about {item.name}</DialogTitle>
                      <DialogDescription>
                        Send a message to the {item.type === "lost" ? "owner" : "finder"} of this item.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <Textarea
                        placeholder="Write your message here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="min-h-[120px]"
                      />
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSendMessage}>Send Message</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Get in touch with the {item.type === "lost" ? "owner" : "finder"}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-2">
                <PhoneIcon className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Contact Details</h4>
                  <p className="text-gray-600 dark:text-gray-400">{item.contactInfo}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </CardFooter>
          </Card>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Similar Items</CardTitle>
                <CardDescription>
                  Other {item.type === "lost" ? "lost" : "found"} items in the same category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-center py-4">No similar items found at the moment.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
