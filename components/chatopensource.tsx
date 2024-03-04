"use client"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ChatBubbleIcon, Cross1Icon } from "@radix-ui/react-icons"
import React from "react"
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
      <PopoverContent className="w-[400px] mr-6 mb-6" onCloseAutoFocus={() => setOpen(false)}>
        <CardsChat />
      </PopoverContent>
    </Popover>
  )
}