"use client"

import { CalendarIcon, ChevronRightIcon, ChevronDownIcon, HelpCircleIcon } from "lucide-react"
import * as React from "react"
import { format } from "date-fns"
import { type DateRange } from "react-day-picker"
import {
  PieChart, Pie, Label, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid,
} from "recharts"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
  ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"

// ── Chart configs & data ─────────────────────────────────────────────────────

const donutConfig: ChartConfig = {
  collected: { label: "收款率", color: "var(--color-teal)" },
  remaining: { label: "未收", color: "#e5e7eb" },
}
const donutData = [
  { name: "collected", value: 55, fill: "var(--color-teal)" },
  { name: "remaining", value: 45, fill: "#e5e7eb" },
]

const barConfig: ChartConfig = {
  actual: { label: "實收", color: "var(--color-teal)" },
  gap: { label: "應收", color: "#6b7280" },
}
const barData = [
  { name: "空間租賃費", actual: 350000, gap: 450000 },
  { name: "停車費", actual: 84000, gap: 172000 },
]

const trendConfig: ChartConfig = {
  actual: { label: "實際收入", color: "var(--color-teal)" },
  expected: { label: "應收收入", color: "#6b7280" },
}
const trendData = [
  { month: "Nov", actual: 13000, expected: 22000 },
  { month: "Dec-2025", actual: 23000, expected: 18000 },
  { month: "Jan", actual: 12000, expected: 21000 },
  { month: "Feb", actual: 9000, expected: 17000 },
  { month: "Mar", actual: 20000, expected: 13000 },
  { month: "Apr", actual: 22000, expected: 15000 },
]

const vacancyConfig: ChartConfig = {
  within14: { label: "14 天內", color: "var(--color-teal)" },
  day15to30: { label: "15-30 天", color: "var(--color-brand)" },
  day31to60: { label: "31-60 天", color: "#6b7280" },
  over61: { label: "61 天以上", color: "#111827" },
}
const vacancyData = [
  { name: "within14", value: 8, fill: "var(--color-teal)" },
  { name: "day15to30", value: 4, fill: "var(--color-brand)" },
  { name: "day31to60", value: 3, fill: "#6b7280" },
  { name: "over61", value: 5, fill: "#111827" },
]

// ── Shared chart components ──────────────────────────────────────────────────

function SimpleDonut({ percent, label }: { percent: number; label: string }) {
  const size = 190
  const r = 72
  const cx = size / 2
  const cy = size / 2
  const circumference = 2 * Math.PI * r

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}
        className="absolute" style={{ transform: "rotate(-90deg)" }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e5e7eb" strokeWidth={20} />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--color-teal)" strokeWidth={20}
          strokeDasharray={`${circumference * (percent / 100)} ${circumference}`}
          strokeLinecap="butt" />
      </svg>
      <div className="relative text-center">
        <p className="text-[30px] font-semibold leading-none text-black">{percent}%</p>
        <p className="mt-1 text-xs text-gray-500">{label}</p>
      </div>
    </div>
  )
}

function PaymentDonut() {
  return (
    <div className="flex flex-col items-center gap-6 shrink-0">
      <div className="size-[180px] shrink-0">
      <ChartContainer config={donutConfig} className="!aspect-auto size-[180px]">
        <PieChart>
          <Pie data={donutData} dataKey="value" nameKey="name"
            innerRadius="68%" outerRadius="88%" strokeWidth={0}
            startAngle={90} endAngle={-270}>
            <Label content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                    <tspan x={viewBox.cx} y={(viewBox.cy ?? 0) - 3} fontSize="30" fontWeight="600" fill="black">55%</tspan>
                    <tspan x={viewBox.cx} y={(viewBox.cy ?? 0) + 21} fontSize="12" fill="#6b7280">收款率</tspan>
                  </text>
                )
              }
            }} />
          </Pie>
        </PieChart>
      </ChartContainer>
      </div>
      <p className="text-sm text-center text-teal">↑+4% (對比 9/1~9/30)</p>
    </div>
  )
}

