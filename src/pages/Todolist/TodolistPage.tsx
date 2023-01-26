import React, { useEffect } from 'react'
import { Todolist,  todolistsActions, selectTodolists  } from '../../features/Todolist'
import { useAppSelector } from '../../state/store'
import { Navigate } from 'react-router-dom'
import s from './TodolistPage.module.css'
import { selectIsLoggedIn } from '../../features/Auth'
import { useActions } from '../../hooks/useActions'
import { AnimatePresence } from 'framer-motion'
import { AddTodolist } from '../../features/Todolist/UI/AddTodolist/AddTodolist'

export const TodolistPage = ({demo}: {demo?: boolean}) => {
  const { getTodolists } = useActions(todolistsActions)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const todolists = useAppSelector(selectTodolists)

  useEffect(() => {
    !demo && isLoggedIn && getTodolists()
  }, [isLoggedIn])
  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  return (
    <div className={s.mainContainer}>
      <AddTodolist />
      <AnimatePresence>
        {todolists?.map((tl) => {
          return (
            <Todolist
              key={tl.id}
              tdID={tl.id}
              filter={tl.filter}
              title={tl.title}
              entityStatus={tl.tdStatus}
            />
          )
        })}
      </AnimatePresence>
    </div>
  )
}
