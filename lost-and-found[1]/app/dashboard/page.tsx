"use client"

import { useState } from "react"
import Link from "next/link"
import { useItems } from "@/context/items-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  CalendarIcon,
  MapPinIcon,
  MoreVertical,
  PlusIcon,
  ClipboardCheckIcon,
  ClubIcon as LostIcon,
  CheckCircle,
  Clock,
} from "lucide-react"
import { format } from "date-fns"

export default function DashboardPage() {
  const { items, updateItemStatus, removeItem } = useItems()
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)

  const myItems = items
  const lostItems = myItems.filter((item) => item.type === "lost")
  const foundItems = myItems.filter((item) => item.type === "found")

  const handleMarkAsResolved = (id: string) => {
    updateItemStatus(id, "resolved")
  }

  const handleDeleteItem = (id: string) => {
    removeItem(id)
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
            <p className="text-gray-500">Manage your lost and found item reports</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/report/found">
                <ClipboardCheckIcon className="mr-2 h-4 w-4" />
                Report Found
              </Link>
            </Button>
            <Button asChild>
              <Link href="/report/lost">
                <LostIcon className="mr-2 h-4 w-4" />
                Report Lost
              </Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="all">All Items</TabsTrigger>
            <TabsTrigger value="lost">Lost Items</TabsTrigger>
            <TabsTrigger value="found">Found Items</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {myItems.length > 0 ? (
              <div className="grid gap-4">
                {myItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative h-48 sm:h-auto sm:w-48 overflow-hidden">
                          {item.image ? (
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                              <span className="text-gray-500 dark:text-gray-400">No image</span>
                            </div>
                          )}
                          <Badge
                            className={`absolute top-2 left-2 ${
                              item.type === "lost" ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                            }`}
                          >
                            {item.type === "lost" ? "Lost" : "Found"}
                          </Badge>
                        </div>
                        <div className="p-6 flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                              <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center">
                                  <MapPinIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                                  <span>{item.location}</span>
                                </div>
                                <div className="flex items-center">
                                  <CalendarIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                                  <span>
                                    {item.type === "lost"
                                      ? `Lost on ${format(new Date(item.dateLost), "PPP")}`
                                      : `Found on ${format(new Date(item.dateFound), "PPP")}`}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={item.status === "active" ? "outline" : "secondary"}>
                                <div className="flex items-center gap-1">
                                  {item.status === "active" ? (
                                    <>
                                      <Clock className="h-3 w-3" />
                                      <span>Active</span>
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle className="h-3 w-3" />
                                      <span>Resolved</span>
                                    </>
                                  )}
                                </div>
                              </Badge>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem asChild>
                                    <Link href={`/items/${item.id}`}>View Details</Link>
                                  </DropdownMenuItem>
                                  {item.status === "active" && (
                                    <DropdownMenuItem onClick={() => handleMarkAsResolved(item.id)}>
                                      Mark as Resolved
                                    </DropdownMenuItem>
                                  )}
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <DropdownMenuItem
                                        onSelect={(e) => {
                                          e.preventDefault()
                                          setSelectedItemId(item.id)
                                        }}
                                        className="text-red-500 focus:text-red-500"
                                      >
                                        Delete
                                      </DropdownMenuItem>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          This action cannot be undone. This will permanently delete your item report.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                          className="bg-red-500 hover:bg-red-600"
                                          onClick={() => selectedItemId && handleDeleteItem(selectedItemId)}
                                        >
                                          Delete
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                          <p className="mt-3 text-sm line-clamp-2">{item.description}</p>
                          <div className="mt-4">
                            <Button asChild variant="outline" size="sm">
                              <Link href={`/items/${item.id}`}>View Details</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-gray-100 p-3 dark:bg-gray-800">
                    <PlusIcon className="h-6 w-6 text-gray-500" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">No items yet</h3>
                  <p className="mt-2 text-sm text-gray-500 max-w-md">
                    You haven't reported any lost or found items yet. Start by reporting a lost or found item.
                  </p>
                  <div className="mt-6 flex gap-4">
                    <Button asChild variant="outline">
                      <Link href="/report/found">Report Found Item</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/report/lost">Report Lost Item</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="lost">
            {lostItems.length > 0 ? (
              <div className="grid gap-4">
                {lostItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative h-48 sm:h-auto sm:w-48 overflow-hidden">
                          {item.image ? (
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                              <span className="text-gray-500 dark:text-gray-400">No image</span>
                            </div>
                          )}
                          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">Lost</Badge>
                        </div>
                        <div className="p-6 flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                              <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center">
                                  <MapPinIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                                  <span>{item.location}</span>
                                </div>
                                <div className="flex items-center">
                                  <CalendarIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                                  <span>Lost on {format(new Date(item.dateLost), "PPP")}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={item.status === "active" ? "outline" : "secondary"}>
                                <div className="flex items-center gap-1">
                                  {item.status === "active" ? (
                                    <>
                                      <Clock className="h-3 w-3" />
                                      <span>Active</span>
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle className="h-3 w-3" />
                                      <span>Resolved</span>
                                    </>
                                  )}
                                </div>
                              </Badge>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem asChild>
                                    <Link href={`/items/${item.id}`}>View Details</Link>
                                  </DropdownMenuItem>
                                  {item.status === "active" && (
                                    <DropdownMenuItem onClick={() => handleMarkAsResolved(item.id)}>
                                      Mark as Resolved
                                    </DropdownMenuItem>
                                  )}
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <DropdownMenuItem
                                        onSelect={(e) => {
                                          e.preventDefault()
                                          setSelectedItemId(item.id)
                                        }}
                                        className="text-red-500 focus:text-red-500"
                                      >
                                        Delete
                                      </DropdownMenuItem>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          This action cannot be undone. This will permanently delete your item report.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                          className="bg-red-500 hover:bg-red-600"
                                          onClick={() => selectedItemId && handleDeleteItem(selectedItemId)}
                                        >
                                          Delete
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                          <p className="mt-3 text-sm line-clamp-2">{item.description}</p>
                          <div className="mt-4">
                            <Button asChild variant="outline" size="sm">
                              <Link href={`/items/${item.id}`}>View Details</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-gray-100 p-3 dark:bg-gray-800">
                    <LostIcon className="h-6 w-6 text-gray-500" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">No lost items</h3>
                  <p className="mt-2 text-sm text-gray-500 max-w-md">You haven't reported any lost items yet.</p>
                  <Button asChild className="mt-6">
                    <Link href="/report/lost">Report Lost Item</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="found">
            {foundItems.length > 0 ? (
              <div className="grid gap-4">
                {foundItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative h-48 sm:h-auto sm:w-48 overflow-hidden">
                          {item.image ? (
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                              <span className="text-gray-500 dark:text-gray-400">No image</span>
                            </div>
                          )}
                          <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">Found</Badge>
                        </div>
                        <div className="p-6 flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                              <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center">
                                  <MapPinIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                                  <span>{item.location}</span>
                                </div>
                                <div className="flex items-center">
                                  <CalendarIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                                  <span>Found on {format(new Date(item.dateFound), "PPP")}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={item.status === "active" ? "outline" : "secondary"}>
                                <div className="flex items-center gap-1">
                                  {item.status === "active" ? (
                                    <>
                                      <Clock className="h-3 w-3" />
                                      <span>Active</span>
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle className="h-3 w-3" />
                                      <span>Resolved</span>
                                    </>
                                  )}
                                </div>
                              </Badge>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem asChild>
                                    <Link href={`/items/${item.id}`}>View Details</Link>
                                  </DropdownMenuItem>
                                  {item.status === "active" && (
                                    <DropdownMenuItem onClick={() => handleMarkAsResolved(item.id)}>
                                      Mark as Resolved
                                    </DropdownMenuItem>
                                  )}
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <DropdownMenuItem
                                        onSelect={(e) => {
                                          e.preventDefault()
                                          setSelectedItemId(item.id)
                                        }}
                                        className="text-red-500 focus:text-red-500"
                                      >
                                        Delete
                                      </DropdownMenuItem>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          This action cannot be undone. This will permanently delete your item report.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                          className="bg-red-500 hover:bg-red-600"
                                          onClick={() => selectedItemId && handleDeleteItem(selectedItemId)}
                                        >
                                          Delete
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                          <p className="mt-3 text-sm line-clamp-2">{item.description}</p>
                          <div className="mt-4">
                            <Button asChild variant="outline" size="sm">
                              <Link href={`/items/${item.id}`}>View Details</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-gray-100 p-3 dark:bg-gray-800">
                    <ClipboardCheckIcon className="h-6 w-6 text-gray-500" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">No found items</h3>
                  <p className="mt-2 text-sm text-gray-500 max-w-md">You haven't reported any found items yet.</p>
                  <Button asChild className="mt-6">
                    <Link href="/report/found">Report Found Item</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
