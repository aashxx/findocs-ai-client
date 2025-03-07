import Loader from '@/components/custom-ui/loader';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AuthContext } from '@/contexts/AuthContext';
import { loginValidation } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, FileSearch, LockKeyhole, Mail } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const { userLogin, user, loading } = useContext(AuthContext);

    const [viewPassword, setViewPassword] = useState(false);
    const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(loginValidation),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onLogin = (credentials) => {
        const { email, password } = credentials;
        userLogin(email, password);
        form.reset();
    }

    useEffect(() => {
        if(user) {
            navigate('/');
        }
    }, []);

    return (
        <main className='h-screen w-full flex items-center justify-around'>
            <section className='flex flex-col gap-3 pb-32 self-end'>
                <FileSearch className='h-[100px] w-[100px]' />
                <h2 className='text-7xl'>
                    FinDocx AI
                </h2>
                <p className='text-[gray]'>
                    The Future of AI-Driven Financial Document Intelligence.
                </p>
            </section>
            <Form {...form}>
                { loading && <Loader />}
                    <form onSubmit={form.handleSubmit(onLogin)} className='border w-[400px] p-10 rounded-lg shadow-md'>
                        <h2 className='text-3xl text-center'>Login</h2>
                        <div className='my-2'>
                            <FormDescription className='text-center'>
                                Enter your credentials to login
                            </FormDescription>
                        </div>
                        <hr className='mb-7' />
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
                            Login
                        </Button>
                        <h4 className='my-4 text-sm text-center'>
                            Don't have an account? <Link className='hover:underline' to={'/signup'}>Create One</Link>
                        </h4>
                    </form>
            </Form>
        </main>
    )
}

export default Login;
