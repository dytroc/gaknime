import { AppContext } from 'components/AppContext'
import { useContext } from 'react'

export const useGaknimes = () => {
    return useContext(AppContext).gaknimes;
}