const { Candidates, Applications } = require('../models/index'); 

class CandidatesService {
    async createCandidate(data) {
        try {
            const candidate = await Candidates.create(data);
            return candidate;
        } catch (error) {
            throw new Error('Error creating candidate: ' + error.message);
        }
    }

    async getAllCandidates() {
        try {
            const candidates = await Candidates.findAll({
                include: [{ model: Applications, as: 'applications' }] 
            });
            return candidates;
        } catch (error) {
            throw new Error('Error fetching candidates: ' + error.message);
        }
    }

    async getCandidateById(id) {
        try {
            const candidate = await Candidates.findByPk(id, {
                include: [{ model: Applications, as: 'applications' }] 
            });
            if (!candidate) {
                throw new Error('Candidate not found');
            }
            return candidate;
        } catch (error) {
            throw new Error('Error fetching candidate: ' + error.message);
        }
    }

    async updateCandidate(id, data) {
        try {
            const candidate = await Candidates.findByPk(id);
            if (!candidate) {
                throw new Error('Candidate not found');
            }
            await candidate.update(data);
            return candidate;
        } catch (error) {
            throw new Error('Error updating candidate: ' + error.message);
        }
    }

    async deleteCandidate(id) {
        try {
            const candidate = await Candidates.findByPk(id);
            if (!candidate) {
                throw new Error('Candidate not found');
            }
            await candidate.destroy();
            return { message: 'Candidate deleted successfully' };
        } catch (error) {
            throw new Error('Error deleting candidate: ' + error.message);
        }
    }
}

module.exports = new CandidatesService();
