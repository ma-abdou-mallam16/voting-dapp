'use client'

import React from 'react'

import TableProposals from '../components/table-proposals/page';
import Whitelist from '@/components/whitelist/page';
import WinningProposal from '@/components/winning-proposal/page';
import Welcome from '@/components/welcome-stepper/page';

export default function Home () {
  return (
    <>
    <Welcome />
    <Whitelist />
    <TableProposals />
    <WinningProposal />

    </>
  )
}


