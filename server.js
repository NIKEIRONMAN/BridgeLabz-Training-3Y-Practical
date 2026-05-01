const express = require('express');

const app = express();
app.use(express.json());

const students = [];
let nextId = 1;

app.post('/students', (req, res) => {
	if (!req.body.name || !req.body.marks) {
		return res.status(400).json({ error: 'name and marks are required.' });
	}

	if (Number(req.body.marks) < 0) {
		return res.status(400).json({ error: 'marks must be 0 or more.' });
	}

	const student = { id: nextId++, name: req.body.name, marks: Number(req.body.marks) };
	students.push(student);
	return res.status(201).json(student);
});

app.get('/students', (req, res) => {
	return res.json(students);
});

app.put('/students/:id', (req, res) => {
	const id = Number(req.params.id);a
	if (!id || id < 1) return res.status(400).json({ error: 'Invalid id.' });

	const student = students.find((item) => item.id === id);
	if (!student) return res.status(404).json({ error: 'Student not found.' });

	if (req.body.name) student.name = req.body.name;
	if (req.body.marks !== undefined) {
		if (Number(req.body.marks) < 0) {
			return res.status(400).json({ error: 'marks must be 0 or more.' });
		}
		student.marks = Number(req.body.marks);
	}

	return res.json(student);
});

app.delete('/students/:id', (req, res) => {
	const id = Number(req.params.id);
	if (!id || id < 1) return res.status(400).json({ error: 'Invalid id.' });

	const index = students.findIndex((item) => item.id === id);
	if (index === -1) return res.status(404).json({ error: 'Student not found.' });

	students.splice(index, 1);
	return res.sendStatus(204);
});

app.use((req, res) => res.status(404).json({ error: 'Route not found.' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
     console.log(`Server running on http://localhost:${PORT}`));