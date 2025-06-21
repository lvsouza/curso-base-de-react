import { PageLayout } from '@/shared/layout/page-layout/PageLayout';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { useState } from 'react';


const chartConfig = {
  count: {
    label: "Finalizados",
    color: "var(--primary)",
  },
} satisfies ChartConfig


export const Home = () => {
  const [chartData, setChartData] = useState([
    { month: "January", count: 186 },
    { month: "February", count: 305 },
    { month: "March", count: 237 },
    { month: "April", count: 173 },
    { month: "May", count: 209 },
    { month: "June", count: 214 },
    { month: "July", count: 321 },
    { month: "August", count: 289 },
    { month: "September", count: 198 },
    { month: "October", count: 256 },
    { month: "November", count: 412 },
    { month: "December", count: 378 },
  ]);


  return (
    <PageLayout title='Página inicial'>

      <Card>
        <CardHeader>
          <CardTitle>TODOs finalizados em um ano</CardTitle>
          <CardDescription>
            Mostrando o total de TODOs finalizados em um ano
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className='h-50 w-full'>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="count"
                type="natural"
                fill="var(--color-count)"
                fillOpacity={0.4}
                stroke="var(--color-count)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

    </PageLayout>
  )
}
