// register.js
document.getElementById("registerForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        alert(result.message || 'Đã xảy ra lỗi, vui lòng thử lại!');

        if (response.ok) {
            window.location.href = '/login'; // Chuyển hướng đến trang đăng nhập
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Đã xảy ra lỗi, vui lòng thử lại!');
    }
});