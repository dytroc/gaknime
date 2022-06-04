import React from "react"
import ReactDOM from "react-dom"
import { AnimatePresence, motion } from "framer-motion"
import styled from "styled-components"

class Portal extends React.Component<any, any> {
  el: HTMLDivElement

  constructor(props: any) {
    super(props)
    this.el = document.createElement("div")
  }

  componentDidMount() {
    document.body.appendChild(this.el)
  }

  componentWillUnmount() {
    document.body.removeChild(this.el)
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el)
  }
}

const Backdrop = styled(motion.div)`
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`

const Overlay: React.FC<
  React.StyleHTMLAttributes<HTMLDivElement> & {
    open?: boolean
    close?: () => void
    children:
      | React.ReactNode
      | ((props: { close: () => void }) => React.ReactNode)
  }
> = ({ children, open: openProp, style, close }) => {
  return (
    <>
      <Portal>
        <AnimatePresence>
          {(openProp ?? open) && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                type: "tween",
              }}
              style={{ zIndex: 99999, position: "relative" }}
            >
              <Backdrop
                onClick={() => {
                  close?.()
                }}
              />
              <motion.div
                initial={{
                  translateX: "-50%",
                  translateY: "-50%",
                  y: -80,
                }}
                animate={{
                  y: 0,
                  transition: {
                    type: "tween",
                  },
                }}
                exit={{
                  y: 80,
                  transition: {
                    type: "tween",
                  },
                }}
                style={{
                  position: "fixed",
                  left: "50%",
                  top: "50%",
                  transform: `translate(-50%, -50%)`,
                  ...style,
                }}
              >
                {typeof children === "function"
                  ? children({ close: () => close?.() })
                  : children}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </>
  )
}

export default Overlay
