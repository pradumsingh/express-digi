import express from 'express'
const app = express()

const port = 3000

// To accept JSON data from frontend
app.use(express.json())

// In-memory data store
let teaData = []
let nextId = 1

// POST: Add new tea
app.post('/teas', (req, res) => { 
    const { name, price } = req.body
    const newTea = { id: nextId++, name, price }
    teaData.push(newTea)
    res.status(201).send(newTea)
})

// GET: All teas
app.get('/teas', (req, res) => {
    res.status(200).send(teaData)
})

// GET: Single tea by ID
app.get('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send('Tea not found')
    }
    res.status(200).send(tea)
})

// PUT: Update tea by ID
app.put('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send('Tea not found')
    }
    const { name, price } = req.body
    tea.name = name 
    tea.price = price 
    res.status(200).send(tea)
})

// DELETE: Remove tea by ID
app.delete('/teas/:id', (req, res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if (index === -1) {
        return res.status(404).send('Tea not found')
    }
    teaData.splice(index, 1)
    res.status(204).send()
})

app.listen(port, () => {
    console.log(`Server is running at port: ${port}`)
})
