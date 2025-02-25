document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form

    // Lấy dữ liệu từ form
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    try {
        // Gửi yêu cầu đăng nhập đến server
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // Phân tích kết quả phản hồi
        const result = await response.json();
        alert(result.message || 'Đã xảy ra lỗi, vui lòng thử lại!'); // Hiển thị thông báo từ server
        
        // Kiểm tra nếu đăng nhập thành công
        if (response.ok) {
            window.location.href = '/'; // Điều hướng đến trang dashboard hoặc trang chính
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Đã xảy ra lỗi, vui lòng thử lại!'); // Thông báo lỗi
    }
});