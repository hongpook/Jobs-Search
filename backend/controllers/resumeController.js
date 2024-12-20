// // controllers/resumeController.js
// const ResumeService = require("../services/resumeServices");

// class ResumeController {
//   // API lấy tất cả hồ sơ
//   async getAllResumes(req, res) {
//     try {
//       const resumes = await ResumeService.getAllResumes();
//       return res.status(200).json({
//         success: true,
//         data: resumes,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   }

//   // API lấy hồ sơ theo ID
//   async getResumeById(req, res) {
//     try {
//       const resumeId = req.params.id;
//       const resume = await ResumeService.getResumeById(resumeId);
//       return res.status(200).json({
//         success: true,
//         data: resume,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   }

//   // API tạo mới hồ sơ
//   async createResume(req, res) {
//     try {
//       const resumeData = req.body;
//       const newResume = await ResumeService.createResume(resumeData);
//       return res.status(201).json({
//         success: true,
//         message: "Resume created successfully",
//         data: newResume,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   }

//   // API cập nhật hồ sơ
//   async updateResume(req, res) {
//     try {
//       const resumeId = req.params.id;
//       const updateData = req.body;
//       const updatedResume = await ResumeService.updateResume(resumeId, updateData);
//       return res.status(200).json({
//         success: true,
//         message: "Resume updated successfully",
//         data: updatedResume,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   }

//   // API xóa hồ sơ
//   async deleteResume(req, res) {
//     try {
//       const resumeId = req.params.id;
//       const result = await ResumeService.deleteResume(resumeId);
//       return res.status(200).json({
//         success: true,
//         message: result.message,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   }
// }

// module.exports = new ResumeController();

const resumeService = require("../services/resumeServices");

exports.getAllResumes = async (req, res) => {
  try {
    const resumes = await resumeService.getAllResumes();
    res.status(200).json(resumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getResumeById = async (req, res) => {
  try {
    const { id } = req.params;
    const resume = await resumeService.getResumeById(id);
    res.status(200).json(resume);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.createResume = async (req, res) => {
  try {
    const resume = await resumeService.createResume(req.body);
    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateResume = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedResume = await resumeService.updateResume(id, req.body);
    res.status(200).json(updatedResume);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.deleteResume = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await resumeService.deleteResume(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
