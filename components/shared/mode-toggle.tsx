"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"


export function ModeToggle() {
    const { setTheme, resolvedTheme } = useTheme()

    return resolvedTheme == 'dark' ? (
        <Button size={"icon"} onClick={() => setTheme('light')} variant={"ghost"}>
                <Sun />
        </Button> ) : (
        <Button size={"icon"} onClick={() => setTheme('dark')} variant={"ghost"}>
            <Moon />
        </Button> )
    
}
