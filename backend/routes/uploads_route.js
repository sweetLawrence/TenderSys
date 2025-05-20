const express = require('express')
const router = express.Router()
const fs = require('fs')
const upload = require('../middlewares/upload')
const { Tenders } = require('../Database/models') // confirm this path is correct

// POST /api/tenders - Upload tender info + document
router.post('/', upload.single('document'), async (req, res) => {
  try {
    console.log('Upload route hit')

    const { title, description, financial_year, deadline } = req.body
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'Document file is required.' })
    }
    const document = req.file.filename

    // Validate all required fields
    if (!title || !description || !financial_year || !deadline) {
      return res
        .status(400)
        .json({ message: 'All fields including file are required.' })
    }

    // Create tender record with document filename saved
    const tender = await Tenders.create({
      title,
      description,
      financial_year,
      deadline,
      document
    })

    res.status(201).json({ message: 'Tender uploaded successfully', tender })
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

const path = require('path')

// GET /api/tenders - fetch all tenders with download URLs
router.get('/', async (req, res) => {
  try {
    const tenders = await Tenders.findAll({
      attributes: [
        'id',
        'title',
        'description',
        'financial_year',
        'deadline',
        'document'
      ]
    })

    const host = req.get('host') // e.g., localhost:3000 or your domain
    const protocol = req.protocol // http or https

    // Add download URL for each tender's document
    const tendersWithDownloadUrl = tenders.map(tender => ({
      id: tender.id,
      title: tender.title,
      description: tender.description,
      financial_year: tender.financial_year,
      deadline: tender.deadline,
      document: tender.document,
      downloadUrl: `${protocol}://${host}/api/tenders/download/${tender.document}`
    }))

    res.json(tendersWithDownloadUrl)
  } catch (error) {
    console.error('Error fetching tenders:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// GET /api/tenders/download/:filename - serve the document file for download
router.get('/download/:filename', (req, res) => {
  const filename = req.params.filename
  const filePath = path.join(__dirname, '..', 'uploads', filename)

  res.download(filePath, filename, err => {
    if (err) {
      console.error('File download error:', err)
      return res.status(404).json({ message: 'File not found' })
    }
  })
})

router.patch('/:id', upload.single('document'), async (req, res) => {
  try {
    const tenderId = req.params.id
    const tender = await Tenders.findByPk(tenderId)

    if (!tender) {
      return res.status(404).json({ message: 'Tender not found' })
    }

    // Ensure file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'New document file is required.' })
    }

    // Optionally delete the old file here (if desired)
    const oldFilePath = path.join(__dirname, '..', 'uploads', tender.document)
    fs.unlink(oldFilePath, err => {
      if (err) console.error('Error deleting old file:', err)
    })

    // Update DB with new filename
    tender.document = req.file.filename
    await tender.save()

    res.status(200).json({ message: 'Document updated successfully', tender })
  } catch (error) {
    console.error('Update error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const tender = await Tenders.findByPk(req.params.id)
    if (!tender) return res.status(404).json({ message: 'Tender not found' })

    // Delete file from storage
    if (tender.document) {
      const filePath = path.join(__dirname, '..', 'uploads', tender.document)
      fs.unlink(filePath, err => {
        if (err) {
          console.error('Failed to delete file:', err)
          // Continue anyway; file might already be gone
        }
      })
    }

    // Delete DB record with Sequelize
    await Tenders.destroy({ where: { id: req.params.id } })

    res.json({ message: 'Tender deleted successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
