const generateText = require("../config/openai");
const { Candidates, Resumes } = require("../models/index");

const generateID = () => Math.random().toString(36).substring(2, 10);

const createResume = async (req, res) => {
  try {
    const {
      fullName,
      currentPosition,
      currentLength,
      currentTechnologies,
      workHistory,
    } = req.body;

    // Kiểm tra đầu vào
    if (!fullName || !currentPosition || !currentLength || !currentTechnologies || !workHistory) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Kiểm tra workHistory
    let workArray = [];
    try {
      workArray = JSON.parse(workHistory);
    } catch (error) {
      return res.status(400).json({ message: "Invalid work history format." });
    }

    // Tạo các prompt cho OpenAI
    const prompt1 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n I write in the technologies: ${currentTechnologies}. Can you write a 100 words description for the top of the resume (first person writing)?`;
    const prompt2 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n I write in the technologies: ${currentTechnologies}. Can you write 10 points for a resume on what I am good at?`;
    const prompt3 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n During my years I worked at ${workArray.length} companies. ${workArray.map(w => `${w.name} as a ${w.position}.`).join(' ')} \n Can you write me 50 words for each company separated in numbers of my succession in the company (in first person)?`;

    // Gọi OpenAI API
    const [objective, keypoints, jobResponsibilities] = await Promise.all([
      generateText(prompt1),
      generateText(prompt2),
      generateText(prompt3),
    ]);

    // Kiểm tra kết quả từ OpenAI
    if (!objective || !keypoints || !jobResponsibilities) {
      return res.status(500).json({ message: "Failed to generate resume details from OpenAI." });
    }

    // Tạo candidate và resume
    const candidate = await Candidates.create({ fullName }).catch((error) => {
      console.error("Error creating candidate:", error);
      throw new Error("Failed to create candidate.");
    });

    const resume = await Resumes.create({
      candidateId: candidate.id,
      resume: JSON.stringify({ objective, keypoints, jobResponsibilities }),
    }).catch((error) => {
      console.error("Error creating resume:", error);
      throw new Error("Failed to create resume.");
    });

    res.json({
      message: "Resume created successfully!",
      data: { candidate, resume },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred.", error });
  }
};

module.exports = { createResume };
