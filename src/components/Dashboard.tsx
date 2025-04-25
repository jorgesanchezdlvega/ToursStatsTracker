import React from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer 
} from "recharts";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const COLORS = ['#0088FE', '#00C49F'];

export default function Dashboard() {
  const { data: tours = [] } = useQuery({
    queryKey: ["tours"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tours")
        .select("*")
        .order("date", { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  const toursByCategory = tours.reduce((acc: Record<string, number>, tour: any) => {
    acc[tour.tour_category] = (acc[tour.tour_category] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = Object.entries(toursByCategory).map(([name, value]) => ({
    name,
    value,
  }));

  const scoreData = tours.map((tour: any) => ({
    date: format(new Date(tour.date), "MMM d"),
    score: tour.score,
  }));

  const weatherScores = tours.reduce((acc: Record<string, { total: number; count: number }>, tour: any) => {
    if (!acc[tour.weather]) {
      acc[tour.weather] = { total: 0, count: 0 };
    }
    acc[tour.weather].total += tour.score;
    acc[tour.weather].count += 1;
    return acc;
  }, {});

  const averageScoreByWeather = Object.entries(weatherScores).map(([weather, data]) => ({
    weather,
    score: data.total / data.count,
  }));

  const totalTours = tours.length;
  const averageGroupSize = tours.length
    ? tours.reduce((sum: number, tour: any) => sum + tour.number_of_people, 0) / tours.length
    : 0;
  const averageScore = tours.length
    ? tours.reduce((sum: number, tour: any) => sum + tour.score, 0) / tours.length
    : 0;

  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Tours</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalTours}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Average Group Size</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{averageGroupSize.toFixed(1)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{averageScore.toFixed(1)}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Score Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scoreData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#3b82f6" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Average Score by Weather</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={averageScoreByWeather}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="weather" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Bar dataKey="score" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tour Category Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => 
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
