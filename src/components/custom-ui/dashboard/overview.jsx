import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useMemo, useContext } from "react";
import { DocsContext } from '@/contexts/DocsContext';

export function Overview() {
    const { docs } = useContext(DocsContext);
    
    const data = useMemo(() => {
        const typeCounts = docs.reduce((acc, doc) => {
            acc[doc.type] = (acc[doc.type] || 0) + 1;
            return acc;
        }, {});
        
        return Object.entries(typeCounts).map(([name, total]) => ({ name, total }));
    }, [docs]);

    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis
                    dataKey="name"
                    stroke="#000"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    interval={0}
                />
                <YAxis
                    stroke="#000"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                />
                <Bar
                    dataKey="total"
                    fill="#000"
                    radius={[4, 4, 0, 0]}
                    barSize={40}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}
