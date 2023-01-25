import React, { useEffect } from 'react'
import { Loader } from '../../components/loader/Loader'
import s from './AppLoader.module.css'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppSelector } from "../../state/store";
import { appActions, selectStatus } from "../../features/Application";
import { selectIsLoggedIn } from "../../features/Auth";
import { useActions } from "../../hooks/useActions";

type AppLoaderPropsType = {
  children: React.ReactNode
}

export const AppLoader = ({ children}: AppLoaderPropsType) => {
  const status = useAppSelector(selectStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const { initializeApp } = useActions(appActions)
  useEffect(() => {
    if (!isLoggedIn) {
      initializeApp()
    }
  }, [])
  return (
    <AnimatePresence mode={'wait'}>
      <motion.div key={'app'}>
        {children}
      </motion.div>
      {status==='loading' && (
        <motion.div
          initial={{
            opacity: 1,
          }}
          animate={{
            opacity: 1,
            transition: { duration: 0.35 },
          }}
          exit={{
            scale: 2,
            opacity: 0,
            transition: { duration: 0.5 },
          }}
          key={'app-loader'}
          className={s.container}
        >
          <Loader size={'large'} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
