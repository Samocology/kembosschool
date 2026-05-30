import React from 'react'

export default function Head() {
  return (
    <>
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      <link rel="shortcut icon" href="/icon.svg" />
      <link rel="icon" href="/icon-light-32x32.png" media="(prefers-color-scheme: light)" sizes="32x32" />
      <link rel="icon" href="/icon-dark-32x32.png" media="(prefers-color-scheme: dark)" sizes="32x32" />
      <link rel="icon" href="/placeholder-logo.png" sizes="48x48" />
      <link rel="apple-touch-icon" href="/apple-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#ffffff" />
    </>
  )
}
