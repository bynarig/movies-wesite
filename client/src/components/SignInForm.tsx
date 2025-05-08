import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {loginSchema} from "@/validators/auth.validator.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {NavLink, useNavigate} from "react-router";
import {AuthService} from "@/services/auth.service.ts";
import {useState} from "react";
import GoogleIcon from "@/assets/googleIcon.tsx"
import {useGoogleLogin} from "@react-oauth/google";

export default function SignInForm() {
    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            await AuthService.googleAuth(tokenResponse.access_token);
        },
        onError: (errorResponse) => console.log(errorResponse),
    });
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null)
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            password: "",
            email: "",
        },
    })

    async function onSubmit(data: z.infer<typeof loginSchema>) {
        const res = await AuthService.signin(data)
        if (res?.status === 200) {
            navigate("/")
        } else {
            setError(res.data.message)
        }
    }

    return (
        <div className="w-[350px] ">
            <Form  {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
                                </FormControl>

                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Password" {...field} />
                                </FormControl>

                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <div className="text-red-500 text-sm">
                        {error}
                    </div>
                    <div className="md:flex md:items-center md:justify-between">
                        <Button type="submit">Submit</Button>
                        <Button variant="link"> <NavLink to="/signup">Don`t have an account?</NavLink></Button>
                    </div>
                </form>
            </Form>
            <Button onClick={() => googleLogin()} className="mt-[10px] w-full">Sign in with Google <GoogleIcon/></Button>
            {/*<Button className="mt-[10px] w-full"><AppleIcon/>Sign in with Apple </Button>*/}
        </div>
    )
}