function RentalBarChart() {
  return (
    <ChartContainer config={barConfig} className="h-[210px] flex-1 min-w-0">
      <BarChart data={barData} barSize={48}>
        <CartesianGrid vertical={false} stroke="#f3f4f6" />
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }}
          ticks={[150000, 300000, 450000, 600000, 750000, 900000]}
          tickFormatter={(v) => `${v / 1000}k`} width={36} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="actual" stackId="a" fill="var(--color-teal)" radius={[0, 0, 4, 4]} />
        <Bar dataKey="gap" stackId="a" fill="#6b7280" radius={[4, 4, 0, 0]} />
        <ChartLegend content={<ChartLegendContent />} />
      </BarChart>
    </ChartContainer>
  )
}

function TrendLineChart() {
  return (
    <ChartContainer config={trendConfig} className="h-[203px] w-full">
      <LineChart data={trendData} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
        <CartesianGrid vertical={false} stroke="#f3f4f6" />
        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }}
          ticks={[8000, 12000, 16000, 20000, 24000]}
          tickFormatter={(v) => `NT$${v / 1000}k`} width={48} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line dataKey="actual" type="monotone" stroke="var(--color-teal)" strokeWidth={2} dot={{ r: 4, fill: "var(--color-teal)" }} />
        <Line dataKey="expected" type="monotone" stroke="#6b7280" strokeWidth={2} dot={{ r: 4, fill: "#6b7280" }} />
        <ChartLegend content={<ChartLegendContent />} />
      </LineChart>
    </ChartContainer>
  )
}

function VacancyPieChart() {
  return (
    <ChartContainer config={vacancyConfig} className="size-[190px]">
      <PieChart>
        <Pie data={vacancyData} dataKey="value" nameKey="name"
          innerRadius="55%" outerRadius="80%" strokeWidth={0}
          startAngle={90} endAngle={-270}>
          <Label content={({ viewBox }) => {
            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
              return (
                <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                  <tspan x={viewBox.cx} y={(viewBox.cy ?? 0) - 8} fontSize="30" fontWeight="600" fill="black">20</tspan>
                  <tspan x={viewBox.cx} y={(viewBox.cy ?? 0) + 18} fontSize="14" fill="#6b7280">間</tspan>
                </text>
              )
            }
          }} />
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}

// ── Section cards ────────────────────────────────────────────────────────────

