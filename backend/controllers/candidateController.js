const candidatesService = require('../services/candidateServices');

class CandidatesController {
    async create(req, res) {
        try {
            const candidate = await candidatesService.createCandidate(req.body);
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
            res.status(404).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const candidate = await candidatesService.updateCandidate(req.params.id, req.body);
            res.status(200).json(candidate);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const result = await candidatesService.deleteCandidate(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
}

module.exports = new CandidatesController();
