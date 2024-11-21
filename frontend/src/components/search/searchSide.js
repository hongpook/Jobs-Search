import "./searchSide.css";
import React, { useState } from "react";
import { Menu, MenuItem, Button, Typography, Divider } from "@mui/material";
import { GiHamburgerMenu } from "react-icons/gi";

const SearchSide = ({ onSearch }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = async (e) => {
    e.preventDefault(); // Ngăn form reload
    console.log("Form submitted"); // Debug
    console.log("Keyword:", keyword, "Location:", location, "Job Type:", jobType);

    // Cấu hình query params
    const searchParams = new URLSearchParams();
    if (keyword) searchParams.append('search', keyword);
    if (location) searchParams.append('location', location);
    if (jobType) searchParams.append('jobType', jobType);

    try {
      // Gửi request đến API
      const response = await fetch(`http://localhost:5000/api/v1/filter-job?${searchParams.toString()}`, {
        method: 'GET',
      });
      
      // Xử lý kết quả
      if (response.ok) {
        const data = await response.json();
        console.log("Search Results:", data);
        
        // Truyền kết quả tìm kiếm lên cha (onSearch)
        if (onSearch) {
          onSearch(data);  // Truyền kết quả tìm kiếm cho component cha
        }
      } else {
        console.error("Error fetching search results");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="pt-3">
      <div className="search-side">
        <div className="container search-side-input p-2">
          <div className="search-side-wrapper">
            {/* Dropdown Categories */}
            <div className="col-2 me-2">
              <Button
                onClick={handleClick}
                className="section-btn btn btn-primary btn-block"
              >
                <GiHamburgerMenu /> &nbsp; Job categories
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem>
                  <div style={{ padding: "10px", width: "fit-content" }}>
                    <Typography variant="h6">Thông tin chi tiết</Typography>
                    <Typography variant="body1">
                      Đây là nội dung chính của dropdown. Bạn có thể thêm nhiều
                      thông tin ở đây, như là các mô tả, thông tin hướng dẫn,
                      hoặc bất cứ nội dung nào cần thiết.
                    </Typography>
                    <Divider style={{ margin: "10px 0" }} />

                    <Typography variant="subtitle1">
                      Thông tin bổ sung
                    </Typography>
                    <Typography variant="body2">
                      Thêm một vài đoạn văn bản nhỏ hơn để miêu tả chi tiết hoặc
                      thông tin liên quan khác.
                    </Typography>

                    <ul>
                      <li>Mục 1: Nội dung chi tiết</li>
                      <li>Mục 2: Một vài thông tin khác</li>
                      <li>Mục 3: Thông tin bổ sung</li>
                    </ul>

                    <Divider style={{ margin: "10px 0" }} />

                    <Typography variant="body2" color="textSecondary">
                      Chú thích: Bạn có thể tùy chỉnh nội dung này để phù hợp
                      với yêu cầu của ứng dụng.
                    </Typography>
                  </div>
                </MenuItem>
              </Menu>
            </div>

            {/* Search Form */}
            <form className="col-9 form-search" onSubmit={handleSearch}>
              <div className="col-10 side-input-search">
                {/* Keyword Input */}
                <input
                  type="search"
                  className="col-9 me-2"
                  placeholder="Recruitment position, company name..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />

                {/* Location Select */}
                <select
                  className="me-2 p-2 select-search"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="">Select location</option>
                  <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                </select>

                {/* Job Type Select */}
                <select
                  className="me-2 p-2 select-search"
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                >
                  <option value="">Select job type</option>
                  <option value="Full-time">Full time</option>
                  <option value="Part-time">Part time</option>
                  <option value="Internship">Internship</option>
                  <option value="Freelancer">Freelancer</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="col-2 section-btn btn btn-primary btn-block me-2 p-2"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSide;
