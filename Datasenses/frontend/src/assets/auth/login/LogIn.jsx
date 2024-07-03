import React from "react";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  FloatingLabel,
  FloatingInput,
} from "@/components/ui/floating-label-input";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {Link, useNavigate} from "react-router-dom";
import {object, z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {authApi} from "@/api/authApi";

const formSchema = z.object({
  email: z.string().email({
    message: "Enter the valid email",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password atleast contains 8 characters",
    })
    .regex(
      /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      {
        message: "Enter the strong password",
      }
    ),
});

export default function LogIn() {
  const navigate = useNavigate();
  const [err, setErr] = React.useState();
  const loginForm = useForm({
    resolver: zodResolver(formSchema),
  });

  const {control, handleSubmit} = loginForm;

  const onSubmit = async (data) => {
    await authApi("auth/login")
      .post(data)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("auth_Jwt", response.data.token);
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        setErr(error.response.data?.Error);
      });
  };
  return (
    <Card className="w-96 h-fit">
      <CardHeader>
        <CardTitle className="text-xl">Login</CardTitle>
        <CardDescription className="text-2xl">Wellcome Back</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...loginForm}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col p-3 gap-5"
          >
            <FormField
              name="email"
              control={control}
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <FloatingInput
                        id="email"
                        onChange={field.onChange}
                        className="h-14 w-full text-lg"
                      />
                      <FloatingLabel>
                        <FormLabel className="text-xl">Email</FormLabel>
                      </FloatingLabel>
                    </div>
                  </FormControl>
                  {err?.email ? (
                    <div className="text-red-500 text-sm">{err?.email}</div>
                  ) : (
                    <FormMessage />
                  )}
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={control}
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <FloatingInput
                        id="password"
                        onChange={field.onChange}
                        className="h-14 w-full text-lg"
                      />
                      <FloatingLabel>
                        <FormLabel className="text-xl">Password</FormLabel>
                      </FloatingLabel>
                    </div>
                  </FormControl>
                  {err?.password ? (
                    <div className="text-red-500 text-sm">{err?.password}</div>
                  ) : (
                    <FormMessage />
                  )}
                </FormItem>
              )}
            />
            <Button className="h-14 w-full text-lg">Login</Button>
          </form>
        </Form>
        <p className="font-medium text-md text-center">
          Don't have an account?
          <Link to="../signup" className="text-blue-600">
            {" "}
            Sign Up
          </Link>
        </p>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
