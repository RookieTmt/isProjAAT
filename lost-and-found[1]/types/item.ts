export interface Item {
  id: string
  type: "lost" | "found"
  name: string
  category: string
  location: string
  dateLost?: Date
  dateFound?: Date
  dateReported: Date
  description: string
  contactInfo: string
  image: string | null
  status: "active" | "resolved"
}
