'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function TestPage() {
  const [status, setStatus] = useState('Проверка подключения...')

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        setStatus('Ошибка: ' + error.message)
      } else {
        setStatus('Supabase подключён успешно!')
      }
    })
  }, [])

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>Тест Supabase</h1>
      <p>{status}</p>
    </div>
  )
}
