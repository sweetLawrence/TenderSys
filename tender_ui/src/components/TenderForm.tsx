import { useState } from 'react'
import { Button, TextInput, Textarea, Group, FileInput } from '@mantine/core'

import axiosInstance from '../utils/axios'

const TenderForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    financial_year: '',
    deadline: '',
    document: null as File | null
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (file: File | null) => {
    setFormData(prev => ({ ...prev, document: file }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const payload = new FormData()
      payload.append('title', formData.title)
      payload.append('description', formData.description)
      payload.append('financial_year', formData.financial_year)
      payload.append('deadline', formData.deadline)
      if (formData.document) payload.append('document', formData.document)

    //   console.log('FormData content:')
    //   for (const [key, value] of payload.entries()) {
    //     console.log(`${key}:`, value)
    //   }
      await axiosInstance.post('/api/tenders', payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      alert('Tender submitted successfully!')
      setFormData({
        title: '',
        description: '',
        financial_year: '',
        deadline: '',
        document: null
      })
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Upload failed!')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-white shadow p-6 rounded-lg space-y-4 max-w-xl mx-auto mt-25'
    >
      <TextInput
        label='Title'
        placeholder='Tender title'
        name='title'
        value={formData.title}
        onChange={handleChange}
        required
      />
      <Textarea
        label='Description'
        placeholder='Brief description'
        name='description'
        value={formData.description}
        onChange={handleChange}
        required
      />
      <TextInput
        label='Financial Year'
        placeholder='e.g. 2025/2026'
        name='financial_year'
        value={formData.financial_year}
        onChange={handleChange}
        required
      />
      <TextInput
        type='date'
        label='Deadline'
        name='deadline'
        value={formData.deadline}
        onChange={handleChange}
        required
      />

      <FileInput
        label='Document'
        placeholder='Upload tender document'
        onChange={handleFileChange}
        accept='.pdf,.doc,.docx'
        required
      />

      <Group>
        <Button type='submit'>Submit</Button>
      </Group>
    </form>
  )
}

export default TenderForm
