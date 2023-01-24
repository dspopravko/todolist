import React from 'react';
import { LinearProgress } from "@material-ui/core";
import s from './ProgressBar.module.css'
import { useAppSelector } from "../../state/store";
import { selectStatus } from "../../features/Application";

export const ProgressBar = () => {
  const status = useAppSelector(selectStatus)
  return (
    <div className={s.container}>
      {status === 'loading' && <LinearProgress />}
    </div>
  );
}