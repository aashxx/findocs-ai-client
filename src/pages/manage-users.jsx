import React, { useContext, useEffect } from 'react';
import { ChevronDown, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { UsersContext } from '@/contexts/UsersContext';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '@/lib/firebase';
import { updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'sonner';
import { AuthContext } from '@/contexts/AuthContext';

const ManageUsers = () => {

    const { users } = useContext(UsersContext);
    const { user } = useContext(AuthContext);

    const navigate = useNavigate();
    
        useEffect(() => {
            if(!user) {
                navigate('/login')
            } else if(user?.role !== "Admin") {
                navigate('/');
            }
        }, [user]);

    const handleRoleChange = async (email, newRole) => {
        try {
            const userRef = doc(db, "users", email); 
            await updateDoc(userRef, { role: newRole }); 
            toast(`${email} role changed to ${newRole}`);
        } catch (error) {
            console.error("Error updating role:", error);
        }
    };

    const handleDeleteUser = async (email) => {
        try {
            await deleteDoc(doc(db, "users", email));
            toast(`Removed ${email} from team`);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const roles = [
        { label: "Admin", description: "Can view, upload, manage users" },
        { label: "Accountant", description: "Can upload and view only" },
        { label: "Auditor", description: "Can view and search only" }
    ];

    return (
        <main className="w-full min-h-screen p-10">

            {/* Page Header */}
            <section className="mb-6 flex items-center justify-between">
                <h2 className="font-semibold text-2xl text-gray-800">Manage Users</h2>
            </section>

            {/* Users Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Enrolled Users</CardTitle>
                    <CardDescription>
                        Invite your finance team members to collaborate.
                    </CardDescription>
                </CardHeader>

                <CardContent className="grid gap-6">
                    {users.map((user) => (
                        <div key={user.email} className="flex items-center justify-between space-x-4">

                            {/* User Avatar & Details */}
                            <div className="flex items-center space-x-4">
                                <Avatar>
                                    <AvatarImage src={user.photo} />
                                    <AvatarFallback>{user.fullName.slice(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium leading-none">{user.fullName}</p>
                                    <p className="text-sm text-muted-foreground">{user.email}</p>
                                </div>
                            </div>

                            {/* Role Selection & Delete Button */}
                            <div className="flex items-center space-x-2">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="ml-auto w-[120px]">
                                            {user.role} <ChevronDown className="text-muted-foreground" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="p-0" align="end">
                                        <Command>
                                            <CommandInput placeholder="Select new role..." />
                                            <CommandList>
                                                <CommandEmpty>No roles found.</CommandEmpty>
                                                <CommandGroup>
                                                    {roles.map((role) => (
                                                        <CommandItem
                                                            key={role.label}
                                                            className="teamaspace-y-1 flex flex-col items-start px-4 py-2"
                                                            onSelect={() => handleRoleChange(user.email, role.label)}
                                                        >
                                                            <p>{role.label}</p>
                                                            <p className="text-sm text-muted-foreground">{role.description}</p>
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>

                                {/* Delete Button */}
                                <Button
                                    className="bg-white border border-red-500 text-red-500 hover:bg-red-100"
                                    size="icon"
                                    onClick={() => handleDeleteUser(user.email)}
                                >
                                    <Trash2 className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Add User Button */}
            <Link to={'/signup'}>
                <Button className="mt-5">Add New User</Button>
            </Link>

        </main>
    );
};

export default ManageUsers;