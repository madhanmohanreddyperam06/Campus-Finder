'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart as RechartsPie, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Building, FlaskConical, School, University, TrendingUp, Users, Database, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInstitutions } from '@/hooks/use-institutions';

const COLORS = {
  primary: '#dc2626',    // Red
  secondary: '#2563eb',  // Blue  
  success: '#16a34a',    // Green
  warning: '#ea580c',    // Orange
  info: '#0891b2',
  schools: '#2563eb',     // Blue for Schools
  engineering: '#dc2626',  // Red for Engineering
  juniorColleges: '#16a34a', // Green for Junior Colleges
  universities: '#ea580c',   // Orange for Universities
} as const;

export default function StatsOverviewPage() {
  const { institutions } = useInstitutions();
  const [stats, setStats] = useState({
    totalInstitutions: 0,
    schools: 0,
    juniorColleges: 0,
    engineeringColleges: 0,
    universities: 0
  });

  useEffect(() => {
    const totalInstitutions = institutions.length;
    const schools = institutions.filter(i => i.type === 'School').length;
    const juniorColleges = institutions.filter(i => i.type === 'Junior College').length;
    const engineeringColleges = institutions.filter(i => i.type === 'Engineering College').length;
    const universities = institutions.filter(i => i.type === 'University').length;

    setStats({
      totalInstitutions,
      schools,
      juniorColleges,
      engineeringColleges,
      universities
    });
  }, [institutions]);

  const pieData = [
    { name: 'Schools', value: stats.schools, color: COLORS.schools },
    { name: 'Junior Colleges', value: stats.juniorColleges, color: COLORS.juniorColleges },
    { name: 'Engineering Colleges', value: stats.engineeringColleges, color: COLORS.engineering },
    { name: 'Universities', value: stats.universities, color: COLORS.universities },
  ];

  const barData = [
    { category: 'Schools', count: stats.schools, icon: School },
    { category: 'Junior Colleges', count: stats.juniorColleges, icon: Building },
    { category: 'Engineering Colleges', count: stats.engineeringColleges, icon: FlaskConical },
    { category: 'Universities', count: stats.universities, icon: University },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-lg">
          <p className="font-semibold">{`${label}: ${payload[0].value}`}</p>
          <p className="text-sm text-gray-600">{payload[0].name}</p>
        </div>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-sm font-semibold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-headline font-bold text-primary md:text-5xl">Stats Overview</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Visual analytics and insights for your educational institution database.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6 text-center">
            <Database className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.totalInstitutions}</div>
            <div className="text-sm text-blue-700 dark:text-blue-300">Total Institutions</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 border-green-200 dark:border-green-800">
          <CardContent className="p-6 text-center">
            <School className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.schools}</div>
            <div className="text-sm text-green-700 dark:text-green-300">Schools</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 border-purple-200 dark:border-purple-800">
          <CardContent className="p-6 text-center">
            <Building className="h-12 w-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.juniorColleges}</div>
            <div className="text-sm text-purple-700 dark:text-purple-300">Junior Colleges</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30 border-orange-200 dark:border-orange-800">
          <CardContent className="p-6 text-center">
            <FlaskConical className="h-12 w-12 text-orange-600 dark:text-orange-400 mx-auto mb-4" />
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">{stats.engineeringColleges}</div>
            <div className="text-sm text-orange-700 dark:text-orange-300">Engineering Colleges</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/30 dark:to-indigo-900/30 border-indigo-200 dark:border-indigo-800">
          <CardContent className="p-6 text-center">
            <University className="h-12 w-12 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{stats.universities}</div>
            <div className="text-sm text-indigo-700 dark:text-indigo-300">Universities</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                Institution Distribution
              </CardTitle>
              <CardDescription>
                Percentage breakdown of institution types in your database.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPie>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#dc2626"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </RechartsPie>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5 text-primary" />
                Institution Count by Category
              </CardTitle>
              <CardDescription>
                Detailed count of institutions by educational category.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="category"
                    tick={{ fill: '#6b7280' }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis tick={{ fill: '#6b7280' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="count" fill="#dc2626" radius={[8, 8, 0, 0]}>
                    {barData.map((entry, index) => {
                      let colorKey = entry.category.toLowerCase().replace(' ', '') as keyof typeof COLORS;
                      // Special handling for Junior Colleges
                      if (entry.category === 'Junior Colleges') {
                        colorKey = 'juniorColleges';
                      }
                      return (
                        <Cell key={`cell-${index}`} fill={COLORS[colorKey] || COLORS.primary} />
                      );
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Detailed Stats Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-primary" />
              Detailed Institution Statistics
            </CardTitle>
            <CardDescription>
              Comprehensive breakdown of all institution data in your system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold">Institution Type</th>
                    <th className="text-center p-3 font-semibold">Count</th>
                    <th className="text-center p-3 font-semibold">Percentage</th>
                    <th className="text-center p-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {barData.map((item, index) => {
                    const percentage = stats.totalInstitutions > 0
                      ? ((item.count / stats.totalInstitutions) * 100).toFixed(1)
                      : '0.0';

                    return (
                      <tr key={item.category} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            <item.icon className="h-4 w-4" />
                            <span className="font-medium">{item.category}</span>
                          </div>
                        </td>
                        <td className="text-center p-3">
                          <span className="font-bold text-lg">{item.count}</span>
                        </td>
                        <td className="text-center p-3">
                          <div className="flex items-center justify-center">
                            <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                              <div
                                className="h-2 bg-blue-600 rounded-full"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{percentage}%</span>
                          </div>
                        </td>
                        <td className="text-center p-3">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            Active
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
