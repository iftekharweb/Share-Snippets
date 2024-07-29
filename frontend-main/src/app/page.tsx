"use client";

import React from 'react';
import { useStateContext } from '@/contexts';

export default function Home() {
  const {authToken} = useStateContext();

  return (
    <div className='bg-gray-100 h-screen'>Share Snippet</div>
  );
}
