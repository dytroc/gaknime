import {motion} from "framer-motion"
import React from "react"

export const Collapse: React.FC<{
    button: (props: { open: boolean }) => React.ReactNode
    defaultOpen?: boolean
    children: React.ReactNode
}> = ({button, defaultOpen, children}) => {
    const [open, setOpen] = React.useState(!!defaultOpen)

    return (
        <div>
            <div onClick={() => setOpen((v) => !v)}>{button({open})}</div>
            <motion.div
                animate={{height: open ? "fit-content" : 0, overflow: "hidden"}}
            >
                {children}
            </motion.div>
        </div>
    )
}
