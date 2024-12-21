import React, { useState } from "react";
import { Menu, MenuItem, Button, Typography, Divider } from "@mui/material";
import { GiHamburgerMenu } from "react-icons/gi";
import { useTranslation } from "react-i18next";  // Import useTranslation
import './searchSide.css';

const SearchSide = ({ onSearch }) => {
  const { t } = useTranslation();  // Khởi tạo hook để lấy bản dịch
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
    e.preventDefault(); 
    // console.log("Form submitted");
    // console.log("Keyword:", keyword, "Location:", location, "Job Type:", jobType);

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
                <GiHamburgerMenu /> &nbsp; {t('search.jobCategories')}  {/* Sử dụng bản dịch */}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem>
                  <div style={{ padding: "10px", width: "fit-content" }}>
                    <Typography variant="h6">{t('search.jobCategories')}</Typography>
                    <Typography variant="body1">
                      {t('search.keywordPlaceholder')}
                    </Typography>
                    <Divider style={{ margin: "10px 0" }} />

                    <Typography variant="subtitle1">
                      {t('search.jobTypeSelect')}
                    </Typography>
                    <Typography variant="body2">
                      {t('search.fullTime')}, {t('search.partTime')}, {t('search.internship')}, {t('search.freelancer')}
                    </Typography>

                    <ul>
                      <li>{t('search.locationHCM')}</li>
                      <li>{t('search.locationHN')}</li>
                      <li>{t('search.locationDN')}</li>
                    </ul>

                    <Divider style={{ margin: "10px 0" }} />

                    <Typography variant="body2" color="textSecondary">
                      {t('search.searchButton')}
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
                  placeholder={t('search.keywordPlaceholder')}
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />

                {/* Location Select */}
                <select
                  className="me-2 p-2 select-search"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="">{t('search.selectLocation')}</option>
                  <option value="Hồ Chí Minh">{t('search.locationHCM')}</option>
                  <option value="Hà Nội">{t('search.locationHN')}</option>
                  <option value="Đà Nẵng">{t('search.locationDN')}</option>
                </select>

                {/* Job Type Select */}
                <select
                  className="me-2 p-2 select-search"
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                >
                  <option value="">{t('search.selectJobType')}</option>
                  <option value="Full-time">{t('search.fullTime')}</option>
                  <option value="Part-time">{t('search.partTime')}</option>
                  <option value="Internship">{t('search.internship')}</option>
                  <option value="Freelancer">{t('search.freelancer')}</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="col-2 section-btn btn btn-primary btn-block me-2 p-2"
              >
                {t('search.search')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSide;
