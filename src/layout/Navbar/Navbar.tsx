import React from 'react';
import { Button, LinearProgress, Toolbar, Typography } from "@material-ui/core";
import { useAppSelector } from "../../state/store";
import s from "./Navbar.module.css"
import { selectStatus } from "../../features/Application";
import { selectIsLoggedIn, selectUserName } from "../../features/Auth";
import { useActions } from "../../utils/redux-utils";
import { authActions } from "../../features/Auth";

export const Navbar = () => {
  const { logout } = useActions(authActions)
  const status = useAppSelector(selectStatus)
  const username = useAppSelector(selectUserName)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const logoutBtnHandler = () => logout()
  const user = username || "Guest"

  return (
    <>
      <Toolbar className={s.toolbar}>
        <div className={s.navbar}>
          <Typography variant="h6">
            Todolists
          </Typography>

          <div className={s.logoutWrapper}>
            <Button onClick={() => logoutBtnHandler()}
                    color="inherit">
              {isLoggedIn && 'Logout'}
            </Button>
            {isLoggedIn &&
                <div className={s.user}>
                    <p>
                      {user}
                    </p>
                </div>
            }
          </div>
        </div>
      </Toolbar>
      {status === 'loading' && <LinearProgress />}
    </>
  );

}