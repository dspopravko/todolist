import React from 'react'
import s from './Loader.module.css'
import cx from 'classnames'

export const Loader = ({ size }: { size: 'small' | 'regular' | 'large' }) => {
  return (
    <span
      className={s.loaderLight}
      style={{
        transform: cx({
          'scale(0.6)': size === 'small',
          'scale(1)': size === 'regular',
          'scale(2)': size === 'large',
        }),
        ['--radius' as string] : cx({
          '6px': size === 'small',
          '2px': size === 'regular',
          '1px': size === 'large',
        })
      }}
    ></span>
  )
}
