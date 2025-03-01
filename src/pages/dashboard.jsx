import { AuthContext } from '@/contexts/AuthContext';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from '@/components/custom-ui/dashboard/overview';
import { RecentFiles } from '@/components/custom-ui/dashboard/recent-files';
import { CircleAlert, DatabaseZap, Files, Users } from 'lucide-react';
import { DocsContext } from '@/contexts/DocsContext';
import { UsersContext } from '@/contexts/UsersContext';


const Dashboard = () => {

  const { user } = useContext(AuthContext);
  const { docs } = useContext(DocsContext);
  const { users } = useContext(UsersContext);

  const navigate = useNavigate();

  const totalStorageUsed = docs.reduce((acc, doc) => acc + (doc.size || 0), 0); 
  const totalStorageUsedMB = (totalStorageUsed / (1024 * 1024)).toFixed(1); 

  const cardData = [
    {
      card_name: "Total Documents",
      sub_line: "documents processed",
      metric: docs.length || 0,
      icon: Files
    },
    {
      card_name: "Active Users",
      sub_line: "using this platform",
      metric: users.length || 0,
      icon: Users
    },
    {
      card_name: "Fraud Alerts",
      sub_line: "issues detected",
      metric: "7",
      icon: CircleAlert
    },
    {
      card_name: "Storage",
      sub_line: "used in your storage",
      metric: `${totalStorageUsedMB} MB / 15 GB`,
      icon: DatabaseZap
    },
  ]

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]); 


  return (
    <main className='w-full min-h-screen bg-gray-100 p-10'>
      <section className="mb-6 flex items-center justify-between">
        <h2 className="font-semibold text-2xl text-gray-800">Dashboard</h2>
        <h2>
          {new Date().toLocaleDateString()}
        </h2>
      </section>
      <section className="mb-6 flex items-center justify-center gap-4 w-full">
        {
          cardData.map((card, idx) => (
            <Card key={idx} className="shadow-md flex-1 rounded-lg bg-white">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{card.card_name}</CardTitle>
                <card.icon className="h-5 w-5 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.metric}</div>
                <p className="text-xs text-muted-foreground">{card.sub_line}</p>
              </CardContent>
            </Card>
          ))
        }
      </section>
      <section>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Files</CardTitle>
              <CardDescription>
                Your recent uploads are here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentFiles docs={docs} />
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}

export default Dashboard;