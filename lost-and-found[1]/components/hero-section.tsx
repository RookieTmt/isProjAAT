import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SearchIcon, MapPinIcon, ClipboardCheckIcon } from "lucide-react"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Reunite with your lost belongings
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Our digital lost-and-found platform connects people who have lost items with those who have found them
                in public spaces.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/report/lost">
                  <MapPinIcon className="mr-2 h-4 w-4" />
                  Report Lost Item
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/report/found">
                  <ClipboardCheckIcon className="mr-2 h-4 w-4" />
                  Report Found Item
                </Link>
              </Button>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <SearchIcon className="h-4 w-4" />
              <span>Or browse through our database of lost and found items</span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[350px] w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 md:h-[450px]">
              <img
                src="/placeholder.svg?height=450&width=600"
                alt="Lost and found items illustration"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
