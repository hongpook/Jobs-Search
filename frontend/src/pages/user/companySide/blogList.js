import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { MdOutlineRemoveRedEye, MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Typography,
  Paper,
  Modal,
} from "@mui/material";
import jwtDecode from "jwt-decode";
import { notifyError, notifySuccess } from "../../../utils/toastNotification/toastNotification";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import useTranslation

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function BlogListSide() {
  const { t } = useTranslation(); // Initialize translation hook
  const [blogs, setBlogs] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("title");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userId, setUserId] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const navigate = useNavigate();

  const handleOpen = (id) => {
    navigate(`/blog-detail/${id}`)
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBlog(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    } else {
      console.error("No access token found");
    }
  }, []);

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:5000/api/v1/employee/${userId}`)
        .then((response) => {
          setBlogs(response.data.blogs);
        })
        .catch((error) => {
          console.error("Error fetching blogs data:", error);
        });
    }
  }, [userId]);

  const handleDelete = async (blogId) => {
    try {
      const result = await Swal.fire({
        title: t("blogListCompany.deleteConfirmationTitle"),
        text: t("blogListCompany.deleteConfirmationText"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: t("blogListCompany.deleteConfirmationConfirm"),
        cancelButtonText: t("blogListCompany.deleteConfirmationCancel"),
      });

      if (!result.isConfirmed) return;

      await axios.delete(`http://localhost:5000/api/v1/blog/${blogId}`);
      notifySuccess(t("blogListCompany.deleteSuccess"));

      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
    } catch (error) {
      console.error("Error deleting blog:", error.response?.data || error.message);
      notifyError(
        error.response?.data?.message || t("blogListCompany.deleteFailure")
      );
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const blogRow = blogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Toolbar>
          <Typography variant="h6" id="tableTitle" component="div">
            {t("blogListCompany.blogList")}
          </Typography>
        </Toolbar>
        <TableContainer>
          <Table sx={{ minWidth: 1100 }}>
            <TableHead>
              <TableRow>
                <TableCell>{t("blogListCompany.image")}</TableCell>
                <TableCell>{t("blogListCompany.title")}</TableCell>
                <TableCell>{t("blogListCompany.category")}</TableCell>
                <TableCell>{t("blogListCompany.action")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {blogRow.map((blog, index) => (
                <TableRow key={blog.id}>
                  <TableCell>
                    <img
                      src={blog.blogImg}
                      alt={blog.title}
                      style={{ width: "100px", borderRadius: "8px" }}
                    />
                  </TableCell>
                  <TableCell>{blog.title}</TableCell>
                  <TableCell>{blog.category}</TableCell>

                  <TableCell>
                    <div className="row">
                      <button className="col-3" onClick={() => navigate(`/edit-blog/${blog.id}`)}>
                        <MdOutlineEdit />
                      </button>
                      <button className="col-3" onClick={() => handleDelete(blog.id)}>
                        <RiDeleteBinLine />
                      </button>
                      <button className="col-3" onClick={() => handleOpen(blog.id)}>
                        <MdOutlineRemoveRedEye />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={blogs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          {selectedBlog ? (
            <>
              <Typography variant="h6">{selectedBlog.title}</Typography>
              <Typography variant="subtitle1">{selectedBlog.category}</Typography>
              <Typography variant="body1">{selectedBlog.content}</Typography>
              <img
                src={selectedBlog.blogImg}
                alt={selectedBlog.title}
                style={{ width: "100%", borderRadius: "8px", marginTop: "10px" }}
              />
            </>
          ) : (
            <Typography variant="body1">{t("blogListCompany.noBlogSelected")}</Typography>
          )}
        </Box>
      </Modal>
    </Box>
  );
}

export default BlogListSide;
