import React, { useState, useEffect } from 'react';

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [limit, setLimit] = useState(3); // Đặt mặc định limit là 3
  const [randomEmployees, setRandomEmployees] = useState([]);

  // Fetch dữ liệu từ API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/employees');
        const data = await response.json();
        setEmployees(data); // Lưu toàn bộ dữ liệu từ API
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  // Chọn ngẫu nhiên nhân viên khi dữ liệu hoặc giới hạn thay đổi
  useEffect(() => {
    if (employees.length > 0) {
      const shuffled = [...employees].sort(() => Math.random() - 0.5); // Trộn ngẫu nhiên
      setRandomEmployees(shuffled.slice(0, limit)); // Lấy theo limit
    }
  }, [employees, limit]);

  return (
    <div className="employee-container">
      {/* <div className="limit-controls">
        <label htmlFor="limit">Hiển thị:</label>
        <select
          id="limit"
          value={limit}
          onChange={(e) => setLimit(parseInt(e.target.value))}
        >
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
      </div> */}
      <div className="employee-list">
        {randomEmployees.map((employee) => (
            <div class="col-md-4 col-sm-4" key={employee.id}>
            <div class="item">
              <div class="tst-image">
                <img src={employee.logo} class="img-responsive" alt="" />
              </div>
              <div class="tst-author">
                <h4>{employee.contactPerson}</h4>
                <a href={`/company/${employee.id}`}>{employee.companyName}</a>
              </div>
              <p className='descriptionText'>
                {employee.description}
              </p>
              <div class="tst-rating">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
