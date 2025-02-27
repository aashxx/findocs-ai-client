import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { loginValidation, signUpValidation } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleUser, Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Signup = () => {

    const [viewPassword, setViewPassword] = useState(false);

    const form = useForm({
        resolver: zodResolver(signUpValidation),
        defaultValues: {
            fullName: "",
            email: "",
            password: ""
        }
    });

    const onSignup = (values) => {
        console.log(values);
    }

    return (
        <Form {...form}>
            <main className='flex flex-col items-center justify-center h-screen w-full'>
                <form onSubmit={form.handleSubmit(onSignup)} className='border px-20 py-10 rounded-lg shadow-md'>
                    <h2 className='text-3xl text-center'>Create Account</h2>
                    <div className='my-2'>
                        <FormDescription className='text-center'>
                            Create an account to utilize our services
                        </FormDescription>
                    </div>
                    <hr className='mb-7' />
                    <FormField
                        control={form.control}
                        name='fullName'
                        render={({ field }) => (
                            <FormItem>
                                <label className='text-[12px]' htmlFor="email">Full Name</label>
                                <FormControl>
                                    <article className="relative group">
                                        <CircleUser strokeWidth={1} className="text-gray-500 absolute top-[6px] left-2 group-focus-within:text-black transition-colors" />
                                        <Input className="pl-10 focus:ring-1 focus:ring-black" name="fullName" type="text" placeholder="Your Full Name" {...field} />
                                    </article>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <label className='text-[12px]' htmlFor="email">Email Address</label>
                                <FormControl>
                                    <article className="relative group">
                                        <Mail strokeWidth={1} className="text-gray-500 absolute top-[6px] left-2 group-focus-within:text-black transition-colors" />
                                        <Input className="pl-10 focus:ring-1 focus:ring-black" name="email" type="email" placeholder="Your Email" {...field} />
                                    </article>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <label className='text-[12px]' htmlFor="password">Password</label>
                                <div className='relative'>
                                    <FormControl>
                                        <article className="relative group">
                                            <LockKeyhole strokeWidth={1} size={19} className="text-gray-500 absolute top-[8px] left-2 group-focus-within:text-black transition-colors" />
                                            <Input className="pl-10 focus:ring-1 focus:ring-black" type={viewPassword ? 'text' : 'password'} placeholder='Your Password' {...field} />
                                        </article>
                                    </FormControl>
                                    <div className='absolute right-3 cursor-pointer top-2 hover:bg-white' onClick={(e) => { e.stopPropagation(); setViewPassword(!viewPassword) }}>
                                        {
                                            viewPassword ? (
                                                <Eye size={20} />
                                            ) : (
                                                <EyeOff size={20} />
                                            )
                                        }
                                    </div>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type='submit' className='mt-8 w-full text-md font-semibold'>
                        Create Account
                    </Button>
                </form>
            </main>
        </Form>
    )
}

export default Signup;
