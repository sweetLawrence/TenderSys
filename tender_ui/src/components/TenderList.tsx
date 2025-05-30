import { useEffect, useState } from 'react'
import {
  Button,
  Card,
  Group,
  Text,
  FileInput,
  Modal,
  Title
} from '@mantine/core'

import { FiFile } from 'react-icons/fi'
import axiosInstance from '../utils/axios'
import { Toaster, toast } from 'sonner'

type Tender = {
  id: number
  title: string
  description: string
  financial_year: string
  deadline: string
  document: string

  downloadUrl: string
}

const TenderList = () => {
  const [tenders, setTenders] = useState<Tender[]>([])
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedTender, setSelectedTender] = useState<Tender | null>(null)
  const [newFile, setNewFile] = useState<File | null>(null)

  const fetchTenders = async () => {
    const res = await axiosInstance.get('/api/tenders')
    console.log(res.data)
    setTenders(res.data)
  }

  useEffect(() => {
    fetchTenders()
  }, [])

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this tender?'
    )
    if (!confirmDelete) return

    try {
      //   await axios.delete(`/api/tenders/${id}`)
      await axiosInstance.delete(`/api/tenders/${id}`)

      setTenders(prev => prev.filter(t => t.id !== id))
      // alert('Tender deleted')
      toast.success('Tender Deleted Successfully')
    } catch (err) {
      console.error(err)
      // alert('Delete failed')
      toast.error('Deletion Failed. Try again')
    }
  }

  const openEditModal = (tender: Tender) => {
    setSelectedTender(tender)
    setEditModalOpen(true)
    setNewFile(null)
  }

  const handleUpdate = async () => {
    if (!selectedTender || !newFile) return

    const confirmUpdate = window.confirm('Upload new document for this tender?')
    if (!confirmUpdate) return

    try {
      // Simulate upload
      //   console.log('Simulating upload for', selectedTender.id)
      //   setEditModalOpen(false)
      //   setSelectedTender(null)
      //   setNewFile(null)
      //   alert('Tender document updated (dummy)')

      const formData = new FormData()
      formData.append('document', newFile)

      await axiosInstance.patch(`/api/tenders/${selectedTender.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      setEditModalOpen(false)
      setSelectedTender(null)
      setNewFile(null)
      fetchTenders()
      // alert('Tender document updated')
      toast.success('Tender document updated')
    } catch (err) {
      console.error(err)
      // alert('Update failed')
      toast.error('Update Failed. Try again')
    }
  }

  return (
    <div className='max-w-5xl mx-auto space-y-6 mt-25'>
      <Title order={2} className='mb-3 mx-6'>
        Available Tenders
      </Title>

      {tenders.length === 0 ? (
        // <Text className='ml-6'>No tenders found.</Text>
        <div className='flex flex-col items-center justify-center p-10 rounded-lg border border-gray-200 shadow-sm w-[95%] mx-auto bg-white'>
          <FiFile size={48} className='text-gray-400 mb-3' />
          <h2 className='text-lg font-semibold text-gray-700'>
            No Tenders Found
          </h2>
          <p className='text-sm text-gray-500 mt-1'>
            Please check back later or contact the administrator.
          </p>
        </div>
      ) : (
        tenders?.map(tender => (
          <Card
            key={tender.id}
            shadow='md'
            p='lg'
            radius='md'
            withBorder
            className='w-[95%] mx-auto'
          >
            <Group align='start'>
              <div>
                <Text className='font-bold'>{tender.title}</Text>
                <Text size='sm' color='dimmed'>
                  FY: {tender.financial_year}
                </Text>
                <Text size='sm' color='dimmed'>
                  Deadline: {tender.deadline}
                </Text>
                <Text mt='xs'>{tender.description}</Text>
                <a
                  href={tender.downloadUrl}
                  //   target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-600 text-sm underline mt-2 inline-block decoration-0'
                >
                  View Document
                </a>
              </div>
              <Group className=' absolute right-5'>
                <Button
                  size='xs'
                  color='blue'
                  onClick={() => openEditModal(tender)}
                >
                  Edit
                </Button>
                <Button
                  size='xs'
                  color='red'
                  onClick={() => handleDelete(tender.id)}
                >
                  Delete
                </Button>
              </Group>
            </Group>
          </Card>
        ))
      )}

      <Modal
        opened={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title='Update Tender Document'
        centered
      >
        <FileInput
          label='New Document'
          placeholder='Choose new file'
          accept='.pdf,.doc,.docx'
          value={newFile}
          onChange={setNewFile}
          required
        />
        <Group mt='md'>
          <Button onClick={handleUpdate} disabled={!newFile}>
            Upload
          </Button>
          <Button
            variant='outline'
            color='gray'
            onClick={() => setEditModalOpen(false)}
          >
            Cancel
          </Button>
        </Group>
      </Modal>
      <Toaster richColors position='top-right' className='py-5'/>
    </div>
  )
}

export default TenderList
