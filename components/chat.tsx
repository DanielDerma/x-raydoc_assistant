import * as React from "react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

import {
  CommandEmpty,
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"

import Image from "next/image"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Check, Plus } from "lucide-react"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"


const users = [
  {
    name: "Chest X-Ray Analysis for COVID-19",
    email: "Free",
    avatar: "/avatars/01.png",
  },
  {
    name: "MedQuery Analyzer",
    email: "Paid Plan",
    avatar: "/avatars/03.png",
  },
  {
    name: "SymptomMapper",
    email: "Paid Plan",
    avatar: "/avatars/05.png",
  },
  {
    name: "TreatmentAdvisor",
    email: "Paid Plan",
    avatar: "/avatars/02.png",
  },
  {
    name: "DrugInteractionChecker",
    email: "Paid Plan",
    avatar: "/avatars/04.png",
  },
  {
    name: "HealthTracker Integration",
    email: "Paid Plan",
    avatar: "/avatars/04.png",
  },
  {
    name: "ClinicalTrialNavigator",
    email: "Paid Plan",
    avatar: "/avatars/04.png",
  },
  {
    name: "WellnessCoach Module",
    email: "Paid Plan",
    avatar: "/avatars/04.png",
  },
  {
    name: "Telemedicine Scheduler",
    email: "Paid Plan",
    avatar: "/avatars/04.png",
  },
  {
    name: "LanguageTranslator",
    email: "Paid Plan",
    avatar: "/avatars/04.png",
  },
  {
    name: "SecureDataVault",
    email: "Paid Plan",
    avatar: "/avatars/04.png",
  },
] as const

type User = (typeof users)[number]

const commandsGetStarted = [
  {
    command: "/password",
    description: "Put your password",
  }
] as const

const commands = [
  {
    command: "/uploadImage",
    description: "Upload an image to analyze",
  },
  {
    command: "/notification",
    description: "Set a notification",
  },
] as const

type CommandGetStarted = (typeof commandsGetStarted)[number]

type Message = {
  role: "agent" | "user",
  content: string,
  image?: string,
}

