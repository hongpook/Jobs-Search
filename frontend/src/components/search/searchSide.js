import "./searchSide.css";
import React, { useState } from "react";
import { Menu, MenuItem, Button, Typography, Divider } from "@mui/material";
import { GiHamburgerMenu } from "react-icons/gi";

const SearchSide = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <section className="pt-3">
      <div className="search-side">
        <div className="container search-side-input p-2 ">
          <div className="search-side-wrapper">
            <div className=" col-2 me-2">
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
                  <div style={{ padding: "10px", Width: "fit-content" }}>
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
            <form className="col-9 form-search ">
                <div className="col-10 side-input-search">
                    <input
                        type="text"
                        className="col-9 me-2"
                        placeholder="Recruitment position, company name..."
                    />
                    <select className="me-2 p-2 select-search">
                        <option>Location</option>
                        <option>Full time</option>
                        <option>Part time</option>
                        <option>Internship</option>
                        <option>Freelancer</option>
                    </select>

                </div>
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
