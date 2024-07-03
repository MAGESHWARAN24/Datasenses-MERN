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
import {useFieldArray, useForm} from "react-hook-form";
import {Link, redirect, useNavigate} from "react-router-dom";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {MdLibraryAdd} from "react-icons/md";
import {ScrollArea} from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {authApi} from "@/api/authApi";
import {toast} from "@/components/ui/use-toast";
import {MdOutlineDeleteOutline} from "react-icons/md";
const signUpFormFields = [
  {
    name: "name",
    label: "Name",
  },
  {
    name: "companyname",
    label: "Company Name",
  },
  {
    name: "email",
    label: "Email",
  },
  {
    name: "workemail",
    label: "Work Email",
  },
  {
    name: "password",
    label: "Password",
  },
  {
    name: "confirmpassword",
    label: "Confirm Password",
  },
  {
    name: "members",
    label: "Members",
  },
];

const formSchema = z
  .object({
    name: z.string().nonempty(),
    email: z.string().email({
      message: "Enter the valid email",
    }),
    workemail: z.string().email({
      message: "Enter the valid email",
    }),
    companyname: z.string(),
    password: z
      .string()
      .min(8, {
        message: "Password contains atleast 8 characters",
      })
      .regex(
        /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {
          message: "Enter the strong password",
        }
      ),
    confirmpassword: z
      .string()
      .min(8, {
        message: "Password contains atleast 8 characters",
      })
      .regex(
        /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {
          message: "Enter the strong password",
        }
      ),
    members: z
      .array(
        z.object({
          name: z.string().nonempty({
            message: "Required",
          }),
          email: z.string().email({
            message: "Enter the valid email",
          }),
          role: z.string().nonempty({
            message: "Required",
          }),
        })
      )
      .min(3, {
        message: "Add the team member",
      }),
  })
  .refine(({password, confirmpassword}) => password === confirmpassword, {
    message: "Password and confirm password must be same",
    path: ["confirmpassword"],
  });

