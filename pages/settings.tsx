import { AppContext } from "components/AppContext"
import { Collapse } from "components/Collapse"
import { Container } from "components/Container"
import { Switch } from "components/Switch"
import { motion } from "framer-motion"
import { NextPage } from "next"
import React from "react"
import { FaChevronDown } from "react-icons/fa"
import styled from "styled-components"

const SearchSectionTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  cursor: pointer;
`

const SearchSection: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <div style={{ marginTop: 24 }}>
      <Collapse
        defaultOpen
        button={({ open }) => (
          <SearchSectionTitle>
            <div style={{ flexGrow: 1 }}>{title}</div>
            <motion.div animate={{ rotate: open ? 180 : 0 }}>
              <FaChevronDown />
            </motion.div>
          </SearchSectionTitle>
        )}
      >
        <div style={{ marginTop: 16 }}>{children}</div>
      </Collapse>
    </div>
  )
}

const SettingsSwitch: React.FC<{
  label: React.ReactNode
  value: boolean
  onChange: (v: boolean) => void
}> = ({ label, onChange, value }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ fontSize: 16, fontWeight: 600, flexGrow: 1 }}>{label}</div>
      <Switch onChange={onChange} value={value} />
    </div>
  )
}

const Settings: NextPage = () => {
  const {
    darkMode,
    setDarkMode,
  } = React.useContext(AppContext)

  return (
    <Container
      style={{
        paddingTop: 24,
        background: "var(--secondary-background-color)",
        flexGrow: 1,
      }}
    >
      <div style={{ fontSize: 32, fontWeight: 700 }}>설정</div>
      <SearchSection title="디스플레이">
        <SettingsSwitch
          value={darkMode}
          label="다크 모드"
          onChange={(v) => {
            setDarkMode(v)
          }}
        />
      </SearchSection>
    </Container>
  )
}

export default Settings
