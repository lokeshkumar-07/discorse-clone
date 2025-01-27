"use client"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

interface ActionTooltipProps {
    label: string,
    children: React.ReactNode,
    side?: "top" | "right" | "bottom" | "left"
    align?: "start" | "center" | "end"
}

const ActionTooltip = ({
    label, children, side, align
} : ActionTooltipProps) => {
  return (
    <TooltipProvider>
        <Tooltip delayDuration={50}>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>

            <TooltipContent side={side} align={align} className="">
                <p className="font-semibold capitalize text-sm">
                    {label.toLowerCase()}
                </p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
  )
}

export default ActionTooltip
