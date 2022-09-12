import React from 'react'
import { motion } from 'framer-motion'

export const Switch: React.FC<{
    value: boolean
    onChange: (v: boolean) => void
}> = ({ value, onChange }) => {
    return (
        <motion.div
            onClick={() => onChange(!value)}
            style={{
                width: 60,
                position: 'relative',
                height: 30,
                borderRadius: 15,
                cursor: 'pointer',
            }}
            animate={{
                background: value ? '#cc0' : '#c2c2c2',
            }}
        >
            <motion.div
                style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    background: '#fff',
                    top: 5,
                    position: 'absolute',
                }}
                animate={
                    value
                        ? {
                            right: 5,
                            left: 'auto',
                        }
                        : {
                            left: 5,
                            right: 'auto',
                        }
                }
            />
        </motion.div>
    )
}
