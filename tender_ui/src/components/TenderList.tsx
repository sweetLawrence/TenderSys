// import { useEffect, useState } from 'react'
// import {
//   Button,
//   Card,
//   Group,
//   Text,
//   FileInput,
//   Modal,
//   Title
// } from '@mantine/core'
// import axios from 'axios'

// type Tender = {
//   id: number
//   title: string
//   description: string
//   financial_year: string
//   deadline: string
//   document: string
// }

// const TenderList = () => {
//   const [tenders, setTenders] = useState<Tender[]>([])
//   const [editModalOpen, setEditModalOpen] = useState(false)
//   const [selectedTender, setSelectedTender] = useState<Tender | null>(null)
//   const [newFile, setNewFile] = useState<File | null>(null)

//   const fetchTenders = async () => {
//     // const res = await axios.get('/api/tenders')
//     // setTenders(res.data)
//   }

//   useEffect(() => {
//     fetchTenders()
//   }, [])

//   const handleDelete = async (id: number) => {
//     const confirmDelete = window.confirm(
//       'Are you sure you want to delete this tender?'
//     )
//     if (!confirmDelete) return

//     try {
//       await axios.delete(`/api/tenders/${id}`)
//       fetchTenders()
//       alert('Tender deleted')
//     } catch (err) {
//       console.error(err)
//       alert('Delete failed')
//     }
//   }

//   const openEditModal = (tender: Tender) => {
//     setSelectedTender(tender)
//     setEditModalOpen(true)
//     setNewFile(null)
//   }

//   const handleUpdate = async () => {
//     if (!selectedTender || !newFile) return

//     const confirmUpdate = window.confirm('Upload new document for this tender?')
//     if (!confirmUpdate) return

//     const formData = new FormData()
//     formData.append('document', newFile)

//     try {
//       await axios.put(`/api/tenders/${selectedTender.id}`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       })
//       setEditModalOpen(false)
//       setSelectedTender(null)
//       setNewFile(null)
//       fetchTenders()
//       alert('Tender updated')
//     } catch (err) {
//       console.error(err)
//       alert('Update failed')
//     }
//   }

//   return (
//     <div className='max-w-5xl mx-auto mt-10 space-y-6'>
//       <Title order={2}>Available Tenders</Title>

//       {tenders.length === 0 ? (
//         <Text>No tenders found.</Text>
//       ) : (
//         tenders?.map(tender => (
//           <Card key={tender.id} shadow='md' p='lg' radius='md' withBorder>
//             <Group>
//               <div>
//                 <Text>{tender.title}</Text>
//                 <Text size='sm' color='dimmed'>
//                   FY: {tender.financial_year} — Deadline: {tender.deadline}
//                 </Text>
//               </div>
//               <Group>
//                 <Button
//                   size='xs'
//                   color='blue'
//                   onClick={() => openEditModal(tender)}
//                 >
//                   Edit
//                 </Button>
//                 <Button
//                   size='xs'
//                   color='red'
//                   onClick={() => handleDelete(tender.id)}
//                 >
//                   Delete
//                 </Button>
//               </Group>
//             </Group>
//             <Text mt='sm'>{tender.description}</Text>
//             <a
//               href={tender.document}
//               target='_blank'
//               rel='noopener noreferrer'
//               className='text-blue-600 text-sm underline mt-2 inline-block'
//             >
//               View Document
//             </a>
//           </Card>
//         ))
//       )}

//       <Modal
//         opened={editModalOpen}
//         onClose={() => setEditModalOpen(false)}
//         title='Update Tender Document'
//         centered
//       >
//         <FileInput
//           label='New Document'
//           placeholder='Choose new file'
//           accept='.pdf,.doc,.docx'
//           value={newFile}
//           onChange={setNewFile}
//           required
//         />
//         <Group mt='md'>
//           <Button onClick={handleUpdate} disabled={!newFile}>
//             Upload
//           </Button>
//           <Button
//             variant='outline'
//             color='gray'
//             onClick={() => setEditModalOpen(false)}
//           >
//             Cancel
//           </Button>
//         </Group>
//       </Modal>
//     </div>
//   )
// }

// export default TenderList

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

import axiosInstance from '../utils/axios'

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

    // Dummy tenders for preview
    // const dummy: Tender[] = [
    //   {
    //     id: 1,
    //     title: 'Construction of Science Laboratory',
    //     description: 'This tender covers civil works and plumbing for a new science lab.',
    //     financial_year: '2024/2025',
    //     deadline: '2025-03-01',
    //     document: 'https://example.com/tenders/lab.pdf'
    //   },
    //   {
    //     id: 2,
    //     title: 'Supply of Office Furniture',
    //     description: 'Provision of desks, chairs, and cabinets for the administrative block.',
    //     financial_year: '2024/2025',
    //     deadline: '2025-02-15',
    //     document: 'https://example.com/tenders/furniture.pdf'
    //   },
    //   {
    //     id: 3,
    //     title: 'ICT Equipment Procurement',
    //     description: 'Supply and installation of computers, printers, and networking equipment.',
    //     financial_year: '2024/2025',
    //     deadline: '2025-04-10',
    //     document: 'https://example.com/tenders/ict.pdf'
    //   }
    // ]
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
      // await axios.delete(`/api/tenders/${id}`)
      setTenders(prev => prev.filter(t => t.id !== id))
      alert('Tender deleted')
    } catch (err) {
      console.error(err)
      alert('Delete failed')
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
      console.log('Simulating upload for', selectedTender.id)
      setEditModalOpen(false)
      setSelectedTender(null)
      setNewFile(null)
      alert('Tender document updated (dummy)')
    } catch (err) {
      console.error(err)
      alert('Update failed')
    }
  }

  return (
    <div className='max-w-5xl mx-auto space-y-6 mt-25'>
      <Title order={2} className='mb-3 mx-6'>
        Available Tenders
      </Title>

      {tenders.length === 0 ? (
        <Text>No tenders found.</Text>
      ) : (
        tenders.map(tender => (
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
    </div>
  )
}

export default TenderList
