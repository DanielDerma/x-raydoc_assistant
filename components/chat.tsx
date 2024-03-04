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
import { Button } from "./ui/button"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Check, Plus } from "lucide-react"

const users = [
  {
    name: "X-RayDoc Assistant",
    email: "Free",
    avatar: "/avatars/01.png",
  },
  {
    name: "Isabella Nguyen",
    email: "Paid Plan",
    avatar: "/avatars/03.png",
  },
  {
    name: "Emma Wilson",
    email: "Paid Plan",
    avatar: "/avatars/05.png",
  },
  {
    name: "Jackson Lee",
    email: "Paid Plan",
    avatar: "/avatars/02.png",
  },
  {
    name: "William Kim",
    email: "Paid Plan",
    avatar: "/avatars/04.png",
  },
] as const

type User = (typeof users)[number]

const commandsGetStarted = [
  {
    command: "/key_kaggle",
    description: "Get Kaggle API Key",
  },
  {
    command: "/key_colab",
    description: "Get G Colab API Key",
  },
] as const

const commands = [
  {
    command: "/uploadImage",
    description: "Upload an image to analyze",
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
  const [selectedUsers, setSelectedUsers] = React.useState<User>(users[0])
  const [messages, setMessages] = React.useState<Message[]>([
    {
      role: "agent",
      content: "To get started, type /key_kaggle and /key_colab.",
    }
  ])
  const [input, setInput] = React.useState("")
  const inputLength = input.trim().length

  return (
    <>
      <Card className="h-full flex flex-col">
        <CardHeader className="flex flex-row items-center">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/avatars/01.png" alt="Image" />
              <AvatarFallback>XA</AvatarFallback>
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
            onSubmit={(event) => {
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
            }}
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
              />
              {/* <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Get started">
                  {
                    commandsGetStarted.map((command) => (
                      <CommandItem
                        key={command.command}
                        onSelect={() => {
                          setMessages([
                            ...messages,
                            {
                              role: "user",
                              content: command.command,
                            },
                          ])
                          setInput("")
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
                          const pre: Message[] = [
                            ...messages,
                            {
                              role: "user",
                              content: command.command,
                            },
                          ]
                          setMessages(pre)
                          if (command.command === "/uploadImage") {
                            const inputF = document.getElementById("attact-image");
                            if (inputF) {
                              inputF.click();

                              inputF.onchange = function (e) {
                                const file = (e.target as HTMLInputElement).files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = function (e) {
                                    const image = e.target?.result;
                                    setMessages([
                                      ...pre,
                                      {
                                        role: "user",
                                        content: "",
                                        image: image as string,
                                      },
                                    ])
                                  }
                                  reader.readAsDataURL(file);
                                }
                              }
                            }
                          }
                          setInput("")
                        }}
                      >
                        <span>{command.command}</span>
                      </CommandItem>
                    ))
                  }
                </CommandGroup>
              </CommandList> */}
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