export function CardsChat() {
  const [open, setOpen] = React.useState(false)
  const [onGetPassword, setOnGetPassword] = React.useState(false)
  const [autorized, setAutorized] = React.useState(false)
  const [selectedUsers, setSelectedUsers] = React.useState<User>(users[0])
  const [messages, setMessages] = React.useState<Message[]>([
    {
      role: "agent",
      content: "Run the get started commands to get started.",
    }
  ])
  const [input, setInput] = React.useState("")

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (inputLength === 0) return
    setMessages([
      ...messages,
      {
        role: "user",
        content: input,
      },
    ])
    setInput("")
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.count("handleKeyPress")
    if (event.key === "Enter" && inputLength > 0) {
      if (onGetPassword) {
        if (input === password) {
          setMessages([
            ...messages,
            {
              role: "user",
              content: input,
            },
            {
              role: "agent",
              content: "Password is correct",
            },
          ])
          setOnGetPassword(false)
          setAutorized(true)
        } else {
          setMessages([
            ...messages,
            {
              role: "user",
              content: input,
            },
            {
              role: "agent",
              content: "Password is incorrect",
            },
          ])
        }
      }
      setInput("")
    }
  }

  const password = "123456"

  const inputLength = input.trim().length

  return (
    <>
      <Card className="flex flex-col h-[600px] overflow-y-auto">
        <CardHeader className="flex flex-row items-center">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/avatars/01.png" alt="Image" />
              <AvatarFallback>{selectedUsers.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{selectedUsers.name}</p>
              <a target="_blank" href="https://colab.research.google.com/github/mohd-faizy/09P_Detecting_COVID_19_with_Chest_X-Ray_using_PyTorch/blob/master/01_Detecting_COVID_19_with_Chest_X_Ray_using_PyTorch.ipynb#scrollTo=i77I2uWzJfPD" className="text-sm text-muted-foreground underline">{selectedUsers.email}</a>
            </div>
          </div>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="ml-auto rounded-full"
                  onClick={() => setOpen(true)}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">More Tools</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={10}>More Tools</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
        <CardContent className="">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex w-max max-w-[75%] flex-col gap-2 rounded-md px-3 py-2 text-sm",
                  message.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {message.content}
                {message.image && (
                  <div className="flex items-center space-x-2">
                    <Image src={message.image} alt="Image" className="w-24 h-24" width={96} height={96} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="mt-auto w-full">
          <form
            onSubmit={handleSubmit}
            className="flex w-full items-center space-x-2"
          >
            <div className="">
              <label htmlFor="attact-image">
                <input type="file" accept=".jpg, .png" id="attact-image" className="bg-transparent hidden" />
              </label>
            </div>
            <Command className="rounded-lg border shadow-md">
              <CommandInput
                id="message"
                placeholder="Type a command or message..."
                className="flex-1"
                autoComplete="off"
                value={input}
                onValueChange={setInput}
                onKeyUpCapture={handleKeyPress}
              />
              <CommandList>
                <CommandGroup heading="Get started">
                  {
                    commandsGetStarted.map((command) => (
                      <CommandItem
                        key={command.command}
                        onSelect={() => {

                          let pre: Message[] = [
                            ...messages,
                            {
                              role: "user",
                              content: command.command,
                            },
                          ]
                          setInput("")
                          if (command.command === "/password") {
                            setOnGetPassword(true)
                            setMessages([
                              ...pre,
                              {
                                role: "agent",
                                content: "Enter your password",
                              },
                            ])
                          }
                        }}
                      >
                        <span>{command.command}</span>
                      </CommandItem>
                    ))
                  }
                </CommandGroup>
                <CommandGroup heading="Commands">
                  {
                    commands.map((command) => (
                      <CommandItem
                        key={command.command}
                        onSelect={() => {
                          let pre: Message[] = [
                            ...messages,
                            {
                              role: "user",
                              content: command.command,
                            },
                          ]
                          setMessages(pre)
                          if (command.command === "/uploadImage") {
                            if (!autorized) {
                              setMessages([
                                ...pre,
                                {
                                  role: "agent",
                                  content: "You are not authorized to upload an image",
                                }]
                              )
                              return
                            }
                            const inputF = document.getElementById("attact-image");
                            if (inputF) {
                              inputF.click();

                              inputF.onchange = function (e) {
                                const file = (e.target as HTMLInputElement).files?.[0];
                                const fileName = file?.name ?? "";
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = function (e) {
                                    const image = e.target?.result
                                    setMessages([
                                      ...pre,
                                      {
                                        role: "user",
                                        content: "",
                                        image: image as string,
                                      },
                                    ])
                                    pre.push({
                                      role: "user",
                                      content: "",
                                      image: image as string,
                                    })
                                    setMessages([
                                      ...pre,
                                      {
                                        role: "agent",
                                        content: fileName === "COVID-1.png" ? "COVID-19 detected in 96.5%" : "COVID-19 not detected",
                                      },
                                    ])
                                  }
                                  reader.readAsDataURL(file);
                                }
                              }
                            }
                          }
                          if (command.command === "/notification") {
                            toast("Event has been created", {
                              description: "Sunday, December 03, 2023 at 9:00 AM",
                              action: {
                                label: "Undo",
                                onClick: () => console.log("Undo"),
                              },
                            })
                          }
                          setInput("")
                        }}
                      >
                        <span>{command.command}</span>
                      </CommandItem>
                    ))
                  }
                </CommandGroup>
              </CommandList>
            </Command>
          </form>
        </CardFooter>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="gap-0 p-0 outline-none">
          <DialogHeader className="px-4 pb-4 pt-5">
            <DialogTitle>Tools</DialogTitle>
            <DialogDescription>

            </DialogDescription>
          </DialogHeader>
          <Command className="overflow-hidden rounded-t-none border-t">
            <CommandInput placeholder="Search for a tool..." />
            <CommandList>
              <CommandEmpty>No users found.</CommandEmpty>
              <CommandGroup className="p-2">
                {users.map((user) => (
                  <CommandItem
                    key={user.email}
                    className="flex items-center px-2"
                    onSelect={() => {
                      setSelectedUsers(user)
                      setOpen(false)
                    }}
                  >
                    <Avatar>
                      <AvatarImage src={user.avatar} alt="Image" />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="ml-2">
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                    {selectedUsers.email === user.email ? (
                      <Check className="ml-auto flex h-5 w-5 text-primary" />
                    ) : null}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  )
}
