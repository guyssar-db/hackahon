import SidebarOrganizer from '@/components/SidebarOrganizer'
import LayoutOrganize from '@/layouts/LayoutOrganize'
import React from 'react'

export default function page() {
  return (
    <>
    <LayoutOrganize>
      <SidebarOrganizer/>
    </LayoutOrganize>
    </>
  )
}