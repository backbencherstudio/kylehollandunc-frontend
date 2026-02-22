"use client"

import * as React from "react"
import { Label, Pie, PieChart, Cell, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Data structure based on your image
const chartData = [
  { name: "Contact Form", value: 628, fill: "#FFC567" },
  { name: "Request Form", value: 604, fill: "#50CBA1" },
]

const TOTAL_REQUESTS = 4641

export function RequestDataCard() {
  return (
    <Card className="w-full max-w-[400px] rounded-[32px] border-none shadow-lg p-4">
      <CardHeader className="pb-0">
        <CardTitle className="text-xl font-bold text-slate-800">Request Data</CardTitle>
      </CardHeader>
      
      <CardContent>
        {/* Chart Section */}
        <div className="h-[220px] w-full relative ">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={75}
                outerRadius={110}
                startAngle={200} // Matches the "half-moon" start
                endAngle={-20}   // Matches the "half-moon" end
                paddingAngle={8} // Creates the clean gap between segments
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} cornerRadius={5} />
                ))}
                
                {/* Center Text Logic */}
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) - 35}
                            className="text-[#777980]/50 font-inter  font-normal leading-[160%]  "
                          >
                            Total Requests
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 5}
                            className="text-[#0E121B] text-[32px] font-medium leading-[120%]"
                          >
                            {TOTAL_REQUESTS.toLocaleString()}
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend Section */}
        <div className="space-y-4 -mt-8">
          {chartData.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="h-5 w-5 rounded-md" 
                  style={{ backgroundColor: item.fill }} 
                />
                <span className="text-[16px] font-semibold text-slate-700">
                  {item.name}
                </span>
              </div>
              <span className="text-[16px] font-bold text-slate-800">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}