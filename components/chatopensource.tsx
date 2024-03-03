"use client"

import React from "react"
import { ChatBubbleIcon, Cross1Icon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CardsChat } from "./chat"

export function Chat() {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button onClick={() => setOpen(!open)} className="absolute right-6 bottom-6 rounded-full w-16 h-16">
          {
            open
              ? <Cross1Icon className="w-6 h-6" />
              : <ChatBubbleIcon className="w-6 h-6" />
          }
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 mr-6 mb-6" onCloseAutoFocus={() => setOpen(false)}>
        <CardsChat />
      </PopoverContent>
    </Popover>
  )
}