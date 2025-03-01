import React, { useContext, useState } from 'react';
import Select from 'react-select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DocsContext } from '@/contexts/DocsContext';
import { AuthContext } from '@/contexts/AuthContext';

const Settings = () => {

    const { user } = useContext(AuthContext);
    const { docs } = useContext(DocsContext);

    const [selectedFileTypes, setSelectedFileTypes] = useState([]);

    const totalStorageUsed = docs.reduce((acc, doc) => acc + (doc.size || 0), 0); 
    const totalStorageUsedMB = (totalStorageUsed / (1024 * 1024)).toFixed(1); 

    // File types options
    const fileTypeOptions = [
        { value: "PDF", label: "PDF" },
        { value: "DOCX", label: "DOCX" },
        { value: "JPG", label: "JPG" },
        { value: "JPEG", label: "JPEG" },
        { value: "PNG", label: "PNG" },
    ];

    // Storage details (Dynamic Example)
    const totalStorage = 15; // 10GB
    const usedStorage = totalStorageUsedMB; // 6GB
    const storagePercentage = (usedStorage / totalStorage) * 100; // Calculate percentage

    return (
        <main className="w-full min-h-screen bg-gray-100 p-10">
        {/* Header Section */}
        <section className="mb-6 flex items-center justify-between">
            <h2 className="font-semibold text-2xl text-gray-800">Settings</h2>
        </section>

        {/* Storage Status Card */}
        <Card>
            <CardHeader>
            <CardTitle>Storage Status</CardTitle>
            <Progress value={storagePercentage} className="w-full mt-2" />
            <CardDescription>
                You have used <strong>{usedStorage}MB</strong> / {totalStorage}GB
            </CardDescription>
            </CardHeader>
            
            <CardContent>
            {/* File Type Selection */}
            <CardTitle className="pb-2">Enable File Types for Upload</CardTitle>
            {
                user?.role === "Admin" && (
                    <div className="mb-4">
                        <Select
                        options={fileTypeOptions}
                        isMulti
                        value={selectedFileTypes}
                        onChange={setSelectedFileTypes}
                        placeholder="Select File Types"
                        className="w-full"
                        />
                    </div>
                )
            }

            {/* Delete Company Button */}
            <Button variant="destructive" className="w-full">
                Delete Account
            </Button>
            </CardContent>
        </Card>
        </main>
    );
};

export default Settings;