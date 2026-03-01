"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const data = [
  { month: "Jan", test: 2000, contact: 4000 },
  { month: "Feb", test: 1200, contact: 7000 },
  { month: "Mar", test: 1500, contact: 10000 },
  { month: "Apr", test: 1400, contact: 10000 },
  { month: "May", test: 2200, contact: 8000 },
  { month: "Jun", test: 2500, contact: 12000 },
  { month: "Jul", test: 2600, contact: 11000 },
  { month: "Aug", test: 1300, contact: 9000 },
  { month: "Sep", test: 1700, contact: 8000 },
  { month: "Oct", test: 1200, contact: 6000 },
  { month: "Nov", test: 1500, contact: 11000 },
  { month: "Dec", test: 900, contact: 11000 },
]


export const formatMonthlyChartData = (data: any) => {
  const testMonthly =
    data?.test_requests?.monthly_counts || {};

  const contactMonthly =
    data?.contact_requests?.monthly_counts || {};

  const monthMap = {
    January: "Jan",
    February: "Feb",
    March: "Mar",
    April: "Apr",
    May: "May",
    June: "Jun",
    July: "Jul",
    August: "Aug",
    September: "Sep",
    October: "Oct",
    November: "Nov",
    December: "Dec",
  };

  return Object.keys(monthMap).map((month) => ({
    month: monthMap[month as keyof typeof monthMap as keyof typeof monthMap],
    test: testMonthly[month] ?? 0,
    contact: contactMonthly[month] ?? 0,
  }));
};
export default function TestRequestChart({ data }: { data: any }) {

  console.log("data", data);
  const monthlyChartData = formatMonthlyChartData(data);
  console.log(monthlyChartData);
  return (
    <Card className="rounded-2xl shadow-sm h-[348px] px-4 py-4 flex-1">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">
          Test Request & Contact Form
        </CardTitle>

        <Select defaultValue="last-month">
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent className="">
            <SelectItem value="last-month">Last Month</SelectItem>
            <SelectItem value="last-6">Last 6 Months</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="h-[280px] p-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthlyChartData}>
            <defs>
              <linearGradient id="colorContact" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>

              <linearGradient id="colorTest" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />

            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
              }}
            />

            <Area
              type="monotone"
              dataKey="contact"
              stroke="#2563eb"
              fillOpacity={1}
              fill="url(#colorContact)"
              strokeWidth={2}
            />

            <Area
              type="monotone"
              dataKey="test"
              stroke="#7c3aed"
              fillOpacity={1}
              fill="url(#colorTest)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}