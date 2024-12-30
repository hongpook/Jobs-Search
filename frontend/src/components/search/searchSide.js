import React, { useState } from "react";
import { Menu, MenuItem, Button, Typography, Divider } from "@mui/material";
import { GiHamburgerMenu } from "react-icons/gi";
import { useTranslation } from "react-i18next";
import "./searchSide.css";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1020,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SearchSide = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [openSearch, setOpenSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Trạng thái tải dữ liệu

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseSearch = () => {
    setOpenSearch(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setOpenSearch(true); // Hiển thị modal ngay khi bấm nút Search
    setIsLoading(true); // Bật trạng thái tải dữ liệu

    const searchParams = new URLSearchParams();
    if (keyword) searchParams.append("search", keyword);
    if (location) searchParams.append("location", location);
    if (jobType) searchParams.append("jobType", jobType);

    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/filter-job?${searchParams.toString()}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const result = await response.json();
        if (result && Array.isArray(result.data)) {
          setSearchResults(result.data); // Cập nhật kết quả tìm kiếm
        } else {
          console.error("Data is not an array:", result.data);
          setSearchResults([]);
        }
      } else {
        console.error("Error fetching search results");
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false); // Tắt trạng thái tải dữ liệu
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
                <GiHamburgerMenu /> &nbsp; {t("search.jobCategories")}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem>
                  <div style={{ padding: "10px", width: "fit-content" }}>
                    <Typography variant="h6">{t("search.jobCategories")}</Typography>
                    <Divider style={{ margin: "10px 0" }} />
                    <Typography variant="body2" color="textSecondary">
                      {t("search.searchButton")}
                    </Typography>
                  </div>
                </MenuItem>
              </Menu>
            </div>

            {/* Search Form */}
            <form className="col-9 form-search" onSubmit={handleSearch}>
              <div className="col-10 side-input-search">
                <input
                  type="search"
                  className="col-9 me-2"
                  placeholder={t("search.keywordPlaceholder")}
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <select
                  className="me-2 p-2 select-search"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="">{t("search.selectLocation")}</option>
                  <option value="HCM">{t("search.locationHCM")}</option>
                  <option value="Hà Nội">{t("search.locationHN")}</option>
                  <option value="Đà Nẵng">{t("search.locationDN")}</option>
                </select>
                <select
                  className="me-2 p-2 select-search"
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                >
                  <option value="">{t("search.selectJobType")}</option>
                  <option value="Full-time">{t("search.fullTime")}</option>
                  <option value="Part-time">{t("search.partTime")}</option>
                  <option value="Internship">{t("search.internship")}</option>
                  <option value="Freelancer">{t("search.freelancer")}</option>
                </select>
              </div>
              <button
                type="submit"
                className="col-2 section-btn btn btn-primary btn-block me-2 p-2"
              >
                {t("search.search")}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal hiển thị kết quả */}
      <Modal
  aria-labelledby="transition-modal-title"
  aria-describedby="transition-modal-description"
  open={openSearch}
  onClose={handleCloseSearch}
  closeAfterTransition
  slots={{ backdrop: Backdrop }}
  slotProps={{
    backdrop: {
      timeout: 500,
    },
  }}
>
  <Fade in={openSearch}>
    <Box sx={{ ...style, maxHeight: '80vh', overflowY: 'auto' }}> {/* Thêm thanh cuộn tự động */}
    <h4>Kết quả tìm kiếm</h4>
      {isLoading ? (
        <p>{t("search.loading")}</p> // Hiển thị trạng thái đang tải
      ) : (
        <div className="job-results mt-4">
          
          {searchResults.length > 0 ? (
            searchResults.map((job) => (
              <div key={job.id} className="job-card row">
                <div className="col-1">
                  <img
                    src={job.imageUrl}
                    alt={job.title}
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="col-11">
                  <a href={`/job-details/${job.id}`}>{job.title}</a>
                  <p>{job.salaryRange}</p>
                </div>
                <hr />
              </div>
            ))
          ) : (
            <p>{t("search.noJobsFound")}</p>
          )}
        </div>
      )}
    </Box>
  </Fade>
</Modal>

    </section>
  );
};

export default SearchSide;
