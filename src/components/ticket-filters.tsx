"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, DollarSign } from "lucide-react"

export function TicketFilters() {
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const categories = ["คอนเสิร์ต", "กีฬา", "ละคร", "งานแสดง", "เทศกาล", "การประชุม"]

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">ค้นหาอีเวนต์</CardTitle>
        </CardHeader>
        <CardContent>
          <Input placeholder="ชื่ออีเวนต์หรือสถานที่..." />
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            ช่วงราคา
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="min-price">ต่ำสุด</Label>
              <Input
                id="min-price"
                placeholder="0"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="max-price">สูงสุด</Label>
              <Input
                id="max-price"
                placeholder="10000"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">ประเภทอีเวนต์</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
              />
              <Label htmlFor={category} className="text-sm">
                {category}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Date Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            วันที่
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-start bg-transparent">
            วันนี้
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            สัปดาห์นี้
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            เดือนนี้
          </Button>
        </CardContent>
      </Card>

      {/* Clear Filters */}
      <Button variant="outline" className="w-full bg-transparent">
        ล้างตัวกรอง
      </Button>
    </div>
  )
}
