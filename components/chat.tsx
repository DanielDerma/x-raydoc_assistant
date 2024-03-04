import { ImageIcon, PaperPlaneIcon } from "@radix-ui/react-icons"
import * as React from "react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

import { Input } from "./ui/input"
import {
  CalendarIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  RocketIcon,
} from "@radix-ui/react-icons"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

const commands = [
  {
    command: "/key_kaggle",
    description: "Get Kaggle API Key",
  },
  {
    command: "/key_colab",
    description: "Get G Colab API Key",
  },
] as const

type Command = (typeof commands)[number]

export function CardsChat() {
  const [messages, setMessages] = React.useState([
    {
      role: "agent",
      content: "To get started, type /key_kaggle and /key_colab.",
    }
  ])
  const [input, setInput] = React.useState("")
  const inputLength = input.trim().length

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/avatars/01.png" alt="Image" />
              <AvatarFallback>XA</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">X-RayDoc Assistant</p>
              <a target="_blank" href="https://www.google.com/maps" className="text-sm text-muted-foreground underline">Open Source Colab Docs</a>
            </div>
          </div>
        </CardHeader>
        <CardContent className="max-h-96 overflow-y-scroll">
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
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
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
            <Button size="icon" className="bg-transparent"
              onClick={() => { const inputF = document.getElementById("attact-image"); if (inputF) { inputF.click(); } }}
            >
              <ImageIcon className="h-4 w-4" />
              <span className="sr-only">Attach Image</span>
            </Button>
            <Command className="rounded-lg border shadow-md">
              <CommandInput
                id="message"
                placeholder="Type a command or search..."
                className="flex-1"
                autoComplete="off"
                value={input}
                onValueChange={setInput}
              />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {
                    commands.map((command) => (
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
              </CommandList>
            </Command>
            <Button type="submit" size="icon" disabled={inputLength === 0}>
              <PaperPlaneIcon className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </>
  )
}
