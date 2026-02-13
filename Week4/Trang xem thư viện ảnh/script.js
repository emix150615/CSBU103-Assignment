const fileInput = document.getElementById('fileUpload');
const urlInput = document.getElementById('imageURL');
const displayImage = document.getElementById('displayImage');
const imageWrapper = document.getElementById('imageWrapper'); // Lấy wrapper
const messageElement = document.getElementById('message');

// Biến cho chức năng Zoom
let currentZoom = 1.0;
const zoomStep = 0.1;
const minZoom = 0.5;
const maxZoom = 5.0;

// Biến cho chức năng Kéo (Drag)
let isDragging = false;
let startX;
let startY;
let initialX = 0; // Vị trí X ban đầu của ảnh (translation)
let initialY = 0; // Vị trí Y ban đầu của ảnh (translation)
let currentX = 0; // Vị trí X hiện tại của ảnh
let currentY = 0; // Vị trí Y hiện tại của ảnh

// ----------------------------------------------------
// 1. Xử lý Tải Ảnh & URL
// ----------------------------------------------------

fileInput.addEventListener('change', function() {
    messageElement.textContent = '';
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            displayImage.src = e.target.result;
            resetTransform(); // Đặt lại cả zoom và vị trí
        }
        reader.readAsDataURL(file);
    }
});

function loadImageFromURL() {
    messageElement.textContent = '';
    const url = urlInput.value.trim();
    
    if (url) {
        displayImage.src = url;
        resetTransform(); // Đặt lại cả zoom và vị trí
        
        displayImage.onerror = function() {
            messageElement.textContent = 'Lỗi: Không thể tải ảnh từ URL này. Vui lòng kiểm tra lại đường dẫn.';
            displayImage.src = 'placeholder.png'; 
            resetTransform();
        }
    } else {
        messageElement.textContent = 'Vui lòng dán một URL ảnh hợp lệ.';
    }
}

// ----------------------------------------------------
// 2. Xử lý Zoom
// ----------------------------------------------------

function applyTransform() {
    // Áp dụng cả zoom và kéo (translate)
    displayImage.style.transform = `scale(${currentZoom}) translate(${currentX}px, ${currentY}px)`;
}

function zoomIn() {
    if (currentZoom < maxZoom) {
        currentZoom += zoomStep;
        applyTransform();
    }
}

function zoomOut() {
    if (currentZoom > minZoom) {
        currentZoom -= zoomStep;
        applyTransform();
    }
}

function resetTransform() {
    currentZoom = 1.0;
    currentX = 0;
    currentY = 0;
    initialX = 0;
    initialY = 0;
    applyTransform();
    messageElement.textContent = 'Ảnh đã được đặt lại kích thước và vị trí.';
}

// Đổi tên hàm cũ để reset tất cả
function resetZoom() {
    resetTransform();
}

// Zoom bằng chuột cuộn
imageWrapper.addEventListener('wheel', function(e) {
    e.preventDefault(); 
    if (e.deltaY < 0) {
        zoomIn(); 
    } else if (e.deltaY > 0) {
        zoomOut(); 
    }
});

// ----------------------------------------------------
// 3. Xử lý Kéo (Drag and Drop)
// ----------------------------------------------------

// Khi nhấn chuột xuống (start dragging)
imageWrapper.addEventListener('mousedown', function(e) {
    // Chỉ cho phép kéo khi ảnh đã được phóng to
    if (currentZoom > 1.0) {
        e.preventDefault(); // Ngăn kéo ảnh mặc định của trình duyệt
        isDragging = true;
        
        // Lưu lại vị trí chuột ban đầu
        startX = e.clientX;
        startY = e.clientY;
        
        // Cập nhật vị trí ban đầu của ảnh cho phiên kéo này
        initialX = currentX;
        initialY = currentY;
        
        // Đặt con trỏ chuột thành 'grabbing'
        displayImage.style.cursor = 'grabbing';
    }
});

// Khi di chuyển chuột (dragging)
document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    
    // Tính toán khoảng cách chuột di chuyển
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    
    // Tính toán vị trí mới của ảnh
    currentX = initialX + dx / currentZoom;
    currentY = initialY + dy / currentZoom;
    
    // Áp dụng vị trí mới
    applyTransform();
});

// Khi nhả chuột (stop dragging)
document.addEventListener('mouseup', function() {
    if (isDragging) {
        isDragging = false;
        // Đặt con trỏ chuột lại thành 'grab' hoặc mặc định
        displayImage.style.cursor = 'grab';
    }
});

// Đặt con trỏ mặc định là 'grab' khi zoom
displayImage.style.cursor = 'grab';