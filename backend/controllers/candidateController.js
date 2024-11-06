const candidatesService = require('../services/candidateServices');

class CandidatesController {
    async create(req, res) {
        try {
            const data = req.body;
            const files = req.files; 

            if (files && files.avt) {
                data.avt = files.avt[0].path; 
            }
            if (files && files.cvFile) {
                data.cvFile = files.cvFile[0].path; 
            }

            const candidate = await candidatesService.createCandidate(data, files);
            res.status(201).json(candidate);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const candidates = await candidatesService.getAllCandidates();
            res.status(200).json(candidates);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const candidate = await candidatesService.getCandidateById(req.params.id);
            res.status(200).json(candidate);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const candidateId = req.params.id; 
            const data = req.body; 
            const files = req.files; 
    
            const updatedCandidate = await candidatesService.updateCandidate(candidateId, data, files);
            res.status(200).json(updatedCandidate); 
        } catch (error) {
            res.status(400).json({ error: error.message }); 
        }
    }

    async delete(req, res) {
        try {
            await candidatesService.deleteCandidate(req.params.id);
            res.status(200).json({ message: 'Candidate deleted successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new CandidatesController();