export default function SignUp() {
  const navigate = useNavigate();
  const signUpForm = useForm({
    resolver: zodResolver(formSchema),
  });
  const {control, handleSubmit} = signUpForm;
  const {append, remove, fields} = useFieldArray({
    name: "members",
    control,
  });
  const [err, setErr] = React.useState();
  const onSubmit = async (data) => {
    await authApi("auth/signup")
      .post(data)
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) navigate("auth/login");
      })
      .catch((error) => {
        setErr(error.response.data?.Error);
        console.log(response, err);
      });
  };
  console.log(err);
  return (
    <Card className="w-3/4 h-full">
      <CardHeader>
        <CardTitle className="text-xl">Signup</CardTitle>
        <CardDescription className="text-2xl">
          Create an account
        </CardDescription>
      </CardHeader>
      <div className="h-fit w-full p-5">
        <Form {...signUpForm}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col h-full"
          >
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
              {signUpFormFields.map(
                (colEl, i) =>
                  colEl.name !== "members" && (
                    <FormField
                      key={i}
                      name={colEl.name}
                      control={control}
                      render={({field}) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative">
                              <FloatingInput
                                id={colEl.name}
                                onChange={field.onChange}
                                className="h-14 w-full text-lg"
                              />
                              <FloatingLabel>
                                <FormLabel className="text-xl">
                                  {colEl.label}
                                </FormLabel>
                              </FloatingLabel>
                            </div>
                          </FormControl>
                          {
                            <div className="text-sm text-red-500">
                              {err?.[colEl.name]}
                            </div>
                          }
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )
              )}
            </div>
            <div>
              <FormField
                name="members"
                control={control}
                render={({field}) => (
                  <FormItem>
                    <FormLabel className="text-xl">Add Members</FormLabel>
                    <FormControl>
                      <div>
                        {[1, 2, 3, 4].map((colEl, i) => (
                          <div
                            className="grid grid-cols-3 gap-5 h-20"
                            key={colEl}
                          >
                            <FormField
                              name={`members.${i}.name`}
                              control={control}
                              render={({field}) => (
                                <FormItem>
                                  <FormControl>
                                    <div className="relative">
                                      <FloatingInput
                                        id="name"
                                        onChange={field.onChange}
                                        className="h-12 w-full text-lg"
                                      />
                                      <FloatingLabel>
                                        <FormLabel className="text-xl">
                                          Name
                                        </FormLabel>
                                      </FloatingLabel>
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              name={`members.${i}.email`}
                              control={control}
                              render={({field}) => (
                                <FormItem>
                                  <FormControl>
                                    <div className="relative">
                                      <FloatingInput
                                        id="email"
                                        onChange={field.onChange}
                                        className="h-12 w-full text-lg"
                                      />
                                      <FloatingLabel>
                                        <FormLabel className="text-xl">
                                          Email
                                        </FormLabel>
                                      </FloatingLabel>
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              name={`members.${i}.role`}
                              control={control}
                              rules={{required: true}}
                              render={({field}) => (
                                <FormItem>
                                  <FormControl>
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <SelectTrigger className="h-12 w-full text-md text-wrap">
                                        <FormLabel>
                                          <SelectValue placeholder="Select the role..." />
                                        </FormLabel>
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Frontend">
                                          Frontend
                                        </SelectItem>
                                        <SelectItem value="Backend">
                                          Backend
                                        </SelectItem>
                                        <SelectItem value="Database administrator">
                                          Database administrator
                                        </SelectItem>
                                        <SelectItem value="Legal Assistant">
                                          Legal Assistant
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        ))}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button className="h-10 w-1/2 text-lg">SignUp</Button>
          </form>
        </Form>
        <div className="p-5">
          <p className="text-center text-lg">
            Already have an account{" "}
            <Link to="/auth/login" className="text-blue-500 text-xl">
              Login
            </Link>
          </p>
        </div>
      </div>
    </Card>
  );
}

{
  /* <div className="w-full h-fit">
<FormField
  name="members"
  control={control}
  render={({field}) => (
    <FormItem>
      <FormLabel className="h-[5%] w-full text-lg flex font-semibold flex-row justify-between items-center p-5">
        Add Members
        <MdLibraryAdd
          className="size-7"
          onClick={() =>
            append({
              name: "",
              email: "",
              role: "",
            })
          }
        />
      </FormLabel>
      <FormMessage />
      <div
        // key={colEl.id}
        className="grid grid-cols-4 h-20 w-full gap-5 place-items-center"
      >
        <FormField
          name={`members.${i}.name`}
          control={control}
          render={({field}) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <FloatingInput
                    id="name"
                    onChange={field.onChange}
                    className="h-12 w-full text-lg"
                  />
                  <FloatingLabel>
                    <FormLabel className="text-xl">
                      Name
                    </FormLabel>
                  </FloatingLabel>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={`members.${i}.email`}
          control={control}
          render={({field}) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <FloatingInput
                    id="email"
                    onChange={field.onChange}
                    className="h-12 w-full text-lg"
                  />
                  <FloatingLabel>
                    <FormLabel className="text-xl">
                      Email
                    </FormLabel>
                  </FloatingLabel>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={`members.${i}.role`}
          control={control}
          rules={{required: true}}
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="h-12 w-full text-md text-wrap">
                    <FormLabel>
                      <SelectValue placeholder="Select the role..." />
                    </FormLabel>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Frontend">
                      Frontend
                    </SelectItem>
                    <SelectItem value="Backend">
                      Backend
                    </SelectItem>
                    <SelectItem value="Database administrator">
                      Database administrator
                    </SelectItem>
                    <SelectItem value="Legal Assistant">
                      Legal Assistant
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <MdOutlineDeleteOutline
          className="size-8 text-red-500"
          onClick={() => remove(i)}
        />
      </div>
      <ScrollArea className="w-full h-52">
        {fields.map((colEl, i) => (
          <></>
        ))}
      </ScrollArea>
    </FormItem>
  )}
/>
<Button className="h-14 w-full text-lg">Signup</Button>
<p className="font-medium text-md text-center">
  Already have an account?
  <Link to="../login" className="text-blue-600">
    {" "}
    Login
  </Link>
</p>
</div> */
}
