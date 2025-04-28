import { ClipboardList, Search, MessageSquare, CheckCircle } from "lucide-react"

export function HowItWorksSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-700">How It Works</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple steps to recover your items</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Our platform makes it easy to report and find lost items in just a few simple steps.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center space-y-3 rounded-lg p-4">
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <ClipboardList className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">1. Report</h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Report your lost item or an item you've found with detailed information.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-3 rounded-lg p-4">
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">2. Search</h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Browse through our database or get notified when a matching item appears.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-3 rounded-lg p-4">
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <MessageSquare className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">3. Connect</h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Securely connect with the finder or owner through our messaging system.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-3 rounded-lg p-4">
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <CheckCircle className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">4. Recover</h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Arrange to recover your item and mark the case as resolved.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
