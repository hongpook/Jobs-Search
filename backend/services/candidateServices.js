const { Candidates, Applications } = require('../models/index'); 
const cloudinary = require('../config/cloudinary');


class CandidatesService {
    async createCandidate(data, files) {
        try {
            if (files) {
                if (files.avt && files.avt[0]) {
                    const avatarResult = await cloudinary.uploader.upload(files.avt[0].path, {
                        folder: 'imgAvt',
                    });
                    data.avt = avatarResult.secure_url; 
                }
    
                if (files.cvFile && files.cvFile[0]) {
                    const cvFileResult = await cloudinary.uploader.upload(files.cvFile[0].path, {
                        folder: 'cvsFindJobs',
                    });
                    data.cvFile = cvFileResult.secure_url; 
                }
            }
    
            const candidate = await Candidates.create(data);
            return candidate; 
        } catch (error) {
            console.error('Error during upload:', error);
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

    async updateCandidate(id, data, files) {
        try {
            if (files) {
                if (files.avt && files.avt[0]) {
                    const avatarResult = await cloudinary.uploader.upload(files.avt[0].path, {
                        folder: 'imgAvt',
                    });
                    data.avt = avatarResult.secure_url; 
                }
    
                if (files.cvFile && files.cvFile[0]) {
                    const cvFileResult = await cloudinary.uploader.upload(files.cvFile[0].path, {
                        folder: 'cvsFindJobs',
                    });
                    data.cvFile = cvFileResult.secure_url; 
                }
            }
    
            const candidate = await Candidates.update(data, {
                where: { id: id },
                returning: true, 
            });
    
            if (!candidate[0]) {
                throw new Error("Candidate not found");
            }
    
            return candidate[1][0]; 
        } catch (error) {
            console.error('Error during update:', error);
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
