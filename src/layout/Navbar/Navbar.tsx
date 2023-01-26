import React from 'react'
import { Button, Toolbar, Typography } from '@material-ui/core'
import { useAppSelector } from '../../state/store'
import s from './Navbar.module.css'
import { selectStatus } from '../../features/Application'
import { selectIsLoggedIn, selectUserName, authActions } from '../../features/Auth'
import { useActions } from '../../hooks/useActions'
import { theme } from '../../app/App'

export const Navbar = () => {
  const { logout } = useActions(authActions)
  const status = useAppSelector(selectStatus)
  const username = useAppSelector(selectUserName)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const logoutBtnHandler = () => logout()
  const user = username || 'Guest'
  return (
    <>
      <Toolbar
        style={{
          backgroundColor:
            status === 'idle'
              ? theme.palette.primary.main
              : theme.palette.primary.light,
        }}
        className={s.toolbar}
      >
        <div className={s.navbar}>
          <Typography variant="h6">Todolists</Typography>

          <div className={s.logoutWrapper}>
            <Button onClick={() => logoutBtnHandler()} color="inherit">
              {isLoggedIn && 'Logout'}
            </Button>
            {isLoggedIn && (
              <div className={s.user}>
                <p>{user}</p>
              </div>
            )}
          </div>
        </div>
      </Toolbar>
    </>
  )
}
