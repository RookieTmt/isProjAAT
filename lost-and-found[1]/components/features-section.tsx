import { Search, MapPin, Bell, MessageSquare, Shield, Map } from "lucide-react"

export function FeaturesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything you need to find your items</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Our platform provides a comprehensive set of features to help you report, search, and recover lost items.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-gray-100 p-3 dark:bg-gray-800">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Smart Search</h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Easily search for lost items by location, category, date, and other attributes.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-gray-100 p-3 dark:bg-gray-800">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Location Tracking</h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Pinpoint where items were lost or found with our interactive map feature.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-gray-100 p-3 dark:bg-gray-800">
              <Bell className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Notifications</h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Receive instant alerts when a matching item is reported found.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-gray-100 p-3 dark:bg-gray-800">
              <MessageSquare className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Secure Messaging</h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Communicate safely with finders without sharing personal contact information.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-gray-100 p-3 dark:bg-gray-800">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Privacy Protection</h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Your personal information is protected with our privacy-first approach.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-gray-100 p-3 dark:bg-gray-800">
              <Map className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Public Space Integration</h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Connected with malls, airports, universities, and other public facilities.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