function OccupancyCard() {
  const locations = [
    { name: "信義據點", ratio: "4/5(80%)", value: 80 },
    { name: "萬華據點", ratio: "4/5(80%)", value: 80 },
    { name: "大安據點", ratio: "1/5(20%)", value: 20 },
  ]
  return (
    <Card className="flex-1 rounded-[6px] py-6 gap-4">
      <CardHeader className="px-6 py-0">
        <CardTitle className="text-lg font-semibold flex items-center gap-1">
          出租率 <HelpCircleIcon className="size-5 text-muted-foreground" />
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 py-0 flex flex-col items-center gap-4">
        <SimpleDonut percent={25} label="出租率" />
        <div className="flex flex-col gap-3 w-full">
          {locations.map(loc => (
            <div key={loc.name} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{loc.name}</span>
                <span className="font-semibold">{loc.ratio}</span>
              </div>
              <Progress value={loc.value}
                className="gap-0 [&>[data-slot=progress-track]]:h-2 [&>[data-slot=progress-track]]:bg-gray-200 [&_[data-slot=progress-indicator]]:bg-teal" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function LeaseReminderCard() {
  const rows = [
    { count: "5 件", label: "30 天內到期", color: "var(--color-teal)" },
    { count: "10 件", label: "31-60 天內到期", color: "var(--color-teal)" },
    { count: "12 件", label: "61-90 天內到期", color: "var(--color-teal)" },
  ]
  return (
    <Card className="flex-1 rounded-[6px] py-6 gap-4">
      <CardHeader className="px-6 py-0">
        <CardTitle className="text-lg font-semibold flex items-center gap-1">
          租期提醒 <HelpCircleIcon className="size-5 text-muted-foreground" />
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 py-0 flex flex-col items-center gap-4">
        <div className="flex flex-col items-center justify-center rounded-[6px] h-[100px] w-full text-center px-4 bg-cyan-50">
          <p className="text-[30px] font-semibold leading-none text-teal">27 件</p>
          <p className="text-xs mt-2 text-gray-500">關注 N 天內到期合約</p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          {rows.map(row => (
            <div key={row.label} className="flex flex-col gap-2 px-6 py-4 rounded-[6px] bg-gray-50">
              <p className="text-xl font-semibold">{row.count}</p>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full" style={{ backgroundColor: row.color }} />
                <p className="text-xs text-gray-500">{row.label}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function VacancyCard() {
  const rows = [
    { label: "14 天內 (8)", color: "var(--color-teal)" },
    { label: "15-30 天 (4)", color: "var(--color-brand)" },
    { label: "31-60 天 (3)", color: "#6b7280" },
    { label: "61 天以上 (5)", color: "#111827" },
  ]
  return (
    <Card className="flex-1 rounded-[6px] py-6 gap-4">
      <CardHeader className="px-6 py-0">
        <CardTitle className="text-lg font-semibold flex items-center gap-1">
          空置數 <HelpCircleIcon className="size-5 text-muted-foreground" />
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 py-0 flex flex-col items-center gap-4">
        <VacancyPieChart />
        <div className="flex flex-col gap-2 w-full">
          {rows.map((row, i) => (
            <div key={row.label}>
              <div className="flex items-center gap-2 py-2">
                <div className="size-2 rounded-full shrink-0" style={{ backgroundColor: row.color }} />
                <span className="flex-1 text-sm font-semibold">{row.label}</span>
                <ChevronDownIcon className="size-4 text-muted-foreground" />
              </div>
              {i < rows.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// ── Main component ───────────────────────────────────────────────────────────

export function OverviewSection() {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(2025, 9, 1),
    to: new Date(2025, 9, 31),
  })
  const total = 1320000
  const actual = 660000
  const overdue = 540000
  const tealPct = (actual / total) * 100
  const pinkPct = (overdue / total) * 100

  return (
    <div className="flex flex-col gap-4">
      {/* Page header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold">帳務總覽</h1>
        <div className="flex gap-2 text-xs text-muted-foreground">
          <span>數據更新時間：2026-10-10 12:35(GMT+8)</span>
          <span>幣別：TWD 新台幣</span>
        </div>
      </div>

      {/* 帳務 outer card */}
      <Card className="rounded-[6px] py-6 gap-4">
        <CardContent className="px-6 py-0 flex flex-col gap-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <Select defaultValue="信義據點">
              <SelectTrigger className="h-9 w-full sm:w-auto sm:min-w-[220px] bg-white rounded-[6px]">
                <SelectValue placeholder="選擇據點" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>據點</SelectLabel>
                  <SelectItem value="信義據點">信義據點</SelectItem>
                  <SelectItem value="萬華據點">萬華據點</SelectItem>
                  <SelectItem value="大安據點">大安據點</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-9 w-full sm:w-auto sm:min-w-[220px] justify-start text-left font-normal bg-white rounded-[6px]",
                  !dateRange && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="size-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "yyyy-MM-dd")} ~ {format(dateRange.to, "yyyy-MM-dd")}
                    </>
                  ) : (
                    format(dateRange.from, "yyyy-MM-dd")
                  )
                ) : (
                  <span>選擇日期範圍</span>
                )}
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* 收款進度 */}
          <Card className="rounded-[6px] py-6 gap-4">
            <CardHeader className="px-6 py-0">
              <CardTitle className="text-lg font-semibold">收款進度</CardTitle>
            </CardHeader>
            <CardContent className="px-6 py-0">
              <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
                <div className="flex flex-1 flex-col gap-4 min-w-0">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                      <span className="text-sm text-gray-500">帳單總額</span>
                      <span className="text-2xl font-semibold">$1,320,000</span>
                    </div>
                    <div className="h-2 w-full rounded-[10px] overflow-hidden flex">
                      <div style={{ width: `${tealPct}%`, backgroundColor: "var(--color-teal)" }} />
                      <div style={{ width: `${pinkPct}%`, backgroundColor: "var(--color-brand)" }} />
                      <div className="flex-1 bg-gray-500" />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    {[
                      { color: "var(--color-teal)", label: "實收", amount: "$660,000", sub: "含押金 $40,000", link: false },
                      { color: "var(--color-brand)", label: "逾時未收", amount: "$540,000", sub: "查看明細", link: true },
                      { color: "#6b7280", label: "待收", amount: "$120,000", sub: "查看明細", link: true },
                    ].map(item => (
                      <div key={item.label} className="flex-1 flex flex-col gap-2 px-6 py-4 rounded-[6px] bg-gray-50">
                        <div className="flex items-center gap-2">
                          <div className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-sm text-gray-500">{item.label}</span>
                        </div>
                        <span className="text-xl font-semibold">{item.amount}</span>
                        {item.link
                          ? <a href="#" className="text-sm underline text-teal">{item.sub}</a>
                          : <span className="text-sm text-gray-500">{item.sub}</span>}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2.5 px-4 py-2 rounded-[6px] bg-yellow-50">
                    <p className="flex-1 text-xs">💡 另有 3 筆帳單尚未出帳，出帳後將自動納入統計</p>
                    <div className="flex items-center gap-1 shrink-0">
                      <a href="#" className="text-xs underline whitespace-nowrap">前往出帳</a>
                      <ChevronRightIcon className="size-5" />
                    </div>
                  </div>
                </div>
                <PaymentDonut />
              </div>
            </CardContent>
          </Card>

          {/* 租金收入摘要 + 總押金餘額 */}
          <div className="flex flex-col lg:flex-row gap-4">
            <Card className="flex-1 rounded-[6px] py-6 gap-4">
              <CardHeader className="px-6 py-0">
                <CardTitle className="text-lg font-semibold">租金收入摘要</CardTitle>
              </CardHeader>
              <CardContent className="px-6 py-0">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex flex-col gap-4 sm:w-[190px] sm:shrink-0">
                    <div className="flex flex-col gap-2">
                      <span className="text-sm text-gray-500">本期收入</span>
                      <span className="text-2xl font-semibold">$434,000</span>
                      <span className="text-sm text-teal">↑+4% (對比 9/1~9/30)</span>
                    </div>
                    <Separator />
                    <div className="flex flex-col gap-2">
                      <span className="text-sm text-gray-500">本期應收收入</span>
                      <span className="text-2xl font-semibold">$756,000</span>
                      <span className="text-sm text-teal">收入達成率 57%</span>
                    </div>
                  </div>
                  <RentalBarChart />
                </div>
              </CardContent>
            </Card>

            <Card className="flex-1 rounded-[6px] py-6 gap-4">
              <CardHeader className="px-6 py-0">
                <CardTitle className="text-lg font-semibold">總押金餘額</CardTitle>
              </CardHeader>
              <CardContent className="px-6 py-0">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-gray-500">押金總餘額</span>
                    <span className="text-2xl font-semibold">$1,275,000</span>
                  </div>
                  <Separator />
                  <div className="flex flex-col gap-2 text-sm">
                    {[
                      { label: "當期收押金", value: "+NT$40,000", color: "var(--color-teal)" },
                      { label: "當期退押金", value: "-NT$15,000", color: "#f43f5e" },
                      { label: "押金轉費用", value: "-NT$8,000", color: "#f43f5e" },
                    ].map(row => (
                      <div key={row.label} className="flex items-center justify-between">
                        <span>{row.label}</span>
                        <span className="font-semibold" style={{ color: row.color }}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* 租金收入趨勢 */}
      <Card className="rounded-[6px] py-6 gap-4">
        <CardHeader className="px-6 py-0">
          <CardTitle className="text-lg font-semibold">租金收入趨勢 (近 6 個月)</CardTitle>
        </CardHeader>
        <CardContent className="px-6 py-0">
          <TrendLineChart />
        </CardContent>
      </Card>

      {/* 營運總覽 header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold">營運總覽</h2>
        <p className="text-xs text-muted-foreground">數據更新時間：2026-10-10 12:35(GMT+8)</p>
      </div>

      {/* 三個 KPI 卡片 */}
      <div className="flex flex-col md:flex-row gap-4">
        <OccupancyCard />
        <LeaseReminderCard />
        <VacancyCard />
      </div>
    </div>
  )
}
