"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { ChatBubbleIcon, Cross1Icon } from "@radix-ui/react-icons"

export function ChatButton() {
  const [open, setOpen] = React.useState(false)

  return <Button onClick={() => setOpen(!open)} className="absolute right-10 bottom-10 rounded-full w-16 h-16">
    {
      open
        ? <Cross1Icon className="w-6 h-6" />
        : <ChatBubbleIcon className="w-6 h-6" />
    }
  </Button>
}
