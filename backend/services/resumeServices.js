// services/resumeService.js
const Resume = require("../models/index");

class ResumeService {
  // Lấy tất cả hồ sơ
  async getAllResumes() {
    try {
      return await Resume.findAll();
    } catch (error) {
      throw new Error("Error fetching resumes: " + error.message);
    }
  }

  // Lấy hồ sơ theo ID
  async getResumeById(id) {
    try {
      const resume = await Resume.findByPk(id);
      if (!resume) {
        throw new Error("Resume not found");
      }
      return resume;
    } catch (error) {
      throw new Error("Error fetching resume: " + error.message);
    }
  }

  // Tạo mới hồ sơ
  async createResume(data) {
    try {
      const resume = await Resume.create(data);
      return resume;
    } catch (error) {
      throw new Error("Error creating resume: " + error.message);
    }
  }

  // Cập nhật hồ sơ
  async updateResume(id, data) {
    try {
      const resume = await Resume.findByPk(id);
      if (!resume) {
        throw new Error("Resume not found");
      }
      return await resume.update(data);
    } catch (error) {
      throw new Error("Error updating resume: " + error.message);
    }
  }

  // Xóa hồ sơ
  async deleteResume(id) {
    try {
      const resume = await Resume.findByPk(id);
      if (!resume) {
        throw new Error("Resume not found");
      }
      await resume.destroy();
      return { message: "Resume deleted successfully" };
    } catch (error) {
      throw new Error("Error deleting resume: " + error.message);
    }
  }
}

module.exports = new ResumeService();
